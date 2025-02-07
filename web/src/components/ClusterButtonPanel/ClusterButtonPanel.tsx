import React, { useMemo } from 'react'

import { Card, CardBody, CardHeader, Row } from 'reactstrap'
import { styled } from 'styled-components'
import get from 'lodash/get'
import { useRecoilValue } from 'recoil'
import { ClusterButtonGroup } from 'src/components/ClusterButtonPanel/ClusterButtonGroup'
import { ClusterDatum, getClustersGrouped } from 'src/io/getClusters'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { hasPageClustersSelector } from 'src/state/Clusters'

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
  const { t } = useTranslationSafe()
  const clusters = useRecoilValue(hasPageClustersSelector)
  const clustersGrouped = useMemo(() => getClustersGrouped(clusters), [clusters])

  return (
    <ClustersRow className={`gx-0 ${className}`}>
      {Object.entries(clustersGrouped).map(([clusterType, clusterGroup]) => {
        const clusterTypeHeading = get(
          {
            variant: t('Variants'),
            mutation: t('Mutations'),
          },
          clusterType,
          'Other',
        ) as string

        return (
          <ClusterGroupCard key={clusterType}>
            <ClusterGroupHeader>{clusterTypeHeading.toUpperCase()}</ClusterGroupHeader>
            <ClusterGroupBody>
              <ClusterButtonGroup clusterGroup={clusterGroup} currentCluster={currentCluster} />
            </ClusterGroupBody>
          </ClusterGroupCard>
        )
      })}
    </ClustersRow>
  )
}
