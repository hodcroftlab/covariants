import json
import os

import numpy as np
import pytest
import polars as pl

from scripts.defining_mutations.merge_defining_mutations import process_auto_generated_data, process_hand_curated_file, \
    match_nuc_to_aas, main, replace_list_of_empty_string, load_auto_generated_data, Mutation, \
    AminoAcidMutation

CI = os.environ.get('CI')
TEST_DIR = 'tests/data/defining_mutations'
HAND_CURATED_TEST_DIR = os.path.join(TEST_DIR, 'hand_curated')
AUTO_GENERATED_TEST_DIR = os.path.join(TEST_DIR, 'auto_generated')
AUTO_GENERATED_EDGE_CASES_TEST_DIR = os.path.join(TEST_DIR, 'auto_generated_edge_cases')
OUTPUT_TEST_DIR = os.path.join(TEST_DIR, 'output')
EXPECTED_OUTPUT_DIR = os.path.join(TEST_DIR, 'expected_output')
EXPECTED_OUTPUT_EDGE_CASES_DIR = os.path.join(TEST_DIR, 'expected_output_edge_cases')
DEFINING_MUTATIONS_DATA_DIR = 'defining_mutations'


@pytest.mark.parametrize(
    'nuc, nuc_dict',
    [
        ("T670G", {'symbol_from': 'T', 'position': 670, 'symbol_to': 'G'}),
        ("C11289-", {'symbol_from': 'C', 'position': 11289, 'symbol_to': '-'}),
        ("G10447A", {'symbol_from': 'G', 'position': 10447, 'symbol_to': 'A'}),
        ("G4-", {'symbol_from': 'G', 'position': 4, 'symbol_to': '-'})
    ]
)
def test_split_nuc(nuc, nuc_dict):
    assert Mutation.parse_mutation_string(nuc).__dict__ == nuc_dict


@pytest.mark.parametrize(
    'nuc, genes',
    [
        ('T670G', ['ORF1a']),
        ('C21636-', ['S']),
        ('G28312T', ['N', 'ORF9b'])
    ]
)
def test_nuc_to_genes(nuc, genes):
    assert Mutation.parse_mutation_string(nuc).affected_genes == genes


@pytest.mark.parametrize(
    'aa, aa_dict',
    [
        ('ORF9b:P10S', {'gene': 'ORF9b', 'symbol_from': 'P', 'position': 10, 'symbol_to': 'S'}),
        ('S:P681H', {'gene': 'S', 'symbol_from': 'P', 'position': 681, 'symbol_to': 'H'}),
        ('ORF9b:N28-', {'gene': 'ORF9b', 'symbol_from': 'N', 'position': 28, 'symbol_to': '-'})
    ]
)
def test_split_aa(aa, aa_dict):
    assert AminoAcidMutation.parse_amino_acid_string(aa).__dict__ == aa_dict


def test_match_nuc_to_aas():
    nuc = "T670G"
    aas = [
        "E:T9I",
        "M:D3N",
        "N:S413R",
        "ORF1a:S135R",
        "ORF1a:Q556K",
        "ORF1b:T2163I",
        "S:S373P",
        "S:S375F",
        "S:T376A",
    ]
    assert match_nuc_to_aas(nuc, aas) == 'ORF1a:S135R'


def test_match_fuzzy_assignment_of_nuc_to_aas():
    nuc = "A21766-"
    aas = ['S:H69-']
    assert match_nuc_to_aas(nuc, aas) == 'S:H69-'


def test_match_nuc_to_aas_selects_best_match():
    nuc = "G28883C"
    aas = [
        "N:R203K",
        "N:G204R",
    ]
    assert match_nuc_to_aas(nuc, aas) == "N:R203K"


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
        assigned = data.with_columns(assigned_aa=pl.struct('nuc_change', 'aa_change').map_elements(
            lambda x: match_nuc_to_aas(x['nuc_change'], [x['aa_change']]), return_dtype=pl.String))
        coding_mutations.append(assigned)
    coding_mutations = pl.concat(coding_mutations)
    silent_mutations = pl.concat(silent_mutations)
    mismatches = coding_mutations.filter(pl.col('aa_change').ne(pl.col('assigned_aa')).or_(pl.col('assigned_aa').is_null()))
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


@pytest.mark.xfail(
    reason='need to clarify how we incorporate multiple amino acids: https://github.com/hodcroftlab/covariants/issues/581')
def test_match_nuc_to_multiple_aas():
    nuc = "C28312T"
    aas = ['N:P13L', 'ORF9b:P10F']
    assert match_nuc_to_aas(nuc, aas) == ['N:P13L', 'ORF9b:P10F']


def test_remove_empty_strings():
    assert replace_list_of_empty_string(['']) == []
    assert replace_list_of_empty_string([]) == []
    assert replace_list_of_empty_string(['hello']) == ['hello']
    assert replace_list_of_empty_string(['hello', 'goodbye']) == ['hello', 'goodbye']
    assert replace_list_of_empty_string('') == ''
    assert replace_list_of_empty_string('hello') == 'hello'
    assert replace_list_of_empty_string(np.array([''])) == []
    assert replace_list_of_empty_string(np.array(['hello'])) == np.array(['hello'])


def test_process_hand_curated_file():
    hand_curated = process_hand_curated_file(os.path.join(HAND_CURATED_TEST_DIR, '22E.Omicron.tsv'))
    assert len(hand_curated) == 141
    assert hand_curated.columns == ['nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'reference', 'notes']


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
                                                'reference']
    silent_mutations = auto_generated_mutations.filter(pl.col('aa_mutation').is_null())
    proportion_silent = len(silent_mutations) / len(auto_generated_mutations)
    assert proportion_silent < SILENT_MUTATION_PERCENTAGE_THRESHOLD


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


@pytest.mark.skipif(CI, reason='full functionality test only for debugging, skip on CI')
def test_match_nuc_to_aas_for_auto_generated_data_full():
    lineages, auto_generated_mutations_raw = load_auto_generated_data(
        os.path.join('data', 'auto_generated.json'))
    auto_generated_mutations = process_auto_generated_data(auto_generated_mutations_raw)
    silent_mutations = auto_generated_mutations.filter(pl.col('aa_mutation').is_null())
    proportion_silent = len(silent_mutations) / len(auto_generated_mutations)
    assert proportion_silent < SILENT_MUTATION_PERCENTAGE_THRESHOLD
