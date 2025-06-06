import os

from scripts.include_case_counts import main
from tests.util import compare_files_in_paths

OWID_CSV_INPUT_PATH = 'tests/data/include_case_counts/owid-covid-data.csv'
COUNTRY_CSV_INPUT_PATH = 'tests/data/include_case_counts/perCountryData.json'
OUTPUT_CSV_FILENAME = "perCountryDataCaseCounts.json"
OUTPUT_CSV_DIR = "tests/data/include_case_counts/output"
OUTPUT_CSV_PATH = os.path.join(OUTPUT_CSV_DIR, OUTPUT_CSV_FILENAME)
EXPECTED_OUTPUT_CSV_DIR = "tests/data/include_case_counts/expected_output"
EXPECTED_OUTPUT_CSV_PATH = os.path.join(EXPECTED_OUTPUT_CSV_DIR, OUTPUT_CSV_FILENAME)

def test_include_case_counts():
    main(OWID_CSV_INPUT_PATH, COUNTRY_CSV_INPUT_PATH, OUTPUT_CSV_PATH)
    compare_files_in_paths([OUTPUT_CSV_DIR], [EXPECTED_OUTPUT_CSV_DIR])