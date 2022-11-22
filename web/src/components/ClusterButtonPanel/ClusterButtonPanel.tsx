import React from 'react'

import { Card, CardBody, CardHeader, Row } from 'reactstrap'
import { ClusterButtonGroup } from 'src/components/ClusterButtonPanel/ClusterButtonGroup'

import { ClusterDatum, getClusters, getClustersGrouped } from 'src/io/getClusters'
import styled from 'styled-components'

const clusters = getClusters().filter((cluster) => !cluster.has_no_page)
const clustersGrouped = getClustersGrouped(clusters)

const ClustersRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

const ClusterGroupCard = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  border: 0;
  box-shadow: none;
  margin-bottom: 0.5rem;
`

const ClusterGroupHeader = styled(CardHeader)`
  flex: 0 0 100%;
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
  padding: 0;
  margin: auto;
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
            <ClusterButtonGroup clusterGroup={clusterGroup} currentCluster={currentCluster} />
          </ClusterGroupBody>
        </ClusterGroupCard>
      ))}
    </ClustersRow>
  )
}
