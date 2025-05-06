import json
import os

from scripts.defining_mutations.fetch_nextclade_tree import fetch_nextclade_tree, parse_nextclade_tree


TEST_DIR = 'tests/data/defining_mutations/fetch_nextclade_tree'

def test_fetch_nextclade_tree():
    tree = fetch_nextclade_tree()
    assert 'children' in tree


def test_parse_nextclade_tree():
    with open(os.path.join(TEST_DIR, 'nextclade_tree.json')) as fh:
        tree = json.load(fh)
    clades = parse_nextclade_tree(tree)
    assert len(clades) == 49
