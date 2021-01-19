import React from 'react'

import { Row } from 'reactstrap'
import { ClusterDatum } from 'src/io/getClusters'
import styled from 'styled-components'

import { ClusterButton } from './ClusterButton'

const ClustersRow = styled(Row)`
  justify-content: center;
`

export interface ClusterPanelProps {
  clusters: ClusterDatum[]
  currentCluster?: ClusterDatum
  className?: string
}

export function ClusterButtonPanel({ clusters, currentCluster, className }: ClusterPanelProps) {
  return (
    <ClustersRow noGutters className={className}>
      {clusters.map((cluster) => (
        <ClusterButton
          key={cluster.display_name}
          cluster={cluster}
          isCurrent={cluster.display_name === currentCluster?.display_name}
        />
      ))}
    </ClustersRow>
  )
}
