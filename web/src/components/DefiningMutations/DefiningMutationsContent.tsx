import React, { Suspense, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { ErrorBoundary } from 'react-error-boundary'
import { styled } from 'styled-components'
import { DefiningMutationClusterMetaData } from 'src/io/getDefiningMutationsClusters'
import { SelectReferenceDropdown } from 'src/components/DefiningMutations/SelectReferenceDropdown'
import { DefiningMutationsTables } from 'src/components/DefiningMutations/DefiningMutationsTables'
import { DefiningMutationsDescription } from 'src/components/DefiningMutations/DefiningMutationsDescription'
import { DownloadDefiningMutationsButton } from 'src/components/DefiningMutations/DownloadDefiningMutationsButton'
import { DefiningMutationClusterAtomFamily } from 'src/state/DefiningMutations'
import { FetchError } from 'src/components/Error/FetchError'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { URL_GITHUB } from 'src/constants'

export function DefiningMutationsContent({ cluster }: { cluster: DefiningMutationClusterMetaData | undefined }) {
  return (
    <div className={`d-flex flex-column`}>
      <DefiningMutationsDescription />

      {cluster &&
        (cluster.hasData ? (
          <ErrorBoundary key={`${cluster.pangoLineage}_${cluster.nextstrainClade}`} FallbackComponent={FetchError}>
            <Suspense>
              <DefiningMutationsTableCard cluster={cluster} />{' '}
            </Suspense>
          </ErrorBoundary>
        ) : (
          <Container>
            {'We seem to be missing mutation data for this cluster. You can help to provide defining mutations data '}
            <LinkExternal href={`${URL_GITHUB}/tree/master/defining_mutations`}>{'here'}</LinkExternal>
            {'.'}
          </Container>
        ))}
    </div>
  )
}

function DefiningMutationsTableCard({ cluster }: { cluster: DefiningMutationClusterMetaData }) {
  const clusterData = useRecoilValue(
    DefiningMutationClusterAtomFamily(cluster?.pangoLineage ?? cluster?.nextstrainClade),
  )

  const referenceSequences = clusterData?.mutations.map(({ reference }) => reference) ?? []
  const [selectedReference, setSelectedReference] = useState<string | undefined>(
    referenceSequences?.find((v) => v === 'wuhan') ?? referenceSequences?.at(0),
  )

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

const Container = styled.p`
  margin: 0 auto;
  font-style: italic;
  padding: 1rem 0;
`
