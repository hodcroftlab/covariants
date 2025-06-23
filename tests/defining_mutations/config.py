import os

CI = os.environ.get('CI')
TEST_DIR = 'tests/data/defining_mutations'
HAND_CURATED_TEST_DIR = os.path.join(TEST_DIR, 'hand_curated')
AUTO_GENERATED_TEST_DIR = os.path.join(TEST_DIR, 'auto_generated')
AUTO_GENERATED_EDGE_CASES_TEST_DIR = os.path.join(TEST_DIR, 'auto_generated_edge_cases')
OUTPUT_TEST_DIR = os.path.join(TEST_DIR, 'output')
EXPECTED_OUTPUT_DIR = os.path.join(TEST_DIR, 'expected_output')
EXPECTED_OUTPUT_EDGE_CASES_DIR = os.path.join(TEST_DIR, 'expected_output_edge_cases')
DEFINING_MUTATIONS_DATA_DIR = 'defining_mutations'