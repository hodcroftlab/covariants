import { get, groupBy, isNil } from 'lodash'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Card, CardBody, CardHeader, Row, RowProps } from 'reactstrap'
import { ClusterDatum, useClusters } from 'src/io/getClusters'
import { ClusterButtonGroup } from 'src/components/ClusterButtonPanel/ClusterButtonGroup'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

const ClustersRow = styled(Row)`
  display: flex;
  flex-direction: row;
`

const ClusterGroupCard = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  border: 0;
  box-shadow: none;
  margin-bottom: 0.5rem;
  background: none;
`

const ClusterGroupHeader = styled(CardHeader)`
  background: none;
  color: ${(props) => props.theme.gray300};
  font-size: 1.1rem;
  font-weight: 700;
`

const ClusterGroupBody = styled(CardBody)`
  display: flex;
  padding: 0;
  margin: auto;
  background: none;
`

export interface ClusterPanelProps extends RowProps {
  currentCluster?: ClusterDatum
  className?: string
}

export function ClusterButtonPanel({ currentCluster, ...restProps }: ClusterPanelProps) {
  const { t } = useTranslationSafe()
  const clusters = useClusters()

  const clusterButtons = useMemo(() => {
    const clustersWithType = clusters.filter((cluster) => !isNil(cluster.type))
    const clustersGrouped = groupBy(clustersWithType, 'type')

    return Object.entries(clustersGrouped).map(([clusterType, clusterGroup]) => {
      const clusterTypeHeading = get(
        {
          variant: t('Variants'),
          mutation: t('Mutations'),
        },
        clusterType,
        'Other',
      )
      return (
        <ClusterGroupCard key={clusterType}>
          <ClusterGroupHeader>{clusterTypeHeading.toUpperCase()}</ClusterGroupHeader>
          <ClusterGroupBody>
            <ClusterButtonGroup clusterGroup={clusterGroup} currentCluster={currentCluster} />
          </ClusterGroupBody>
        </ClusterGroupCard>
      )
    })
  }, [clusters, currentCluster, t])

  return (
    <ClustersRow noGutters {...restProps}>
      {clusterButtons}
    </ClustersRow>
  )
}
