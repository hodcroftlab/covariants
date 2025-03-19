/* eslint-disable camelcase */
import React from 'react'

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { styled } from 'styled-components'

import { useRecoilValue } from 'recoil'
import type { ClusterDistributionDatum } from 'src/io/getPerClusterData'
import { Link } from 'src/components/Link/Link'
import { PlotCardTitle } from 'src/components/Common/PlotCardTitle'
import { ClusterDistributionPlot } from 'src/components/ClusterDistribution/ClusterDistributionPlot'
import { clusterDisplayNameToJoinedLineagesSelector } from 'src/state/Clusters'
import { enablePangolinAtom } from 'src/state/Nomenclature'

export interface ClusterDistributionPlotCardProps {
  clusterBuildName: string
  clusterDisplayName: string
  distribution: ClusterDistributionDatum[]
  country_names: string[]
}

const GreyLink = styled(Link)`
  color: ${(props) => props.theme.gray700};
`

export function ClusterDistributionPlotCard({
  clusterBuildName,
  clusterDisplayName,
  distribution,
  country_names,
}: ClusterDistributionPlotCardProps) {
  const url = `/variants/${clusterBuildName}`
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoName = useRecoilValue(clusterDisplayNameToJoinedLineagesSelector(clusterDisplayName)) ?? clusterDisplayName

  return (
    <Card className="m-2">
      <CardHeader className="d-flex flex-sm-column">
        <PlotCardTitle>
          <GreyLink href={url}>{enablePangolin ? pangoName : clusterDisplayName}</GreyLink>
        </PlotCardTitle>
      </CardHeader>

      <CardBody className="p-0">
        <Col className="p-0">
          <Row className={'gx-0'}>
            <Col className="p-0">
              <ClusterDistributionPlot distribution={distribution} country_names={country_names} />
            </Col>
          </Row>
        </Col>
      </CardBody>
    </Card>
  )
}
