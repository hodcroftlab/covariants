import React from 'react'

import { Row } from 'reactstrap'
import { ClusterDatum } from 'src/io/getClusters'
import styled from 'styled-components'

import { ClusterButton } from './ClusterButton'

const ClustersRow = styled(Row)`
  justify-content: center;
`

const ClustersSubheading = styled.div`
  text-align: left;
  width: 100%;
  padding-left: 5px;
  color: var(--gray);
`

export interface ClusterPanelProps {
  clusters: ClusterDatum[]
  currentCluster?: ClusterDatum
  className?: string
}

export function ClusterButtonPanel({ clusters, currentCluster, className }: ClusterPanelProps) {
  const groupedClusters = groupClusters(clusters)
  return (
    <ClustersRow noGutters className={className}>
      {Object.keys(groupedClusters).map((clusterType) => (
        <>
          <ClustersSubheading>{clusterType}</ClustersSubheading>
          {groupedClusters[clusterType].map((cluster) => (
            <ClusterButton
              key={cluster.display_name}
              cluster={cluster}
              isCurrent={cluster.display_name === currentCluster?.display_name}
            />
          ))}
        </>
      ))}
    </ClustersRow>
  )
}

function groupClusters(clusters: ClusterDatum[]) {
  type tGroupedClusters = { [key: string]: Array<ClusterDatum> }
  const groupedClusters: tGroupedClusters = {}
  clusters.forEach((cluster) => {
    const clusterType = cluster.type || 'other'
    if (groupedClusters[clusterType] === undefined) groupedClusters[clusterType] = []
    groupedClusters[clusterType].push(cluster)
  })
  return groupedClusters
}