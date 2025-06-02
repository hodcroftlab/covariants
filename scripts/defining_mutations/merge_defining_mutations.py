import argparse
import logging

import polars as pl

from scripts.defining_mutations.fetch_nextclade_tree import fetch_nextclade_tree, parse_nextclade_tree, \
    customize_nextclade_tree
from scripts.defining_mutations.helpers import log_mismatches, reformat_mutations_df_to_dicts, log_differences
from scripts.defining_mutations.io import save_mutations_to_file, save_clusters_to_file
from scripts.defining_mutations.preprocess_mutation_data import import_mutation_data
from scripts.clusters import clusters as clusters_data
from scripts.defining_mutations.clade_to_lineage_override import clade_to_lineage


def merge_clusters_data(hand_curated_clades: pl.DataFrame, auto_generated_lineages: pl.DataFrame,
                        clusters_override: list[dict]) -> pl.DataFrame:
    combined_clusters = (
        hand_curated_clades.join(auto_generated_lineages, on=['pango_lineage', 'nextstrain_clade'],
                                 how='full', coalesce=True, maintain_order='left_right')
        .with_columns(pl.col('has_data').or_('has_data_right'))
    )
    if not hand_curated_clades.join(auto_generated_lineages, on=['pango_lineage', 'nextstrain_clade'],
                                    how='anti').is_empty():
        logging.warning('Some hand curated lineages are not present in the auto-generated lineages')

    nextclade_tree = customize_nextclade_tree(parse_nextclade_tree(fetch_nextclade_tree()), clusters_override)
    clusters_with_nextclade = (
        combined_clusters
        .join(nextclade_tree, on=['pango_lineage', 'nextstrain_clade'],
              how='full', nulls_equal=True, coalesce=True,
              maintain_order='left_right')
        .with_columns(pl.col('has_data').fill_null(False))
    )
    output = clusters_with_nextclade.select(
        'pango_lineage', 'nextstrain_clade', 'pango_lineage_unaliased', 'pango_parent', 'pango_children',
        'designation_date', 'who', 'nextstrain_children', 'nextstrain_parent', 'has_data'
    )
    return output


def merge_mutation_data(hand_curated_mutations: pl.DataFrame, auto_generated_mutations: pl.DataFrame) -> pl.DataFrame:
    log_differences(auto_generated_mutations, hand_curated_mutations)

    combined = (auto_generated_mutations
                .join(hand_curated_mutations,
                      on=['pango_lineage', 'nextstrain_clade', pl.col('nuc_mutation').struct.field('pos'), 'reference'],
                      how='full',
                      suffix='_hand_curated',
                      coalesce=True)
                )

    log_mismatches(combined)

    coalesced = (
        combined
        .with_columns(
            pango_lineage=pl.coalesce(pl.col('pango_lineage_hand_curated'), pl.col('pango_lineage')),
            nextstrain_clade=pl.coalesce(pl.col('nextstrain_clade_hand_curated'), pl.col('nextstrain_clade')),
            reference=pl.coalesce(pl.col('reference_hand_curated'), pl.col('reference')),
            aa_mutation=pl.coalesce(pl.col('aa_mutation_hand_curated'), pl.col('aa_mutation')),
            aa_mutation_2=pl.concat_list('aa_mutation_2', 'aa_mutation_2_hand_curated').list.drop_nulls(),
            nuc_mutation=pl.coalesce(pl.col('nuc_mutation_hand_curated'), pl.col('nuc_mutation')),
            reversion=pl.coalesce(pl.col('reversion_hand_curated'), pl.col('reversion')))
        .drop('aa_mutation_hand_curated', 'aa_mutation_2_hand_curated', 'nuc_mutation_hand_curated',
              'reversion_hand_curated')
    )

    typed = (
        coalesced
        .with_columns(
            mutation_type=pl.when(pl.col('aa_mutation').is_not_null()).then(pl.lit('coding')).otherwise(
                pl.lit('silent'))
        )
    )

    position_sorted = (
        typed
        .sort('pango_lineage', 'reference', 'mutation_type', pl.col('nuc_mutation').struct.field('pos'),
              pl.col('nuc_mutation').struct.field('ref'))
        .select('pango_lineage', 'nextstrain_clade', 'reference', 'mutation_type', 'aa_mutation', 'aa_mutation_2',
                'nuc_mutation', 'notes', pl.col('reversion').alias('contains_reversion'))
    )

    coding_grouped_by_aa = (
        position_sorted
        .filter(pl.col('mutation_type') == 'coding')
        .group_by('pango_lineage', 'nextstrain_clade', 'reference', 'mutation_type', 'aa_mutation', maintain_order=True)
        .agg(pl.col('aa_mutation_2').flatten().unique(maintain_order=True).drop_nulls(), pl.col('nuc_mutation'),
             pl.col('notes').unique(maintain_order=True).drop_nulls().str.concat('. '),
             pl.col('contains_reversion').any())
        .with_columns(pl.col('notes').replace('', None))
    )
    silent_grouped_by_aa = (
        position_sorted
        .filter(pl.col('mutation_type') == 'silent')
        .with_columns(pl.when(pl.col('nuc_mutation').is_not_null()).then(pl.concat_list('nuc_mutation')).name.keep())
    )
    grouped_by_aa = pl.concat([
        coding_grouped_by_aa,
        silent_grouped_by_aa.cast(
            {
                'aa_mutation_2': pl.List(
                    pl.Struct({'gene': pl.String, 'ref': pl.String, 'pos': pl.Int64, 'alt': pl.String})),
            }
        )
    ]).rename({'nuc_mutation': 'nuc_mutations'})

    aa_mutations_merged = (
        grouped_by_aa.with_columns(
            pl.concat_list('aa_mutation', 'aa_mutation_2').list.drop_nulls().alias('aa_mutations')
        ))

    output = aa_mutations_merged.select(
        'pango_lineage', 'nextstrain_clade', 'reference', 'mutation_type', 'aa_mutations', 'nuc_mutations', 'notes',
        'contains_reversion'
    )

    return output


def main(hand_curated_data_dir='defining_mutations',
         auto_generated_data_dir='data',
         output_dir='web/public/data/definingMutations',
         dry_run=False,
         clusters=clusters_data,
         clusters_override=clade_to_lineage):
    hand_curated_clades, auto_generated_lineages, hand_curated_mutations, auto_generated_mutations = import_mutation_data(
        hand_curated_data_dir,
        auto_generated_data_dir,
        clusters,
        clusters_override
    )

    clusters = merge_clusters_data(hand_curated_clades, auto_generated_lineages, clusters_override)

    merged_mutations = merge_mutation_data(hand_curated_mutations, auto_generated_mutations)

    mutations = reformat_mutations_df_to_dicts(merged_mutations)

    if not dry_run:
        save_mutations_to_file(mutations, output_dir)
        save_clusters_to_file(clusters, output_dir)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('hand_curated_data_dir', help='the folder where hand-curated data lives')
    parser.add_argument('auto_generated_data_dir', help='the folder where auto-generated data lives')
    parser.add_argument('output_dir', help='generated files are placed here')
    parser.add_argument('-d', '--dry-run', help='do not generate files', action='store_true')
    args = vars(parser.parse_args())
    main(**args)
