import React, { useMemo } from 'react'

import { Card, CardBody, CardHeader, Row } from 'reactstrap'
import get from 'lodash/get'
import { useRecoilValue } from 'recoil'
import { ClusterButtonGroup } from 'src/components/ClusterButtonPanel/ClusterButtonGroup'
import { ClusterDatum, getClustersGrouped } from 'src/io/getClusters'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { hasPageClustersSelector } from 'src/state/Clusters'

export interface ClusterPanelProps {
  currentCluster?: ClusterDatum
  className?: string
}

export function ClusterButtonPanel({ currentCluster, className }: ClusterPanelProps) {
  const { t } = useTranslationSafe()
  const clusters = useRecoilValue(hasPageClustersSelector)
  const clustersGrouped = useMemo(() => getClustersGrouped(clusters), [clusters])

  return (
    <Row className={`d-flex flex-wrap flex-column gx-0 ${className}`}>
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
          <Card className="d-flex flex-wrap border-0 shadow-none mb-1" key={clusterType}>
            <CardHeader className={'side-navigation-header'}>{clusterTypeHeading.toUpperCase()}</CardHeader>
            <CardBody className={'d-flex p-0 mx-auto'}>
              <ClusterButtonGroup clusterGroup={clusterGroup} currentCluster={currentCluster} />
            </CardBody>
          </Card>
        )
      })}
    </Row>
  )
}
