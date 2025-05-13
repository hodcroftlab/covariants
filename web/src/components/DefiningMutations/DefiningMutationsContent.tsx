import React, { useState } from 'react'
import { DefiningMutationCluster } from 'src/io/getDefiningMutationsClusters'
import { SelectReferenceDropdown } from 'src/components/DefiningMutations/SelectReferenceDropdown'
import { DefiningMutationsTables } from 'src/components/DefiningMutations/DefiningMutationsTables'
import { DefiningMutationsDescription } from 'src/components/DefiningMutations/DefiningMutationsDescription'

export function DefiningMutationsContent({ cluster }: { cluster: DefiningMutationCluster | undefined }) {
  return (
    <div className={`d-flex flex-column`}>
      <DefiningMutationsDescription />

      {cluster && <DefiningMutationsTableCard cluster={cluster} />}
    </div>
  )
}

function DefiningMutationsTableCard({ cluster }: { cluster: DefiningMutationCluster }) {
  const referenceSequences = cluster.mutations.map(({ reference }) => reference)
  const [selectedReference, setSelectedReference] = useState<string | undefined>(referenceSequences.at(0))

  if (!selectedReference) {
    return null
  }

  return (
    <div className={'card'}>
      <div className="card-header d-flex justify-content-end">
        <SelectReferenceDropdown
          referenceSequences={referenceSequences}
          selectedSequence={selectedReference}
          setSelectedReference={setSelectedReference}
        />
      </div>
      <div className="card-body">
        <DefiningMutationsTables currentCluster={cluster} referenceSequenceName={selectedReference} />
      </div>
    </div>
  )
}
