import logging

import polars as pl
import numpy as np


def check_reference_column_is_filled(df: pl.DataFrame) -> None:
    if not df.filter(pl.col('reference').is_null()).is_empty():
        raise ValueError(f'Could not assign reference point for mutations {df.filter(pl.col("reference").is_null())}')


def log_differences(auto_generated_mutations: pl.DataFrame, hand_curated_mutations: pl.DataFrame) -> tuple[
    pl.DataFrame, pl.DataFrame]:

    not_in_hand_curated = (
        auto_generated_mutations.join(hand_curated_mutations,
                                      on=['pango_lineage', 'nextstrain_clade',
                                          pl.col('nuc_mutation').struct.field('pos'),
                                          'reference'],
                                      how='anti')
    )
    not_in_auto_generated = (
        hand_curated_mutations.join(auto_generated_mutations,
                                    on=['pango_lineage', 'nextstrain_clade', pl.col('nuc_mutation').struct.field('pos'),
                                        'reference'],
                                    how='anti')
    )
    if not (not_in_hand_curated.is_empty() and not_in_auto_generated.is_empty()):
        logging.info(
            f'Unmatched mutations: hand-curated {len(not_in_auto_generated)}, auto-generated {len(not_in_hand_curated)}')

    return not_in_hand_curated, not_in_auto_generated


def log_mismatches(combined_mutations) -> tuple[pl.DataFrame, pl.DataFrame, pl.DataFrame]:
    mismatch_nuc_mutation = (
        combined_mutations
        .filter(pl.col('nuc_mutation').ne(pl.col('nuc_mutation_hand_curated')))
        .select('pango_lineage', 'nextstrain_clade', 'reference', 'nuc_mutation', 'nuc_mutation_hand_curated',
                'aa_mutation', 'aa_mutation_hand_curated', 'aa_mutation_2', 'aa_mutation_2_hand_curated')
    )
    if not mismatch_nuc_mutation.is_empty():
        logging.warning(f'Found {len(mismatch_nuc_mutation)} mismatches in nuc_mutation.')
    mismatching_aa_mutation = (
        combined_mutations
        .filter(pl.col('aa_mutation').ne(pl.col('aa_mutation_hand_curated')))
        .select('pango_lineage', 'nextstrain_clade', 'reference', 'nuc_mutation', 'nuc_mutation_hand_curated',
                'aa_mutation', 'aa_mutation_hand_curated', 'aa_mutation_2', 'aa_mutation_2_hand_curated')
    )
    if not mismatching_aa_mutation.is_empty():
        logging.warning(f'Found {len(mismatching_aa_mutation)} mismatches in aa_mutation.')
    mismatching_aa_mutation_2 = (
        combined_mutations
        .filter(pl.col('aa_mutation_2').list.first().ne(pl.col('aa_mutation_2_hand_curated')))
        .select('pango_lineage', 'nextstrain_clade', 'reference', 'nuc_mutation', 'nuc_mutation_hand_curated',
                'aa_mutation', 'aa_mutation_hand_curated', 'aa_mutation_2', 'aa_mutation_2_hand_curated')
    )
    if not mismatching_aa_mutation_2.is_empty():
        logging.warning(f'Found {len(mismatching_aa_mutation_2)} mismatches in aa_mutation_2.')

    return mismatch_nuc_mutation, mismatching_aa_mutation, mismatching_aa_mutation_2


def replace_list_of_empty_string(y: str | list | np.ndarray) -> str | list | np.ndarray:
    if len(y) == 1 and y[0] == '':
        return []
    return y


def reformat_mutations_df_to_dicts(merged: pl.DataFrame) -> dict:
    has_mutations = merged.filter(pl.col('nuc_mutations').is_not_null())
    no_mutations = merged.filter(pl.col('nuc_mutations').is_null())

    aggregate_has_mutations = (
        has_mutations
        .group_by('pango_lineage', 'nextstrain_clade', 'reference', 'mutation_type', maintain_order=True)
        .agg(pl.struct('aa_mutations', 'nuc_mutations', 'notes', 'contains_reversion').flatten().drop_nulls().alias(
            'mutations'))
    )

    aggregate_no_mutations = (
        no_mutations
        .group_by('pango_lineage', 'nextstrain_clade', 'reference', 'mutation_type', maintain_order=True)
        .agg()
        .with_columns(mutations=None)
    )

    aggregate_mutations = (
        pl.concat([aggregate_has_mutations, aggregate_no_mutations])
    )

    pivot_mutation_types = (
        aggregate_mutations
        .pivot('mutation_type', values='mutations')
        .select('pango_lineage', 'nextstrain_clade',
                mutation_type=pl.when(pl.col('coding').is_not_null().or_(pl.col('silent').is_not_null())).then(
                    pl.struct('reference', 'coding', 'silent')))
        .rename({'mutation_type': 'mutations'})
        .group_by('pango_lineage', 'nextstrain_clade').agg('mutations')
        .with_columns(pl.col('mutations').list.drop_nulls())
    )

    output = pivot_mutation_types.select('pango_lineage',
                                         'nextstrain_clade',
                                         'mutations')

    output_dicts = output.to_dicts()
    for lineage in output_dicts:
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
                    if not mutation['contains_reversion']:
                        mutation.pop('contains_reversion')

    return output_dicts
