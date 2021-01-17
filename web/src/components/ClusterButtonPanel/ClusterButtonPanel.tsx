import React, { useCallback } from 'react'

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
  switchCluster?(cluster: ClusterDatum): void
}

export function ClusterButtonPanel({ clusters, currentCluster, switchCluster, className }: ClusterPanelProps) {
  const handleSwitchCluster = useCallback((cluster: ClusterDatum) => () => switchCluster?.(cluster), [switchCluster])

  return (
    <ClustersRow noGutters className={className}>
      {clusters.map((cluster, index) => (
        <ClusterButton
          key={cluster.display_name}
          cluster={cluster}
          onClick={handleSwitchCluster(cluster)}
          isCurrent={cluster.display_name === currentCluster?.display_name}
        />
      ))}
    </ClustersRow>
  )
}
