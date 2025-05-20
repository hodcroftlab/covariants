import re

import numpy as np
import polars as pl

from dataclasses import dataclass


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

MUTATION_CHANGE_PATTERN = r"^(?P<symbol_from>[ACDEFGHIKLMNPQRSTVWY*])(?P<position>[1-9][0-9]*)(?P<symbol_to>[ACDEFGHIKLMNPQRSTVWY*-])$"


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

    @classmethod
    def position_on_gene(cls, nuc_position, gene):
        return int(np.floor((nuc_position - GENE_BOUNDS[gene][0]) / 3)) + 1

    @property
    def affected_genes(self):
        genes = []
        for gene, bounds in GENE_BOUNDS.items():
            if bounds[0] <= self.position <= bounds[1]:
                genes.append(gene)
        return genes

    @property
    def positions_on_genes(self):
        return {gene: self.position_on_gene(self.position, gene) for gene in self.affected_genes}

    @property
    def mutation_type(self):
        return 'deletion' if self.symbol_to == '-' else 'substitution'

    def to_dict(self):
        return {'ref': self.symbol_from, 'pos': self.position, 'alt': self.symbol_to}

    def to_code(self):
        return ''.join([self.symbol_from, str(self.position), self.symbol_to])


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

    @classmethod
    def parse_polars_list_of_amino_acid_strings(cls, column: str):
        return pl.col(column).list.eval(
            pl.struct(
                pl.element().str.split(':').list.first().alias('gene'),
                pl.element().str.split(':').list.last().str.head(1).alias('ref'),
                pl.element().str.split(':').list.last().str.head(-1).str.tail(-1).cast(pl.Int64).alias(
                    'pos'),
                pl.element().str.split(':').list.last().str.tail(1).alias('alt')
            )
        )

    def to_code(self) -> str:
        return ''.join([self.gene, ':', self.symbol_from, str(self.position), self.symbol_to])

    def to_dict(self):
        return {'gene': self.gene, 'ref': self.symbol_from, 'pos': self.position, 'alt': self.symbol_to}


def match_nuc_to_aas(nuc: str | None, aas: list[str]) -> list[str] | None:
    if not nuc:
        return None
    nuc_obj = Mutation.parse_mutation_string(nuc)

    is_silent_mutation = len(nuc_obj.affected_genes) == 0
    if is_silent_mutation:
        return None

    aas_obj = [AminoAcidMutation.parse_amino_acid_string(aa) for aa in aas]

    def find_aa_nuc_matches_by_condition(type_condition, match_condition):
        matches = []
        for aa in aas_obj:
            if type_condition(aa) and match_condition(aa):
                matches.append(aa.to_code())
        return matches or None

    same_type_condition = lambda aa: aa.mutation_type == nuc_obj.mutation_type
    differing_type_condition = lambda aa: aa.mutation_type != nuc_obj.mutation_type

    exact_match_condition = lambda aa: aa.gene in nuc_obj.affected_genes and aa.position == nuc_obj.positions_on_genes[
        aa.gene]
    approximate_match_condition = lambda aa: aa.gene in nuc_obj.affected_genes and np.all(
        np.isclose(aa.position, nuc_obj.positions_on_genes[aa.gene], atol=1))

    # prefer same type mutations and check conditions sequentially to avoid hitting unwanted matches first just because of list ordering
    raw_matches = (
            find_aa_nuc_matches_by_condition(same_type_condition, exact_match_condition)
            or find_aa_nuc_matches_by_condition(same_type_condition, approximate_match_condition)
            or find_aa_nuc_matches_by_condition(differing_type_condition, exact_match_condition)
            or find_aa_nuc_matches_by_condition(differing_type_condition, approximate_match_condition)
    )
    if not raw_matches:
        return None

    filtered_matches = []
    current_gene = None
    for match in raw_matches:
        gene = AminoAcidMutation.parse_amino_acid_string(match).gene
        if gene != current_gene:
            filtered_matches.append(match)
            current_gene = gene

    return filtered_matches
