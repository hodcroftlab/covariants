#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Converts cluster data to a format suitable for consumption by the web app
"""
import glob
import json
import os
import re
from datetime import datetime
from shutil import copyfile
from urllib.parse import quote

import numpy as np
import pandas as pd

from clusters import clusters
from colors_and_countries import country_styles_all
from mutation_comparison import mutation_comparison
from name_table import name_table

cluster_tables_path = "cluster_tables"
output_path = "web/public/data"
ack_output_path = "web/public/acknowledgements"


def soa_to_aos(soa):
    """
    Converts a "struct of arrays" to "array of structs".
    ("dict of lists" to "list of dicts" in Python jargon)
    """
    return [dict(zip(soa, t)) for t in zip(*soa.values())]


def wrap_cluster_data(country_data_aos):
    """
    Gathers cluster counts into a nested dict, instead of mixed with `week` and `total_sequences`.
    Also collects cluster names
    """
    country_data_aos_wrapped = []
    cluster_names = set()
    for country_data in country_data_aos:
        week = country_data["week"]
        total_sequences = country_data["total_sequences"]

        cluster_counts = country_data
        cluster_counts.pop("week")
        cluster_counts.pop("total_sequences")

        for cluster_name in cluster_counts:
            cluster_names.add(cluster_name)

        country_data_aos_wrapped.append(
            {
                "week": week,
                "total_sequences": total_sequences,
                "cluster_counts": cluster_counts,
            }
        )
    country_data_aos_wrapped.sort(key=lambda d: d['week'])
    return country_data_aos_wrapped, list(cluster_names)


def convert_per_country_data(json_input):
    min_date = json_input["plotting_dates"]["min_date"]
    max_date = json_input["plotting_dates"]["max_date"]
    countries = json_input["countries"]

    cluster_names = []
    distributions = []
    for (country, country_data) in countries.items():
        country_data_aos = soa_to_aos(country_data)
        country_data_aos_wrapped, cluster_names_new = wrap_cluster_data(
            country_data_aos
        )
        distributions.append(
            {"country": country, "distribution": country_data_aos_wrapped}
        )
        cluster_names = sorted(list(set(cluster_names_new + cluster_names)))

    return cluster_names, distributions, min_date, max_date


def diff_left_closed(big, small, closed=False):
    """
    Calculates a difference between a larger list and a smaller list.
    Boundaries are included into the diff. The difference is sorted.
    """
    diff = set()
    N = len(big)
    for i, curr in enumerate(big):
        if curr not in small:
            diff.add(curr)  # Add current

            if closed:
                if i > 0:
                    # Add previous
                    prev = big[i - 1]
                    diff.add(prev)
                if i < (N - 1):
                    # Add next
                    next_ = big[i + 1]
                    diff.add(next_)

    return sorted(list(diff))


def interpolate_per_cluster_data(cluster_data):
    """
    Fills data for missing weeks using linear interpolation.
    Produces only the interpolated chunks (including boundaries for every missing date span),
     i.e. the original data is not included.
    """

    # NOTE: using "week" column as index
    df = pd.DataFrame(cluster_data).set_index("week")
    #add a frequencies column we'll interpolate later
    df['frequencies'] = df.cluster_sequences/df.total_sequences

    # Add rows for missing weeks. Fill values of the new rows wih NaN.
    old_index = df.index
    new_index = pd.date_range(old_index[0], old_index[-1], freq="14D").strftime(
        "%Y-%m-%d"
    )
    df_reindexed = df.reindex(new_index, fill_value=np.NaN)

    #separate out frequencies so that we only interpolate this, nothing else
    df_freqs = df_reindexed[['frequencies']].copy()
    df_interp = df_freqs.interpolate(method="linear")

    # Calculate indices to pick from the interpolation results.
    # We want a closed diff: only rows that are not in the original data, plus boundaries for every span of missing data
    index_interp = diff_left_closed(new_index.tolist(), old_index.tolist(), closed=True)

    index_interp_open = diff_left_closed(
        new_index.tolist(), old_index.tolist(), closed=False
    )

    #use the original dataframe, with NA values but -
    df_result = df_reindexed
    #add in interpolated freqs to overwrite the ones with NAs
    df_result['frequencies'] = df_interp['frequencies']

    df_result["interp"] = False
    df_result.loc[index_interp, "interp"] = True

    df_result["orig"] = True
    df_result.loc[index_interp_open, "orig"] = False

    # Make a "week" column from index
    df_result["week"] = df_result.index

    return df_result.replace({np.nan: None}).to_dict("list")


def update_per_cluster_distribution(cluster_data, country, distribution):
    cluster_data_aos = soa_to_aos(cluster_data)

    for cluster_datum in cluster_data_aos:
        week = cluster_datum["week"]
        cluster_sequences = cluster_datum["cluster_sequences"]
        total_sequences = cluster_datum["total_sequences"]
        interp = cluster_datum["interp"]
        orig = cluster_datum["orig"]
        #we've now already calculated & interpolated freqs previously, so use this
        frequency = cluster_datum['frequencies']

        if len(distribution) == 0:
            distribution.append(
                {
                    "week": week,
                    "frequencies": {country: frequency},
                    "interp": {country: interp},
                    "orig": {country: orig},
                }
            )
        else:
            has_this_week = False
            for dist in distribution:
                if week == dist["week"]:
                    has_this_week = True

            if not has_this_week:
                distribution.append(
                    {
                        "week": week,
                        "frequencies": {country: frequency},
                        "interp": {country: interp},
                        "orig": {country: orig},
                    }
                )
            else:
                for dist in distribution:
                    if week == dist["week"]:
                        dist["frequencies"][country] = frequency
                        dist["interp"][country] = interp
                        dist["orig"][country] = orig


def convert_per_cluster_data(clusters):
    per_cluster_data_output = {"distributions": [], "country_names": []}
    per_cluster_data_output_interp = {"distributions": [], "country_names": []}

    for _, cluster in clusters.items():
        if cluster.get("has_no_page"):
            continue

        display_name = cluster["display_name"]
        build_name = cluster["build_name"]

        distribution = []
        with open(
            os.path.join(cluster_tables_path, f"{build_name}_data.json"), "r"
        ) as f:
            json_input = json.load(f)

            for (country, cluster_data) in json_input.items():
                per_cluster_data_output["country_names"] = sorted(
                    list(set([country] + per_cluster_data_output["country_names"]))
                )
                cluster_data_interp = interpolate_per_cluster_data(cluster_data)
                update_per_cluster_distribution(
                    cluster_data_interp, country, distribution
                )

        distribution.sort(key=lambda d: d['week'])
        per_cluster_data_output["distributions"].append(
            {"cluster": display_name, "distribution": distribution}
        )

    return per_cluster_data_output, per_cluster_data_output_interp


# HACK: Copied from `allClusterDynamics.py:355`
# TODO: deduplicate
cluster_url_params = {
    "S:N501": "",  # don't have Europe filter
    "S:H69-": "c=gt-S_69,501,453",  # color by mutations, no Europe filter
    "S:Y453F": "c=gt-S_453&f_region=Europe",  # color by mutations, Europe filter
}


def get_build_url(cluster):
    build_name = cluster["build_name"]
    display_name = cluster["display_name"]

    url_params = "f_region=Europe"
    try:
        url_params = cluster_url_params[display_name]
    except KeyError:
        pass

    return f"https://nextstrain.org/groups/neherlab/ncov/{build_name}?{url_params}"


def create_aquaria_urls(clusters):
    for cluster in clusters:
        clusters[cluster]["aquaria_urls"] = []

        if "mutations" not in clusters[cluster]:
            continue
        # 2. Generating URLs with all variations in all genes of that cluster (strain)
        # ---------------------------------------------------------------------------

        # get a list of all genes that have mutations
        genes = set()
        for mut in clusters[cluster]['mutations']['nonsynonymous']:
            genes.add(mut['gene'])

        # gStrings for assembling the Strings defining the mutations for that gene
        gStrings = {}  # type: Dict[str, List[Any]]

        for gene in genes:
            gStrings[gene] = []

        # go over all mutations and put together the strings that describes them, e.g. N501Y

        # PP1ab is the entire polyprotein generated from ORF1a and OFR1b together,
        # so we have to change the numbering
        offset = 4401
        for mut in clusters[cluster]['mutations']['nonsynonymous']:
            # correct deletions (see above)
            if mut['right'] == '-':
                right = 'Del'
            else:
                right = mut['right']
            gene = mut['gene']
            pos = mut['pos']
            if gene == 'ORF1a':
                # append ORF1a mutations to PP1ab (ORF1b)
                if 'ORF1b' in gStrings:
                    gStrings['ORF1b'].append(f"{mut['left']}{pos}{right}")
            elif gene == 'ORF1b':
                # fix numbering for PP1ab (ORF1b)
                pos = pos + offset

            gStrings[gene].append(f"{mut['left']}{pos}{right}")

        # finally assemble URLS
        gene_list = sorted(gStrings.keys())
        if "S" in gene_list: # Sort alphabetically but have S first
            gene_list.remove("S")
            gene_list = ["S"] + gene_list
        for gene in gene_list:
            # ORF1a and ORF1b are called PP1a and PP1ab in Aquaria (like the respective Uniprot entries),
            # so we have to change the name.
            g = gene
            if gene == 'ORF1a':
                g = 'PP1a'
            elif gene == 'ORF1b':
                g = 'PP1ab'
            gString = "&".join([quote(x) for x in gStrings[gene]])
            clusters[cluster]["aquaria_urls"].append({"gene":gene, "url":f"https://aquaria.app/SARS-CoV-2/{g}?{gString}"})

    return clusters


def add_cluster_properties(cluster):
    result = {}
    result.update(cluster)
    result.update({"build_url": get_build_url(cluster)})
    return result


def mutation_string_to_object(mutation):
    match = re.search(
        "^(?P<gene>.*:)?(?P<left>[*.A-Z-]{0,1})(?P<pos>(\d)*)(?P<right>[*.A-Z-]{0,1})$",
        mutation,
    )

    def none_if_empty(x):
        return None if len(x) == 0 else x

    gene = none_if_empty(match.group("gene")).replace(":", "")
    left = none_if_empty(match.group("left"))
    pos = int(match.group("pos"))
    right = none_if_empty(match.group("right"))

    return {
        "gene": gene,
        "left": left,
        "pos": pos,
        "right": right,
    }


def mutation_object_to_string(mut):
    gene = f'{mut["gene"]}:' or ""
    left = mut["left"] or ""
    pos = mut["pos"]
    right = mut["right"] or ""
    return f"{gene}{left}{pos}{right}"


def convert_mutation_comparison(mutation_comparison):
    all_variants = list(mutation_comparison.keys())

    all_mutations = set()
    for variant, variant_data in mutation_comparison.items():
        for mut in variant_data["nonsynonymous"]:
            all_mutations.add(mut)
    all_mutations = list(all_mutations)
    all_mutations_obj = [mutation_string_to_object(mut) for mut in all_mutations]
    all_mutations_pos = list(set([mut["pos"] for mut in all_mutations_obj]))

    # print(all_mutations_pos)

    # Matrix [ variants x mutation_positions ],
    # containing mutation string if there is a mutation at a given position in a given variant, and NaN otherwise
    mutation_presence = pd.DataFrame(
        None, index=all_mutations_pos, columns=all_variants
    )
    for variant, variant_data in mutation_comparison.items():
        for mut in variant_data["nonsynonymous"]:
            mut_obj = mutation_string_to_object(mut)
            pos = mut_obj["pos"]
            mutation_presence.loc[pos, variant] = mut

    mutation_presence = mutation_presence.sort_index(ascending=True)

    def by_presence(mutations):
        # for each of all mutation positions, how many variants have a mutation there (non-NaN value)
        return [mutation_presence.loc[mut].count() for mut in mutations]

    # Split mutations into shared (occurring in more than one variant) and individual
    mask = mutation_presence.count(axis=1) > 1

    shared = mutation_presence[mask]

    # Sort by position
    shared_by_pos = shared.sort_index(ascending=True)

    # Sort by number of occurrences in variants, from most common, to least common
    shared_by_commonness = shared.sort_index(key=by_presence, ascending=False)

    individual = mutation_presence[~mask]

    def shared_to_json(shared):
        # Convert shared mutations into a format convenient for web app
        return [
            {"pos": pos, "presence": pres.replace({np.nan: None}).tolist()}
            for pos, pres in shared.iterrows()
        ]

    # Convert individual mutations into a format convenient for web app
    individual = individual.sort_index(ascending=True)
    individual = {k: v.dropna().tolist() for k, v in individual.T.iterrows()}
    individual = pd.DataFrame.from_dict(individual, orient="index").T
    individual = [
        {"index": k, "mutations": v.tolist()} for k, v in individual.iterrows()
    ]

    return {
        "variants": all_variants,
        "shared_by_pos": shared_to_json(shared_by_pos),
        "shared_by_commonness": shared_to_json(shared_by_commonness),
        "individual": individual,
    }


def convert_region_data(region_name, region_input):
    region_input_file = region_input['data']
    per_country_intro_content = region_input['per_country_intro_content']

    if region_input_file is None:
        return {
            "region": region_name,
            "cluster_names": [],
            "distributions": [],
            "min_date": None,
            "max_date": None,
        }

    with open(os.path.join(cluster_tables_path, region_input_file), "r") as f:
        json_input = json.load(f)

    cluster_names, distributions, min_date, max_date = convert_per_country_data(
        json_input
    )

    return {
        "region": region_name,
        "per_country_intro_content": per_country_intro_content,
        "cluster_names": cluster_names,
        "distributions": distributions,
        "min_date": min_date,
        "max_date": max_date,
    }


# `per_country_intro_content` is a file name relative to `content/PerCountryIntro`
REGIONS_INPUTS = {
    "World": {
        "data": "EUClusters_data.json",
        "per_country_intro_content": "World.mdx"
    },
    "United States": {
        "data": "USAClusters_data.json",
        "per_country_intro_content": "UnitedStates.mdx"
    },
    "Switzerland": {
        "data": "SwissClusters_data.json",
        "per_country_intro_content": "Switzerland.mdx"
    }
}


def parse_date(s: str) -> datetime:
    return datetime.strptime(s, "%Y-%m-%d")


def format_date(dt: datetime) -> str:
    return datetime.strftime(dt, "%Y-%m-%d")


def compare_dates(left_date: str, right_date: str, comp):
    left_date = parse_date(left_date)
    right_date = parse_date(right_date)
    dt = comp(left_date, right_date)
    return format_date(dt)


def check_acknowledgements(ack_output_path: str):
    os.makedirs(ack_output_path, exist_ok=True)

    with open(os.path.join(ack_output_path, "acknowledgements_keys.json"), "r") as f:
        acknowledgements_keys = json.load(f)

        for cluster in clusters:
            build_name = cluster["build_name"]
            ack_dir = os.path.join(ack_output_path, build_name)

            warnings = []

            if not os.path.isdir(ack_dir):
                warnings.append(f" * does not have acknowledgements directory ('{ack_dir}')")

            if build_name not in acknowledgements_keys['acknowledgements']:
                warnings.append(f" * not in 'acknowledgements_keys.json'")
            else:
                num_chunks = acknowledgements_keys['acknowledgements'][build_name]["numChunks"]
                chunks = set(glob.glob(os.path.join(ack_dir, "*.json")))
                for i in range(num_chunks):
                    filename = "{0:03}.json".format(i)
                    chunk = os.path.join(ack_dir, filename)
                    if not chunk in chunks:
                        warnings.append(f" * 'acknowledgements_keys.json' has 'numChunks' "
                                        f"set to {num_chunks}, but chunk '{filename}' was not found")

            if len(warnings) > 0:
                warnings_str = '\n    '.join(warnings)
                print(f"\nWarning: cluster {build_name}:\n    {warnings_str}")


if __name__ == "__main__":
    os.makedirs(output_path, exist_ok=True)

    regions_data = {"regions": []}
    min_date = format_date(datetime(3000, 1, 1))
    max_date = format_date(datetime(1000, 1, 1))
    for region_name, region_input in REGIONS_INPUTS.items():
        region_data = convert_region_data(region_name, region_input)
        if region_data['min_date'] is not None and region_data['max_date'] is not None:
            min_date = compare_dates(min_date, region_data['min_date'], min)
            max_date = compare_dates(max_date, region_data['max_date'], max)
        regions_data["regions"].append(region_data)

    with open(os.path.join(output_path, "perCountryData.json"), "w") as fh:
        json.dump(regions_data, fh, indent=2, sort_keys=True)

    params = {
        "min_date": min_date,
        "max_date": max_date,
    }
    with open(os.path.join(output_path, "params.json"), "w") as fh:
        json.dump(params, fh, indent=2, sort_keys=True)

    per_cluster_data_output, per_cluster_data_output_interp = convert_per_cluster_data(
        clusters
    )
    with open(os.path.join(output_path, "perClusterData.json"), "w") as fh:
        json.dump(per_cluster_data_output, fh, indent=2, sort_keys=True)

    clusters = create_aquaria_urls(clusters)
    clusters = [cluster for _, cluster in clusters.items()]
    with open(os.path.join(output_path, "clusters.json"), "w") as fh:
        json.dump({"clusters": clusters}, fh, indent=2, sort_keys=True)

    mutation_comparison_output = convert_mutation_comparison(mutation_comparison)
    with open(os.path.join(output_path, "mutationComparison.json"), "w") as fh:
        json.dump(mutation_comparison_output, fh, indent=2, sort_keys=True)

    with open(os.path.join(output_path, "countryStyles.json"), "w") as fh:
        json.dump(country_styles_all, fh, indent=2, sort_keys=True)

    copyfile(
        os.path.join(cluster_tables_path, "perVariant_countries_toPlot.json"),
        os.path.join(output_path, "countriesToPlot.json"),
    )

    name_table_data = {"nameTable": name_table}
    with open(os.path.join(output_path, "nameTable.json"), "w") as fh:
        json.dump(name_table_data, fh, indent=2, sort_keys=True)

    check_acknowledgements(ack_output_path)
