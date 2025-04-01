import React, { useMemo } from 'react'
import { styled } from 'styled-components'
import {
  CodingMutation,
  DefiningMutationCluster,
  getMutationFromAminoAcidMutation,
  getMutationFromNucleotideMutation,
  NucleotideMutation,
} from 'src/io/getDefiningMutationsClusters'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { TableSlimWithBorders } from 'src/components/Common/TableSlim'
import { NucleotideMutationBadge } from 'src/components/Common/Badges/NucleotideMutationBadge'
import { AminoacidMutationBadge } from 'src/components/Common/Badges/AminoacidMutationBadge'

export interface DefiningMutationsTableProps {
  currentCluster: DefiningMutationCluster
  referenceSequenceName: string
}

export function DefiningMutationsTable({ currentCluster, referenceSequenceName }: DefiningMutationsTableProps) {
  const { t } = useTranslationSafe()

  const tableData = useMemo(() => {
    const mutations = currentCluster.mutations.find(({ reference }) => reference === referenceSequenceName)
    if (!mutations) {
      return null
    }

    const silentMutations: NucleotideMutation[] = mutations.silent.map((nucMut) => nucMut.nucMutation)

    const codingMutations: CodingMutation[] = mutations.coding

    return { codingMutations, silentMutations }
  }, [referenceSequenceName, currentCluster.mutations])

  if (!tableData) {
    return null
  }

  return (
    <TableSlimWithBorders>
      <thead>
        <tr>
          <th className="text-center">{t('AA Notes')}</th>
          <th className="text-center">{t('AA Mut')}</th>
          <th className="text-center">{t('Nuc Mut')}</th>
          <th className="text-center">{t('Nuc Notes')}</th>
        </tr>
      </thead>
      <tbody>
        {tableData.codingMutations.map((codingMutation) => {
          return (
            <DefiningMutationsTableRowCoding key={JSON.stringify(codingMutation)} codingMutation={codingMutation} />
          )
        })}
        {tableData.silentMutations.map((nucleotideMutation) => {
          return (
            <DefiningMutationsTableRowSilent
              key={JSON.stringify(nucleotideMutation)}
              nucleotideMutation={nucleotideMutation}
            />
          )
        })}
      </tbody>
    </TableSlimWithBorders>
  )
}

export function DefiningMutationsTableRowSilent({ nucleotideMutation }: { nucleotideMutation: NucleotideMutation }) {
  return (
    <tr key={JSON.stringify(nucleotideMutation)}>
      <DefiningMutationsTableTd />
      <DefiningMutationsTableTdNarrow />
      <DefiningMutationsTableTdNarrow>
        <NucleotideMutationBadge mutation={getMutationFromNucleotideMutation(nucleotideMutation)} />
      </DefiningMutationsTableTdNarrow>
      <DefiningMutationsTableTd>{nucleotideMutation.annotation}</DefiningMutationsTableTd>
    </tr>
  )
}

const DefiningMutationsTableTdNarrow = styled.td`
  width: 10%;
`
const DefiningMutationsTableTd = styled.td`
  width: 45%;
`

export function DefiningMutationsTableRowCoding({ codingMutation }: { codingMutation: CodingMutation }) {
  const aaMutation = codingMutation.aaMutation
  const nucMutations = codingMutation.nucMutations
  const numNucMuts = codingMutation.nucMutations.length

  const components = useMemo(
    () =>
      nucMutations.map((nucleotideMutation, i) => {
        return (
          <tr key={JSON.stringify(nucleotideMutation)}>
            {i === 0 && (
              <>
                <DefiningMutationsTableTd rowSpan={numNucMuts}>{aaMutation.annotation}</DefiningMutationsTableTd>
                <DefiningMutationsTableTdNarrow rowSpan={numNucMuts}>
                  <AminoacidMutationBadge mutation={getMutationFromAminoAcidMutation(aaMutation)} />
                </DefiningMutationsTableTdNarrow>
              </>
            )}

            <DefiningMutationsTableTdNarrow>
              <NucleotideMutationBadge mutation={getMutationFromNucleotideMutation(nucleotideMutation)} />
            </DefiningMutationsTableTdNarrow>
            <DefiningMutationsTableTd>{nucleotideMutation.annotation}</DefiningMutationsTableTd>
          </tr>
        )
      }),
    [aaMutation, nucMutations, numNucMuts],
  )

  return <>{components}</>
}
