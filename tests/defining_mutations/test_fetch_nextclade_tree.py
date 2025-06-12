import json
import os

import pytest

from scripts.defining_mutations.fetch_nextclade_tree import fetch_nextclade_tree, parse_nextclade_tree, parse_clade_name

TEST_DIR = 'tests/data/defining_mutations/fetch_nextclade_tree'

def test_fetch_nextclade_tree():
    tree = fetch_nextclade_tree()
    assert 'children' in tree


def test_parse_nextclade_tree():
    with open(os.path.join(TEST_DIR, 'nextclade_tree.json')) as fh:
        tree = json.load(fh)
    clades = parse_nextclade_tree(tree)
    assert len(clades) == 50


@pytest.mark.parametrize(
    'name, expected_names',
    [
        ('20E (EU1, B.1.177)', ('20E', 'B.1.177', None)),
        ('20E (B)', ('20E', 'B', None)),
        ('20E (BA)', ('20E', 'BA', None)),
        ('20E (BA.1)', ('20E', 'BA.1', None)),
        ('20E (Delta, B.1.177)', ('20E', 'B.1.177', 'Delta')),
        ('20E (Mu, B.1.177)', ('20E', 'B.1.177', 'Mu'))
    ]
)
def test_parse_clade_name(name, expected_names):
    assert parse_clade_name(name) == expected_names
