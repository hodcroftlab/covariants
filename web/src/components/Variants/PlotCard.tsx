import React, { useMemo } from 'react'
import { getClusterDistribution, getCountryNames } from 'src/io/getPerClusterData'

import styled from 'styled-components'
import { GoGraph } from 'react-icons/go'
import { Card, CardBody, Col, Row } from 'reactstrap'

import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { theme } from 'src/theme'
import { ClusterDistributionPlot } from 'src/components/ClusterDistribution/ClusterDistributionPlot'
import { ClusterDatum } from 'src/io/getClusters'
import { Link } from '../Link/Link'

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
  const { t } = useTranslationSafe()

  return (
    <span className="d-flex w-100">
      <PlotCardTitleIcon />
      <PlotCardHeading>
        {t('Distribution of {{variant}} per country', { variant: cluster.display_name })}
      </PlotCardHeading>
      <span className="ml-auto">
        <Link href="/per-variant" color={theme.link.dim.color}>
          {t('Compare')}
        </Link>
      </span>
    </span>
  )
}

export function PlotCard({ cluster }: PlotCardProps) {
  const title = useMemo(() => <PlotCardTitle cluster={cluster} />, [cluster])
  const clusterDistribution = useMemo(
    () => getClusterDistribution(cluster.display_name).distribution,
    [cluster.display_name],
  )
  const countryNames = useMemo(() => getCountryNames(), [])

  return (
    <Card>
      <CardBody>{title}</CardBody>
      <PlotCardBody>
        <Row noGutters>
          <Col>
            <ClusterDistributionPlot distribution={clusterDistribution} country_names={countryNames} />
          </Col>
        </Row>
      </PlotCardBody>
    </Card>
  )
}
