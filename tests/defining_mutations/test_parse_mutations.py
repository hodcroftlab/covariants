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
    nuc = 'T22031-'
    aas = [
        'S:R158G',
        'S:F157-'
    ]
    assert match_nuc_to_aas(nuc, aas) == ["S:F157-"]


def test_match_nuc_returns_none_if_there_are_no_matches():
    nuc = 'T22031-'
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


@pytest.mark.parametrize('nuc_change, aa_changes',
                         [
                             ("G28302A", ["N:R10Q", "ORF9b:E7K", "ORF9b:P10S"]),
                             ("C28311T", ["N:R10Q", "N:P13L", "ORF9b:P10S"]),
                             ("C28311T", ["N:P13L", "ORF9b:R13L", "ORF9b:P10S"]),
                             ("A28370-", ["N:G30-", "N:R32-", "ORF9b:N28-"])
                         ])
def test_match_nuc_to_aa_position_comparison_does_not_spill_across_genes(nuc_change, aa_changes):
    aas = match_nuc_to_aas(nuc_change, aa_changes)
    assert len(aas) == 2


def test_match_nuc_to_aa_allows_only_one_aa_change_per_gene():
    nuc_change = "T22684C"
    aa_changes = ["S:S373P", "S:S375F"]
    aas = match_nuc_to_aas(nuc_change, aa_changes)
    assert len(aas) == 1


@pytest.mark.xfail(reason='The simple matching algorithm cannot get all of these right at the same time')
@pytest.mark.parametrize('nuc_change, expected_aa_change', [
    ('C21618T', ['S:T19I']),
    ('T21633-', ['S:L24-']),
    ('A21634-', ['S:L24-']),
    ('C21635-', ['S:P25-']),
    ('C21636-', ['S:P25-']),
    ('C21637-', ['S:P25-']),
    ('C21638-', ['S:P26-']),
    ('C21639-', ['S:P26-']),
    ('T21640-', ['S:P26-']),
    ('G21641-', ['S:A27S']),
    ('T21765-', ['S:H69-']),
    ('A21766-', ['S:H69-']),
    ('C21767-', ['S:H69-']),
    ('A21768-', ['S:V70-']),
    ('T21769-', ['S:V70-']),
    ('G21770-', ['S:V70-']),
    ('G21987A', ['S:G142D']),
    ('T22200G', ['S:V213G']),
    ('G22578A', ['S:G339D']),
    ('C22674T', ['S:S371F']),
    ('T22679C', ['S:S373P']),
    ('C22686T', ['S:S375F']),
    ('A22688G', ['S:T376A']),
    ('G22775A', ['S:D405N']),
    ('A22786C', ['S:R408S']),
    ('G22813T', ['S:K417N']),
    ('T22882G', ['S:N440K']),
    ('A22893C', ['S:K444T']),
    ('T22917G', ['S:L452R']),
    ('T22942A', ['S:N460K']),
    ('G22992A', ['S:S477N']),
    ('C22995A', ['S:T478K']),
    ('A23013C', ['S:E484A']),
    ('T23018G', ['S:F486V']),
    ('A23040A', ['S:Q493Q']),
    ('A23055G', ['S:Q498R']),
    ('A23063T', ['S:N501Y']),
    ('T23075C', ['S:Y505H']),
    ('A23403G', ['S:D614G']),
    ('C23525T', ['S:H655Y']),
    ('T23599G', ['S:N679K']),
    ('C23604A', ['S:P681H']),
    ('C23854A', ['S:N764K']),
    ('G23948T', ['S:D796Y']),
    ('A24424T', ['S:Q954H']),
    ('T24469A', ['S:N969K']),
])
def test_all_spike_gene_mutations_for_22e(nuc_change, expected_aa_change):
    aa_changes = ['S:T19I',
                  'S:L24-',
                  'S:L24-',
                  'S:P25-',
                  'S:P25-',
                  'S:P25-',
                  'S:P26-',
                  'S:P26-',
                  'S:P26-',
                  'S:A27S',
                  'S:H69-',
                  'S:H69-',
                  'S:H69-',
                  'S:V70-',
                  'S:V70-',
                  'S:V70-',
                  'S:G142D',
                  'S:V213G',
                  'S:G339D',
                  'S:S371F',
                  'S:S373P',
                  'S:S375F',
                  'S:T376A',
                  'S:D405N',
                  'S:R408S',
                  'S:K417N',
                  'S:N440K',
                  'S:K444T',
                  'S:L452R',
                  'S:N460K',
                  'S:S477N',
                  'S:T478K',
                  'S:E484A',
                  'S:F486V',
                  'S:Q493Q',
                  'S:Q498R',
                  'S:N501Y',
                  'S:Y505H',
                  'S:D614G',
                  'S:H655Y',
                  'S:N679K',
                  'S:P681H',
                  'S:N764K',
                  'S:D796Y',
                  'S:Q954H',
                  'S:N969K']
    assert match_nuc_to_aas(nuc_change, aa_changes) == expected_aa_change
