import React, { useState } from 'react'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { DefiningMutationLineageTitle } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationLineageTitle'
import { DefiningMutationCluster, useDefiningMutationCluster } from 'src/io/getDefiningMutationsClusters'
import { Layout } from 'src/components/Layout/Layout'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { definingMutationsClusterRedirects } from 'src/state/DefiningMutations'
import { SelectClusterDropdown } from 'src/components/DefiningMutations/DefiningMutationByCluster/SelectClusterDropdown'
import { DefiningMutationsInfo } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsInfo'
import { DefiningMutationsTable } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsTable'
import { SelectReferenceDropdown } from 'src/components/DefiningMutations/DefiningMutationByCluster/SelectReferenceDropdown'
import { DefiningMutationsInfoText } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsInfoText'

export interface DefiningMutationsPageProps {
  clusterName?: string
}

const JustifyEnd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`

export default function DefiningMutationsPage({ clusterName: clusterNameUnsafe }: DefiningMutationsPageProps) {
  const clusterName = useCurrentClusterName(clusterNameUnsafe)

  const cluster = useDefiningMutationCluster(clusterName)

  return (
    <Layout>
      <NarrowPageContainer>
        <DefiningMutationLineageTitle cluster={cluster} />

        <JustifyEnd>
          <SelectClusterDropdown cluster={cluster} />
        </JustifyEnd>

        <DefiningMutationsInfoText />

        <DefiningMutationsInfo currentCluster={cluster} />

        <DefiningMutationsTableWithTargets cluster={cluster} />
      </NarrowPageContainer>
    </Layout>
  )
}

export function useCurrentClusterName(clusterName?: string) {
  const router = useRouter()
  const clusterRedirects = useRecoilValue(definingMutationsClusterRedirects)

  if (clusterName) {
    const clusterNewName = get(clusterRedirects, clusterName)
    if (clusterNewName) {
      void router.replace(`/defining-mutations/${clusterNewName}`)
      return clusterNewName
    }
  }

  if (!clusterName) {
    throw new Error(`Clade or lineage not found`)
  }

  return clusterName
}

export function DefiningMutationsTableWithTargets({ cluster }: { cluster: DefiningMutationCluster }) {
  const referenceSequences = Object.keys(cluster.mutations)
  const [selectedReference, setSelectedReference] = useState<string | undefined>(referenceSequences.at(0))

  if (!selectedReference) {
    return null
  }

  return (
    <>
      <SelectReferenceDropdown
        referenceSequences={referenceSequences}
        selectedSequence={selectedReference}
        setSelectedReference={setSelectedReference}
      />
      <DefiningMutationsTable currentCluster={cluster} referenceSequenceName={selectedReference} />
    </>
  )
}
