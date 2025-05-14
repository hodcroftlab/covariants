import logging

import polars as pl
import numpy as np

def check_reference_column_is_filled(df: pl.DataFrame) -> None:
    if not df.filter(pl.col('reference').is_null()).is_empty():
        raise ValueError(f'Could not assign reference point for mutations {df.filter(pl.col("reference").is_null())}')


def log_mismatches(auto_generated_mutations, hand_curated_mutations, combined_mutations):
    not_in_hand_curated = len(
        auto_generated_mutations.join(hand_curated_mutations,
                                      on=['lineage', 'nextstrain_clade', pl.col('nuc_mutation').struct.field('pos'),
                                          'reference'],
                                      how='anti'))
    not_in_auto_generated = len(
        hand_curated_mutations.join(auto_generated_mutations,
                                    on=['lineage', 'nextstrain_clade', pl.col('nuc_mutation').struct.field('pos'),
                                        'reference'],
                                    how='anti'))
    if not_in_hand_curated > 0 or not_in_auto_generated > 0:
        logging.info(f'Unmatched mutations: hand-curated {not_in_auto_generated}, auto-generated {not_in_hand_curated}')

    mismatch_nuc_mutation = (
        combined_mutations
        .filter(pl.col('nuc_mutation').ne(pl.col('nuc_mutation_hand_curated')).and_(pl.col('nuc_mutation').struct.field('alt').ne('-')))
        .select('lineage', 'nextstrain_clade', 'reference', 'nuc_mutation', 'nuc_mutation_hand_curated', 'aa_mutation', 'aa_mutation_hand_curated', 'aa_mutation_2', 'aa_mutation_2_hand_curated')
    )
    if not mismatch_nuc_mutation.is_empty():
        logging.warning(f'Found {len(mismatch_nuc_mutation)} mismatches in nuc_mutation.')
    mismatching_aa_mutation = (
        combined_mutations
        .filter(pl.col('aa_mutation').ne(pl.col('aa_mutation_hand_curated')))
        .select('lineage', 'nextstrain_clade', 'reference', 'nuc_mutation', 'nuc_mutation_hand_curated', 'aa_mutation', 'aa_mutation_hand_curated', 'aa_mutation_2', 'aa_mutation_2_hand_curated')
    )
    if not mismatching_aa_mutation.is_empty():
        logging.warning(f'Found {len(mismatching_aa_mutation)} mismatches in aa_mutation.')
    mismatching_aa_mutation_2 = (
        combined_mutations
        .filter(pl.col('aa_mutation_2').list.first().ne(pl.col('aa_mutation_2_hand_curated')))
        .select('lineage', 'nextstrain_clade', 'reference', 'nuc_mutation', 'nuc_mutation_hand_curated', 'aa_mutation', 'aa_mutation_hand_curated', 'aa_mutation_2', 'aa_mutation_2_hand_curated')
    )
    if not mismatching_aa_mutation_2.is_empty():
        logging.warning(f'Found {len(mismatching_aa_mutation_2)} mismatches in aa_mutation_2.')


def replace_list_of_empty_string(y: str | list | np.ndarray) -> str | list | np.ndarray:
    if len(y) == 1 and y[0] == '':
        return []
    return y

def reformat_df_to_dicts(merged: pl.DataFrame, lineages: pl.DataFrame) -> dict:
    has_mutations = merged.filter(pl.col('nuc_mutations').is_not_null())
    no_mutations = merged.filter(pl.col('nuc_mutations').is_null())

    aggregate_has_mutations = (
        has_mutations
        .group_by('lineage', 'nextstrain_clade', 'reference', 'mutation_type', maintain_order=True)
        .agg(pl.struct('aa_mutations', 'nuc_mutations', 'notes').flatten().drop_nulls().alias('mutations'))
    )

    aggregate_no_mutations = (
        no_mutations
        .group_by('lineage', 'nextstrain_clade', 'reference', 'mutation_type', maintain_order=True)
        .agg()
        .with_columns(mutations=None)
    )

    aggregate_mutations = (
        pl.concat([aggregate_has_mutations, aggregate_no_mutations])
    )

    pivot_mutation_types = (
        aggregate_mutations
        .pivot('mutation_type', values='mutations')
        .select('lineage', 'nextstrain_clade',
                mutation_type=pl.when(pl.col('coding').is_not_null().or_(pl.col('silent').is_not_null())).then(
                    pl.struct('reference', 'coding', 'silent')))
        .rename({'mutation_type': 'mutations'})
        .group_by('lineage', 'nextstrain_clade').agg('mutations')
        .with_columns(pl.col('mutations').list.drop_nulls())
    )

    add_lineages = pivot_mutation_types.join(lineages, on=['lineage', 'nextstrain_clade'])

    output = add_lineages.select('lineage',
                                 'nextstrain_clade',
                                 'mutations',
                                 'children',
                                 'designation_date',
                                 'unaliased',
                                 'parent',
                                 'nextstrain_parent',
                                 'nextstrain_children')

    output_dicts = output.to_dicts()
    for lineage in output_dicts:
        if lineage['nextstrain_children'] is None:
            lineage.pop('nextstrain_children')
        if lineage['nextstrain_parent'] is None:
            lineage.pop('nextstrain_parent')
        for mutations in lineage['mutations']:
            for mutation_type in ['coding', 'silent']:
                mutations[mutation_type] = mutations.get(mutation_type) or []
                for mutation in mutations[mutation_type]:
                    if mutation_type == 'silent':
                        mutation.update({'nuc_mutation': mutation['nuc_mutations'].pop()})
                        mutation.pop('nuc_mutations')
                        mutation.pop('aa_mutations')
                    if not mutation['notes']:
                        mutation.pop('notes')

    return output_dicts