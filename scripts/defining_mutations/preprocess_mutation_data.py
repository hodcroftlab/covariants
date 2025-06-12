import logging
import os

import pandas as pd
import polars as pl

from scripts.defining_mutations.helpers import replace_list_of_empty_string, check_reference_column_is_filled
from scripts.defining_mutations.io import load_hand_curated_data, load_auto_generated_data
from scripts.defining_mutations.parse_mutations import Mutation, AminoAcidMutation, match_nuc_to_aas
from scripts.defining_mutations.wuhan_reference_sequence import wuhan_reference_sequence


def process_auto_generated_data(mutations: pl.DataFrame) -> pl.DataFrame:
    empty_strings_removed = mutations.to_pandas().applymap(replace_list_of_empty_string)

    deletion_columns = ['nuc_del_wuhan', 'nuc_del_pango_parent', 'nuc_del_rev_wuhan']
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
                pl.lit(wuhan_reference_sequence).str.slice(pl.element() - 1, 1),
                pl.element(),
                pl.lit('-'))
        ) for col_name in deletion_columns
    )

    fake_reversions_removed = (
        reformat_deletions
        # first correct subs, then revs
        # subs only have to be corrected for pango parent, revs are always relative to wuhan and have to be adjusted
        .with_columns(
            nuc_sub_pango_parent=pl.struct(muts=pl.col('nuc_sub_pango_parent'), revs=pl.col('nuc_sub_rev_wuhan'))
            .map_elements(
                lambda x: remove_fake_reversions(x['muts'], x['revs'], 'nuc', 'pango', 'substitutions')),
            aa_sub_pango_parent=pl.struct(muts=pl.col('aa_sub_pango_parent'), revs=pl.col('aa_sub_rev_wuhan'))
            .map_elements(
                lambda x: remove_fake_reversions(x['muts'], x['revs'], 'aa', 'pango', 'substitutions')),
        )
        .with_columns(
            nuc_sub_rev_wuhan=pl.struct(muts=pl.col('nuc_sub_wuhan'), revs=pl.col('nuc_sub_rev_wuhan'))
            .map_elements(
                lambda x: remove_fake_reversions(x['muts'], x['revs'], 'nuc', 'wuhan', 'reversions')),
            aa_sub_rev_wuhan=pl.struct(muts=pl.col('aa_sub_wuhan'), revs=pl.col('aa_sub_rev_wuhan'))
            .map_elements(
                lambda x: remove_fake_reversions(x['muts'], x['revs'], 'aa', 'wuhan', 'reversions')),
        )
    )

    combine_nuc_mutations = fake_reversions_removed.with_columns(
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
            pl.col('pango_lineage'),
            pl.col('nextstrain_clade'),
            nuc_mutation=pl.col('nuc_mutation_wuhan'),
            aa_mutations=pl.col('aa_mutation_wuhan'))
        .explode('nuc_mutation')
        .with_columns(
            aa_mutations=match_aa_mutations,
            reference=pl.lit('wuhan'),
            reversion=False,
        )
    )
    pango_parent = (
        combine_nuc_mutations
        .select(
            pl.col('pango_lineage'),
            pl.col('nextstrain_clade'),
            nuc_mutation='nuc_mutation_pango_parent',
            aa_mutations=pl.col('aa_mutation_pango_parent'))
        .explode('nuc_mutation')
        .with_columns(
            aa_mutations=match_aa_mutations,
            reference=pl.lit('pango_parent'),
            reversion=False,
        )
    )

    reversions = (
        combine_nuc_mutations
        .select(
            pl.col('pango_lineage'),
            pl.col('nextstrain_clade'),
            nuc_mutation=pl.col('nuc_sub_rev_wuhan'),
            aa_mutations=pl.col('aa_sub_rev_wuhan'))
        .explode('nuc_mutation')
        .with_columns(
            aa_mutations=match_aa_mutations,
            reference=pl.lit('wuhan'),
            reversion=True
        )
    )
    deletion_reversions = (
        combine_nuc_mutations
        .select(
            pl.col('pango_lineage'),
            pl.col('nextstrain_clade'),
            nuc_mutation=pl.col('nuc_del_rev_wuhan'),
            aa_mutations=pl.col('aa_del_rev_wuhan'))
        .explode('nuc_mutation')
        .with_columns(
            aa_mutations=match_aa_mutations,
            reference=pl.lit('wuhan'),
            reversion=True
        )
    )

    combined = pl.concat([wuhan, pango_parent, reversions, deletion_reversions])

    mutations_parsed = (
        combined
        .with_columns(
            nuc_mutation=Mutation.parse_polars_mutation_string('nuc_mutation'),
            aa_mutations=AminoAcidMutation.parse_polars_list_of_amino_acid_strings('aa_mutations')
        )
        .drop_nulls('nuc_mutation')
    )

    reversions_reformatted = mutations_parsed.with_columns(
        nuc_mutation=pl.when('reversion')
        .then(pl.col('nuc_mutation').struct.with_fields(pl.field('ref'), pl.field('pos'), alt=pl.field('ref')))
        .otherwise(pl.col('nuc_mutation')),
        aa_mutations=pl.when('reversion')
        .then(pl.col('aa_mutations').list.eval(
            pl.element().struct.with_fields(pl.field('ref'), pl.field('pos'), alt=pl.field('ref'))))
        .otherwise(pl.col('aa_mutations'))
    )

    aa_mutations_split = (
        reversions_reformatted.with_columns(
            aa_mutation=pl.col('aa_mutations').list.first(),
            aa_mutation_2=pl.col('aa_mutations').list.slice(1)
        )
    )

    output = aa_mutations_split.select(
        'pango_lineage', 'nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'aa_mutation_2', 'reference', 'reversion'
    )

    check_reference_column_is_filled(output)

    return output


def process_hand_curated_file(mutations: pl.DataFrame) -> pl.DataFrame:
    with_reference = (
        mutations
        .with_columns(
            reference=pl.lit('wuhan'),
            reversion=pl.col('reversion').eq('y'),
            not_in_parent=pl.col('not_in_parent').eq('y')
        )
        .rename({'aa_change': 'aa_mutation', 'aa_change_2': 'aa_mutation_2', 'nuc_change': 'nuc_mutation'})
        .select('nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'aa_mutation_2', 'reference', 'not_in_parent',
                'reversion', 'notes', 'parent_ref_nuc', 'parent_ref_aa', 'parent_ref_aa_2')
    )
    nextclade_parent = (
        with_reference.filter('not_in_parent')
        .with_columns(
            nuc_mutation=pl.when(pl.col('parent_ref_nuc').is_not_null())
            .then(pl.concat_str(pl.col('parent_ref_nuc'), pl.col('nuc_mutation').str.slice(1)))
            .otherwise(pl.col('nuc_mutation')),
            aa_mutation=pl.when(pl.col('parent_ref_aa').is_not_null())
            .then(pl.concat_str(pl.col('aa_mutation').str.split(':').list.first(), pl.lit(':'), pl.col('parent_ref_aa'),
                                pl.col('aa_mutation').str.split(':').list.last().str.slice(1)))
            .otherwise(pl.col('aa_mutation')),
            aa_mutation_2=pl.when(pl.col('parent_ref_aa_2').is_not_null())
            .then(pl.concat_str(pl.col('aa_mutation_2').str.split(':').list.first(), pl.lit(':'), pl.col('parent_ref_aa_2'),
                                pl.col('aa_mutation_2').str.split(':').list.last().str.slice(1)))
            .otherwise(pl.col('aa_mutation_2')),
            reference=pl.lit('nextclade_parent')
        )
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
                                     'notes', 'reversion')

    check_reference_column_is_filled(output)

    return output


def process_hand_curated_data(hand_curated_data_dir: str, clusters: dict, clusters_override: list[dict]) -> tuple[
    pl.DataFrame, pl.DataFrame]:
    hand_curated_data_files = os.listdir(hand_curated_data_dir)
    hand_curated_data = pl.concat([
        process_hand_curated_file(load_hand_curated_data(os.path.join(hand_curated_data_dir, hand_curated_file)))
        for hand_curated_file in hand_curated_data_files
    ])

    clades = extract_hand_curated_clade_to_lineage_mapping(clusters, clusters_override)

    with_lineages = hand_curated_data.join(clades, on='nextstrain_clade', how='left')
    if not with_lineages.filter(pl.col('pango_lineage').is_null()).is_empty():
        logging.warning(f'Clades without lineages found {with_lineages.filter(pl.col("pango_lineage").is_null())}')

    mutations = with_lineages.select('pango_lineage', 'nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'aa_mutation_2',
                                     'reference', 'notes', 'reversion')

    clades_with_data_info = clades.join(
        clades.join(hand_curated_data, on='nextstrain_clade', how='semi').with_columns(has_data=True),
        on=['nextstrain_clade', 'pango_lineage'], how='left', nulls_equal=True
    ).with_columns(pl.col('has_data').fill_null(False))

    return clades_with_data_info, mutations


def import_mutation_data(hand_curated_data_dir: str, auto_generated_data_dir: str, clusters: dict,
                         clusters_override: list[dict]) -> tuple[
    pl.DataFrame, pl.DataFrame, pl.DataFrame, pl.DataFrame]:
    auto_generated_lineages, auto_generated_mutations_raw = load_auto_generated_data(
        os.path.join(auto_generated_data_dir, 'auto_generated.json'))

    auto_generated_mutations = process_auto_generated_data(auto_generated_mutations_raw)

    hand_curated_clades, hand_curated_mutations = process_hand_curated_data(hand_curated_data_dir, clusters,
                                                                            clusters_override)

    return hand_curated_clades, auto_generated_lineages, hand_curated_mutations, auto_generated_mutations


def extract_hand_curated_clade_to_lineage_mapping(clusters: dict, clusters_overwrite: list[dict]) -> pl.DataFrame:
    clusters_df = pl.from_records(list(clusters.values())).select('nextstrain_name', 'pango_lineages', 'type')
    only_clades = clusters_df.filter(pl.col('nextstrain_name').is_not_null())
    only_variants = only_clades.filter(pl.col('type').eq('variant')).drop('type')
    with_lineage = (
        only_variants.explode('pango_lineages')
        .unnest('pango_lineages')
        .select(pl.col('nextstrain_name').alias('nextstrain_clade'), pl.col('name').alias('pango_lineage'))
    )

    overwrite_df = pl.from_records(clusters_overwrite)
    has_lineage = with_lineage.join(overwrite_df, on='nextstrain_clade', how='anti')
    clades = pl.concat([has_lineage, overwrite_df])

    output = clades.select('pango_lineage', 'nextstrain_clade')
    return output


def remove_fake_reversions(mutation_strings: list[str], reversion_strings: list[str], mutation_type='nuc',
                           reference='wuhan', target='substitutions') -> \
        list[str]:
    if mutation_type == 'nuc':
        parsing_function = Mutation.parse_mutation_string
        is_corresponding_reversion = lambda mut, rev: mut.position == rev.position
    else:
        parsing_function = AminoAcidMutation.parse_amino_acid_string
        is_corresponding_reversion = lambda mut, rev: mut.position == rev.position and mut.gene == rev.gene

    for mutation in mutation_strings:
        mut_obj = parsing_function(mutation)
        for reversion in reversion_strings:
            rev_obj = parsing_function(reversion)
            if is_corresponding_reversion(mut_obj, rev_obj):
                if reference == 'pango':
                    mut_obj.symbol_from = rev_obj.symbol_to
                    mutation_strings[mutation_strings.index(mutation)] = mut_obj.to_code()
                reversion_strings.remove(reversion)

    return mutation_strings if target == 'substitutions' else reversion_strings
