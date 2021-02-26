import React from 'react'

import { Card, CardBody, CardHeader, Row } from 'reactstrap'
import { ClusterDatum, getClustersGrouped } from 'src/io/getClusters'
import styled from 'styled-components'

import { ClusterButton } from './ClusterButton'

const clustersGrouped = getClustersGrouped()

const ClustersRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
`

const ClusterGroupCard = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;

  border: 0;
  box-shadow: none;
  background: transparent;

  margin-bottom: 0.5rem;
`

const ClusterGroupHeader = styled(CardHeader)`
  text-align: center;
  width: 100%;
  background: none;
  color: ${(props) => props.theme.gray700};
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: capitalize;
`

const ClusterGroupBody = styled(CardBody)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
`

export interface ClusterPanelProps {
  currentCluster?: ClusterDatum
  className?: string
}

export function ClusterButtonPanel({ currentCluster, className }: ClusterPanelProps) {
  return (
    <ClustersRow noGutters className={className}>
      {Object.entries(clustersGrouped).map(([clusterType, clusterGroup]) => (
        <ClusterGroupCard key={clusterType}>
          <ClusterGroupHeader>{clusterType}</ClusterGroupHeader>
          <ClusterGroupBody>
            {clusterGroup.map((cluster) => (
              <ClusterButton
                key={cluster.display_name}
                cluster={cluster}
                isCurrent={cluster.display_name === currentCluster?.display_name}
              />
            ))}
          </ClusterGroupBody>
        </ClusterGroupCard>
      ))}
    </ClustersRow>
  )
}
