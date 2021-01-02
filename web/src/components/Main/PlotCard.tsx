/* eslint-disable prefer-destructuring,camelcase */
import React, { useMemo, useState } from 'react'

import styled from 'styled-components'
import { ClusterDistribution } from 'src/components/ClusterDistribution/ClusterDistributionPage'
import { GoGraph } from 'react-icons/go'
import { CardBody, Col, Row } from 'reactstrap'

import { theme } from 'src/theme'
import {
  ClusterDistributionDatum,
  ClusterDistributionPlot,
} from 'src/components/ClusterDistribution/ClusterDistributionPlot'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'
import { ClusterDatum } from 'src/io/getClusters'
import perClusterData from '../../../data/perClusterData.json'
import { Link } from '../Link/Link'

const distributions: ClusterDistribution[] = perClusterData.distributions
const country_names = perClusterData.country_names

function getDistribution(cluster: string): ClusterDistributionDatum[] {
  return distributions.find((dist) => dist.cluster === cluster)?.distribution ?? []
}

const PlotCardTitleIcon = styled(GoGraph)`
  margin: auto 5px;
  width: 20px;
  height: 20px;
`

const PlotCardBody = styled(CardBody)`
  padding: 0;
`

const PlotCardHeading = styled.h1`
  display: inline;
  margin: auto 0;
  font-size: 1.2rem;
`

export interface PlotCardProps {
  cluster: ClusterDatum
}

export function PlotCardTitle({ cluster }: PlotCardProps) {
  return (
    <span className="d-flex w-100">
      <PlotCardTitleIcon />
      <PlotCardHeading>{`Distribution of ${cluster.display_name} per country`}</PlotCardHeading>
      <span className="ml-auto">
        <Link href="/cluster-distribution" color={theme.link.dim.color}>
          {'Compare'}
        </Link>
      </span>
    </span>
  )
}

export function PlotCard({ cluster }: PlotCardProps) {
  const [collapsed, setCollapsed] = useState(true)
  const title = useMemo(() => <PlotCardTitle cluster={cluster} />, [cluster])
  const distribution = getDistribution(cluster.display_name)

  return (
    <CardCollapsible title={title} collapsed={collapsed} setCollapsed={setCollapsed}>
      {!collapsed && (
        <PlotCardBody>
          <Row noGutters>
            <Col>
              <ClusterDistributionPlot distribution={distribution} country_names={country_names} />
            </Col>
          </Row>
        </PlotCardBody>
      )}
    </CardCollapsible>
  )
}
