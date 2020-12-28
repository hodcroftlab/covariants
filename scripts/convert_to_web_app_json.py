#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Converts cluster data to a format suitable for consumption by the web app
"""

import json
import os

cluster_tables_path = "cluster_tables"

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


data_output = {"distributions": [], 'cluster_names': []}
for (country, country_data) in json_input.items():
    country_data_aos = soa_to_aos(country_data)
    country_data_aos_wrapped, cluster_names = wrap_cluster_data(country_data_aos)
    data_output["distributions"].append({'country': country, 'distribution': country_data_aos_wrapped})
    data_output["cluster_names"] = list(set(cluster_names + data_output["cluster_names"]))

with open(os.path.join(cluster_tables_path, "EUClusters_data.web.json"), "w") as fh:
    json.dump(data_output, fh, indent=2, sort_keys=True)
