import json
import re

import requests
import polars as pl


def fetch_nextclade_tree():
    response = requests.get('https://raw.githubusercontent.com/nextstrain/ncov-clades-schema/refs/heads/master/src/clades.json')
    if not response.ok:
        raise ValueError('Could not fetch nextclade tree')
    tree = response.json()
    with open('web/public/data/nextcladeTree.json', 'w') as  f:
        json.dump(tree, f)
    return tree


def parse_nextclade_tree(tree) -> pl.DataFrame:
    clades = []
    def unpack_clades(clade, parent):
        nextclade, lineage, who = parse_clade_name(clade['name'])
        if lineage == 'B.1.427/429':
            clades.append({'nextstrain_clade': nextclade, 'pango_lineage': 'B.1.427', 'who': who, 'nextstrain_children': [parse_clade_name(child['name'])[0] for child in clade.get('children') or []], 'nextstrain_parent': parse_clade_name(parent)[0]})
            clades.append({'nextstrain_clade': nextclade, 'pango_lineage': 'B.1.429', 'who': who, 'nextstrain_children': [parse_clade_name(child['name'])[0] for child in clade.get('children') or []], 'nextstrain_parent': parse_clade_name(parent)[0]})
        else:
            clades.append({'nextstrain_clade': nextclade, 'pango_lineage': lineage, 'who': who, 'nextstrain_children': [parse_clade_name(child['name'])[0] for child in clade.get('children') or []], 'nextstrain_parent': parse_clade_name(parent)[0]})
        for child in clade.get('children') or []:
            unpack_clades(child, clade['name'])
    unpack_clades(tree, None)
    return pl.from_records(clades)


def parse_clade_name(name: str) -> tuple[str | None, str | None, str | None]:
    if not name:
        return None, None, None
    match = re.match(r"^(?P<clade>[1-9][0-9][A-Z])(?: \((?P<who>[A-Z][a-z]+|EU1)?,? *(?P<lineage>[A-Z]+(?:.[1-9][0-9]*?)*)?\))?$", name.strip())
    if not match:
        return None, None, None
    return match['clade'], match['lineage'], match['who']


def customize_nextclade_tree(tree: pl.DataFrame, override: list[dict]) -> pl.DataFrame:
    overwrite_df = pl.from_records(override)
    has_lineage = tree.join(overwrite_df, on='nextstrain_clade', how='anti')
    no_lineage = overwrite_df.join(tree, on='nextstrain_clade').select('nextstrain_clade', 'pango_lineage', 'who', 'nextstrain_children', 'nextstrain_parent')
    clades = pl.concat([has_lineage, no_lineage])
    return clades
