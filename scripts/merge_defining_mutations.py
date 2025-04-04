import json
import logging
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


def parse_mutation(nuc: str) -> tuple[str, int, str]:
    return nuc[0], int(nuc[1:-1]), nuc[-1]


def split_aa(aa: str) -> tuple[str, str, int, str]:
    gene, aa = aa.split(':')
    return gene, *parse_mutation(aa)


def nuc_location_to_genes(nuc_location: int) -> list[str]:
    genes = []
    for gene, bounds in GENE_BOUNDS.items():
        if bounds[0] <= nuc_location <= bounds[1]:
            genes.append(gene)
    return genes


def match_nuc_to_aas(nuc: str | None, aas: list[str]) -> str | None:
    if not nuc:
        return None
    nuc_old, nuc_location, nuc_new = parse_mutation(nuc)
    genes = nuc_location_to_genes(nuc_location)
    if len(genes) == 0:
        return None
    # TODO: this does not match correctly for all cases right now
    locations = [int(np.floor((nuc_location - GENE_BOUNDS[gene][0]) / 3)) + 1 for gene in genes]
    for aa in aas:
        gene, aa_old, aa_location, aa_new = split_aa(aa)
        if gene in genes and aa_location in locations:
            return aa


def nuc_string_to_dict(nuc):
    ref, pos, alt = parse_mutation(nuc)
    return {'ref': ref, 'pos': pos, 'alt': alt}


def aa_string_to_object(aa):
    gene, ref, pos, alt = split_aa(aa)
    return {'gene': gene, 'ref': ref, 'pos': pos, 'alt': alt}


def remove_empty_strings(y: str | list | np.ndarray) -> str | list | np.ndarray:
    if len(y) == 1:
        if y[0] == '':
            return []
    return y


def process_auto_generated_data(mutations: pl.DataFrame):
    empty_strings_removed = mutations.to_pandas().applymap(remove_empty_strings)

    deletion_columns = ['nuc_del_wuhan', 'nuc_del_pango_parent']
    deletions_to_ranges = (
        empty_strings_removed[deletion_columns]
        .applymap(
            lambda deletion_cell: [[int(pos) for pos in del_range.split('-')] for del_range in deletion_cell])
        .applymap(
            lambda deletion_cell: [list(range(del_range[0], del_range[1] + 1)) if len(del_range) > 1 else del_range for del_range in
                                   deletion_cell])
        .applymap(lambda x: list(pd.core.common.flatten(x)))
    )
    expand_deletions = empty_strings_removed.assign(**{col: deletions_to_ranges[col] for col in deletion_columns})

    # TODO: clarify if using 'X' here is the correct way to work around the missing nucleotide in auto-generated deletions: https://github.com/hodcroftlab/covariants/issues/577
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

    match_aa_changes = pl.struct('nuc_change', 'aa_change').map_elements(
        lambda mutation_row: match_nuc_to_aas(mutation_row['nuc_change'], mutation_row['aa_change']), pl.String
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

    check_relative_to_column_is_filled(output)

    return output


def load_auto_generated_data(path):
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
        'lineage',
        'unaliased',
        'parent',
        'children',
        'nextstrain_clade',
        'designation_date')

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

    return lineages, mutations


def process_hand_curated_file(path: str) -> pl.DataFrame:
    filename = os.path.basename(path)
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

    check_relative_to_column_is_filled(output)

    return output


def check_relative_to_column_is_filled(df: pl.DataFrame) -> None:
    if not df.filter(pl.col('relative_to').is_null()).is_empty():
        raise ValueError(f'Could not assign reference point for mutations {df.filter(pl.col("relative_to").is_null())}')


def import_mutation_data(hand_curated_data_dir: str, auto_generated_data_dir: str) -> tuple[
    pl.DataFrame, pl.DataFrame, pl.DataFrame]:

    lineages, auto_generated_mutations_raw = load_auto_generated_data(os.path.join(auto_generated_data_dir, 'cornelius.json'))
    auto_generated_mutations = process_auto_generated_data(auto_generated_mutations_raw)

    hand_curated_mutations = (
        import_hand_curated_data(hand_curated_data_dir)
        .join(lineages.select('lineage', 'nextstrain_clade'), on='nextstrain_clade')
    )

    return lineages, hand_curated_mutations, auto_generated_mutations


def import_hand_curated_data(hand_curated_data_dir: str) -> pl.DataFrame:
    hand_curated_data_files = os.listdir(hand_curated_data_dir)
    hand_curated_data = pl.concat([
        process_hand_curated_file(os.path.join(hand_curated_data_dir, hand_curated_file)) for hand_curated_file in
        hand_curated_data_files
    ])

    return hand_curated_data


def merge_mutation_data(hand_curated_mutations: pl.DataFrame, auto_generated_mutations: pl.DataFrame) -> pl.DataFrame:
    hand_curated_raw = hand_curated_mutations.with_columns(nuc_change_raw=pl.col('nuc_change').str.slice(1))
    auto_generated_raw = auto_generated_mutations.with_columns(nuc_change_raw=pl.col('nuc_change').str.slice(1))
    combined = (auto_generated_raw
                .join(hand_curated_raw,
                      on=['lineage', 'nextstrain_clade', 'nuc_change_raw', 'relative_to'],
                      how='full',
                      suffix='_hand_curated',
                      coalesce=True)
                .drop('nuc_change_raw'))

    not_in_hand_curated = len(
        auto_generated_raw.join(hand_curated_raw, on=['lineage', 'nextstrain_clade', 'nuc_change_raw', 'relative_to'],
                                how='anti'))
    not_in_auto_generated = len(
        hand_curated_raw.join(auto_generated_raw, on=['lineage', 'nextstrain_clade', 'nuc_change_raw', 'relative_to'],
                              how='anti'))
    if not_in_hand_curated > 0 or not_in_auto_generated > 0:
        logging.info(f'unmatched mutations: hand-curated {not_in_auto_generated}, auto-generated {not_in_hand_curated}')

    coalesced = (
        combined
        .with_columns(
            aa_change=pl.coalesce(pl.col('aa_change_hand_curated'), pl.col('aa_change')),
            nuc_change=pl.coalesce(pl.col('nuc_change_hand_curated'), pl.col('nuc_change')))
        .drop('aa_change_hand_curated', 'nuc_change_hand_curated')
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
        for mutation_types in lineage['mutations_relative_to'].values():
            for mutation_type, mutations in mutation_types.items():
                mutations = mutations or []
                for mutation in mutations:
                    if mutation_type == 'coding':
                        mutation.update({'nuc_change': [nuc_string_to_dict(mut) for mut in mutation['nuc_change']]})
                        mutation.update({'aa_change': aa_string_to_object(mutation['aa_change'])})
                    else:
                        mutation.update({'nuc_change': nuc_string_to_dict(mutation['nuc_change'][0])})
                        mutation.pop('aa_change')
                    if not mutation['notes']:
                        mutation.pop('notes')

    return output_dicts


def save_mutations_to_file(output: pl.DataFrame, output_dir: str):
    for lineage in output:
        with open(os.path.join(output_dir, f'{lineage["lineage"]}.json'), 'w') as f:
            json.dump(lineage, f)


def main(hand_curated_data_dir='../tests/data/defining_mutations/emma',
         auto_generated_data_dir='../tests/data/defining_mutations/cornelius',
         output_dir='../tests/data/defining_mutations/output'):
    lineages, hand_curated_mutations, auto_generated_mutations = import_mutation_data(hand_curated_data_dir,
                                                                                      auto_generated_data_dir)

    merged_mutations = merge_mutation_data(hand_curated_mutations, auto_generated_mutations)

    output = reformat_df_to_dicts(merged_mutations, lineages)

    save_mutations_to_file(output, output_dir)
    # TODO: nextclade parent: https://github.com/hodcroftlab/covariants/issues/582


if __name__ == '__main__':
    main()
