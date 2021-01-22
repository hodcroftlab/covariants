#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Converts cluster data to a format suitable for consumption by the web app
"""

import json
import os
import re
from shutil import copyfile

import numpy as np
import pandas as pd

from clusters import clusters
from colors_and_countries import country_styles
from mutation_comparison import mutation_comparison

cluster_tables_path = "cluster_tables"
output_path = "web/data"

with open(os.path.join(cluster_tables_path, "EUClusters_data.json"), "r") as f:
    json_input = json.load(f)


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
        week = country_data['week']
        total_sequences = country_data['total_sequences']

        cluster_counts = country_data
        cluster_counts.pop('week')
        cluster_counts.pop('total_sequences')

        for cluster_name in cluster_counts:
            cluster_names.add(cluster_name)

        country_data_aos_wrapped.append(
            {'week': week, 'total_sequences': total_sequences, 'cluster_counts': cluster_counts})
    return country_data_aos_wrapped, list(cluster_names)


def convert_per_country_data():
    per_country_data_output = {"distributions": [], 'cluster_names': []}

    min_date = json_input["plotting_dates"]["min_date"]
    max_date = json_input["plotting_dates"]["max_date"]
    countries = json_input["countries"]

    for (country, country_data) in countries.items():
        country_data_aos = soa_to_aos(country_data)
        country_data_aos_wrapped, cluster_names = wrap_cluster_data(country_data_aos)
        per_country_data_output["distributions"].append({'country': country, 'distribution': country_data_aos_wrapped})
        per_country_data_output["cluster_names"] = \
            sorted(list(set(cluster_names + per_country_data_output["cluster_names"])))

    return per_country_data_output, min_date, max_date


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

    # Add rows for missing weeks. Fill values of the new rows wih NaN.
    old_index = df.index
    new_index = pd.date_range(old_index[0], old_index[-1], freq='7D').strftime('%Y-%m-%d')
    df_reindexed = df.reindex(new_index, fill_value=np.NaN)

    df_interp = df_reindexed.interpolate(method="linear")

    # Calculate indices to pick from the interpolation results.
    # We want a closed diff: only rows that are not in the original data, plus boundaries for every span of missing data
    index_interp = diff_left_closed(new_index.tolist(), old_index.tolist(), closed=True)

    index_interp_open = diff_left_closed(new_index.tolist(), old_index.tolist(), closed=False)

    df_result = df_interp
    df_result["interp"] = False
    df_result.loc[index_interp, "interp"] = True

    df_result["orig"] = True
    df_result.loc[index_interp_open, "orig"] = False

    # Make a "week" column from index
    df_result["week"] = df_result.index

    return df_result.replace({np.nan: None}).to_dict('list')


def update_per_cluster_distribution(cluster_data, country, distribution):
    cluster_data_aos = soa_to_aos(cluster_data)

    for cluster_datum in cluster_data_aos:
        week = cluster_datum['week']
        cluster_sequences = cluster_datum['cluster_sequences']
        total_sequences = cluster_datum['total_sequences']
        interp = cluster_datum['interp']
        orig = cluster_datum['orig']

        frequency = 0
        if total_sequences != 0:
            frequency = cluster_sequences / total_sequences

        if len(distribution) == 0:
            distribution.append({'week': week, 'frequencies': {country: frequency}, 'interp': {country: interp},
                                 'orig': {country: orig}})
        else:
            has_this_week = False
            for dist in distribution:
                if week == dist['week']:
                    has_this_week = True

            if not has_this_week:
                distribution.append({'week': week, 'frequencies': {country: frequency}, 'interp': {country: interp},
                                     'orig': {country: orig}})
            else:
                for dist in distribution:
                    if week == dist['week']:
                        dist['frequencies'][country] = frequency
                        dist['interp'][country] = interp
                        dist['orig'][country] = orig


def convert_per_cluster_data(clusters):
    per_cluster_data_output = {"distributions": [], "country_names": []}
    per_cluster_data_output_interp = {"distributions": [], "country_names": []}

    for _, cluster in clusters.items():
        display_name = cluster['display_name']
        build_name = cluster['build_name']

        distribution = []
        with open(os.path.join(cluster_tables_path, f"{build_name}_data.json"), "r") as f:
            json_input = json.load(f)

            for (country, cluster_data) in json_input.items():
                per_cluster_data_output["country_names"] = \
                    sorted(list(set([country] + per_cluster_data_output["country_names"])))
                cluster_data_interp = interpolate_per_cluster_data(cluster_data)
                update_per_cluster_distribution(cluster_data_interp, country, distribution)

        per_cluster_data_output["distributions"].append(
            {'cluster': display_name, 'distribution': distribution})

    return per_cluster_data_output, per_cluster_data_output_interp


# HACK: Copied from `allClusterDynamics.py:355`
# TODO: deduplicate
cluster_url_params = {
    "S:N501": "",  # don't have Europe filter
    "S:H69-": "c=gt-S_69,501,453",  # color by mutations, no Europe filter
    "S:Y453F": "c=gt-S_453&f_region=Europe"  # color by mutations, Europe filter
}


def get_build_url(cluster):
    build_name = cluster['build_name']
    display_name = cluster['display_name']

    url_params = "f_region=Europe"
    try:
        url_params = cluster_url_params[display_name]
    except KeyError:
        pass

    return f"https://nextstrain.org/groups/neherlab/ncov/{build_name}?{url_params}"


def add_cluster_properties(cluster):
    result = {}
    result.update(cluster)
    result.update({'build_url': get_build_url(cluster)})
    return result


def mutation_string_to_object(mutation):
    match = re.search('^(?P<gene>.*:)?(?P<left>[*.A-Z-]{0,1})(?P<pos>(\d)*)(?P<right>[*.A-Z-]{0,1})$', mutation)

    def none_if_empty(x):
        return None if len(x) == 0 else x

    gene = none_if_empty(match.group('gene')).replace(":", "")
    left = none_if_empty(match.group('left'))
    pos = int(match.group('pos'))
    right = none_if_empty(match.group('right'))

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
    all_mutations_pos = [mut["pos"] for mut in all_mutations_obj]

    # print(all_mutations_pos)

    # Matrix [ variants x mutation_positions ],
    # containing mutation string if there is a mutation at a given position in a given variant, and NaN otherwise
    mutation_presence = pd.DataFrame(None, index=all_mutations_pos, columns=all_variants)
    for variant, variant_data in mutation_comparison.items():
        for mut in variant_data["nonsynonymous"]:
            mut_obj = mutation_string_to_object(mut)
            pos = mut_obj["pos"]
            mutation_presence.loc[pos][variant] = mut

    mutation_presence = mutation_presence.sort_index(ascending=True)

    def by_presence(mutations):
        # for each of all mutation positions, how many variants have a mutation there (non-NaN value)
        return [mutation_presence.loc[mut].count() for mut in mutations]

    # Sort rows (mutations) by number of occurrences in variants, from most common, to least common
    mutation_presence = mutation_presence.sort_index(key=by_presence, ascending=False)

    # Split mutations into shared (occurring in more than one variant) and individual
    mask = mutation_presence.count(axis=1) > 1
    shared = mutation_presence[mask]
    individual = mutation_presence[~mask]

    # Convert shared mutations into a format convenient for web app
    shared = [
        {"pos": pos, "presence": pres.replace({np.nan: None}).tolist()}
        for pos, pres in shared.iterrows()
    ]

    # Convert individual mutations into a format convenient for web app
    individual = individual.sort_index(ascending=True)
    individual = {k: v.dropna().tolist() for k, v in individual.T.iterrows()}
    individual = pd.DataFrame.from_dict(individual, orient='index').T
    individual = [{"index": k, "mutations": v.tolist()} for k, v in individual.iterrows()]

    return {
        "variants": all_variants,
        "mutations": all_mutations,
        "shared": shared,
        "individual": individual
    }


if __name__ == '__main__':
    # NOTE: we exclude DanishCluster
    clusters.pop("DanishCluster", None)

    os.makedirs(output_path, exist_ok=True)

    per_country_data_output, min_date, max_date = convert_per_country_data()
    with open(os.path.join(output_path, "perCountryData.json"), "w") as fh:
        json.dump(per_country_data_output, fh, indent=2, sort_keys=True)

    params = {
        "min_date": min_date,
        "max_date": max_date,
    }
    with open(os.path.join(output_path, "params.json"), "w") as fh:
        json.dump(params, fh, indent=2, sort_keys=True)

    per_cluster_data_output, per_cluster_data_output_interp = convert_per_cluster_data(clusters)
    with open(os.path.join(output_path, "perClusterData.json"), "w") as fh:
        json.dump(per_cluster_data_output, fh, indent=2, sort_keys=True)

    clusters = [add_cluster_properties(cluster) for _, cluster in clusters.items()]
    with open(os.path.join(output_path, "clusters.json"), "w") as fh:
        json.dump({'clusters': clusters}, fh, indent=2, sort_keys=True)

    mutation_comparison_output = convert_mutation_comparison(mutation_comparison)
    with open(os.path.join(output_path, "mutationComparison.json"), "w") as fh:
        json.dump(mutation_comparison_output, fh, indent=2, sort_keys=True)

    with open(os.path.join(output_path, "countryStyles.json"), "w") as fh:
        json.dump(country_styles, fh, indent=2, sort_keys=True)

    copyfile(os.path.join(cluster_tables_path, 'perVariant_countries_toPlot.json'),
             os.path.join(output_path, "countriesToPlot.json"))
