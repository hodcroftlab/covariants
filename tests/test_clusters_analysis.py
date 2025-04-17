import os
from datetime import datetime

import pytest
import polars as pl

from scripts.cluster_analysis import main, initial_metadata_pass, clean_metadata, prepare_data_structure, \
    split_into_cluster_categories
from scripts.clusters import clusters
from tests.data.cluster_analysis.fake_clusters import fake_clusters

NEXTSTRAIN_CLADES = [
    ' (Omicron)',
    '19A',
    '19B',
    '20A',
    '20B',
    '20C',
    '20D',
    '20E (EU1)',
    '20F',
    '20G',
    '20H (Beta, V2)',
    '20I (Alpha, V1)',
    '20J (Gamma, V3)',
    '21A (Delta)',
    '21B (Kappa)',
    '21C (Epsilon)',
    '21D (Eta)',
    '21E (Theta)',
    '21F (Iota)',
    '21G (Lambda)',
    '21H (Mu)',
    '21I (Delta)',
    '21J (Delta)',
    '21K (Omicron)',
    '21L (Omicron)',
    '21M (Omicron)',
    '22A (Omicron)',
    '22B (Omicron)',
    '22C (Omicron)',
    '22D (Omicron)',
    '22E (Omicron)',
    '22F (Omicron)',
    '23A (Omicron)',
    '23B (Omicron)',
    '23C (Omicron)',
    '23D (Omicron)',
    '23E (Omicron)',
    '23F (Omicron)',
    '23G (Omicron)',
    '23H (Omicron)',
    '23I (Omicron)',
    '24A (Omicron)',
    '24B (Omicron)',
    '24C (Omicron)',
    '24D (Omicron)',
    '24E (Omicron)',
    '24F (Omicron)',
    '24G (Omicron)',
    '24H (Omicron)',
    '24I (Omicron)',
    '25A (Omicron)',
    'recombinant',
]
NEXTSTRAIN_CLADES_DISPLAY_NAMES = ['20E (EU1)',
                                   '20H (Beta, V2)',
                                   '20I (Alpha, V1)',
                                   '20J (Gamma, V3)',
                                   '21A (Delta)',
                                   '21B (Kappa)',
                                   '21C (Epsilon)',
                                   '21D (Eta)',
                                   '21F (Iota)',
                                   '21G (Lambda)',
                                   '21H (Mu)',
                                   '21I (Delta)',
                                   '21J (Delta)',
                                   '21K (Omicron)',
                                   '21L (Omicron)',
                                   '21M (Omicron)',
                                   '22A (Omicron)',
                                   '22B (Omicron)',
                                   '22C (Omicron)',
                                   '22D (Omicron)',
                                   '22E (Omicron)',
                                   '22F (Omicron)',
                                   '23A (Omicron)',
                                   '23B (Omicron)',
                                   '23C (Omicron)',
                                   '23D (Omicron)',
                                   '23E (Omicron)',
                                   '23F (Omicron)',
                                   '23G (Omicron)',
                                   '23H (Omicron)',
                                   '23I (Omicron)',
                                   '24A (Omicron)',
                                   '24B (Omicron)',
                                   '24C (Omicron)',
                                   '24D (Omicron)',
                                   '24E (Omicron)',
                                   '24F (Omicron)',
                                   '24G (Omicron)',
                                   '24H (Omicron)',
                                   '24I (Omicron)',
                                   '25A (Omicron)',
                                   'recombinant']
ALL_COUNTRIES = ['Afghanistan',
                 'Albania',
                 'Algeria',
                 'Andorra',
                 'Angola',
                 'Antigua and Barbuda',
                 'Argentina',
                 'Armenia',
                 'Aruba',
                 'Australia',
                 'Austria',
                 'Azerbaijan',
                 'Bahamas',
                 'Bahrain',
                 'Bangladesh',
                 'Barbados',
                 'Belarus',
                 'Belgium',
                 'Belize',
                 'Benin',
                 'Bermuda',
                 'Bhutan',
                 'Bolivia',
                 'Bonaire',
                 'Bosnia and Herzegovina',
                 'Botswana',
                 'Brazil',
                 'Brunei',
                 'Bulgaria',
                 'Burkina Faso',
                 'Burundi',
                 'Cabo Verde',
                 'Cambodia',
                 'Cameroon',
                 'Canada',
                 'Central African Republic',
                 'Chad',
                 'Chile',
                 'China',
                 'Colombia',
                 'Cook Islands',
                 'Costa Rica',
                 'Croatia',
                 'Cuba',
                 'Curacao',
                 'Cyprus',
                 'Czech Republic',
                 "Côte d'Ivoire",
                 'Democratic Republic of the Congo',
                 'Denmark',
                 'Djibouti',
                 'Dominica',
                 'Dominican Republic',
                 'Ecuador',
                 'Egypt',
                 'El Salvador',
                 'Equatorial Guinea',
                 'Estonia',
                 'Eswatini',
                 'Ethiopia',
                 'Fiji',
                 'Finland',
                 'France',
                 'French Guiana',
                 'French Polynesia',
                 'Gabon',
                 'Gambia',
                 'Georgia',
                 'Germany',
                 'Ghana',
                 'Gibraltar',
                 'Greece',
                 'Grenada',
                 'Guadeloupe',
                 'Guatemala',
                 'Guinea',
                 'Guinea-Bissau',
                 'Guyana',
                 'Haiti',
                 'Honduras',
                 'Hong Kong',
                 'Hungary',
                 'Iceland',
                 'India',
                 'Indonesia',
                 'Iran',
                 'Iraq',
                 'Ireland',
                 'Israel',
                 'Italy',
                 'Jamaica',
                 'Japan',
                 'Jersey',
                 'Jordan',
                 'Kazakhstan',
                 'Kenya',
                 'Kiribati',
                 'Kosovo',
                 'Kuwait',
                 'Kyrgyzstan',
                 'Laos',
                 'Latvia',
                 'Lebanon',
                 'Lesotho',
                 'Liberia',
                 'Libya',
                 'Liechtenstein',
                 'Lithuania',
                 'Luxembourg',
                 'Madagascar',
                 'Malawi',
                 'Malaysia',
                 'Maldives',
                 'Mali',
                 'Malta',
                 'Marshall Islands',
                 'Mauritania',
                 'Mauritius',
                 'Mexico',
                 'Micronesia',
                 'Moldova',
                 'Monaco',
                 'Mongolia',
                 'Montenegro',
                 'Morocco',
                 'Mozambique',
                 'Myanmar',
                 'Namibia',
                 'Nepal',
                 'Netherlands',
                 'New Caledonia',
                 'New Zealand',
                 'Nicaragua',
                 'Niger',
                 'Nigeria',
                 'Niue',
                 'North Macedonia',
                 'Northern Mariana Islands',
                 'Norway',
                 'Oman',
                 'Pakistan',
                 'Palau',
                 'Palestine',
                 'Panama',
                 'Papua New Guinea',
                 'Paraguay',
                 'Peru',
                 'Philippines',
                 'Poland',
                 'Portugal',
                 'Puerto Rico',
                 'Qatar',
                 'Republic of the Congo',
                 'Romania',
                 'Russia',
                 'Rwanda',
                 'Saint Barthélemy',
                 'Saint Kitts and Nevis',
                 'Saint Lucia',
                 'Saint Martin',
                 'Saint Vincent and the Grenadines',
                 'Samoa',
                 'Sao Tome and Principe',
                 'Saudi Arabia',
                 'Senegal',
                 'Serbia',
                 'Seychelles',
                 'Sierra Leone',
                 'Singapore',
                 'Sint Maarten',
                 'Slovakia',
                 'Slovenia',
                 'Solomon Islands',
                 'Somalia',
                 'South Africa',
                 'South Korea',
                 'South Sudan',
                 'Spain',
                 'Sri Lanka',
                 'Sudan',
                 'Suriname',
                 'Sweden',
                 'Switzerland',
                 'Syria',
                 'Taiwan',
                 'Tanzania',
                 'Thailand',
                 'Timor-Leste',
                 'Togo',
                 'Tonga',
                 'Trinidad and Tobago',
                 'Tunisia',
                 'Turkey',
                 'USA',
                 'Uganda',
                 'Ukraine',
                 'Union of the Comoros',
                 'United Arab Emirates',
                 'United Kingdom',
                 'Uruguay',
                 'Uzbekistan',
                 'Vanuatu',
                 'Venezuela',
                 'Vietnam',
                 'Zambia',
                 'Zimbabwe']
N_TOTAL = 16860043

DATA_DIR = 'tests/data/cluster_analysis'

def test_main():
    user_input = ('all', True, list(fake_clusters.keys()), True, True, True, False, False, ["USA", "Switzerland"])
    main(*user_input, input_meta=os.path.join(DATA_DIR, 'metadata.csv'), clusters=fake_clusters)


@pytest.mark.parametrize("mode,zip_extension",
                         [('slow', ''),
                          ('slow', '.gz'),
                          ('fast', ''),
                          ('fast', '.gz')])
def test_initial_metadata(mode, zip_extension):
    input_meta = os.path.join(DATA_DIR, f"metadata.csv{zip_extension}")
    clus_to_run = fake_clusters.keys()
    cols = ['strain', 'date', 'division', 'host', 'substitutions', 'deletions', 'Nextstrain_clade', 'country',
            'gisaid_epi_isl', 'coverage', 'QC_overall_status', 'Nextclade_pango']
    display_name_to_clus = {cluster["display_name"]: key for key, cluster in fake_clusters.items()}
    nextstrain_clades, nextstrain_clades_display_names, all_countries, n_total = initial_metadata_pass(clus_to_run,
                                                                                                       cols,
                                                                                                       display_name_to_clus,
                                                                                                       input_meta,
                                                                                                       mode=mode)
    assert nextstrain_clades == ['20A', '21L (Omicron)', '24A (Omicron)', '24A* (Omicron)']
    assert nextstrain_clades_display_names == ['21L (Omicron)', '24A (Omicron)']
    assert all_countries == ['Afghanistan', 'Australia', 'Cambodia', 'Japan', 'Switzerland']
    assert n_total == 22


def test_initial_metadata_zipped_full_slow():
    input_meta = "../../metadata.tsv.gz"
    clus_to_run = clusters.keys()
    cols = ['strain', 'date', 'division', 'host', 'substitutions', 'deletions', 'Nextstrain_clade', 'country',
            'gisaid_epi_isl', 'coverage', 'QC_overall_status', 'Nextclade_pango']
    display_name_to_clus = {cluster["display_name"]: key for key, cluster in clusters.items()}
    nextstrain_clades, nextstrain_clades_display_names, all_countries, n_total = initial_metadata_pass(clus_to_run,
                                                                                                       cols,
                                                                                                       display_name_to_clus,
                                                                                                       input_meta,
                                                                                                       mode='slow')
    assert nextstrain_clades == NEXTSTRAIN_CLADES
    assert nextstrain_clades_display_names == NEXTSTRAIN_CLADES_DISPLAY_NAMES
    assert all_countries == ALL_COUNTRIES
    assert n_total == N_TOTAL


def test_initial_metadata_zipped_full_fast():
    input_meta = "../../metadata.tsv.gz"
    clus_to_run = clusters.keys()
    cols = ['strain', 'date', 'division', 'host', 'substitutions', 'deletions', 'Nextstrain_clade', 'country',
            'gisaid_epi_isl', 'coverage', 'QC_overall_status', 'Nextclade_pango']
    display_name_to_clus = {cluster["display_name"]: key for key, cluster in clusters.items()}
    nextstrain_clades, nextstrain_clades_display_names, all_countries, n_total = initial_metadata_pass(clus_to_run,
                                                                                                       cols,
                                                                                                       display_name_to_clus,
                                                                                                       input_meta,
                                                                                                       mode='fast')
    assert nextstrain_clades == NEXTSTRAIN_CLADES
    assert nextstrain_clades_display_names == NEXTSTRAIN_CLADES_DISPLAY_NAMES
    assert all_countries == ALL_COUNTRIES
    assert n_total == N_TOTAL


@pytest.mark.parametrize("clus_check",
                         [
                         True,
                          False
                          ])
def test_clean_metadata(clus_check):
    # User input
    clus_to_run = fake_clusters.keys()
    division = True
    print_acks = False
    # global variables
    display_name_to_clus = {fake_clusters[clus]["display_name"]: clus for clus in clus_to_run if
                            "display_name" in fake_clusters[clus]}
    cols = ['strain', 'date', 'division', 'host', 'substitutions', 'deletions', 'Nextstrain_clade', 'country',
            'gisaid_epi_isl', 'coverage', 'QC_overall_status', 'Nextclade_pango']
    input_meta='data/cluster_analysis/metadata.csv'
    nextstrain_clades, nextstrain_clades_display_names, all_countries, n_total = initial_metadata_pass(clus_to_run,
                                                                                                       cols,
                                                                                                       display_name_to_clus,
                                                                                                       input_meta,
                                                                                                       mode='fast')

    earliest_date = datetime.strptime("2019-01-01", '%Y-%m-%d')
    selected_country = ["USA", "Switzerland"]
    today = datetime.today()
    alert_dates = {}
    dated_cluster_strains = []
    dated_limit = ""
    dated_limit_formatted = None
    min_data_week = (2020, 18)
    new_clades_to_rename = {'24A* (Omicron)': '24A (Omicron)'}
    pango_lineage_to_clus = {p["name"]: clus for clus in clus_to_run if "pango_lineages" in fake_clusters[clus] for p in
                             fake_clusters[clus]["pango_lineages"]}

    clus_to_run_breakdown, daughter_clades, rest_all = split_into_cluster_categories(nextstrain_clades, clus_to_run, fake_clusters)

    acknowledgement_by_variant, acknowledgement_keys, clus_data_all, division_data_all, total_counts_countries, total_counts_divisions = prepare_data_structure(
        all_countries, clus_to_run, division, earliest_date, selected_country, today, fake_clusters)
    all_sequences, cluster_inconsistencies, total_counts_countries, total_counts_divisions = clean_metadata(
        fake_clusters,
        nextstrain_clades_display_names, acknowledgement_by_variant,
        alert_dates, clus_check, clus_data_all,
        clus_to_run_breakdown, cols, dated_cluster_strains,
        dated_limit, dated_limit_formatted, daughter_clades,
        display_name_to_clus, division, division_data_all,
        earliest_date, input_meta, min_data_week, n_total,
        new_clades_to_rename, pango_lineage_to_clus, print_acks,
        rest_all, selected_country, today, total_counts_countries,
        total_counts_divisions, mode='slow')
    acknowledgement_by_variant_fast, acknowledgement_keys_fast, clus_data_all_fast, division_data_all_fast, total_counts_countries_fast, total_counts_divisions_fast = prepare_data_structure(
        all_countries, clus_to_run, division, earliest_date, selected_country, today, fake_clusters)
    all_sequences_fast, cluster_inconsistencies_fast, total_counts_countries_fast, total_counts_divisions_fast = clean_metadata(
        fake_clusters,
        nextstrain_clades_display_names, acknowledgement_by_variant_fast,
        alert_dates, clus_check, clus_data_all_fast,
        clus_to_run_breakdown, cols, dated_cluster_strains,
        dated_limit, dated_limit_formatted, daughter_clades,
        display_name_to_clus, division, division_data_all_fast,
        earliest_date, input_meta, min_data_week, n_total,
        new_clades_to_rename, pango_lineage_to_clus, print_acks,
        rest_all, selected_country, today, total_counts_countries_fast,
        total_counts_divisions_fast, mode='fast')
    assert all_sequences_fast == all_sequences
    assert cluster_inconsistencies_fast == cluster_inconsistencies
    assert total_counts_countries_fast == total_counts_countries
    assert total_counts_divisions_fast == total_counts_divisions


@pytest.mark.skip('This takes veeery long (>30min)')
def test_clean_metadata_full():
    nextstrain_clades = NEXTSTRAIN_CLADES
    clus_to_run = clusters.keys()

    all_countries = ALL_COUNTRIES
    division = True
    earliest_date = datetime.strptime("2019-01-01", '%Y-%m-%d')
    selected_country = ["USA", "Switzerland"]
    today = datetime.today()

    nextstrain_clades_display_names = NEXTSTRAIN_CLADES_DISPLAY_NAMES
    alert_dates = {}
    clus_check = True
    cols = ['strain', 'date', 'division', 'host', 'substitutions', 'deletions', 'Nextstrain_clade', 'country',
            'gisaid_epi_isl', 'coverage', 'QC_overall_status', 'Nextclade_pango']
    dated_cluster_strains = []
    dated_limit = ""
    dated_limit_formatted = None
    display_name_to_clus = {clusters[clus]["display_name"]: clus for clus in clus_to_run if
                            "display_name" in clusters[clus]}
    input_meta = '../../metadata.tsv.gz'
    min_data_week = (2020, 18)
    new_clades_to_rename = {}
    pango_lineage_to_clus = {p["name"]: clus for clus in clus_to_run if "pango_lineages" in clusters[clus] for p in
                             clusters[clus]["pango_lineages"]}
    print_acks = False

    n_total = 10

    clus_to_run_breakdown, daughter_clades, rest_all = split_into_cluster_categories(nextstrain_clades, clus_to_run, clusters)

    acknowledgement_by_variant, acknowledgement_keys, clus_data_all, division_data_all, total_counts_countries, total_counts_divisions = prepare_data_structure(
        all_countries, clus_to_run, division, earliest_date, selected_country, today, clusters)
    all_sequences, cluster_inconsistencies = clean_metadata(nextstrain_clades_display_names, acknowledgement_by_variant,
                                                            alert_dates, clus_check, clus_data_all,
                                                            clus_to_run_breakdown, cols, dated_cluster_strains,
                                                            dated_limit, dated_limit_formatted, daughter_clades,
                                                            display_name_to_clus, division, division_data_all,
                                                            earliest_date, input_meta, min_data_week, n_total,
                                                            new_clades_to_rename, pango_lineage_to_clus, print_acks,
                                                            rest_all, selected_country, today, total_counts_countries,
                                                            total_counts_divisions, clusters)
    assert all_sequences == {'20AS126': [], '20BS732': [], '21GLambda': [], '21H': [], '21I.Delta': [], '21J.Delta': [],
                             '21K.Omicron': [], '21L.Omicron': [], '21M.Omicron': [], '22A': [], '22B': [], '22C': [],
                             '22D': [], '22E': [], '22F': [], '23A': [], '23B': [], '23C': [], '23D': [], '23E': [],
                             '23F': [], '23G': [], '23H': [], '23I': [], '24A': ['Australia/249/2024'], '24B': [],
                             '24C': [], '24D': [], '24E': [], '24F': [], '24G': [], '24H': [], '24I': [], '25A': [],
                             'Alpha': [], 'Beta': [], 'DanishCluster': [], 'Delta': [], 'Delta.145H': [],
                             'Delta.250I': [], 'Delta.299I': [], 'Delta.ORF1a3059F': [],
                             'Delta417': ['Australia/249/2024'], 'EU1': [], 'EU2': [], 'Epsilon': [], 'Eta': [],
                             'Gamma': [], 'Iota': [], 'Kappa': [], 'ORF1aS3675': ['Australia/249/2024'], 'Omicron': [],
                             'Recombinant': [], 'S1122': [], 'S144': ['Australia/249/2024'], 'S145': [], 'S18': [],
                             'S417': ['Australia/249/2024'], 'S439': [], 'S453': [], 'S477mut': ['Australia/249/2024'],
                             'S484': ['Australia/249/2024'], 'S501': ['Australia/249/2024'], 'S572': [], 'S613': [],
                             'S626': [], 'S655': ['Australia/249/2024'],
                             'S677': ['Afganistan/IMB15483/2021', 'Afganistan/IMB15484/2021',
                                      'Afganistan/IMB15485/2021', 'Cambodia/IMB15486/2021', 'Cambodia/IMB15487/2021',
                                      'Japan/IMB15488/2021'], 'S677HBluebird': [], 'S677HHeron': [],
                             'S677HMockingbird': [], 'S677HQuail': [], 'S677HRobin1': [], 'S677HRobin2': [],
                             'S677HYellowhammer': [], 'S677PPelican': [], 'S677RRoadrunner': [],
                             'S681': ['Australia/249/2024'], 'S69': ['Australia/249/2024'], 'S80': [], 'S98': [],
                             'S_222': []}
    assert cluster_inconsistencies == {
        'Nextstrain_clade': {'EPI_ISL_19084620': ['24A', 'Delta', '21K.Omicron', '21L.Omicron', '23I']},
        'Non_Nextstrain_clade': {}}
