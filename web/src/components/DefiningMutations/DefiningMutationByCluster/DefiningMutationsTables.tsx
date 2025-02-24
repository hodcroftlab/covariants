import React, { useMemo } from 'react'
import { DefiningMutationCluster } from 'src/io/getDefiningMutationsClusters'
import { CodingMutationsTable } from 'src/components/DefiningMutations/DefiningMutationByCluster/CodingMutationsTable'
import { SilentNucleotideMutationsTable } from 'src/components/DefiningMutations/DefiningMutationByCluster/SilentMutationsTable'
import { MutationBadgeBox } from 'src/components/Common/Badges/MutationBadge'

export interface DefiningMutationsTableProps {
  currentCluster: DefiningMutationCluster
  referenceSequenceName: string
}

export function DefiningMutationsTables({ currentCluster, referenceSequenceName }: DefiningMutationsTableProps) {
  const mutations = useMemo(() => {
    return currentCluster.mutations.find((mutation) => mutation.reference === referenceSequenceName)
  }, [referenceSequenceName, currentCluster.mutations])

  if (!mutations) {
    return null
  }

  return (
    <div className={'d-flex gap-2 flex-column flex-lg-row'}>
      <div>
        <h3>Coding mutations</h3>
        <CodingMutationsTable codingMutations={mutations.coding} />
      </div>
      <div>
        <h3>Silent mutations</h3>
        <SilentNucleotideMutationsTable silentMutations={mutations.silent} />
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
