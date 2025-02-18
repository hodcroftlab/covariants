import React, { useMemo } from 'react'
import { styled } from 'styled-components'
import { GoGraph } from 'react-icons/go'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { Link } from '../Link/Link'

import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { theme } from 'src/theme'
import { ClusterDistributionPlot } from 'src/components/ClusterDistribution/ClusterDistributionPlot'
import { ClusterDatum } from 'src/io/getClusters'
import { perClusterDataCountryNamesSelector, perClusterDataDistributionSelector } from 'src/state/PerClusterData'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { clusterPangoLineageMapSelector } from 'src/state/Clusters'

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
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineageMap = useRecoilValue(clusterPangoLineageMapSelector)
  const pangoName = pangoLineageMap.get(cluster.display_name) ?? cluster.display_name

  return (
    <span className="d-flex w-100">
      <PlotCardTitleIcon />
      <PlotCardHeading>
        {t('Distribution of {{variant}} per country', { variant: enablePangolin ? pangoName : cluster.display_name })}
      </PlotCardHeading>
      <span className="ms-auto">
        <Link href="/per-variant" color={theme.link.dim.color}>
          {t('Compare')}
        </Link>
      </span>
    </span>
  )
}

export function PlotCard({ cluster }: PlotCardProps) {
  const title = useMemo(() => <PlotCardTitle cluster={cluster} />, [cluster])
  const clusterDistribution = useRecoilValue(perClusterDataDistributionSelector(cluster.display_name))
  const countryNames = useRecoilValue(perClusterDataCountryNamesSelector)

  return (
    <Card>
      <CardBody>{title}</CardBody>
      <PlotCardBody>
        <Row className={'gx-0'}>
          <Col>
            <ClusterDistributionPlot distribution={clusterDistribution} country_names={countryNames} />
          </Col>
        </Row>
      </PlotCardBody>
    </Card>
  )
}
