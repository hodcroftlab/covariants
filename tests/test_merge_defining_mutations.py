import json
import os

import numpy as np
import pytest

from scripts.merge_defining_mutations import process_auto_generated_data, process_hand_curated_file, \
    match_nuc_to_aas, main, replace_list_of_empty_string, load_auto_generated_data, Mutation, \
    AminoAcidMutation


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
    'aa, aa_tuple',
    [
        ('ORF9b:P10S', {'gene': 'ORF9b', 'symbol_from': 'P', 'position': 10, 'symbol_to': 'S'}),
        ('S:P681H', {'gene': 'S', 'symbol_from':'P', 'position': 681, 'symbol_to': 'H'}),
        ('ORF9b:N28-', {'gene': 'ORF9b', 'symbol_from': 'N', 'position':28, 'symbol_to':'-'})
    ]
)
def test_split_aa(aa, aa_tuple):
    assert AminoAcidMutation.parse_amino_acid_string(aa).__dict__ == aa_tuple


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


@pytest.mark.xfail(
    reason='Nuc to aa matching algorithm needs to be checked: https://github.com/hodcroftlab/covariants/issues/578 ')
def test_match_missed_nuc_to_aas():
    nuc = "X21766-"
    aas = ['S:H69-']
    assert match_nuc_to_aas(nuc, aas) == 'S:H69-'


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
    hand_curated = process_hand_curated_file('tests/data/defining_mutations/hand_curated/22E.Omicron.tsv')
    assert len(hand_curated) == 141
    assert hand_curated.columns == ['nextstrain_clade', 'nuc_change', 'aa_change', 'relative_to', 'notes']


def test_load_and_process_auto_generated_data():
    lineages, auto_generated_mutations_raw = load_auto_generated_data(
        'tests/data/defining_mutations/auto_generated/auto_generated.json')
    auto_generated_mutations = process_auto_generated_data(auto_generated_mutations_raw)
    assert len(lineages) == 2
    assert lineages.columns == ['lineage',
                                'unaliased',
                                'parent',
                                'children',
                                'nextstrain_clade',
                                'designation_date']
    assert len(auto_generated_mutations) == 268
    assert auto_generated_mutations.columns == ['lineage', 'nextstrain_clade', 'nuc_change', 'aa_change', 'relative_to']


def test_main():
    test_dir = 'tests/data/defining_mutations'
    hand_curated_test_dir = os.path.join(test_dir, 'hand_curated')
    auto_generated_test_dir = os.path.join(test_dir, 'auto_generated')
    output_test_dir = os.path.join(test_dir, 'output')
    expected_output_dir = os.path.join(test_dir, 'expected_output')
    expected_output_filenames = os.listdir(expected_output_dir)

    main(hand_curated_test_dir, auto_generated_test_dir, output_test_dir)

    assert os.listdir(output_test_dir) == expected_output_filenames
    for filename in expected_output_filenames:
        with open(os.path.join(output_test_dir, filename)) as output_file:
            with open(os.path.join(expected_output_dir, filename)) as expected_output_file:
                output = json.load(output_file)
                expected_output = json.load(expected_output_file)
                compare_nested_dicts(output, expected_output)


def compare_nested_dicts(d1, d2):
    assert d1.keys() == d2.keys()
    for key in d1.keys():
        if type(d1[key]) == str:
            assert d1[key] == d2[key]
        elif type(d1[key]) == list:
            assert len(d1[key]) == len(d2[key])
            for item in d1[key]:
                assert item in d2[key]
        elif type(d1[key]) == dict:
            compare_nested_dicts(d1[key], d2[key])


def test_edge_cases_do_not_throw_errors():
    _, auto_generated_mutations_raw = load_auto_generated_data(
        'tests/data/defining_mutations/auto_generated/auto_generated_edge_cases.json')
    process_auto_generated_data(auto_generated_mutations_raw)
