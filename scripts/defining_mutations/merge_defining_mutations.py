import argparse
import os

import polars as pl

from scripts.defining_mutations.fetch_nextclade_tree import fetch_nextclade_tree, parse_nextclade_tree
from scripts.defining_mutations.helpers import log_mismatches, reformat_df_to_dicts
from scripts.defining_mutations.io import save_mutations_to_file, save_lineages_to_file, load_auto_generated_data, \
    load_hand_curated_data
from scripts.defining_mutations.preprocess_mutation_data import process_auto_generated_data, process_hand_curated_file


def import_mutation_data(hand_curated_data_dir: str, auto_generated_data_dir: str) -> tuple[
    pl.DataFrame, pl.DataFrame, pl.DataFrame]:
    lineages, auto_generated_mutations_raw = load_auto_generated_data(
        os.path.join(auto_generated_data_dir, 'auto_generated.json'))
    nextclade_tree = parse_nextclade_tree(fetch_nextclade_tree())
    lineages_with_nextclade = lineages.join(nextclade_tree, on=['lineage', 'nextstrain_clade'], how='left')

    auto_generated_mutations = process_auto_generated_data(auto_generated_mutations_raw)

    # TODO: get lineages for the join from clusters.py. Using the auto-generated lineages leads to duplication of the hand-curated data
    hand_curated_mutations = (
        import_hand_curated_data(hand_curated_data_dir)
        .join(lineages.select('lineage', 'nextstrain_clade'), on='nextstrain_clade')
    )

    return lineages_with_nextclade, hand_curated_mutations, auto_generated_mutations


def import_hand_curated_data(hand_curated_data_dir: str) -> pl.DataFrame:
    hand_curated_data_files = os.listdir(hand_curated_data_dir)
    hand_curated_data = pl.concat([
        process_hand_curated_file(load_hand_curated_data(os.path.join(hand_curated_data_dir, hand_curated_file)))
        for hand_curated_file in hand_curated_data_files
    ])

    return hand_curated_data


def merge_mutation_data(hand_curated_mutations: pl.DataFrame, auto_generated_mutations: pl.DataFrame) -> pl.DataFrame:
    combined = (auto_generated_mutations
                .join(hand_curated_mutations,
                      on=['lineage', 'nextstrain_clade', pl.col('nuc_mutation').struct.field('pos'), 'reference'],
                      how='full',
                      suffix='_hand_curated',
                      coalesce=True)
                )

    log_mismatches(auto_generated_mutations, hand_curated_mutations, combined)

    coalesced = (
        combined
        .with_columns(
            lineage=pl.coalesce(pl.col('lineage_hand_curated'), pl.col('lineage')),
            nextstrain_clade=pl.coalesce(pl.col('nextstrain_clade_hand_curated'), pl.col('nextstrain_clade')),
            reference=pl.coalesce(pl.col('reference_hand_curated'), pl.col('reference')),
            aa_mutation=pl.coalesce(pl.col('aa_mutation_hand_curated'), pl.col('aa_mutation')),
            aa_mutation_2=pl.concat_list('aa_mutation_2', 'aa_mutation_2_hand_curated').list.drop_nulls(),
            nuc_mutation=pl.coalesce(pl.col('nuc_mutation_hand_curated'), pl.col('nuc_mutation')))
        .drop('aa_mutation_hand_curated', 'aa_mutation_2_hand_curated', 'nuc_mutation_hand_curated')
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
        .sort('lineage', 'reference', 'mutation_type', pl.col('nuc_mutation').struct.field('pos'),
              pl.col('nuc_mutation').struct.field('ref'))
        .select('lineage', 'nextstrain_clade', 'reference', 'mutation_type', 'aa_mutation', 'aa_mutation_2',
                'nuc_mutation', 'notes')
    )

    coding_grouped_by_aa = (
        position_sorted
        .filter(pl.col('mutation_type') == 'coding')
        .group_by('lineage', 'nextstrain_clade', 'reference', 'mutation_type', 'aa_mutation', maintain_order=True)
        .agg(pl.col('aa_mutation_2').flatten().unique(maintain_order=True).drop_nulls(), pl.col('nuc_mutation'),
             pl.col('notes').unique(maintain_order=True).drop_nulls().str.concat('. '))
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
        'lineage', 'nextstrain_clade', 'reference', 'mutation_type', 'aa_mutations', 'nuc_mutations', 'notes'
    )

    return output


def main(hand_curated_data_dir='defining_mutations',
         auto_generated_data_dir='data',
         output_dir='web/public/data/definingMutations',
         dry_run=False):
    lineages, hand_curated_mutations, auto_generated_mutations = import_mutation_data(hand_curated_data_dir,
                                                                                      auto_generated_data_dir)

    merged_mutations = merge_mutation_data(hand_curated_mutations, auto_generated_mutations)

    output = reformat_df_to_dicts(merged_mutations, lineages)

    if not dry_run:
        save_mutations_to_file(output, output_dir)
        save_lineages_to_file(lineages, output_dir)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('hand_curated_data_dir', help='the folder where hand-curated data lives')
    parser.add_argument('auto_generated_data_dir', help='the folder where auto-generated data lives')
    parser.add_argument('output_dir', help='generated files are placed here')
    parser.add_argument('-d', '--dry-run', help='do not generate files', action='store_true')
    args = vars(parser.parse_args())
    main(**args)
