import json

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
        nextclade, lineage = parse_clade_name(clade['name'])
        if lineage == 'B.1.427/429':
            clades.append({'nextstrain_clade': nextclade, 'pango_lineage': 'B.1.427', 'nextstrain_children': [parse_clade_name(child['name'])[0] for child in clade.get('children') or []], 'nextstrain_parent': parse_clade_name(parent)[0]})
            clades.append({'nextstrain_clade': nextclade, 'pango_lineage': 'B.1.429', 'nextstrain_children': [parse_clade_name(child['name'])[0] for child in clade.get('children') or []], 'nextstrain_parent': parse_clade_name(parent)[0]})
        else:
            clades.append({'nextstrain_clade': nextclade, 'pango_lineage': lineage, 'nextstrain_children': [parse_clade_name(child['name'])[0] for child in clade.get('children') or []], 'nextstrain_parent': parse_clade_name(parent)[0]})
        for child in clade.get('children') or []:
            unpack_clades(child, clade['name'])
    unpack_clades(tree, None)
    return pl.from_records(clades)


def parse_clade_name(name: str) -> tuple[str | None, str | None]:
    if not name:
        return None, None
    if not name.__contains__('('):
        return name.strip(), None
    clade_raw, lineage_raw = name.split('(')
    clade = clade_raw.strip()
    lineage = lineage_raw.split(',')[-1].strip()[:-1]
    if lineage in ['Delta']:
        return clade, None
    return clade, lineage


def customize_nextclade_tree(tree: pl.DataFrame, override: list[dict]) -> pl.DataFrame:
    overwrite_df = pl.from_records(override)
    has_lineage = tree.join(overwrite_df, on='nextstrain_clade', how='anti')
    no_lineage = overwrite_df.join(tree, on='nextstrain_clade').select('nextstrain_clade', 'pango_lineage', 'nextstrain_children', 'nextstrain_parent')
    clades = pl.concat([has_lineage, no_lineage])
    return clades
