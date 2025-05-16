import os

import pandas as pd
import polars as pl

from scripts.defining_mutations.helpers import replace_list_of_empty_string, check_reference_column_is_filled
from scripts.defining_mutations.io import load_hand_curated_data
from scripts.defining_mutations.parse_mutations import Mutation, AminoAcidMutation, match_nuc_to_aas
from scripts.defining_mutations.wuhan_reference_sequence import wuhan_reference_sequence


def process_auto_generated_data(mutations: pl.DataFrame):
    empty_strings_removed = mutations.to_pandas().applymap(replace_list_of_empty_string)

    deletion_columns = ['nuc_del_wuhan', 'nuc_del_pango_parent']
    deletions_to_ranges = (
        empty_strings_removed[deletion_columns]
        .applymap(
            lambda deletion_cell: [[int(pos) for pos in del_range.split('-')] for del_range in deletion_cell])
        .applymap(
            lambda deletion_cell: [list(range(del_range[0], del_range[1] + 1)) if len(del_range) > 1 else del_range for
                                   del_range in
                                   deletion_cell])
        .applymap(lambda x: list(pd.core.common.flatten(x)))
    )
    expand_deletions = empty_strings_removed.assign(**{col: deletions_to_ranges[col] for col in deletion_columns})

    reformat_deletions = pl.from_pandas(expand_deletions).with_columns(
        pl.col(col_name).list.eval(
            pl.concat_str(
                pl.lit(wuhan_reference_sequence).str.slice(pl.element()-1, 1),
                pl.element(),
                pl.lit('-'))
        ) for col_name in deletion_columns
    )

    combine_nuc_mutations = reformat_deletions.with_columns(
        nuc_mutation_wuhan=pl.concat_list(
            'nuc_sub_wuhan',
            'nuc_del_wuhan'),
        nuc_mutation_pango_parent=pl.concat_list(
            'nuc_sub_pango_parent',
            'nuc_del_pango_parent'
        ),
        aa_mutation_wuhan=pl.concat_list(
            'aa_sub_wuhan',
            'aa_del_wuhan'
        ),
        aa_mutation_pango_parent=pl.concat_list(
            'aa_sub_pango_parent',
            'aa_del_pango_parent'
        )
    )

    match_aa_mutations = pl.struct('nuc_mutation', 'aa_mutations').map_elements(
        lambda mutation_row: match_nuc_to_aas(mutation_row['nuc_mutation'], mutation_row['aa_mutations']),
        pl.List(pl.String)
    )
    wuhan = (
        combine_nuc_mutations
        .select(
            pl.col('lineage'),
            pl.col('nextstrain_clade'),
            nuc_mutation=pl.col('nuc_mutation_wuhan'),
            aa_mutations=pl.col('aa_mutation_wuhan'))
        .explode('nuc_mutation')
        .with_columns(
            aa_mutations=match_aa_mutations,
            reference=pl.lit('wuhan')
        )
    )
    pango_parent = (
        combine_nuc_mutations
        .select(
            pl.col('lineage'),
            pl.col('nextstrain_clade'),
            nuc_mutation='nuc_mutation_pango_parent',
            aa_mutations=pl.col('aa_mutation_pango_parent'))
        .explode('nuc_mutation')
        .with_columns(
            aa_mutations=match_aa_mutations,
            reference=pl.lit('pango_parent'))
    )

    combined = pl.concat([wuhan, pango_parent])

    mutations_parsed = (
        combined
        .with_columns(
            nuc_mutation=Mutation.parse_polars_mutation_string('nuc_mutation'),
            aa_mutations=AminoAcidMutation.parse_polars_list_of_amino_acid_strings('aa_mutations')
        )
        .drop_nulls('nuc_mutation')
    )

    aa_mutations_split = (
        mutations_parsed.with_columns(
            aa_mutation=pl.col('aa_mutations').list.first(),
            aa_mutation_2=pl.col('aa_mutations').list.slice(1)
        )
    )

    output = aa_mutations_split.select(
        'lineage', 'nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'aa_mutation_2', 'reference'
    )

    check_reference_column_is_filled(output)

    return output


def process_hand_curated_file(mutations: pl.DataFrame) -> pl.DataFrame:
    no_reversions = mutations.filter(pl.col('reversion').is_null())

    with_reference = (
        no_reversions
        .with_columns(
            reference=pl.lit('wuhan')
        )
        .rename({'aa_change': 'aa_mutation', 'aa_change_2': 'aa_mutation_2', 'nuc_change': 'nuc_mutation'})
        .select('nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'aa_mutation_2', 'reference', 'not_in_parent',
                'notes')
    )
    nextclade_parent = (
        with_reference.filter(pl.col('not_in_parent') == 'y')
        .with_columns(
            reference=pl.lit('nextclade_parent'))
    )

    combined = pl.concat([with_reference, nextclade_parent]).drop('not_in_parent')

    mutations_parsed = (
        combined
        .with_columns(
            nuc_mutation=Mutation.parse_polars_mutation_string('nuc_mutation'),
            aa_mutation=AminoAcidMutation.parse_polars_amino_acid_string('aa_mutation'),
            aa_mutation_2=AminoAcidMutation.parse_polars_amino_acid_string('aa_mutation_2')
        )
    )

    output = mutations_parsed.select('nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'aa_mutation_2', 'reference',
                                     'notes')

    check_reference_column_is_filled(output)

    return output


def process_hand_curated_data(hand_curated_data_dir: str, clusters: dict) -> tuple[pl.DataFrame, pl.DataFrame]:
    hand_curated_data_files = os.listdir(hand_curated_data_dir)
    hand_curated_data = pl.concat([
        process_hand_curated_file(load_hand_curated_data(os.path.join(hand_curated_data_dir, hand_curated_file)))
        for hand_curated_file in hand_curated_data_files
    ])

    clades = extract_hand_curated_clade_to_lineage_mapping(clusters)
    used_clades = clades.join(hand_curated_data, on='nextstrain_clade', how='semi')

    with_lineages = hand_curated_data.join(clades, on='nextstrain_clade', how='left')
    assert with_lineages.filter(pl.col('lineage').is_null()).is_empty()

    mutations = with_lineages.select('lineage', 'nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'aa_mutation_2',
                                     'reference', 'notes')

    return used_clades, mutations


def extract_hand_curated_clade_to_lineage_mapping(clusters: dict) -> pl.DataFrame:
    clusters_df = pl.from_records(list(clusters.values())).select('nextstrain_name', 'pango_lineages', 'type')
    only_clades = clusters_df.filter(pl.col('nextstrain_name').is_not_null())
    only_variants = only_clades.filter(pl.col('type').eq('variant')).drop('type')
    with_lineage = only_variants.explode('pango_lineages').unnest('pango_lineages').rename({'name': 'lineage'})

    output = with_lineage.select('lineage', pl.col('nextstrain_name').alias('nextstrain_clade'))
    return output
