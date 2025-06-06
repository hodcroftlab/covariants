import json
import os

from scripts.convert_to_web_app_json import main
from tests.data.convert_to_web_app.mock_clusters import mock_clusters
from tests.data.convert_to_web_app.mock_colors_and_countries import mock_country_styles_all
from tests.data.convert_to_web_app.mock_name_table import mock_name_table
from tests.data.convert_to_web_app.mock_mutation_comparison import mock_mutation_comparison

CLUSTER_TABLES_PATH = "tests/data/convert_to_web_app/cluster_tables"
OUTPUT_PATH = "tests/data/convert_to_web_app/output/web/data"
ACK_OUTPUT_PATH = "tests/data/convert_to_web_app/output/web/acknowledgements"
REGIONS_INPUTS = {
    "World": {
        "data": "EUClusters_data.json",
        "per_country_intro_content": "World.mdx"
    }, }

EXPECTED_OUTPUT_PATH = 'tests/data/convert_to_web_app/expected_output/web/data'
EXPECTED_ACK_OUTPUT_PATH = "tests/data/convert_to_web_app/output/web/acknowledgements"

def test_main():
    main(mock_clusters, OUTPUT_PATH, ACK_OUTPUT_PATH, CLUSTER_TABLES_PATH, REGIONS_INPUTS, mock_country_styles_all,
         mock_name_table, mock_mutation_comparison)

    for path, expected_path in zip([OUTPUT_PATH, ACK_OUTPUT_PATH], [EXPECTED_OUTPUT_PATH, EXPECTED_ACK_OUTPUT_PATH]):
        for file_path, expected_file_path in zip(scan_sub_dirs(path), scan_sub_dirs(expected_path)):
            compare_json_files(file_path, expected_file_path)


def scan_sub_dirs(path):
    paths = []
    for entry in os.scandir(path):
        if entry.is_dir():
            paths += scan_sub_dirs(entry.path)
        else:
            paths.append(entry.path)
    return paths

def compare_json_files(file_one, file_two):
    with open(file_one) as output_file:
        with open(file_two) as expected_output_file:
            output = json.load(output_file)
            expected_output = json.load(expected_output_file)
            assert output == expected_output