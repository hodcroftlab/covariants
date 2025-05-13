import argparse
import json
import logging
import os
from dataclasses import dataclass

import numpy as np
import polars as pl
import pandas as pd
import re

from scripts.defining_mutations.fetch_nextclade_tree import fetch_nextclade_tree, parse_nextclade_tree

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

# TODO: replace or remove 'X', depending on the solution to https://github.com/hodcroftlab/covariants/issues/577
MUTATION_CHANGE_PATTERN = r"^(?P<symbol_from>[ACDEFGHIKLMNPQRSTVWYX*])(?P<position>[1-9][0-9]*)(?P<symbol_to>[ACDEFGHIKLMNPQRSTVWYX*-])$"

@dataclass
class Mutation:
    symbol_from: str
    position: int
    symbol_to: str

    @classmethod
    def parse_mutation_string(cls, mutation_string: str) -> "Mutation":
        match = re.match(MUTATION_CHANGE_PATTERN, mutation_string)
        if not match:
            raise ValueError(f'Invalid mutation string: {mutation_string}')
        return Mutation(symbol_from=match['symbol_from'], position=int(match['position']),
                        symbol_to=match['symbol_to'])

    @classmethod
    def parse_polars_mutation_string(cls, column: str):
        return pl.when(pl.col(column).is_not_null()).then(
            pl.struct(
                pl.col(column).str.extract(MUTATION_CHANGE_PATTERN, 1).alias('ref'),
                pl.col(column).str.extract(MUTATION_CHANGE_PATTERN, 2).cast(pl.Int64).alias('pos'),
                pl.col(column).str.extract(MUTATION_CHANGE_PATTERN, 3).alias('alt')
            )
        )

    @property
    def affected_genes(self):
        genes = []
        for gene, bounds in GENE_BOUNDS.items():
            if bounds[0] <= self.position <= bounds[1]:
                genes.append(gene)
        return genes

    @property
    def positions_on_genes(self):
        return [int(np.floor((self.position - GENE_BOUNDS[gene][0]) / 3)) + 1 for gene in self.affected_genes]

    @property
    def mutation_type(self):
        return 'deletion' if self.symbol_to == '-' else 'substitution'

    def to_dict(self):
        return {'ref': self.symbol_from, 'pos': self.position, 'alt': self.symbol_to}


@dataclass
class AminoAcidMutation(Mutation):
    gene: str

    @classmethod
    def parse_amino_acid_string(cls, amino_acid_mutations_string: str) -> "AminoAcidMutation":
        change_pattern = r"^(?P<gene>.*):(?P<mutation>.*)$"
        match = re.match(change_pattern, amino_acid_mutations_string)
        if not match:
            raise ValueError(f'Invalid aa mutation string {amino_acid_mutations_string}')
        gene = match['gene']
        mut = cls.parse_mutation_string(match['mutation'])
        return AminoAcidMutation(mut.symbol_from, mut.position, mut.symbol_to, gene)

    @classmethod
    def parse_polars_amino_acid_string(cls, column: str):
        return pl.when(pl.col(column).is_not_null()).then(
            pl.struct(
                pl.col(column).str.split(':').list.first().alias('gene'),
                pl.col(column).str.split(':').list.last().str.head(1).alias('ref'),
                pl.col(column).str.split(':').list.last().str.head(-1).str.tail(-1).cast(pl.Int64).alias(
                    'pos'),
                pl.col(column).str.split(':').list.last().str.tail(1).alias('alt')
            )
        )

    def to_code(self) -> str:
        return ''.join([self.gene, ':', self.symbol_from, str(self.position), self.symbol_to])

    def to_dict(self):
        return {'gene': self.gene, 'ref': self.symbol_from, 'pos': self.position, 'alt': self.symbol_to}


def match_nuc_to_aas(nuc: str | None, aas: list[str]) -> str | None:
    if not nuc:
        return None
    nuc_obj = Mutation.parse_mutation_string(nuc)
    if len(nuc_obj.affected_genes) == 0:
        return None
    aas_obj = [AminoAcidMutation.parse_amino_acid_string(aa) for aa in aas]

    def find_first_aa_nuc_match_by_condition(type_condition, match_condition):
        for aa in aas_obj:
            if type_condition(aa) and match_condition(aa):
                return aa.to_code()
        return None

    same_type_condition = lambda aa: aa.mutation_type == nuc_obj.mutation_type
    differing_type_condition = lambda aa: aa.mutation_type != nuc_obj.mutation_type

    exact_match_condition = lambda aa: aa.gene in nuc_obj.affected_genes and aa.position in nuc_obj.positions_on_genes
    approximate_match_condition = lambda aa: aa.gene in nuc_obj.affected_genes and np.any(np.isclose(aa.position, nuc_obj.positions_on_genes, atol=1))

    # prefer same type mutations and check conditions sequentially to avoid hitting unwanted matches first just because of list ordering
    return (find_first_aa_nuc_match_by_condition(same_type_condition, exact_match_condition)
            or find_first_aa_nuc_match_by_condition(same_type_condition, approximate_match_condition)
            or find_first_aa_nuc_match_by_condition(differing_type_condition, exact_match_condition)
            or find_first_aa_nuc_match_by_condition(differing_type_condition, approximate_match_condition))


def replace_list_of_empty_string(y: str | list | np.ndarray) -> str | list | np.ndarray:
    if len(y) == 1 and y[0] == '':
        return []
    return y


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

    # TODO: clarify if using 'X' here is the correct way to work around the missing nucleotide in auto-generated deletions: https://github.com/hodcroftlab/covariants/issues/577
    reformat_deletions = pl.from_pandas(expand_deletions).with_columns(
        pl.col(col_name).list.eval(
            pl.concat_str(
                pl.lit('X'),
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

    match_aa_mutations = pl.struct('nuc_mutation', 'aa_mutation').map_elements(
        lambda mutation_row: match_nuc_to_aas(mutation_row['nuc_mutation'], mutation_row['aa_mutation']), pl.String
    )
    wuhan = (
        combine_nuc_mutations
        .select(
            pl.col('lineage'),
            pl.col('nextstrain_clade'),
            nuc_mutation=pl.col('nuc_mutation_wuhan'),
            aa_mutation=pl.col('aa_mutation_wuhan'))
        .explode('nuc_mutation')
        .with_columns(
            aa_mutation=match_aa_mutations,
            reference=pl.lit('wuhan')
        )
    )
    pango_parent = (
        combine_nuc_mutations
        .select(
            pl.col('lineage'),
            pl.col('nextstrain_clade'),
            nuc_mutation='nuc_mutation_pango_parent',
            aa_mutation=pl.col('aa_mutation_pango_parent'))
        .explode('nuc_mutation')
        .with_columns(
            aa_mutation=match_aa_mutations,
            reference=pl.lit('pango_parent'))
    )

    combined = pl.concat([wuhan, pango_parent])

    output = (
        combined
        .with_columns(
            nuc_mutation=Mutation.parse_polars_mutation_string('nuc_mutation'),
            aa_mutation=AminoAcidMutation.parse_polars_amino_acid_string('aa_mutation')
        )
        .drop_nulls('nuc_mutation')
    )

    check_reference_column_is_filled(output)

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
    match = re.match(r'(?P<nextstrain_clade>[1-9][0-9][A-Z])', filename)
    if not match:
        raise NameError(f'Could not extract nextstrain clade from file name "{filename}"')
    nextstrain_clade = match['nextstrain_clade']

    data = (
        pl.read_csv(path, separator='\t')
        .with_columns(
            pl.col('nuc_change').str.strip_chars(),
            pl.col('aa_change').str.strip_chars())
    )

    no_reversions = data.filter(pl.col('reversion').is_null())

    with_nextstrain_clade = (
        no_reversions
        .with_columns(
            nextstrain_clade=pl.lit(nextstrain_clade),
            reference=pl.lit('wuhan')
        )
        .rename({'aa_change': 'aa_mutation', 'aa_change_2': 'aa_mutation_2', 'nuc_change': 'nuc_mutation'})
        .select('nextstrain_clade', 'nuc_mutation', 'aa_mutation', 'aa_mutation_2', 'reference', 'not_in_parent', 'notes')
    )
    nextclade_parent = (
        with_nextstrain_clade.filter(pl.col('not_in_parent') == 'y')
        .with_columns(
            reference=pl.lit('nextclade_parent'))
    )

    combined = pl.concat([with_nextstrain_clade, nextclade_parent]).drop('not_in_parent')

    output = (
        combined
        .with_columns(
            nuc_mutation=Mutation.parse_polars_mutation_string('nuc_mutation'),
            aa_mutation=AminoAcidMutation.parse_polars_amino_acid_string('aa_mutation'),
            aa_mutation_2=AminoAcidMutation.parse_polars_amino_acid_string('aa_mutation_2')
        )
    )

    check_reference_column_is_filled(output)

    return output


def check_reference_column_is_filled(df: pl.DataFrame) -> None:
    if not df.filter(pl.col('reference').is_null()).is_empty():
        raise ValueError(f'Could not assign reference point for mutations {df.filter(pl.col("reference").is_null())}')


def import_mutation_data(hand_curated_data_dir: str, auto_generated_data_dir: str) -> tuple[
    pl.DataFrame, pl.DataFrame, pl.DataFrame]:
    lineages, auto_generated_mutations_raw = load_auto_generated_data(
        os.path.join(auto_generated_data_dir, 'auto_generated.json'))
    nextclade_tree = parse_nextclade_tree(fetch_nextclade_tree())
    lineages_with_nextclade = lineages.join(nextclade_tree, on=['lineage', 'nextstrain_clade'], how='left')

    auto_generated_mutations = process_auto_generated_data(auto_generated_mutations_raw)

    hand_curated_mutations = (
        import_hand_curated_data(hand_curated_data_dir)
        .join(lineages.select('lineage', 'nextstrain_clade'), on='nextstrain_clade')
    )

    return lineages_with_nextclade, hand_curated_mutations, auto_generated_mutations


def import_hand_curated_data(hand_curated_data_dir: str) -> pl.DataFrame:
    hand_curated_data_files = os.listdir(hand_curated_data_dir)
    hand_curated_data = pl.concat([
        process_hand_curated_file(os.path.join(hand_curated_data_dir, hand_curated_file)) for hand_curated_file in
        hand_curated_data_files
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
        logging.info(f'unmatched mutations: hand-curated {not_in_auto_generated}, auto-generated {not_in_hand_curated}')

    coalesced = (
        combined
        .with_columns(
            lineage=pl.coalesce(pl.col('lineage_hand_curated'), pl.col('lineage')),
            nextstrain_clade=pl.coalesce(pl.col('nextstrain_clade_hand_curated'), pl.col('nextstrain_clade')),
            reference=pl.coalesce(pl.col('reference_hand_curated'), pl.col('reference')),
            aa_mutation=pl.coalesce(pl.col('aa_mutation_hand_curated'), pl.col('aa_mutation')),
            nuc_mutation=pl.coalesce(pl.col('nuc_mutation_hand_curated'), pl.col('nuc_mutation')))
        .drop('aa_mutation_hand_curated', 'nuc_mutation_hand_curated')
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
        .select('lineage', 'nextstrain_clade', 'reference', 'mutation_type', 'aa_mutation', 'aa_mutation_2', 'nuc_mutation', 'notes')
    )

    coding_grouped_by_aa = (
        position_sorted
        .filter(pl.col('mutation_type') == 'coding')
        .group_by('lineage', 'nextstrain_clade', 'reference', 'mutation_type', 'aa_mutation', maintain_order=True)
        .agg(pl.col('aa_mutation_2').unique().drop_nulls(), pl.col('nuc_mutation'), pl.col('notes').unique().drop_nulls().str.concat('. '))
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
                'aa_mutation_2': pl.List(pl.Struct({'gene': pl.String, 'ref': pl.String, 'pos': pl.Int64, 'alt': pl.String})),
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
        .select('lineage', 'nextstrain_clade', mutation_type=pl.when(pl.col('coding').is_not_null().or_(pl.col('silent').is_not_null())).then(pl.struct('reference', 'coding', 'silent')))
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


def save_mutations_to_file(output: dict, output_dir: str):
    for lineage in output:
        with open(os.path.join(output_dir, f'{lineage["lineage"]}.json'), 'w') as f:
            json.dump(lineage, f, indent=2)


def save_lineages_to_file(lineages: pl.DataFrame, output_dir: str):
    clusters = {'clusters': lineages.select('lineage', 'nextstrain_clade').to_dicts()}
    with open(os.path.join(output_dir, 'definingMutationsClusters.json'), 'w') as f:
        json.dump(clusters, f, indent=2)


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
