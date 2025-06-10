from scripts.convert_to_web_app_json import main
from tests.data.convert_to_web_app.mock_clusters import mock_clusters
from tests.data.convert_to_web_app.mock_colors_and_countries import mock_country_styles_all
from tests.data.convert_to_web_app.mock_name_table import mock_name_table
from tests.data.convert_to_web_app.mock_mutation_comparison import mock_mutation_comparison
from tests.util import compare_files_in_paths

CLUSTER_TABLES_PATH = "tests/data/convert_to_web_app/cluster_tables"
OUTPUT_PATH = "tests/data/convert_to_web_app/output/web/data"
ACK_OUTPUT_PATH = "tests/data/convert_to_web_app/expected_output/web/acknowledgements"
REGIONS_INPUTS = {
    "World": {
        "data": "EUClusters_data.json",
        "per_country_intro_content": "World.mdx"
    }, }

EXPECTED_OUTPUT_PATH = 'tests/data/convert_to_web_app/expected_output/web/data'


def test_main():
    main(mock_clusters, OUTPUT_PATH, ACK_OUTPUT_PATH, CLUSTER_TABLES_PATH, REGIONS_INPUTS, mock_country_styles_all,
         mock_name_table, mock_mutation_comparison)

    compare_files_in_paths([OUTPUT_PATH], [EXPECTED_OUTPUT_PATH])
