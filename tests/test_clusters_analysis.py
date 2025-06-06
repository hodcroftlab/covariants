import os
from datetime import datetime

import pytest

from scripts.cluster_analysis import main, initial_metadata_pass, clean_metadata, prepare_data_structure, \
    split_into_cluster_categories
from scripts.clusters import clusters
from tests.data.cluster_analysis.mock_clusters import mock_clusters

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
CI = os.environ.get('CI')

def test_main():
    user_input = ('all', True, list(mock_clusters.keys()), True, True, True, False, False, ["USA", "Switzerland"])
    main(*user_input, input_meta=os.path.join(DATA_DIR, 'metadata.csv'), clusters=mock_clusters)


@pytest.mark.parametrize("zip_extension",
                         ['', '.gz'])
def test_initial_metadata(zip_extension):
    input_meta = os.path.join(DATA_DIR, f"metadata.csv{zip_extension}")
    clus_to_run = mock_clusters.keys()
    cols = ['strain', 'date', 'division', 'host', 'substitutions', 'deletions', 'Nextstrain_clade', 'country',
            'gisaid_epi_isl', 'coverage', 'QC_overall_status', 'Nextclade_pango']
    display_name_to_clus = {cluster["display_name"]: key for key, cluster in mock_clusters.items()}
    nextstrain_clades, nextstrain_clades_display_names, all_countries, n_total = initial_metadata_pass(clus_to_run,
                                                                                                       cols,
                                                                                                       display_name_to_clus,
                                                                                                       input_meta)
    assert nextstrain_clades == ['20A', '21L (Omicron)', '24A (Omicron)', '24A* (Omicron)', '25A (Omicron)']
    assert nextstrain_clades_display_names == ['21L (Omicron)', '24A (Omicron)']
    assert all_countries == ['Afghanistan', 'Australia', 'Cambodia', 'Japan', 'Switzerland']
    assert n_total == 29


@pytest.mark.skipif(CI, reason='full functionality test only for debugging, skip on CI')
def test_initial_metadata_zipped_full():
    input_meta = "../metadata.tsv.gz"
    clus_to_run = clusters.keys()
    cols = ['strain', 'date', 'division', 'host', 'substitutions', 'deletions', 'Nextstrain_clade', 'country',
            'gisaid_epi_isl', 'coverage', 'QC_overall_status', 'Nextclade_pango']
    display_name_to_clus = {cluster["display_name"]: key for key, cluster in clusters.items()}
    nextstrain_clades, nextstrain_clades_display_names, all_countries, n_total = initial_metadata_pass(clus_to_run,
                                                                                                       cols,
                                                                                                       display_name_to_clus,
                                                                                                       input_meta)
    assert nextstrain_clades == NEXTSTRAIN_CLADES
    assert nextstrain_clades_display_names == NEXTSTRAIN_CLADES_DISPLAY_NAMES
    assert all_countries == ALL_COUNTRIES
    assert n_total == N_TOTAL


ALL_SEQUENCES_WITH_CLUS_CHECK = {'20AS126': [], '20BS732': [], '21GLambda': [], '21H': [], '21I.Delta': [], '21J.Delta': [], '21K.Omicron': [], '21L.Omicron': ['12-Australia/249/2024'], '21M.Omicron': [], '22A': [], '22B': [], '22C': [], '22D': [], '22E': [], '22F': [], '23A': [], '23B': [], '23C': [], '23D': [], '23E': [], '23F': [], '23G': [], '23H': [], '23I': [], '24A': ['10-Australia/249/2024', '11-Australia/249/2024', '13-Australia/249/2024', '24-Australia/249/2024', '25-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024'], '24B': [], '24C': [], '24D': [], '24E': [], '24F': [], '24G': [], '24H': [], '24I': [], '25A': [], 'Alpha': [], 'Beta': [], 'DanishCluster': [], 'Delta': [], 'Delta.145H': [], 'Delta.250I': [], 'Delta.299I': [], 'Delta.ORF1a3059F': [], 'Delta417': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'EU1': [], 'EU2': [], 'Epsilon': [], 'Eta': [], 'Gamma': [], 'Iota': [], 'Kappa': [], 'N220': [], 'ORF1aS3675': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '25-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'Omicron': [], 'Recombinant': [], 'S1122': [], 'S144': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '25-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S145': [], 'S18': [], 'S417': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S439': [], 'S453': [], 'S477mut': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S484': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S501': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S572': [], 'S613': [], 'S626': [], 'S655': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S677': ['2-Afghanistan/IMB15483/2021', '3-Afghanistan/IMB15484/2021', '4-Afghanistan/IMB15485/2021', '5-Cambodia/IMB15486/2021', '6-Cambodia/IMB15487/2021', '7-Japan/IMB15488/2021'], 'S677HBluebird': [], 'S677HHeron': [], 'S677HMockingbird': [], 'S677HQuail': [], 'S677HRobin1': [], 'S677HRobin2': [], 'S677HYellowhammer': [], 'S677PPelican': [], 'S677RRoadrunner': [], 'S681': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S69': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '25-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S80': [], 'S98': [], 'S_222': []}
ALL_SEQUENCES_NO_CLUS_CHECK = {'20AS126': [], '20BS732': [], '21GLambda': [], '21H': [], '21I.Delta': [], '21J.Delta': [], '21K.Omicron': [], '21L.Omicron': ['12-Australia/249/2024'], '21M.Omicron': [], '22A': [], '22B': [], '22C': [], '22D': [], '22E': [], '22F': [], '23A': [], '23B': [], '23C': [], '23D': [], '23E': [], '23F': [], '23G': [], '23H': [], '23I': ['12-Australia/249/2024'], '24A': ['10-Australia/249/2024', '11-Australia/249/2024', '13-Australia/249/2024', '24-Australia/249/2024', '25-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024'], '24B': [], '24C': [], '24D': [], '24E': [], '24F': [], '24G': [], '24H': [], '24I': [], '25A': ['28-Australia/249/2024'], 'Alpha': [], 'Beta': [], 'DanishCluster': [], 'Delta': [], 'Delta.145H': [], 'Delta.250I': [], 'Delta.299I': [], 'Delta.ORF1a3059F': [], 'Delta417': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'EU1': [], 'EU2': [], 'Epsilon': [], 'Eta': [], 'Gamma': [], 'Iota': [], 'Kappa': [], 'N220': [], 'ORF1aS3675': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '25-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'Omicron': [], 'Recombinant': [], 'S1122': [], 'S144': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '25-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S145': [], 'S18': [], 'S417': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S439': [], 'S453': [], 'S477mut': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S484': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S501': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S572': [], 'S613': [], 'S626': [], 'S655': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S677': ['2-Afghanistan/IMB15483/2021', '3-Afghanistan/IMB15484/2021', '4-Afghanistan/IMB15485/2021', '5-Cambodia/IMB15486/2021', '6-Cambodia/IMB15487/2021', '7-Japan/IMB15488/2021'], 'S677HBluebird': [], 'S677HHeron': [], 'S677HMockingbird': [], 'S677HQuail': [], 'S677HRobin1': [], 'S677HRobin2': [], 'S677HYellowhammer': [], 'S677PPelican': [], 'S677RRoadrunner': [], 'S681': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '26-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S69': ['10-Australia/249/2024', '11-Australia/249/2024', '12-Australia/249/2024', '13-Australia/249/2024', '14-Australia/249/2024', '24-Australia/249/2024', '25-Australia/249/2024', '27-Australia/249/2024', '28-Australia/249/2024'], 'S80': [], 'S98': [], 'S_222': []}
CLUSTER_INCONSISTENCIES_WITH_CLUS_CHECK = {'Nextstrain_clade': {'EPI_ISL_19084620': ['24A', 'Delta', '21K.Omicron', '23I']}, 'Non_Nextstrain_clade': {'EPI_ISL_19084620': ['25A', 'Delta', '21K.Omicron', '23I']}}
CLUSTER_INCONSISTENCIES_NO_CLUS_CHECK = {'Nextstrain_clade': {}, 'Non_Nextstrain_clade': {}}
TOTAL_COUNTS_DIVISIONS = {'Switzerland': {'Region 2': {(2024, 3): 2}}, 'USA': {}}
TOTAL_COUNTS_NO_DIVISIONS = {}
ACKNOWLEDGEMENTS_BY_VARIANT_NO_PRINT = {'acknowledgements': {'20AS126': [], '20BS732': [], '21GLambda': [], '21H': [], '21I.Delta': [], '21J.Delta': [], '21K.Omicron': [], '21L.Omicron': [], '21M.Omicron': [], '22A': [], '22B': [], '22C': [], '22D': [], '22E': [], '22F': [], '23A': [], '23B': [], '23C': [], '23D': [], '23E': [], '23F': [], '23G': [], '23H': [], '23I': [], '24A': [], '24B': [], '24C': [], '24D': [], '24E': [], '24F': [], '24G': [], '24H': [], '24I': [], '25A': [], 'Alpha': [], 'Beta': [], 'DanishCluster': [], 'Delta': [], 'Delta.145H': [], 'Delta.250I': [], 'Delta.299I': [], 'Delta.ORF1a3059F': [], 'Delta417': [], 'EU1': [], 'EU2': [], 'Epsilon': [], 'Eta': [], 'Gamma': [], 'Iota': [], 'Kappa': [], 'N220': [], 'ORF1aS3675': [], 'Omicron': [], 'Recombinant': [], 'S1122': [], 'S144': [], 'S145': [], 'S18': [], 'S417': [], 'S439': [], 'S453': [], 'S477mut': [], 'S484': [], 'S501': [], 'S572': [], 'S613': [], 'S626': [], 'S655': [], 'S677': [], 'S677HBluebird': [], 'S677HHeron': [], 'S677HMockingbird': [], 'S677HQuail': [], 'S677HRobin1': [], 'S677HRobin2': [], 'S677HYellowhammer': [], 'S677PPelican': [], 'S677RRoadrunner': [], 'S681': [], 'S69': [], 'S80': [], 'S98': [], 'S_222': []}}
ACKNOWLEDGEMENTS_BY_VARIANT_WITH_PRINT = {'acknowledgements': {'20AS126': [], '20BS732': [], '21GLambda': [], '21H': [], '21I.Delta': [], '21J.Delta': [], '21K.Omicron': [], '21L.Omicron': [], '21M.Omicron': [], '22A': [], '22B': [], '22C': [], '22D': [], '22E': [], '22F': [], '23A': [], '23B': [], '23C': [], '23D': [], '23E': [], '23F': [], '23G': [], '23H': [], '23I': ['EPI_ISL_19084620'], '24A': ['EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620'], '24B': [], '24C': [], '24D': [], '24E': [], '24F': [], '24G': [], '24H': [], '24I': [], '25A': ['EPI_ISL_19084620'], 'Alpha': [], 'Beta': [], 'DanishCluster': [], 'Delta': [], 'Delta.145H': [], 'Delta.250I': [], 'Delta.299I': [], 'Delta.ORF1a3059F': [], 'Delta417': ['EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620'], 'EU1': [], 'EU2': [], 'Epsilon': [], 'Eta': [], 'Gamma': [], 'Iota': [], 'Kappa': [], 'N220': [], 'ORF1aS3675': ['EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620'], 'Omicron': [], 'Recombinant': [], 'S1122': [], 'S144': ['EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620'], 'S145': [], 'S18': [], 'S417': ['EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620'], 'S439': [], 'S453': [], 'S477mut': ['EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620'], 'S484': ['EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620'], 'S501': ['EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620'], 'S572': [], 'S613': [], 'S626': [], 'S655': ['EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620'], 'S677': ['EPI_ISL_1038924', 'EPI_ISL_1039163', 'EPI_ISL_1039164', 'EPI_ISL_1039165', 'EPI_ISL_1039166', 'EPI_ISL_1039167'], 'S677HBluebird': [], 'S677HHeron': [], 'S677HMockingbird': [], 'S677HQuail': [], 'S677HRobin1': [], 'S677HRobin2': [], 'S677HYellowhammer': [], 'S677PPelican': [], 'S677RRoadrunner': [], 'S681': ['EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620'], 'S69': ['EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620', 'EPI_ISL_19084620'], 'S80': [], 'S98': [], 'S_222': []}}

@pytest.mark.parametrize(["clus_check", "division", "print_acknowledgements", "expected_all_sequences", "expected_cluster_inconsistencies", "expected_total_counts_divisions", "expected_acknowledgements_by_variant"],
                         [(True, True, False, ALL_SEQUENCES_WITH_CLUS_CHECK, CLUSTER_INCONSISTENCIES_WITH_CLUS_CHECK, TOTAL_COUNTS_DIVISIONS, ACKNOWLEDGEMENTS_BY_VARIANT_NO_PRINT),
                          (True, False, False, ALL_SEQUENCES_WITH_CLUS_CHECK, CLUSTER_INCONSISTENCIES_WITH_CLUS_CHECK, TOTAL_COUNTS_NO_DIVISIONS, ACKNOWLEDGEMENTS_BY_VARIANT_NO_PRINT),
                          (False, True, False, ALL_SEQUENCES_NO_CLUS_CHECK, CLUSTER_INCONSISTENCIES_NO_CLUS_CHECK, TOTAL_COUNTS_DIVISIONS, ACKNOWLEDGEMENTS_BY_VARIANT_NO_PRINT),
                          (False, False, False, ALL_SEQUENCES_NO_CLUS_CHECK, CLUSTER_INCONSISTENCIES_NO_CLUS_CHECK, TOTAL_COUNTS_NO_DIVISIONS, ACKNOWLEDGEMENTS_BY_VARIANT_NO_PRINT),
                          (False, False, True, ALL_SEQUENCES_NO_CLUS_CHECK, CLUSTER_INCONSISTENCIES_NO_CLUS_CHECK, TOTAL_COUNTS_NO_DIVISIONS, ACKNOWLEDGEMENTS_BY_VARIANT_WITH_PRINT)])
def test_clean_metadata(clus_check, division, print_acknowledgements, expected_all_sequences, expected_cluster_inconsistencies, expected_total_counts_divisions, expected_acknowledgements_by_variant):
    # User input
    clus_to_run = mock_clusters.keys()
    # global variables
    display_name_to_clus = {mock_clusters[clus]["display_name"]: clus for clus in clus_to_run if
                            "display_name" in mock_clusters[clus]}
    cols = ['strain', 'date', 'division', 'host', 'substitutions', 'deletions', 'Nextstrain_clade', 'country',
            'gisaid_epi_isl', 'coverage', 'QC_overall_status', 'Nextclade_pango']
    input_meta = os.path.join(DATA_DIR, "metadata.csv")
    nextstrain_clades, nextstrain_clades_display_names, all_countries, n_total = initial_metadata_pass(clus_to_run,
                                                                                                       cols,
                                                                                                       display_name_to_clus,
                                                                                                       input_meta)

    earliest_date = datetime.strptime("2019-01-01", '%Y-%m-%d')
    selected_country = ["USA", "Switzerland"]
    today = datetime.today()
    alert_dates = {}
    dated_cluster_strains = []
    dated_limit = ""
    dated_limit_formatted = None
    min_data_week = (2020, 18)
    new_clades_to_rename = {'24A* (Omicron)': '24A (Omicron)'}
    pango_lineage_to_clus = {p["name"]: clus for clus in clus_to_run if "pango_lineages" in mock_clusters[clus] for p in
                             mock_clusters[clus]["pango_lineages"]}

    clus_to_run_breakdown, daughter_clades, rest_all = split_into_cluster_categories(nextstrain_clades, clus_to_run, mock_clusters)

    acknowledgement_by_variant, acknowledgement_keys, clus_data_all, division_data_all, total_counts_countries, total_counts_divisions = prepare_data_structure(
        all_countries, clus_to_run, division, earliest_date, selected_country, today, mock_clusters)

    # Act
    all_sequences, cluster_inconsistencies, total_counts_countries, total_counts_divisions, clus_data_all, acknowledgement_by_variant = clean_metadata(
        mock_clusters,
        nextstrain_clades_display_names, acknowledgement_by_variant,
        alert_dates, clus_check, clus_data_all,
        clus_to_run_breakdown, cols, dated_cluster_strains,
        dated_limit, dated_limit_formatted, daughter_clades,
        display_name_to_clus, division, division_data_all,
        earliest_date, input_meta, min_data_week, n_total,
        new_clades_to_rename, pango_lineage_to_clus, print_acknowledgements,
        rest_all, selected_country, today, total_counts_countries,
        total_counts_divisions)
    assert all_sequences == expected_all_sequences
    assert cluster_inconsistencies == expected_cluster_inconsistencies
    assert total_counts_countries == {'Afghanistan': {(2020, 22): 1, (2021, 3): 3}, 'Australia': {(2024, 3): 7}, 'Cambodia': {(2021, 3): 2}, 'Japan': {(2021, 3): 3}, 'Switzerland': {(2024, 3): 3}}
    assert total_counts_divisions == expected_total_counts_divisions
    assert acknowledgement_by_variant == expected_acknowledgements_by_variant


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
    print_acknowledgements = False

    n_total = N_TOTAL

    clus_to_run_breakdown, daughter_clades, rest_all = split_into_cluster_categories(nextstrain_clades, clus_to_run, clusters)

    acknowledgement_by_variant, acknowledgement_keys, clus_data_all, division_data_all, total_counts_countries, total_counts_divisions = prepare_data_structure(
        all_countries, clus_to_run, division, earliest_date, selected_country, today, clusters)
    all_sequences, cluster_inconsistencies, total_counts_countries, total_counts_divisions, clus_data_all, acknowledgement_by_variant = clean_metadata(clusters,
                                                            nextstrain_clades_display_names, acknowledgement_by_variant,
                                                            alert_dates, clus_check, clus_data_all,
                                                            clus_to_run_breakdown, cols, dated_cluster_strains,
                                                            dated_limit, dated_limit_formatted, daughter_clades,
                                                            display_name_to_clus, division, division_data_all,
                                                            earliest_date, input_meta, min_data_week, n_total,
                                                            new_clades_to_rename, pango_lineage_to_clus, print_acknowledgements,
                                                            rest_all, selected_country, today, total_counts_countries,
                                                            total_counts_divisions)
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
                             'S677': ['Afghanistan/IMB15483/2021', 'Afghanistan/IMB15484/2021',
                                      'Afghanistan/IMB15485/2021', 'Cambodia/IMB15486/2021', 'Cambodia/IMB15487/2021',
                                      'Japan/IMB15488/2021'], 'S677HBluebird': [], 'S677HHeron': [],
                             'S677HMockingbird': [], 'S677HQuail': [], 'S677HRobin1': [], 'S677HRobin2': [],
                             'S677HYellowhammer': [], 'S677PPelican': [], 'S677RRoadrunner': [],
                             'S681': ['Australia/249/2024'], 'S69': ['Australia/249/2024'], 'S80': [], 'S98': [],
                             'S_222': []}
    assert cluster_inconsistencies == {
        'Nextstrain_clade': {'EPI_ISL_19084620': ['24A', 'Delta', '21K.Omicron', '21L.Omicron', '23I']},
        'Non_Nextstrain_clade': {}}
