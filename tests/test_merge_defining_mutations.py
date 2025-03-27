import json
import os

from scripts.merge_defining_mutations import process_cornelius_file, process_emma_file, split_nuc, nuc_to_gene, \
    split_aa, match_nuc_to_aas, match_nucs_to_aas, main


def test_split_nuc():
    nuc1 = "T670G"
    nuc2 = "C11289-"
    nuc3 = "G10447A"
    assert split_nuc(nuc1) == ('T', 670, 'G')
    assert split_nuc(nuc2) == ('C', 11289, '-')
    assert split_nuc(nuc3) == ('G', 10447, 'A')


def test_nuc_to_gene():
    nuc1 = 670
    nuc2 = 21636
    nuc3 = 28312
    assert nuc_to_gene(nuc1) == ['ORF1a']
    assert nuc_to_gene(nuc2) == ['S']
    assert nuc_to_gene(nuc3) == ['N', 'ORF9b']


def test_split_aa():
    aa1 = 'ORF9b:P10S'
    aa2 = 'S:P681H'
    aa3 = 'ORF9b:N28-'
    assert split_aa(aa1) == ('ORF9b', 'P', 10, 'S')
    assert split_aa(aa2) == ('S', 'P', 681, 'H')
    assert split_aa(aa3) == ('ORF9b', 'N', 28, '-')


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


def test_match_missed_nuc_to_aas():
    nuc = "X21766-"
    aas = ['S:H69-']
    # TODO: this example is also classified differently in corn vs emma (wuhan vs pango_parent)
    assert match_nuc_to_aas(nuc, aas) == 'S:H69-'


def test_match_nucs_to_aas():
    with open('data/defining_mutations/cornelius.json') as f:
        data=json.load(f)
    nucs = data['BQ.1']['nucSubstitutions']
    aas = data['BQ.1']['aaSubstitutions']
    syn, non_syn = match_nucs_to_aas(nucs, aas)
    assert len(non_syn) == len(aas)
    assert len(syn) == len(nucs) - len(aas)


def test_process_emma_file():
    emma = process_emma_file('data/defining_mutations/emma/22E.Omicron.tsv')
    assert len(emma) == 141
    assert emma.columns == ['nextstrain_clade', 'nuc_change', 'aa_change', 'relative_to', 'notes']

def test_process_cornelius_file():
    lineages, corn = process_cornelius_file('data/defining_mutations/cornelius.json')
    assert len(lineages) == 2
    assert lineages.columns == ['lineage',
                                'unaliased',
                                'parent',
                                'children',
                                'nextstrain_clade',
                                'designation_date']
    assert len(corn) == 258
    assert corn.columns == ['lineage', 'nextstrain_clade', 'nuc_change', 'aa_change', 'relative_to']

def test_main():
    test_dir = 'data/defining_mutations'
    emma_test_dir = os.path.join(test_dir, 'emma')
    corn_test_dir = test_dir
    output_test_dir = os.path.join(test_dir, 'output')
    expected_output_dir = os.path.join(test_dir, 'expected_output')
    expected_output_filenames = os.listdir(expected_output_dir)

    main(emma_test_dir, corn_test_dir, output_test_dir)

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
