#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Converts cluster data to a format suitable for consumption by the web app
"""

import json
import os

from clusters import clusters
from colors_and_countries import country_styles

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
    for (country, country_data) in json_input.items():
        country_data_aos = soa_to_aos(country_data)
        country_data_aos_wrapped, cluster_names = wrap_cluster_data(country_data_aos)
        per_country_data_output["distributions"].append({'country': country, 'distribution': country_data_aos_wrapped})
        per_country_data_output["cluster_names"] = \
            sorted(list(set(cluster_names + per_country_data_output["cluster_names"])))

    return per_country_data_output


def convert_per_cluster_data(cluster_names):
    per_cluster_data_output = {"distributions": [], "country_names": []}
    for cluster_name in cluster_names:
        cluster_name_safe = cluster_name.replace(":", ".")

        distribution = []
        with open(os.path.join(cluster_tables_path, f"{cluster_name_safe}_data.json"), "r") as f:
            json_input = json.load(f)

            for (country, cluster_data) in json_input.items():
                per_cluster_data_output["country_names"] = \
                    sorted(list(set([country] + per_cluster_data_output["country_names"])))

                cluster_data_aos = soa_to_aos(cluster_data)

                for cluster_datum in cluster_data_aos:
                    week = cluster_datum['week']
                    cluster_sequences = cluster_datum['cluster_sequences']
                    total_sequences = cluster_datum['total_sequences']
                    frequency = cluster_sequences / total_sequences

                    if len(distribution) == 0:
                        distribution.append({'week': week, 'frequencies': {country: frequency}})
                    else:
                        has_this_week = False
                        for dist in distribution:
                            if week == dist['week']:
                                has_this_week = True

                        if not has_this_week:
                            distribution.append({'week': week, 'frequencies': {country: frequency}})
                        else:
                            for dist in distribution:
                                if week == dist['week']:
                                    assert country not in dist['frequencies'] \
                                           or frequency == dist['frequencies'][country]  # should not overwrite
                                    dist['frequencies'][country] = frequency

        per_cluster_data_output["distributions"].append(
            {'cluster': cluster_name, 'distribution': distribution})

    return per_cluster_data_output


if __name__ == '__main__':
    # NOTE: we exclude DanishCluster
    clusters.pop("DanishCluster", None)

    per_country_data_output = convert_per_country_data()

    os.makedirs(output_path, exist_ok=True)

    with open(os.path.join(output_path, "perCountryData.json"), "w") as fh:
        json.dump(per_country_data_output, fh, indent=2, sort_keys=True)

    per_cluster_data_output = convert_per_cluster_data(per_country_data_output['cluster_names'])

    with open(os.path.join(output_path, "perClusterData.json"), "w") as fh:
        json.dump(per_cluster_data_output, fh, indent=2, sort_keys=True)

    clusters = [v for _, v in clusters.items()]
    with open(os.path.join(output_path, "clusters.json"), "w") as fh:
        json.dump({'clusters': clusters}, fh, indent=2, sort_keys=True)

    with open(os.path.join(output_path, "countryStyles.json"), "w") as fh:
        json.dump(country_styles, fh, indent=2, sort_keys=True)
