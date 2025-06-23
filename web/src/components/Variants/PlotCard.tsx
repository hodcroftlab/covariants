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
import { clusterDisplayNameToJoinedLineagesSelector } from 'src/state/Clusters'

const PlotCardTitleIcon = styled(GoGraph)`
  margin: auto 5px;
  width: 20px;
  height: 20px;
`

export interface PlotCardProps {
  cluster: ClusterDatum
}

export function PlotCardTitle({ cluster }: PlotCardProps) {
  const { t } = useTranslationSafe()
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoName =
    useRecoilValue(clusterDisplayNameToJoinedLineagesSelector(cluster.displayName)) ?? cluster.displayName
  const variant = enablePangolin ? pangoName : cluster.displayName

  return (
    <span className="d-flex w-100">
      <PlotCardTitleIcon />
      <h4 className="d-inline mb-0 mt-0 fs-5">{t('Distribution of {{variant}} per country', { variant })}</h4>
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
  const clusterDistribution = useRecoilValue(perClusterDataDistributionSelector(cluster.displayName))
  const countryNames = useRecoilValue(perClusterDataCountryNamesSelector)

  return (
    <Card>
      <CardBody>{title}</CardBody>
      <CardBody className="p-0">
        <Row className={'gx-0'}>
          <Col>
            <ClusterDistributionPlot distribution={clusterDistribution} country_names={countryNames} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
