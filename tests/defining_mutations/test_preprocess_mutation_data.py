import os

import polars as pl
import pytest

from scripts.defining_mutations.io import load_auto_generated_data, load_hand_curated_data
from scripts.defining_mutations.merge_defining_mutations import import_mutation_data, merge_mutation_data
from scripts.defining_mutations.preprocess_mutation_data import process_hand_curated_file, process_auto_generated_data, \
    match_nuc_to_aas
from tests.defining_mutations.config import HAND_CURATED_TEST_DIR, AUTO_GENERATED_TEST_DIR, \
    AUTO_GENERATED_EDGE_CASES_TEST_DIR, DEFINING_MUTATIONS_DATA_DIR, CI


def test_process_hand_curated_file():
    hand_curated = process_hand_curated_file(load_hand_curated_data(os.path.join(HAND_CURATED_TEST_DIR, '22E.Omicron.tsv')))
    assert len(hand_curated) == 141
    assert hand_curated.columns == ['nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'aa_mutation_2', 'reference', 'notes']


def test_load_and_process_auto_generated_data():
    lineages, auto_generated_mutations_raw = load_auto_generated_data(
        os.path.join(AUTO_GENERATED_TEST_DIR, 'auto_generated.json'))
    auto_generated_mutations = process_auto_generated_data(auto_generated_mutations_raw)
    assert len(lineages) == 2
    assert lineages.columns == ['lineage',
                                'unaliased',
                                'parent',
                                'children',
                                'nextstrain_clade',
                                'designation_date']
    assert len(auto_generated_mutations) == 268
    assert auto_generated_mutations.columns == ['lineage', 'nextstrain_clade', 'nuc_mutation', 'aa_mutation',
                                                'aa_mutation_2', 'reference']
    silent_mutations = auto_generated_mutations.filter(pl.col('aa_mutation').is_null())
    proportion_silent = len(silent_mutations) / len(auto_generated_mutations)
    assert proportion_silent < SILENT_MUTATION_PERCENTAGE_THRESHOLD


SILENT_MUTATION_PERCENTAGE_THRESHOLD = 0.32  # estimate derived from hand-curated data

def test_match_nuc_to_aas_for_hand_curated_data():
    coding_mutations = []
    silent_mutations = []
    filenames = os.listdir(DEFINING_MUTATIONS_DATA_DIR)
    for file in filenames:
        data = (
            pl.read_csv(os.path.join(DEFINING_MUTATIONS_DATA_DIR, file), separator='\t')
            .filter(pl.col('aa_change').is_not_null())
            .with_columns(pl.col('aa_change').str.strip_chars(' '), clade=pl.lit(file[:3]))
        )
        silent_data = pl.read_csv(os.path.join(DEFINING_MUTATIONS_DATA_DIR, file), separator='\t').filter(pl.col('aa_change').is_null())
        silent_mutations.append(silent_data)
        assigned = data.with_columns(assigned_aas=pl.struct('nuc_change', 'aa_change').map_elements(
            lambda x: match_nuc_to_aas(x['nuc_change'], [x['aa_change']]), return_dtype=pl.List(pl.String)))
        coding_mutations.append(assigned)
    coding_mutations = pl.concat(coding_mutations)
    silent_mutations = pl.concat(silent_mutations)
    mismatches = coding_mutations.filter(pl.col('aa_change').ne(pl.col('assigned_aas').list.first()).or_(pl.col('assigned_aas').list.len().eq(0)))
    silent_percentage = len(silent_mutations) / (len(coding_mutations) + len(silent_mutations))
    assert len(mismatches) == 0
    assert silent_percentage < SILENT_MUTATION_PERCENTAGE_THRESHOLD


def test_match_nuc_to_aas_for_auto_generated_data():
    lineages, auto_generated_mutations_raw = load_auto_generated_data(
        os.path.join(AUTO_GENERATED_TEST_DIR, 'auto_generated.json'))
    auto_generated_mutations = process_auto_generated_data(auto_generated_mutations_raw)
    silent_mutations = auto_generated_mutations.filter(pl.col('aa_mutation').is_null())
    proportion_silent = len(silent_mutations) / len(auto_generated_mutations)
    assert proportion_silent < SILENT_MUTATION_PERCENTAGE_THRESHOLD


@pytest.mark.parametrize(
    'auto_generated_test_dir, expected_aa_nuc_mismatches, expected_nuc_aa_mismatches',
    [
        (AUTO_GENERATED_TEST_DIR, 0, 2),
        (AUTO_GENERATED_EDGE_CASES_TEST_DIR, 2, 2)
    ]
)
def test_match_nuc_to_aas_mutation_handles_type_mismatches(auto_generated_test_dir, expected_aa_nuc_mismatches, expected_nuc_aa_mismatches):
    lineages, hand_curated_mutations, auto_generated_mutations = import_mutation_data(HAND_CURATED_TEST_DIR,
                                                                                      auto_generated_test_dir)
    col_has_deletions = lambda col_name: pl.col(col_name).list.eval(pl.element().struct.field('alt').eq('-')).list.any()

    merged_mutations = merge_mutation_data(hand_curated_mutations, auto_generated_mutations)

    aa_deletions_with_nuc_substitutions = merged_mutations.filter(col_has_deletions('aa_mutations').and_(col_has_deletions('nuc_mutations').not_()))
    assert len(aa_deletions_with_nuc_substitutions) == expected_aa_nuc_mismatches # Two mismatches in auto-generated edge cases
    nuc_deletions_with_aa_substitutions = merged_mutations.filter(col_has_deletions('nuc_mutations').and_(col_has_deletions('aa_mutations').not_()).and_(pl.col('aa_mutations').list.len().ne(0)))
    assert len(nuc_deletions_with_aa_substitutions) == expected_nuc_aa_mismatches  # Two mismatches introduced via hand-curated data


@pytest.mark.skipif(CI, reason='full functionality test only for debugging, skip on CI')
def test_match_nuc_to_aas_for_auto_generated_data_full():
    lineages, auto_generated_mutations_raw = load_auto_generated_data(
        os.path.join('data', 'auto_generated.json'))
    auto_generated_mutations = process_auto_generated_data(auto_generated_mutations_raw)
    silent_mutations = auto_generated_mutations.filter(pl.col('aa_mutation').is_null())
    proportion_silent = len(silent_mutations) / len(auto_generated_mutations)
    assert proportion_silent < SILENT_MUTATION_PERCENTAGE_THRESHOLD


