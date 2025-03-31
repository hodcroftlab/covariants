import json
import os

import numpy as np
import polars as pl
import pandas as pd

GENE_BOUNDS = {
    'E': [26245, 26472],
    'M': [26523, 27191],
    'N': [28274, 29533],
    'ORF1a': [266, 13468],
    'ORF1b': [13468, 21555],
    'ORF3a': [25393, 26220],
    'ORF6': [27202, 27387],
    'ORF7a': [27394, 27759],
    'ORF7b': [27756, 27887],
    'ORF8': [27894, 28259],
    'ORF9b': [28284, 28577],
    'S': [21563, 25384]
}


def split_nuc(nuc: str) -> tuple[str, int, str]:
    return nuc[0], int(nuc[1:-1]), nuc[-1]


def split_aa(aa: str) -> tuple[str, str, int, str]:
    gene, aa = aa.split(':')
    return gene, *split_nuc(aa)


def nuc_to_gene(nuc_location: int):
    genes = []
    for gene, bounds in GENE_BOUNDS.items():
        if bounds[0] <= nuc_location <= bounds[1]:
            genes.append(gene)
    return genes


def match_nuc_to_aas(nuc, aas):
    if not nuc:
        return
    nuc_old, nuc_location, nuc_new = split_nuc(nuc)
    genes = nuc_to_gene(nuc_location)
    if len(genes) == 0:
        print(f'WARNING: nuc {nuc} cannot be matched to gene region')
        return
    # TODO: this does not match correctly for all cases right now
    locations = [int(np.floor((nuc_location - GENE_BOUNDS[gene][0]) / 3)) + 1 for gene in genes]
    for aa in aas:
        gene, aa_old, aa_location, aa_new = split_aa(aa)
        if gene in genes and aa_location in locations:
            return aa


def nuc_string_to_object(nuc):
    ref, pos, alt = split_nuc(nuc)
    return {'ref': ref, 'pos': pos, 'alt': alt}


def aa_string_to_object(aa):
    gene, ref, pos, alt = split_aa(aa)
    return {'gene': gene, 'ref': ref, 'pos': pos, 'alt': alt}


def remove_empty_strings(y):
    if len(y) == 1:
        if y[0] == '':
            return []
    return y


def process_cornelius_file(path):
    with open(path) as f:
        data = json.load(f)

    raw_lineages = [mut for mut in data.values()]

    df = pl.from_records(raw_lineages)

    rename = df.rename(
        {'nextstrainClade': 'nextstrain_clade',
         'designationDate': 'designation_date',
         'nucSubstitutions': 'nuc_sub_wuhan',
         'nucDeletions': 'nuc_del_wuhan',
         'nucSubstitutionsNew': 'nuc_sub_pango_parent',
         'nucDeletionsNew': 'nuc_del_pango_parent',
         'aaSubstitutions': 'aa_sub_wuhan',
         'aaDeletions': 'aa_del_wuhan',
         'aaSubstitutionsNew': 'aa_sub_pango_parent',
         'aaDeletionsNew': 'aa_del_pango_parent'}
    )

    lineages = rename.select(
        pl.col('lineage'),
        pl.col('unaliased'),
        pl.col('parent'),
        pl.col('children'),
        pl.col('nextstrain_clade'),
        pl.col('designation_date'))

    mutations = rename.select(
        'lineage',
        'nextstrain_clade',
        'nuc_sub_wuhan',
        'nuc_del_wuhan',
        'nuc_sub_pango_parent',
        'nuc_del_pango_parent',
        'aa_sub_wuhan',
        'aa_del_wuhan',
        'aa_sub_pango_parent',
        'aa_del_pango_parent'
    )

    empty_strings_removed = mutations.to_pandas().applymap(remove_empty_strings)

    deletion_columns = ['nuc_del_wuhan', 'nuc_del_pango_parent']
    split_deletions = empty_strings_removed[deletion_columns].applymap(
        lambda x: [[int(pos) for pos in del_range.split('-')] for del_range in x])
    deletions_to_ranges = split_deletions.applymap(
        lambda x: [list(range(*del_range)) if len(del_range) > 1 else del_range for del_range in x])
    flatten_deletions = deletions_to_ranges.applymap(lambda x: list(pd.core.common.flatten(x)))
    expand_deletions = empty_strings_removed.copy()
    expand_deletions[deletion_columns] = flatten_deletions

    reformat_deletions = pl.from_pandas(expand_deletions).with_columns(
        pl.col(col_name).list.eval(
            pl.concat_str(
                pl.lit('X'),
                pl.element(),
                pl.lit('-'))
        ) for col_name in deletion_columns
    )

    combine_nuc_changes = reformat_deletions.with_columns(
        nuc_change_wuhan=pl.concat_list(
            'nuc_sub_wuhan',
            'nuc_del_wuhan'),
        nuc_change_pango_parent=pl.concat_list(
            'nuc_sub_pango_parent',
            'nuc_del_pango_parent'
        ),
        aa_change_wuhan=pl.concat_list(
            'aa_sub_wuhan',
            'aa_del_wuhan'
        ),
        aa_change_pango_parent=pl.concat_list(
            'aa_sub_pango_parent',
            'aa_del_pango_parent'
        )
    )

    # TODO: make sure the nuc to aa matching is scientifically correct
    match_aa_changes = pl.struct('nuc_change', 'aa_change').map_elements(
        lambda x: match_nuc_to_aas(x['nuc_change'], x['aa_change']), pl.String
    )
    wuhan = (
        combine_nuc_changes
        .select(
            pl.col('lineage'),
            pl.col('nextstrain_clade'),
            nuc_change=pl.col('nuc_change_wuhan'),
            aa_change=pl.col('aa_change_wuhan'))
        .explode('nuc_change')
        .with_columns(
            aa_change=match_aa_changes,
            relative_to=pl.lit('wuhan')
        )
    )
    pango_parent = (
        combine_nuc_changes
        .select(
            pl.col('lineage'),
            pl.col('nextstrain_clade'),
            nuc_change='nuc_change_pango_parent',
            aa_change=pl.col('aa_change_pango_parent'))
        .explode('nuc_change')
        .with_columns(
            aa_change=match_aa_changes,
            relative_to=pl.lit('pango_parent'))
    )

    output = pl.concat([wuhan, pango_parent])

    check_relative_to_column(output)

    # TODO: reversions, frame shifts
    return lineages, output


def process_emma_file(path):
    filename = path.split('/')[-1]
    lineage = filename.split('.')[0]

    data = pl.read_csv(path, separator='\t')

    no_reversions = data.filter(pl.col('reversion').is_null())

    with_lineage = (
        no_reversions
        .with_columns(
            nextstrain_clade=pl.lit(lineage),
            relative_to=pl.lit('wuhan')
        )
        .select('nextstrain_clade', 'nuc_change', 'aa_change', 'relative_to', 'not_in_parent', 'notes')
    )
    pango_parent = (
        with_lineage.filter(pl.col('not_in_parent') == 'y')
        .with_columns(
            relative_to=pl.lit('pango_parent'))
    )

    output = pl.concat([with_lineage, pango_parent]).drop('not_in_parent')

    check_relative_to_column(output)

    # TODO: reversions, frame shifts
    return output


def check_relative_to_column(df):
    if not df.filter(pl.col('relative_to').is_null()).is_empty():
        raise ValueError(f'Could not assign reference point for mutations {df.filter(pl.col("relative_to").is_null())}')


def import_file_dfs(emma_dir, corn_dir):
    lineages, corn = process_cornelius_file(os.path.join(corn_dir, 'cornelius.json'))

    emma_files = os.listdir(emma_dir)
    emma_processed = []
    for emma_file in emma_files:
        emma_processed.append(
            process_emma_file(os.path.join(emma_dir, emma_file))
            .join(lineages
                  .select('lineage', 'nextstrain_clade'), on='nextstrain_clade')
        )
    emma = pl.concat(emma_processed)

    return lineages, emma, corn


def merge_file_dfs(emma_df: pl.DataFrame, corn_df: pl.DataFrame):
    emma_raw = emma_df.with_columns(nuc_change_raw=pl.col('nuc_change').str.slice(1))
    corn_raw = corn_df.with_columns(nuc_change_raw=pl.col('nuc_change').str.slice(1))
    combined = (corn_raw
                .join(emma_raw,
                      on=['lineage', 'nextstrain_clade', 'nuc_change_raw', 'relative_to'],
                      how='full',
                      suffix='_emma',
                      coalesce=True)
                .drop('nuc_change_raw'))

    not_in_emma = len(
        corn_raw.join(emma_raw, on=['lineage', 'nextstrain_clade', 'nuc_change_raw', 'relative_to'], how='anti'))
    not_in_corn = len(
        emma_raw.join(corn_raw, on=['lineage', 'nextstrain_clade', 'nuc_change_raw', 'relative_to'], how='anti'))
    if not_in_emma > 0 or not_in_corn > 0:
        print(f'INFO: unmatched mutations: Emma {not_in_corn}, Cornelius {not_in_emma}')

    coalesced = (
        combined
        .with_columns(
            aa_change=pl.coalesce(pl.col('aa_change_emma'), pl.col('aa_change')),
            nuc_change=pl.coalesce(pl.col('nuc_change_emma'), pl.col('nuc_change')))
        .drop('aa_change_emma', 'nuc_change_emma')
    )

    typed = coalesced.with_columns(
        mutation_type=pl.when(pl.col('aa_change').is_not_null()).then(pl.lit('coding')).otherwise(pl.lit('silent'))
    ).select('lineage', 'nextstrain_clade', 'relative_to', 'mutation_type', 'aa_change', 'nuc_change', 'notes')

    coding_grouped_by_aa = (
        typed
        .filter(pl.col('mutation_type') == 'coding')
        .group_by('lineage', 'nextstrain_clade', 'relative_to', 'mutation_type', 'aa_change')
        .agg(pl.col('nuc_change'), pl.col('notes').first())
    )
    silent_grouped_by_aa = typed.filter(pl.col('mutation_type') == 'silent').with_columns(
        pl.col('nuc_change').cast(pl.List(pl.String)))
    grouped_by_aa = pl.concat([
        coding_grouped_by_aa,
        silent_grouped_by_aa
    ])

    return grouped_by_aa


def reformat_df_to_dicts(merged, lineages):
    aggregate_mutations = (
        merged
        .group_by('lineage', 'nextstrain_clade', 'relative_to', 'mutation_type')
        .agg(pl.struct('aa_change', 'nuc_change', 'notes').alias('mutations'))
    )

    pivot_mutation_types = (
        aggregate_mutations
        .pivot('mutation_type', values='mutations')
        .select('lineage', 'nextstrain_clade', 'relative_to', mutation_type=pl.struct('coding', 'silent'))
    )

    pivot_mutations = (
        pivot_mutation_types
        .pivot('relative_to', values='mutation_type')
        .select('lineage', 'nextstrain_clade', mutations_relative_to=pl.struct('wuhan', 'pango_parent'))
    )

    add_lineages = pivot_mutations.join(lineages, on=['lineage', 'nextstrain_clade'])

    output = add_lineages.select('lineage',
                                 'nextstrain_clade',
                                 'mutations_relative_to',
                                 'children',
                                 'designation_date',
                                 'unaliased',
                                 'parent')

    output_dicts = output.to_dicts()
    for lineage in output_dicts:
        for parent, mutation_types in lineage['mutations_relative_to'].items():
            if not mutation_types['silent']:
                mutation_types['silent'] = []
            for silent_mutation in mutation_types['silent']:
                silent_mutation.pop('aa_change')
                silent_mutation.update({'nuc_change': nuc_string_to_object(silent_mutation['nuc_change'][0])})
                if not silent_mutation['notes']:
                    silent_mutation.pop('notes')
            if not mutation_types['coding']:
                mutation_types['coding'] = []
            for coding_mutation in mutation_types['coding']:
                coding_mutation.update({'aa_change': aa_string_to_object(coding_mutation['aa_change'])})
                coding_mutation.update(
                    {'nuc_change': [nuc_string_to_object(mutation) for mutation in coding_mutation['nuc_change']]})
                if not coding_mutation['notes']:
                    coding_mutation.pop('notes')

    return output_dicts


def main(emma_dir='../tests/data/defining_mutations/emma', corn_dir='../tests/data/defining_mutations/cornelius',
         output_dir='../tests/data/defining_mutations/output'):
    lineages, emma, corn = import_file_dfs(emma_dir, corn_dir)

    merged = merge_file_dfs(emma, corn)

    output = reformat_df_to_dicts(merged, lineages)

    for lineage in output:
        with open(os.path.join(output_dir, f'{lineage["lineage"]}.json'), 'w') as f:
            json.dump(lineage, f)
    # TODO: nextclade parent


if __name__ == '__main__':
    main()
