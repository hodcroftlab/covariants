import json
import os

import pytest

from scripts.defining_mutations.merge_defining_mutations import main, import_mutation_data
from scripts.clusters import clusters as clusters_data
from tests.defining_mutations.config import AUTO_GENERATED_TEST_DIR, AUTO_GENERATED_EDGE_CASES_TEST_DIR, \
    HAND_CURATED_TEST_DIR, EXPECTED_OUTPUT_DIR, EXPECTED_OUTPUT_EDGE_CASES_DIR, OUTPUT_TEST_DIR, CI


def test_import_mutation_data():
    lineages, hand_curated, auto_generated = import_mutation_data(HAND_CURATED_TEST_DIR, AUTO_GENERATED_TEST_DIR, clusters_data)
    assert len(lineages) == 7
    assert lineages.columns == ['lineage',
                                'nextstrain_clade',
                                'unaliased',
                                'parent',
                                'children',
                                'designation_date',
                                'nextstrain_children',
                                'nextstrain_parent']
    assert len(hand_curated) == 637
    assert hand_curated.columns == ['lineage',
                                    'nextstrain_clade',
                                    'nuc_mutation',
                                    'aa_mutation',
                                    'aa_mutation_2',
                                    'reference',
                                    'notes',
                                    'reversion']
    assert len(auto_generated) == 630
    assert auto_generated.columns == ['lineage',
                                      'nextstrain_clade',
                                      'nuc_mutation',
                                      'aa_mutation',
                                      'aa_mutation_2',
                                      'reference',
                                      'reversion']


@pytest.mark.parametrize(
    'expected_output_dir, auto_generated_test_dir',
    [
        (EXPECTED_OUTPUT_DIR, AUTO_GENERATED_TEST_DIR),
        (EXPECTED_OUTPUT_EDGE_CASES_DIR, AUTO_GENERATED_EDGE_CASES_TEST_DIR),
    ]
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


@pytest.mark.skipif(CI, reason='full functionality test only for debugging, skip on CI')
def test_main_full():
    main(dry_run=True)
