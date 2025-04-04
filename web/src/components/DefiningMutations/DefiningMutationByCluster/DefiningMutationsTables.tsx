import React, { useMemo } from 'react'
import {
  AminoAcidMutationWithNucleotideMutations,
  DefiningMutationCluster,
  NucleotideMutation,
} from 'src/io/getDefiningMutationsClusters'
import { parsePositionOrThrow } from 'src/components/Common/parsePosition'
import { CodingMutationsTable } from 'src/components/DefiningMutations/DefiningMutationByCluster/CodingMutationsTable'
import { SilentNucleotideMutationsTable } from 'src/components/DefiningMutations/DefiningMutationByCluster/SilentMutationsTable'
import { MutationBadgeBox } from 'src/components/Common/Badges/MutationBadge'

export interface DefiningMutationsTableProps {
  currentCluster: DefiningMutationCluster
  referenceSequenceName: string
}

export function DefiningMutationsTables({ currentCluster, referenceSequenceName }: DefiningMutationsTableProps) {
  const tableData = useMemo(() => {
    const mutations = currentCluster.mutations[referenceSequenceName]
    if (!mutations) {
      return null
    }

    const nucleotideMutations: NucleotideMutation[] = Object.entries(mutations.nuc).map(([posStr, nucMut]) => {
      const pos = parsePositionOrThrow(posStr)
      return { pos, ...nucMut }
    })

    const aminoAcidMutations: AminoAcidMutationWithNucleotideMutations[] = Object.entries(mutations.aa).flatMap(
      ([gene, aaMuts]) =>
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
    <div className={'d-flex gap-2 flex-column flex-lg-row'}>
      <div className={'flex-fill'}>
        <h3>Coding mutations</h3>
        <CodingMutationsTable aminoAcidMutations={tableData.aminoAcidMutations} />
      </div>
      <div className={'flex-fill'}>
        <h3>Silent mutations</h3>
        <SilentNucleotideMutationsTable nucleotideMutations={tableData.silentNucleotideMutations} />
      </div>
    </div>
  )
}

export function Annotation({ annotationText }: { annotationText: string }) {
  return (
    <MutationBadgeBox className={'text-info'} data-bs-toggle="tooltip" title={annotationText}>
      <span aria-label="Annotation" className="bi bi-info-circle" />
    </MutationBadgeBox>
  )
}
