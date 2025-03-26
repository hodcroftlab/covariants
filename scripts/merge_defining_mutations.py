import json
import os

import numpy as np
import polars as pl

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


def split_nuc(nuc: str) -> tuple[str, int, str]:
    return nuc[0], int(nuc[1:-1]), nuc[-1]


def split_aa(aa: str) -> tuple[str, str, int, str]:
    gene, aa = aa.split(':')
    return gene, *split_nuc(aa)


def nuc_to_gene(nuc_location: int):
    genes = []
    for gene, bounds in GENE_BOUNDS.items():
        if bounds[0] <= nuc_location <= bounds[1]:
            genes.append(gene)
    return genes


def match_nuc_to_aas(nuc, aas):
    nuc_old, nuc_location, nuc_new = split_nuc(nuc)
    genes = nuc_to_gene(nuc_location)
    if len(genes) == 0:
        print(f'WARNING: nuc {nuc} cannot be matched to gene region')
        return
    locations = [int(np.ceil((nuc_location - GENE_BOUNDS[gene][0] + 1) / 3)) for gene in genes]
    for aa in aas:
        gene, aa_old, aa_location, aa_new = split_aa(aa)
        if gene in genes and aa_location in locations:
            return aa


def match_nucs_to_aas(nucs, aas):
    synonymous = []
    non_synonymous = {}
    for nuc in nucs:
        aa = match_nuc_to_aas(nuc, aas)
        if aa:
            non_synonymous.update({nuc: aa})
        else:
            synonymous.append(nuc)
    if len(non_synonymous) != len(aas):
        raise ValueError(
            f'Extracted non-synonymous mutations {len(non_synonymous)} do not match with aa mutations {len(aas)}')
    return synonymous, non_synonymous


def nuc_string_to_object(nuc):
    ref, pos, alt = split_nuc(nuc)
    return {'ref': ref, 'pos': pos, 'alt': alt}


def aa_string_to_object(aa):
    gene, ref, pos, alt = split_aa(aa)
    return {'gene': gene, 'ref': ref, 'pos': pos, 'alt': alt}


def process_cornelius_file(path):
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

    reformat_deletions = rename.with_columns(
        nuc_del_wuhan=pl.when(pl.col('nuc_del_wuhan').list.len() > 0)
        .then(pl.col('nuc_del_wuhan').list.eval(
            pl.concat_str(pl.lit('X'), pl.element().str.split('-', inclusive=True).list.first())
        )),
        nuc_del_pango_parent=pl.when(pl.col('nuc_del_pango_parent').list.len() > 0)
        .then(pl.col('nuc_del_wuhan').list.eval(
            # TODO: using X here leads to mismatches with Emma's file, discuss how to fix this
            pl.concat_str(pl.lit('X'), pl.element().str.split('-', inclusive=True).list.first()))
        )
        .otherwise([]),
    )

    sub_and_del = reformat_deletions.with_columns(
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

    # TODO: move this part into the map_elements function
    wuhan_aas = sub_and_del.select('aa_change_wuhan').to_series().to_list()[0]
    pango_parent_aas = sub_and_del.select('aa_change_pango_parent').to_series().to_list()[0]

    wuhan = (
        sub_and_del
        .select(
            pl.col('lineage'),
            pl.col('nextstrain_clade'),
            nuc_change='nuc_change_wuhan')
        .explode('nuc_change')
        .with_columns(aa_change=pl.col('nuc_change').map_elements(lambda x: match_nuc_to_aas(x, wuhan_aas), pl.String),
                      relative_to=pl.lit('wuhan'))

    )
    pango_parent = (
        sub_and_del
        .select(
            pl.col('lineage'),
            pl.col('nextstrain_clade'),
            nuc_change='nuc_change_pango_parent')
        .explode('nuc_change')
        .with_columns(
            aa_change=pl.col('nuc_change').map_elements(lambda x: match_nuc_to_aas(x, pango_parent_aas), pl.String),
            relative_to=pl.lit('pango_parent'))
    )

    output = pl.concat([wuhan, pango_parent])

    check_relative_to_column(output)

    lineages = rename.select(
        pl.col('lineage'),
        pl.col('unaliased'),
        pl.col('parent'),
        pl.col('children'),
        pl.col('nextstrain_clade'),
        pl.col('designation_date'))

    # TODO: reversions, frame shifts
    return lineages, output


def process_emma_file(path):
    filename = path.split('/')[-1]
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

    check_relative_to_column(output)

    # TODO: reversions, frame shifts
    return output


def check_relative_to_column(df):
    if not df.filter(pl.col('relative_to').is_null()).is_empty():
        raise ValueError(f'Could not assign reference point for mutations {df.filter(pl.col("relative_to").is_null())}')


def main(emma_dir='../tests/data/defining_mutations/emma', corn_dir='../tests/data/defining_mutations/',
         output_dir='../tests/data/defining_mutations/output'):
    # import files
    lineages, corn = process_cornelius_file(os.path.join(corn_dir, 'cornelius.json'))

    emma_files = os.listdir(emma_dir)
    emma_processed = []
    for emma_file in emma_files:
        emma_processed.append(
            process_emma_file(os.path.join(emma_dir, emma_file))
            .join(lineages
                  .select('lineage', 'nextstrain_clade'), on='nextstrain_clade')
        )
    emma = pl.concat(emma_processed)

    # merge files
    combined = corn.join(emma, on=['lineage', 'nextstrain_clade', 'nuc_change', 'relative_to'], how='full',
                         coalesce=True)

    check_relative_to_column(combined)

    coalesced = (
        combined
        .with_columns(
            aa_change=pl.coalesce(pl.col('aa_change_right'), pl.col('aa_change')))
        .drop('aa_change_right'))

    typed = coalesced.with_columns(
        mutation_type=pl.when(pl.col('aa_change').is_not_null()).then(pl.lit('coding')).otherwise(pl.lit('silent'))
    ).select('lineage', 'nextstrain_clade', 'relative_to', 'mutation_type', 'aa_change', 'nuc_change', 'notes')

    coding_grouped_by_aa = (
        typed
        .filter(pl.col('mutation_type') == 'coding')
        .group_by('lineage', 'nextstrain_clade', 'relative_to', 'mutation_type', 'aa_change')
        .agg(pl.col('nuc_change'), pl.col('notes').first())
    )
    grouped_by_aa = pl.concat([
        coding_grouped_by_aa,
        typed.filter(pl.col('mutation_type') == 'silent').with_columns(pl.col('nuc_change').cast(pl.List(pl.String)))
    ])

    # reformat to match output
    aggregate_mutations = (
        grouped_by_aa
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
        for parent, mutation_types in lineage['mutations_relative_to'].items():
            if not mutation_types['silent']:
                mutation_types['silent'] = []
            for silent_mutation in mutation_types['silent']:
                silent_mutation.pop('aa_change')
                silent_mutation.update({'nuc_change': nuc_string_to_object(silent_mutation['nuc_change'][0])})
                if not silent_mutation['notes']:
                    silent_mutation.pop('notes')
            if not mutation_types['coding']:
                mutation_types['coding'] = []
            for coding_mutation in mutation_types['coding']:
                coding_mutation.update({'aa_change': aa_string_to_object(coding_mutation['aa_change'])})
                coding_mutation.update(
                    {'nuc_change': [nuc_string_to_object(mutation) for mutation in coding_mutation['nuc_change']]})
                if not coding_mutation['notes']:
                    coding_mutation.pop('notes')

    # write output
    for lineage in output_dicts:
        with open(os.path.join(output_dir, f'{lineage["lineage"]}.json'), 'w') as f:
            json.dump(lineage, f)
    # TODO: nextclade parent
    # TODO: fix cornelius' deletions (X1234-)


if __name__ == '__main__':
    main()
