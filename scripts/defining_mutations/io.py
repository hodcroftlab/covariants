import json
import os
import re

import polars as pl

def save_mutations_to_file(output: dict, output_dir: str):
    for lineage in output:
        with open(os.path.join(output_dir, f'{lineage["pango_lineage"] or lineage["nextstrain_clade"]}.json'), 'w') as f:
            json.dump(lineage, f, indent=2)


def save_clusters_to_file(clusters: pl.DataFrame, output_dir: str):
    clusters = {'clusters': clusters.to_dicts()}
    with open(os.path.join(output_dir, 'definingMutationsClusters.json'), 'w') as f:
        json.dump(clusters, f, indent=2)


def load_auto_generated_data(path) -> tuple[pl.DataFrame, pl.DataFrame]:
    with open(path) as f:
        data = json.load(f)

    raw_lineages = [mut for mut in data.values()]

    df = pl.from_records(raw_lineages)

    rename = df.rename(
        {'lineage': 'pango_lineage',
         'parent': 'pango_parent',
         'children': 'pango_children',
         'unaliased': 'pango_lineage_unaliased',
         'nextstrainClade': 'nextstrain_clade',
         'designationDate': 'designation_date',
         'nucSubstitutions': 'nuc_sub_wuhan',
         'nucDeletions': 'nuc_del_wuhan',
         'nucSubstitutionsNew': 'nuc_sub_pango_parent',
         'nucDeletionsNew': 'nuc_del_pango_parent',
         'aaSubstitutions': 'aa_sub_wuhan',
         'aaDeletions': 'aa_del_wuhan',
         'aaSubstitutionsNew': 'aa_sub_pango_parent',
         'aaDeletionsNew': 'aa_del_pango_parent',
         'nucSubstitutionsReverted': 'nuc_sub_rev_wuhan',
         'aaSubstitutionsReverted': 'aa_sub_rev_wuhan',
         'nucDeletionsReverted': 'nuc_del_rev_wuhan',
         'aaDeletionsReverted': 'aa_del_rev_wuhan',
         }
    )

    lineages = rename.select(
        'pango_lineage',
        'pango_lineage_unaliased',
        'pango_parent',
        'pango_children',
        'nextstrain_clade',
        'designation_date')

    mutations = rename.select(
        'pango_lineage',
        'nextstrain_clade',
        'nuc_sub_wuhan',
        'nuc_del_wuhan',
        'nuc_sub_pango_parent',
        'nuc_del_pango_parent',
        'aa_sub_wuhan',
        'aa_del_wuhan',
        'aa_sub_pango_parent',
        'aa_del_pango_parent',
        'nuc_sub_rev_wuhan',
        'aa_sub_rev_wuhan',
        'nuc_del_rev_wuhan',
        'aa_del_rev_wuhan',
    )

    return lineages, mutations


def load_hand_curated_data(path) -> pl.DataFrame:
    filename = os.path.basename(path)
    match = re.match(r'(?P<nextstrain_clade>[1-9][0-9][A-Z])', filename)
    if not match:
        raise NameError(f'Could not extract nextstrain clade from file name "{filename}"')
    nextstrain_clade = match['nextstrain_clade']
    data = (
        pl.read_csv(path, separator='\t')
        .with_columns(
            pl.col('nuc_change').str.strip_chars(),
            pl.col('aa_change').str.strip_chars(),
            nextstrain_clade=pl.lit(nextstrain_clade)
        )
    )
    return data
