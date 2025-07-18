import json
import os

import pytest

from scripts.defining_mutations.merge_defining_mutations import main, merge_clusters_data
from scripts.defining_mutations.preprocess_mutation_data import import_mutation_data
from tests.defining_mutations.config import AUTO_GENERATED_TEST_DIR, AUTO_GENERATED_EDGE_CASES_TEST_DIR, \
    HAND_CURATED_TEST_DIR, EXPECTED_OUTPUT_DIR, EXPECTED_OUTPUT_EDGE_CASES_DIR, OUTPUT_TEST_DIR
from tests.data.defining_mutations.mock_clusters import mock_clusters as clusters_data
from tests.data.defining_mutations.mock_clade_to_lineage_override import mock_clade_to_lineage as clade_to_lineage


@pytest.mark.parametrize('auto_generated_data_dir, expected_clusters',
                         [(AUTO_GENERATED_TEST_DIR, 58),
                          (AUTO_GENERATED_EDGE_CASES_TEST_DIR, 57)])
def test_merge_lineages(auto_generated_data_dir, expected_clusters):
    hand_curated_clades, auto_generated_lineages, _, _ = import_mutation_data(HAND_CURATED_TEST_DIR, auto_generated_data_dir, clusters_data, clade_to_lineage)
    merged_clusters = merge_clusters_data(hand_curated_clades, auto_generated_lineages, clade_to_lineage)
    assert len(merged_clusters) == expected_clusters
    assert merged_clusters.columns == ['pango_lineage',
                                       'nextstrain_clade',
                                       'pango_lineage_unaliased',
                                       'pango_parent',
                                       'pango_children',
                                       'designation_date',
                                       'who',
                                       'nextstrain_children',
                                       'nextstrain_parent',
                                       'has_data']


@pytest.mark.parametrize(
    'expected_output_dir, auto_generated_test_dir',
    [
        (EXPECTED_OUTPUT_DIR, AUTO_GENERATED_TEST_DIR),
        (EXPECTED_OUTPUT_EDGE_CASES_DIR, AUTO_GENERATED_EDGE_CASES_TEST_DIR),
    ],
    ids=['auto-generated data', 'auto-generated edge cases']
)
def test_main(expected_output_dir, auto_generated_test_dir):
    expected_output_filenames = os.listdir(expected_output_dir)

    main(HAND_CURATED_TEST_DIR, auto_generated_test_dir, OUTPUT_TEST_DIR)

    for filename in expected_output_filenames:
        assert filename in os.listdir(OUTPUT_TEST_DIR)
        with open(os.path.join(OUTPUT_TEST_DIR, filename)) as output_file:
            with open(os.path.join(expected_output_dir, filename)) as expected_output_file:
                output = json.load(output_file)
                expected_output = json.load(expected_output_file)
                assert output == expected_output


@pytest.mark.skip(reason='full functionality test only for debugging')
def test_main_full():
    main(dry_run=True)
