from datetime import datetime

import numpy as np
import pandas as pd
from typing import cast

from scripts.cluster_analysis_refactored import read_metadata_file_first_run, read_and_clean_metadata_file_line_by_line, \
    split_clusters_into_categories, create_name_mappings, format_cluster_first_dates, compile_meta_clusters, \
    check_for_meta_clusters, remove_unused_countries, collect_countries_to_plot, pass_helper_functions_over_data
from scripts.swiss_regions import swiss_regions

cols = ['strain', 'date', 'division', 'host', 'substitutions', 'deletions', 'Nextstrain_clade', 'country',
        'gisaid_epi_isl', 'coverage', 'QC_overall_status', 'Nextclade_pango']

testfile_path = 'data/example_metadata.tsv'

clusters = {
    "Alpha": {
        "snps": [23063, 23604, 24914],  # 23063T, 23604A, 24914C
        "snps_with_base": ["23063T", "23604A", "24914C"],
        "cluster_data": [],  # 501, 681, 1118
        "nextstrain_build": False,
        "graphing": True,
        "type": "variant",
        "important": False,
        "country_info": [],
        "col": "#D16666",
        "display_name": "20I (Alpha, V1)",
        "alt_display_name": ["S.501Y.V1"],
        "build_name": "20I.Alpha.V1",
        "old_build_names": ["S.501Y.V1"],
        "who_name": ["Alpha"],
        "nextstrain_name": "20I",
        "pango_lineages": [
            {"name": "B.1.1.7", "url": None}
        ],
        "alternative_names": ["VOC 202012/01"],
        "nextstrain_url": "https://nextstrain.org/groups/neherlab/ncov/20I.Alpha.V1",  # color, no europe filter
        "mutations": {
            "nonsynonymous": [
                {"gene": "S", "left": "H", "pos": 69, "right": "-"},
                {"gene": "S", "left": "V", "pos": 70, "right": "-"},
                {"gene": "S", "left": "Y", "pos": 144, "right": "-"},
                {"gene": "S", "left": "N", "pos": 501, "right": "Y"},
                {"gene": "S", "left": "A", "pos": 570, "right": "D"},
                {'gene': 'S', 'left': 'D', 'pos': 614, 'right': 'G'},
                {"gene": "S", "left": "P", "pos": 681, "right": "H"},
                {'gene': 'S', 'left': 'T', 'pos': 716, 'right': 'I'},
                {'gene': 'S', 'left': 'S', 'pos': 982, 'right': 'A'},
                {'gene': 'S', 'left': 'D', 'pos': 1118, 'right': 'H'},
                {'gene': 'ORF1a', 'left': 'T', 'pos': 1001, 'right': 'I'},
                {'gene': 'ORF1a', 'left': 'A', 'pos': 1708, 'right': 'D'},
                {'gene': 'ORF1a', 'left': 'I', 'pos': 2230, 'right': 'T'},
                {"gene": "ORF1a", "left": "S", "pos": 3675, "right": "-"},
                {"gene": "ORF1a", "left": "G", "pos": 3676, "right": "-"},
                {"gene": "ORF1a", "left": "F", "pos": 3677, "right": "-"},
                {'gene': 'N', 'left': 'D', 'pos': 3, 'right': 'L'},
                {"gene": "N", "left": "R", "pos": 203, "right": "K"},
                {"gene": "N", "left": "G", "pos": 204, "right": "R"},
                {'gene': 'N', 'left': 'S', 'pos': 235, 'right': 'F'},
                {'gene': 'ORF1b', 'left': 'P', 'pos': 314, 'right': 'L'},
                {"gene": "ORF8", "left": "Q", "pos": 27, "right": "*"},
                {'gene': 'ORF8', 'left': 'R', 'pos': 52, 'right': 'I'},
                {'gene': 'ORF8', 'left': 'Y', 'pos': 73, 'right': 'C'}
            ],
            "synonymous": [
                {"left": "C", "pos": 241, "right": "T"},
                {"left": "C", "pos": 913, "right": "T"},
                {"left": "C", "pos": 3037, "right": "T"},
                {"left": "C", "pos": 5986, "right": "T"},
                {"left": "C", "pos": 14676, "right": "T"},
                {"left": "C", "pos": 15279, "right": "T"},
                {"left": "T", "pos": 16176, "right": "C"},
            ],
        },
    },

    "21K.Omicron": {  # S.T572I - 23277T
        "snps": [25000, 25584, 8393],  # 25000T,25584T,8393A
        "snps_with_base": ["25000T", "25584T", "8393A"],
        "cluster_data": [],
        "nextstrain_build": False,
        "graphing": True,
        "type": "variant",
        "important": False,
        "country_info": [],
        "col": "#A366A3",
        "display_name": "21K (Omicron)",
        "build_name": "21K.Omicron",
        "who_name": ["Omicron"],
        "old_build_names": ["21K"],
        "alt_display_name": ["BA.1"],
        "nextstrain_name": "21K",
        "pango_lineages": [
            {"name": "BA.1", "url": "https://cov-lineages.org/lineages/lineage_BA.1.html"},
        ],
        "nextstrain_url": "https://nextstrain.org/groups/neherlab/ncov/21K.Omicron",
        "mutations": {
            "nonsynonymous": [
                {"gene": "S", "left": "A", "pos": 67, "right": "V"},
                {"gene": "S", "left": "H", "pos": 69, "right": "-"},
                {"gene": "S", "left": "V", "pos": 70, "right": "-"},
                {"gene": "S", "left": "T", "pos": 95, "right": "I"},
                {"gene": "S", "left": "G", "pos": 142, "right": "-"},
                {"gene": "S", "left": "V", "pos": 143, "right": "-"},
                {"gene": "S", "left": "Y", "pos": 144, "right": "-"},
                {"gene": "S", "left": "Y", "pos": 145, "right": "D"},
                {"gene": "S", "left": "N", "pos": 211, "right": "-"},
                {"gene": "S", "left": "L", "pos": 212, "right": "I"},
                {"gene": "S", "left": "G", "pos": 339, "right": "D"},
                {"gene": "S", "left": "S", "pos": 371, "right": "L"},
                {"gene": "S", "left": "S", "pos": 373, "right": "P"},
                {"gene": "S", "left": "S", "pos": 375, "right": "F"},
                {"gene": "S", "left": "K", "pos": 417, "right": "N"},
                {"gene": "S", "left": "N", "pos": 440, "right": "K"},
                {"gene": "S", "left": "G", "pos": 446, "right": "S"},
                {"gene": "S", "left": "S", "pos": 477, "right": "N"},
                {"gene": "S", "left": "T", "pos": 478, "right": "K"},
                {"gene": "S", "left": "E", "pos": 484, "right": "A"},
                {"gene": "S", "left": "Q", "pos": 493, "right": "R"},
                {"gene": "S", "left": "G", "pos": 496, "right": "S"},
                {"gene": "S", "left": "Q", "pos": 498, "right": "R"},
                {"gene": "S", "left": "N", "pos": 501, "right": "Y"},
                {"gene": "S", "left": "Y", "pos": 505, "right": "H"},
                {"gene": "S", "left": "T", "pos": 547, "right": "K"},
                {"gene": "S", "left": "D", "pos": 614, "right": "G"},
                {"gene": "S", "left": "H", "pos": 655, "right": "Y"},
                {"gene": "S", "left": "N", "pos": 679, "right": "K"},
                {"gene": "S", "left": "P", "pos": 681, "right": "H"},
                {"gene": "S", "left": "N", "pos": 764, "right": "K"},
                {"gene": "S", "left": "D", "pos": 796, "right": "Y"},
                {"gene": "S", "left": "N", "pos": 856, "right": "K"},
                {"gene": "S", "left": "Q", "pos": 954, "right": "H"},
                {"gene": "S", "left": "N", "pos": 969, "right": "K"},
                {"gene": "S", "left": "L", "pos": 981, "right": "F"},
                {"gene": "N", "left": "P", "pos": 13, "right": "L"},
                {"gene": "N", "left": "E", "pos": 31, "right": "-"},
                {"gene": "N", "left": "R", "pos": 32, "right": "-"},
                {"gene": "N", "left": "S", "pos": 33, "right": "-"},
                {"gene": "N", "left": "R", "pos": 203, "right": "K"},
                {"gene": "N", "left": "G", "pos": 204, "right": "R"},
                {"gene": "ORF1a", "left": "K", "pos": 856, "right": "R"},
                {"gene": "ORF1a", "left": "S", "pos": 2083, "right": "-"},
                {"gene": "ORF1a", "left": "L", "pos": 2084, "right": "I"},
                {"gene": "ORF1a", "left": "A", "pos": 2710, "right": "T"},
                {"gene": "ORF1a", "left": "T", "pos": 3255, "right": "I"},
                {"gene": "ORF1a", "left": "P", "pos": 3395, "right": "H"},
                {"gene": "ORF1a", "left": "L", "pos": 3674, "right": "-"},
                {"gene": "ORF1a", "left": "S", "pos": 3675, "right": "-"},
                {"gene": "ORF1a", "left": "G", "pos": 3676, "right": "-"},
                {"gene": "ORF1a", "left": "I", "pos": 3758, "right": "V"},
                {"gene": "ORF1b", "left": "P", "pos": 314, "right": "L"},
                {"gene": "ORF1b", "left": "I", "pos": 1566, "right": "V"},
                {"gene": "ORF9b", "left": "P", "pos": 10, "right": "S"},
                {"gene": "ORF9b", "left": "E", "pos": 27, "right": "-"},
                {"gene": "ORF9b", "left": "N", "pos": 28, "right": "-"},
                {"gene": "ORF9b", "left": "A", "pos": 29, "right": "-"},
                {"gene": "E", "left": "T", "pos": 9, "right": "I"},
                {"gene": "M", "left": "D", "pos": 3, "right": "G"},
                {"gene": "M", "left": "Q", "pos": 19, "right": "E"},
                {"gene": "M", "left": "A", "pos": 63, "right": "T"},
            ],
            "synonymous": [
                {"left": "C", "pos": 241, "right": "T"},
                {"left": "C", "pos": 3037, "right": "T"},
                {"left": "T", "pos": 5386, "right": "G"},
                {"left": "T", "pos": 13195, "right": "C"},
                {"left": "C", "pos": 15240, "right": "T"},
                {"left": "C", "pos": 25000, "right": "T"},
                {"left": "C", "pos": 25584, "right": "T"},
                {"left": "A", "pos": 27259, "right": "C"},
                {"left": "C", "pos": 27807, "right": "T"},
                {"left": "A", "pos": 28271, "right": "T"},
            ],
        },
    },

    "Omicron": {
        "meta_cluster": True,
        "snps": [22679, 23040, 23604],  # 22679C, 23040G, 23604A
        "snps_with_base": ["22679C", "23040G", "23604A"],
        "cluster_data": [],
        "nextstrain_build": True,
        "graphing": False,
        "important": False,
        "other_nextstrain_names": ["21K (Omicron)", "21L (Omicron)", "21M (Omicron)", "22A (Omicron)", "22B (Omicron)",
                                   "22C (Omicron)", "22D (Omicron)", "22E (Omicron)", "22F (Omicron)", "23A (Omicron)",
                                   "23B (Omicron)", "23C (Omicron)", "23D (Omicron)", "23E (Omicron)", "23F (Omicron)"],
        "country_info": [], 'col': "#b3d9ff",
        "display_name": "Omicron",
        "has_no_page": True,
        "build_name": "Omicron",
        "nextstrain_url": "https://nextstrain.org/groups/neherlab/ncov/Omicron"
    },
}

cluster_first_dates_raw = {
    "Alpha": {"first_date": "2020-09-20"}
}

first_date_exceptions = {
    "21AS478": ["India/MP-NCDC-2509230/2020"],  # Delta
}


def test_load_tsv_file():
    data = pd.read_csv(testfile_path, sep='\t')
    bla = cast(np.ndarray, data.columns == cols)
    assert bla.all()


def test_read_metadata_first_run():
    clades, countries, n_lines = read_metadata_file_first_run(testfile_path, cols)
    assert clades == ['20I (Alpha, V1)']
    assert countries == ['Argentina', 'Switzerland']
    assert n_lines == 8


def test_split_clusters_into_categories():
    clades, _, _ = read_metadata_file_first_run(testfile_path, cols)
    clus_to_run = ['Alpha']
    displayed_clusters, non_displayed_clusters = split_clusters_into_categories(clades, clus_to_run, clusters)
    assert displayed_clusters['snps']['official_clus'] == ['Alpha']


def test_read_and_clean_metadata():
    # user input
    selected_country = ["USA", "Switzerland"]
    clus_to_run = ['Alpha']
    clus_check = True
    print_acks = True

    # data input
    display_name_to_clus, pango_lineage_to_clus = create_name_mappings(clus_to_run, clusters)
    bad_seqs = {"Spain/VC-IBV-98006466/2020": "2020-03-07"}
    cluster_first_dates = format_cluster_first_dates(cluster_first_dates_raw)

    # organize from clusters file
    clades, all_countries, _ = read_metadata_file_first_run(testfile_path, cols)

    dated_limit_formatted = ''
    dated_cluster_strains = []

    (cluster_inconsistencies, all_sequences, alert_dates, acknowledgement_by_variant,
     total_counts_countries,
     total_counts_divisions,
     clus_data_all,
     division_data_all,
     rest_all) = read_and_clean_metadata_file_line_by_line(clusters,
                                                           testfile_path,
                                                           cols,
                                                           6,
                                                           selected_country,
                                                           clades,
                                                           display_name_to_clus,
                                                           pango_lineage_to_clus,
                                                           clus_check,
                                                           dated_limit_formatted,
                                                           dated_cluster_strains,
                                                           print_acks,
                                                           clus_to_run,
                                                           bad_seqs,
                                                           swiss_regions,
                                                           cluster_first_dates,
                                                           first_date_exceptions,
                                                           all_countries
                                                           )
    assert all_sequences == {'21K.Omicron': [], 'Alpha': ['20I', '20I', '20I'], 'Omicron': []}
    assert alert_dates == {}
    assert acknowledgement_by_variant == {'acknowledgements': {'Alpha': ['epistel', 'epistel', 'epistel']}}
    assert clus_data_all == {'Alpha': clusters['Alpha']}
    assert total_counts_countries == {'Argentina': {(2025, 5): 2}, 'Switzerland': {(2025, 5): 1}}
    assert division_data_all['Switzerland']['Alpha']['cluster_counts']['Region 1'] == {(2025, 5): 1}
    assert total_counts_divisions == {'Switzerland': {'Region 1': {(2025, 5): 1}}, 'USA': {}}
    assert rest_all == []


def test_check_for_meta_clusters():
    clus_to_run = ['Alpha', 'Omicron']
    meta_clusters, clus_to_run = check_for_meta_clusters(clus_to_run, clusters)
    assert meta_clusters == ['Omicron']
    assert clus_to_run == ['Alpha', 'Omicron', '21K.Omicron']


def test_compile_meta_clusters():
    # User input
    clus_to_run = ['Alpha', 'Omicron']
    selected_country = ['USA', 'Switzerland']
    clus_check = True
    print_acks = True

    # data input
    bad_seqs = {"Spain/VC-IBV-98006466/2020": "2020-03-07"}
    cluster_first_dates = format_cluster_first_dates(cluster_first_dates_raw)

    # organize from clusters file
    clades, all_countries, _ = read_metadata_file_first_run(testfile_path, cols)

    dated_limit_formatted = ''
    dated_cluster_strains = []

    meta_clusters, clus_to_run = check_for_meta_clusters(clus_to_run, clusters)
    display_name_to_clus, pango_lineage_to_clus = create_name_mappings(clus_to_run, clusters)

    (cluster_inconsistencies, all_sequences, alert_dates, acknowledgement_by_variant,
     total_counts_countries,
     total_counts_divisions,
     clus_data_all,
     division_data_all,
     rest_all) = read_and_clean_metadata_file_line_by_line(clusters,
                                                           testfile_path,
                                                           cols,
                                                           6,
                                                           selected_country,
                                                           clades,
                                                           display_name_to_clus,
                                                           pango_lineage_to_clus,
                                                           clus_check,
                                                           dated_limit_formatted,
                                                           dated_cluster_strains,
                                                           print_acks,
                                                           clus_to_run,
                                                           bad_seqs,
                                                           swiss_regions,
                                                           cluster_first_dates,
                                                           first_date_exceptions,
                                                           all_countries
                                                           )

    # intermediate data
    all_sequences, clus_data_all, acknowledgement_by_variant = compile_meta_clusters(acknowledgement_by_variant,
                                                                                     all_sequences, clus_data_all,
                                                                                     clusters, display_name_to_clus,
                                                                                     meta_clusters, print_acks)
    assert all_sequences == {'21K.Omicron': [], 'Alpha': ['20I', '20I', '20I'], 'Omicron': []}
    assert clus_data_all == clusters
    assert acknowledgement_by_variant == {'acknowledgements': {'21K.Omicron': [],
                                                               'Alpha': ['epistel', 'epistel', 'epistel'],
                                                               'Omicron': []}}


def test_remove_unused_countries():
    clus_to_run = ['Alpha', '21K.Omicron']
    clus_data_all = {'Alpha': clusters['Alpha'] | {'cluster_counts': {'Argentina': {'2025-01-31': 3}}},
                     '21K.Omicron': clusters['21K.Omicron'] | {'cluster_counts': {'Argentina': {}}},
                     }
    assert len(clus_data_all['21K.Omicron']['cluster_counts']) == 1
    assert len(clus_data_all['Alpha']['cluster_counts']) == 1
    clus_data_all = remove_unused_countries(clus_data_all, clus_to_run)
    assert len(clus_data_all['21K.Omicron']['cluster_counts']) == 0


def test_collect_countries_to_plot():
    clus_data_all = {'Alpha': clusters['Alpha'] | {
        'summary': {'Argentina': {'num_seqs': 3, 'first_seq': (2025, 5), 'last_seq': (2025, 5)}}}}
    countries_to_plot = collect_countries_to_plot(clus_data_all, 1)
    assert countries_to_plot == ['Argentina']


def test_pass_helper_functions_over_data():
    selected_country = ['USA', 'Switzerland']
    all_countries = ['Argentina', 'Switzerland']
    clus_to_run = ['Alpha']
    clus_data_all = {'Alpha': clusters['Alpha'] | {
        'summary': {'Argentina': {'num_seqs': 3, 'first_seq': (2025, 5), 'last_seq': (2025, 5)}}}
                              | {'cluster_counts': {'Argentina': {(2025, 5): 3}}}}
    division_data_all = {'Switzerland': {'Alpha': {'cluster_counts': {'Region 1': {(2025, 5): 1}}, 'summary': {
        'Region 1': {'first_seq': datetime(2025, 1, 31, 0, 0), 'last_seq': datetime(2025, 1, 31, 0, 0),
                     'num_seqs': 1}}}}, 'USA': {'Alpha': {'cluster_counts': {}, 'summary': {}}}}
    total_counts_countries = {'Argentina': {(2025, 5): 2}, 'Switzerland': {(2025, 5): 1}}
    total_counts_divisions = {'Switzerland': {'Region 1': {(2025, 5): 1}}, 'USA': {}}
    clus_data_all, division_data_all = pass_helper_functions_over_data(all_countries, clus_data_all, clus_to_run,
                                                                       division_data_all, selected_country,
                                                                       total_counts_countries, total_counts_divisions)
    assert clus_data_all['Alpha']['non_zero_counts'] == {}
    assert division_data_all['Switzerland']['Alpha']['non_zero_counts'] == {}
    assert division_data_all['USA']['Alpha']['non_zero_counts'] == {}
