import React, { Fragment } from 'react'

import { Row } from 'reactstrap'
import { ClusterDatum, getClustersGrouped } from 'src/io/getClusters'
import styled from 'styled-components'

import { ClusterButton } from './ClusterButton'

const clustersGrouped = getClustersGrouped()

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
  currentCluster?: ClusterDatum
  className?: string
}

export function ClusterButtonPanel({ currentCluster, className }: ClusterPanelProps) {
  return (
    <ClustersRow noGutters className={className}>
      {Object.entries(clustersGrouped).map(([clusterType, clusterGroup]) => (
        <Fragment key={clusterType}>
          <ClustersSubheading>{clusterType}</ClustersSubheading>
          {clusterGroup.map((cluster) => (
            <ClusterButton
              key={cluster.display_name}
              cluster={cluster}
              isCurrent={cluster.display_name === currentCluster?.display_name}
            />
          ))}
        </Fragment>
      ))}
    </ClustersRow>
  )
}
