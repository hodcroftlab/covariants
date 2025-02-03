import time

import pandas as pd

from scripts.cluster_analysis_refactored import read_metadata_file_first_run, read_and_clean_metadata_file_line_by_line, \
    split_clusters_into_categories, create_name_mappings, format_cluster_first_dates
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
    }
}

cluster_first_dates_raw = {
    "Alpha": {"first_date": "2020-09-20"}
}

first_date_exceptions = {
    "21AS478": ["India/MP-NCDC-2509230/2020"],  # Delta
}


def test_load_tsv_file():
    data = pd.read_csv(testfile_path, sep='\t')
    bla = data.columns == cols
    assert bla.all()


def test_read_metadata_first_run():
    clades, countries, n_lines = read_metadata_file_first_run(testfile_path, cols)
    assert clades == ['the_clade']
    assert countries == ['Argentina', 'Switzerland']
    assert n_lines == 6


def test_split_clusters_into_categories():
    clades, _, _ = read_metadata_file_first_run(testfile_path, cols)
    clus_to_run = list(clusters.keys())
    displayed_clusters, non_displayed_clusters = split_clusters_into_categories(clades, clus_to_run, clusters)
    assert displayed_clusters['snps']['official_clus'] == ['Alpha']


def test_read_and_clean_metadata():
    # user input
    division = True
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

    (no_qc, cluster_inconsistencies, all_sequences, alert_dates, acknowledgement_by_variant,
     total_counts_countries,
     total_counts_divisions,
     clus_data_all,
     division_data_all,
     rest_all) = read_and_clean_metadata_file_line_by_line(clusters,
                                                           testfile_path,
                                                           cols,
                                                           time.time(),
                                                           6,
                                                           division,
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
    assert no_qc == 1
    assert all_sequences == {'Alpha': ['20I', '20I', '20I']}
    assert alert_dates == {}
    assert acknowledgement_by_variant == {'acknowledgements': {'Alpha': ['epistel', 'epistel', 'epistel']}}
    assert clus_data_all == clusters
    assert total_counts_countries == {'Argentina': {(2025, 5): 2}, 'Switzerland': {(2025, 5): 1}}
    assert division_data_all['Switzerland']['Alpha']['cluster_counts']['Region 1'] == {(2025, 5): 1}
    assert total_counts_divisions == {'Switzerland': {'Region 1': {(2025, 5): 1}}, 'USA': {}}
    assert rest_all == []
