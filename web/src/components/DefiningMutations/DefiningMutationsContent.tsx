import React, { Suspense, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { ErrorBoundary } from 'react-error-boundary'
import { DefiningMutationListElement } from 'src/io/getDefiningMutationsClusters'
import { SelectReferenceDropdown } from 'src/components/DefiningMutations/SelectReferenceDropdown'
import { DefiningMutationsTables } from 'src/components/DefiningMutations/DefiningMutationsTables'
import { DefiningMutationsDescription } from 'src/components/DefiningMutations/DefiningMutationsDescription'
import { DownloadDefiningMutationsButton } from 'src/components/DefiningMutations/DownloadDefiningMutationsButton'
import { DefiningMutationClusterAtomFamily } from 'src/state/DefiningMutations'
import { DefiningMutationsFetchError } from 'src/components/Error/DefiningMutationsFetchError'

export function DefiningMutationsContent({ cluster }: { cluster: DefiningMutationListElement | undefined }) {
  return (
    <div className={`d-flex flex-column`}>
      <DefiningMutationsDescription />

      {cluster && (
        <ErrorBoundary
          key={`${cluster.pangoLineage}_${cluster.nextstrainClade}`}
          FallbackComponent={DefiningMutationsFetchError}
        >
          <Suspense>
            <DefiningMutationsTableCard cluster={cluster} />{' '}
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}

function DefiningMutationsTableCard({ cluster }: { cluster: DefiningMutationListElement }) {
  const clusterData = useRecoilValue(
    DefiningMutationClusterAtomFamily(cluster?.pangoLineage ?? cluster?.nextstrainClade),
  )

  const referenceSequences = clusterData?.mutations.map(({ reference }) => reference) ?? []
  const [selectedReference, setSelectedReference] = useState<string | undefined>(referenceSequences?.at(0))

  if (!selectedReference) {
    return null
  }

  return (
    clusterData && (
      <div className={'card'}>
        <div className="card-header d-flex justify-content-end align-items-center gap-2">
          <SelectReferenceDropdown
            referenceSequences={referenceSequences}
            selectedSequence={selectedReference}
            setSelectedReference={setSelectedReference}
          />
          <DownloadDefiningMutationsButton cluster={cluster} clusterData={clusterData} />
        </div>
        <div className="card-body">
          <DefiningMutationsTables currentCluster={clusterData} referenceSequenceName={selectedReference} />
        </div>
      </div>
    )
  )
}
