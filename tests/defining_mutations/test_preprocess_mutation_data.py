import os

import polars as pl
import pytest

from scripts.defining_mutations.helpers import log_mismatches
from scripts.defining_mutations.io import load_auto_generated_data, load_hand_curated_data
from scripts.defining_mutations.merge_defining_mutations import merge_mutation_data
from scripts.defining_mutations.preprocess_mutation_data import process_hand_curated_file, process_auto_generated_data, \
    match_nuc_to_aas, process_hand_curated_data, extract_hand_curated_clade_to_lineage_mapping, \
    remove_fake_reversions, import_mutation_data
from scripts.clusters import clusters as clusters_data
from scripts.defining_mutations.clade_to_lineage_override import clade_to_lineage
from tests.defining_mutations.config import HAND_CURATED_TEST_DIR, AUTO_GENERATED_TEST_DIR, \
    AUTO_GENERATED_EDGE_CASES_TEST_DIR, DEFINING_MUTATIONS_DATA_DIR, CI


def test_process_hand_curated_file():
    hand_curated = process_hand_curated_file(
        load_hand_curated_data(os.path.join(HAND_CURATED_TEST_DIR, '22E.Omicron.tsv')))
    assert len(hand_curated) == 148
    assert hand_curated.columns == ['nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'aa_mutation_2', 'reference',
                                    'notes', 'reversion']


def test_process_clusters():
    clusters = extract_hand_curated_clade_to_lineage_mapping(clusters_data, clade_to_lineage)
    assert len(clusters) == 44
    assert clusters.columns == ['pango_lineage', 'nextstrain_clade']


def test_process_hand_curated_data():
    clades, mutations = process_hand_curated_data(HAND_CURATED_TEST_DIR, clusters_data, clade_to_lineage)
    assert len(clades) == 44
    assert clades.columns == ['pango_lineage', 'nextstrain_clade']
    assert len(mutations) == 784
    assert mutations.columns == ['pango_lineage', 'nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'aa_mutation_2',
                                 'reference', 'notes', 'reversion']


def test_load_and_process_auto_generated_data():
    lineages, auto_generated_mutations_raw = load_auto_generated_data(
        os.path.join(AUTO_GENERATED_TEST_DIR, 'auto_generated.json'))
    auto_generated_mutations = process_auto_generated_data(auto_generated_mutations_raw)
    assert len(lineages) == 4
    assert lineages.columns == ['pango_lineage',
                                'pango_lineage_unaliased',
                                'pango_parent',
                                'pango_children',
                                'nextstrain_clade',
                                'designation_date']
    assert len(auto_generated_mutations) == 630
    assert auto_generated_mutations.columns == ['pango_lineage', 'nextstrain_clade', 'nuc_mutation', 'aa_mutation',
                                                'aa_mutation_2', 'reference', 'reversion']
    assert len(auto_generated_mutations.filter(pl.col('reversion'))) == 4
    silent_mutations = auto_generated_mutations.filter(pl.col('aa_mutation').is_null())
    proportion_silent = len(silent_mutations) / len(auto_generated_mutations)
    assert proportion_silent < SILENT_MUTATION_PERCENTAGE_THRESHOLD


def test_process_auto_generated_data_assigns_nucleotides_for_batch_deletions():
    auto_generated_mutations = process_auto_generated_data(
        load_auto_generated_data(os.path.join(AUTO_GENERATED_TEST_DIR, 'auto_generated.json'))[1]
    )
    unassigned_batch_deletions = auto_generated_mutations.filter(pl.col('nuc_mutation').struct.field('ref').eq('X'))
    assert len(unassigned_batch_deletions) == 0


def test_import_mutation_data():
    hand_curated_clades, auto_generated_lineages, hand_curated, auto_generated = import_mutation_data(
        HAND_CURATED_TEST_DIR, AUTO_GENERATED_TEST_DIR, clusters_data, clade_to_lineage)
    assert len(hand_curated_clades) == 44
    assert len(auto_generated_lineages) == 4
    assert hand_curated_clades.columns == ['pango_lineage',
                                           'nextstrain_clade']
    assert auto_generated_lineages.columns == ['pango_lineage',
                                               'pango_lineage_unaliased',
                                               'pango_parent',
                                               'pango_children',
                                               'nextstrain_clade',
                                               'designation_date']
    assert len(hand_curated) == 784
    assert hand_curated.columns == ['pango_lineage',
                                    'nextstrain_clade',
                                    'nuc_mutation',
                                    'aa_mutation',
                                    'aa_mutation_2',
                                    'reference',
                                    'notes',
                                    'reversion']
    assert len(auto_generated) == 630
    assert auto_generated.columns == ['pango_lineage',
                                      'nextstrain_clade',
                                      'nuc_mutation',
                                      'aa_mutation',
                                      'aa_mutation_2',
                                      'reference',
                                      'reversion']


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
        silent_data = pl.read_csv(os.path.join(DEFINING_MUTATIONS_DATA_DIR, file), separator='\t').filter(
            pl.col('aa_change').is_null())
        silent_mutations.append(silent_data)
        assigned = data.with_columns(assigned_aas=pl.struct('nuc_change', 'aa_change').map_elements(
            lambda x: match_nuc_to_aas(x['nuc_change'], [x['aa_change']]), return_dtype=pl.List(pl.String)))
        coding_mutations.append(assigned)
    coding_mutations = pl.concat(coding_mutations)
    silent_mutations = pl.concat(silent_mutations)
    mismatches = coding_mutations.filter(
        pl.col('aa_change').ne(pl.col('assigned_aas').list.first()).or_(pl.col('assigned_aas').list.len().eq(0)))
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
        (AUTO_GENERATED_TEST_DIR, 0, 6),
        (AUTO_GENERATED_EDGE_CASES_TEST_DIR, 2, 6)
    ],
    ids=['auto-generated data', 'auto-generated edge cases']
)
def test_match_nuc_to_aas_mutation_handles_type_mismatches(auto_generated_test_dir, expected_aa_nuc_mismatches,
                                                           expected_nuc_aa_mismatches):
    _, _, hand_curated_mutations, auto_generated_mutations = import_mutation_data(HAND_CURATED_TEST_DIR,
                                                                                  auto_generated_test_dir,
                                                                                  clusters_data,
                                                                                  clade_to_lineage)
    col_has_deletions = lambda col_name: pl.col(col_name).list.eval(pl.element().struct.field('alt').eq('-')).list.any()

    merged_mutations = merge_mutation_data(hand_curated_mutations, auto_generated_mutations)

    aa_deletions_with_nuc_substitutions = merged_mutations.filter(
        col_has_deletions('aa_mutations').and_(col_has_deletions('nuc_mutations').not_()))
    assert len(aa_deletions_with_nuc_substitutions) == expected_aa_nuc_mismatches
    nuc_deletions_with_aa_substitutions = merged_mutations.filter(
        col_has_deletions('nuc_mutations').and_(col_has_deletions('aa_mutations').not_()).and_(
            pl.col('aa_mutations').list.len().ne(0)))
    assert len(nuc_deletions_with_aa_substitutions) == expected_nuc_aa_mismatches


def test_assigning_deletion_nucleotides_from_reference_sequence_does_not_produce_mismatches():
    _, _, hand_curated_mutations, auto_generated_mutations = import_mutation_data(HAND_CURATED_TEST_DIR,
                                                                                  AUTO_GENERATED_TEST_DIR,
                                                                                  clusters_data,
                                                                                  clade_to_lineage)
    combined_mutations = (auto_generated_mutations
                          .join(hand_curated_mutations,
                                on=['pango_lineage', 'nextstrain_clade', pl.col('nuc_mutation').struct.field('pos'),
                                    'reference'],
                                how='full',
                                suffix='_hand_curated',
                                coalesce=True)
                          )
    nuc_mismatches, _, _ = log_mismatches(combined_mutations)
    assert nuc_mismatches.is_empty()


@pytest.mark.parametrize(
    'mutations, reversions, mutation_type, reference, target, expected_mutations',
    [
        (["ORF9b:P10S"], ['M:A63T', 'ORF9b:P10F'], 'aa', 'wuhan', 'substitutions', ["ORF9b:P10S"]),
        (["ORF9b:P10S"], ['M:A63T', 'ORF9b:P10F'], 'aa', 'wuhan', 'reversions', ['M:A63T']),
        (["ORF9b:P10S"], ['M:A63T', 'ORF9b:P10F'], 'aa', 'pango', 'substitutions', ["ORF9b:F10S"]),
        (["ORF9b:P10S"], ['M:A63T', 'ORF9b:P10F'], 'aa', 'pango', 'reversions', ['M:A63T'])
    ]
)
def test_remove_fake_aa_reversions(mutations, reversions, mutation_type, reference, target, expected_mutations):
    mutations = remove_fake_reversions(mutations, reversions, mutation_type, reference, target)

    assert mutations == expected_mutations


@pytest.mark.skipif(CI, reason='full functionality test only for debugging, skip on CI')
def test_match_nuc_to_aas_for_auto_generated_data_full():
    lineages, auto_generated_mutations_raw = load_auto_generated_data(
        os.path.join('data', 'auto_generated.json'))
    auto_generated_mutations = process_auto_generated_data(auto_generated_mutations_raw)
    silent_mutations = auto_generated_mutations.filter(pl.col('aa_mutation').is_null())
    proportion_silent = len(silent_mutations) / len(auto_generated_mutations)
    assert proportion_silent < SILENT_MUTATION_PERCENTAGE_THRESHOLD
    coding_mutations = auto_generated_mutations.filter(pl.col('aa_mutation').is_not_null())
    two_aa_matches = coding_mutations.filter(pl.col('aa_mutation_2').list.len().eq(1))
    two_aa_matches_by_mutations = two_aa_matches.group_by('nuc_mutation', 'aa_mutation', 'aa_mutation_2').agg(
        pl.col('nextstrain_clade').unique(), pl.col('pango_lineage').unique())
    assert len(two_aa_matches_by_mutations) == 65
    many_aa_matches = coding_mutations.filter(pl.col('aa_mutation_2').list.len().gt(1))
    assert len(many_aa_matches) == 0
