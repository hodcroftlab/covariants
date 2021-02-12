/* eslint-disable camelcase */
import React from 'react'

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { Link } from 'src/components/Link/Link'
import { PlotCardTitle } from 'src/components/Common/PlotCardTitle'
import {
  ClusterDistributionDatum,
  ClusterDistributionPlot,
} from 'src/components/ClusterDistribution/ClusterDistributionPlot'

export interface ClusterDistributionPlotCardProps {
  cluster: string
  distribution: ClusterDistributionDatum[]
  country_names: string[]
}

export function ClusterDistributionPlotCard({
  cluster,
  distribution,
  country_names,
}: ClusterDistributionPlotCardProps) {
  const url = `/variants/${cluster.replace(':', '.')}`

  return (
    <Card className="m-2">
      <CardHeader className="d-flex flex-sm-column">
        <PlotCardTitle>
          <Link href={url}>{cluster}</Link>
        </PlotCardTitle>
      </CardHeader>

      <CardBody className="p-0">
        <Col className="p-0">
          <Row noGutters>
            <Col className="p-0">
              <ClusterDistributionPlot distribution={distribution} country_names={country_names} />
            </Col>
          </Row>
        </Col>
      </CardBody>
    </Card>
  )
}
