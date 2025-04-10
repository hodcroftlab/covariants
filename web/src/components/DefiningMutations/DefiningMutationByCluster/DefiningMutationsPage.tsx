import React, { useState } from 'react'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { styled } from 'styled-components'
import { DefiningMutationLineageTitle } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationLineageTitle'
import { DefiningMutationCluster, useDefiningMutationCluster } from 'src/io/getDefiningMutationsClusters'
import { Layout } from 'src/components/Layout/Layout'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { definingMutationsCladeToLineage } from 'src/state/DefiningMutations'
import { SelectClusterDropdown } from 'src/components/DefiningMutations/DefiningMutationByCluster/SelectClusterDropdown'
import { DefiningMutationsInfo } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsInfo'
import { DefiningMutationsTable } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsTable'
import { SelectReferenceDropdown } from 'src/components/DefiningMutations/DefiningMutationByCluster/SelectReferenceDropdown'
import { DefiningMutationsInfoText } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsInfoText'

export interface DefiningMutationsPageProps {
  clusterName: string
}

export default function DefiningMutationsPage({ clusterName }: DefiningMutationsPageProps) {
  const currentClusterName = useClusterNameToLineage(clusterName)

  const cluster = useDefiningMutationCluster(currentClusterName)

  return (
    <Layout>
      <NarrowPageContainer>
        <DefiningMutationLineageTitle cluster={cluster} />

        <JustifyEnd>
          <SelectClusterDropdown cluster={cluster} />
        </JustifyEnd>

        <DefiningMutationsInfoText />

        <DefiningMutationsInfo cluster={cluster} />

        <DefiningMutationsTableWithTargets cluster={cluster} />
      </NarrowPageContainer>
    </Layout>
  )
}

function useClusterNameToLineage(clusterName: string) {
  const router = useRouter()

  const lineage = get(useRecoilValue(definingMutationsCladeToLineage), clusterName)
  if (lineage) {
    void router.replace(`/defining-mutations/${lineage}`)
    return lineage
  }
  return clusterName
}

const JustifyEnd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`

function DefiningMutationsTableWithTargets({ cluster }: { cluster: DefiningMutationCluster }) {
  const referenceSequences = cluster.mutations.map(({ reference }) => reference)
  const [selectedReference, setSelectedReference] = useState<string | undefined>(referenceSequences.at(0))

  if (!selectedReference) {
    return null
  }

  return (
    <div className={'d-flex flex-column gap-2'}>
      <SelectReferenceDropdown
        referenceSequences={referenceSequences}
        selectedSequence={selectedReference}
        setSelectedReference={setSelectedReference}
      />
      <DefiningMutationsTable currentCluster={cluster} referenceSequenceName={selectedReference} />
    </div>
  )
}
