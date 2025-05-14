import re

import numpy as np
import polars as pl

# TODO: replace or remove 'X', depending on the solution to https://github.com/hodcroftlab/covariants/issues/577
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
