import requests
import polars as pl


def fetch_nextclade_tree():
    response = requests.get('https://raw.githubusercontent.com/nextstrain/ncov-clades-schema/refs/heads/master/src/clades.json')
    if not response.ok:
        raise ValueError('Could not fetch nextclade tree')
    tree = response.json()
    return tree


def parse_nextclade_tree(tree):
    clades = []
    def unpack_clades(clade, parent):
        nextclade, lineage = parse_clade_name(clade['name'])
        if lineage == 'B.1.427/429':
            clades.append({'clade': nextclade, 'lineage': 'B.1.427', 'children': [parse_clade_name(child['name'])[0] for child in clade.get('children') or []], 'parent': parse_clade_name(parent)[0]})
            clades.append({'clade': nextclade, 'lineage': 'B.1.429', 'children': [parse_clade_name(child['name'])[0] for child in clade.get('children') or []], 'parent': parse_clade_name(parent)[0]})
        else:
            clades.append({'clade': nextclade, 'lineage': lineage, 'children': [parse_clade_name(child['name'])[0] for child in clade.get('children') or []], 'parent': parse_clade_name(parent)[0]})
        for child in clade.get('children') or []:
            unpack_clades(child, clade['name'])
    unpack_clades(tree, None)
    return pl.from_records(clades)


def parse_clade_name(name: str):
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
