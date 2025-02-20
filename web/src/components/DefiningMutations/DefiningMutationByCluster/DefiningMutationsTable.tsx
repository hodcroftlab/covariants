import React, { useMemo } from 'react'
import { styled } from 'styled-components'
import {
  AminoAcidMutation,
  DefiningMutationCluster,
  getMutationFromAminoAcidMutation,
  getMutationFromNucleotideMutation,
  NucleotideMutation,
} from 'src/io/getDefiningMutationsClusters'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { parsePositionOrThrow } from 'src/components/Common/parsePosition'
import { TableSlimWithBorders } from 'src/components/Common/TableSlim'
import { AminoacidMutationBadge, NucleotideMutationBadge } from 'src/components/Common/MutationBadge'

export interface DefiningMutationsTableProps {
  currentCluster: DefiningMutationCluster
  referenceSequenceName: string
}

export function DefiningMutationsTable({ currentCluster, referenceSequenceName }: DefiningMutationsTableProps) {
  const { t } = useTranslationSafe()

  const tableData = useMemo(() => {
    const mutations = currentCluster.mutations[referenceSequenceName]
    if (!mutations) {
      return null
    }

    const nucleotideMutations: NucleotideMutation[] = Object.entries(mutations.nuc).map(([posStr, nucMut]) => {
      const pos = parsePositionOrThrow(posStr)
      return { pos, ...nucMut }
    })

    const aminoAcidMutations: AminoAcidMutation[] = Object.entries(mutations.aa).flatMap(([gene, aaMuts]) =>
      Object.entries(aaMuts).map(([posStr, aaMut]) => {
        const pos = parsePositionOrThrow(posStr)
        const nucMuts = nucleotideMutations.filter((nucMut) => aaMut.nucPos?.includes(nucMut.pos))
        return { gene, pos, ...aaMut, nucMuts }
      }),
    )

    const codingPositions = new Set(aminoAcidMutations.flatMap((aaMut) => aaMut.nucPos))
    const silentNucleotideMutations = nucleotideMutations.filter((nucMut) => !codingPositions.has(nucMut.pos))

    return { aminoAcidMutations, silentNucleotideMutations }
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
        {tableData.aminoAcidMutations.map((aminoAcidMutation) => {
          return (
            <DefiningMutationsTableRowCoding
              key={JSON.stringify(aminoAcidMutation)}
              aminoAcidMutation={aminoAcidMutation}
            />
          )
        })}
        {tableData.silentNucleotideMutations.map((nucleotideMutation) => {
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

export function DefiningMutationsTableRowCoding({ aminoAcidMutation }: { aminoAcidMutation: AminoAcidMutation }) {
  const numNucMuts = aminoAcidMutation.nucMuts.length

  const components = useMemo(
    () =>
      (aminoAcidMutation.nucMuts ?? []).map((nucleotideMutation, i) => {
        return (
          <tr key={JSON.stringify(nucleotideMutation)}>
            {i === 0 && (
              <>
                <DefiningMutationsTableTd rowSpan={numNucMuts}>{aminoAcidMutation.annotation}</DefiningMutationsTableTd>
                <DefiningMutationsTableTdNarrow rowSpan={numNucMuts}>
                  <AminoacidMutationBadge mutation={getMutationFromAminoAcidMutation(aminoAcidMutation)} />
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
    [aminoAcidMutation, numNucMuts],
  )

  return <>{components}</>
}
