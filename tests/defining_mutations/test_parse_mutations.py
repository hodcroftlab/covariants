import pytest

from scripts.defining_mutations.parse_mutations import Mutation, AminoAcidMutation
from scripts.defining_mutations.preprocess_mutation_data import match_nuc_to_aas


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
    assert match_nuc_to_aas(nuc, aas) == ['ORF1a:S135R']


def test_match_fuzzy_assignment_of_nuc_to_aas():
    nuc = "A21766-"
    aas = ['S:H69-']
    assert match_nuc_to_aas(nuc, aas) == ['S:H69-']


def test_match_nuc_to_aas_selects_best_match():
    nuc = "G28883C"
    aas = [
        "N:R203K",
        "N:G204R",
    ]
    assert match_nuc_to_aas(nuc, aas) == ["N:G204R"]


def test_match_nuc_to_aas_prefers_same_mutation_type():
    nuc = 'X22031-'
    aas = [
        'S:R158G',
        'S:F157-'
    ]
    assert match_nuc_to_aas(nuc, aas) == ["S:F157-"]


def test_match_nuc_returns_none_if_there_are_no_matches():
    nuc = 'X22031-'
    aas = [
        'S:R200G',
    ]
    assert match_nuc_to_aas(nuc, aas) is None


@pytest.mark.parametrize(
    'nuc, aas',
    [
        ('T22283C', ['S:L242-']),  # example from auto-generated data XAW
        ('G21641-', ['S:A27S']),  # example from hand-curated data 22B
    ]
)
def test_match_nuc_to_aas_uses_other_mutation_type_if_nothing_else_is_available(nuc, aas):
    assert match_nuc_to_aas(nuc, aas) == aas


def test_match_nuc_to_multiple_aas():
    nuc = "C28312T"
    aas = ['N:P13L', 'ORF9b:P10F']
    assert match_nuc_to_aas(nuc, aas) == ['N:P13L', 'ORF9b:P10F']