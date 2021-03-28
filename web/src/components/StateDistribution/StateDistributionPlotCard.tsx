/* eslint-disable camelcase */
import React from 'react'

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { ColoredCircle } from 'src/components/Common/ColoredCircle'
import { PlotCardTitle } from 'src/components/Common/PlotCardTitle'
import { getCountryColor } from 'src/io/getCountryColor'
import {
 StateDistributionDatum, StateDistributionPlot,
} from 'src/components/StateDistribution/StateDistributionPlot'

export interface StateDistributionPlotCardProps {
  country: string
  distribution: StateDistributionDatum[]
  cluster_names: string[]
}

export function StateDistributionPlotCard({
  country,
  distribution,
  cluster_names,
}: StateDistributionPlotCardProps) {
  return (
    <Card className="m-2">
      <CardHeader className="d-flex flex-sm-column">
        <PlotCardTitle>
          <ColoredCircle $color={getCountryColor(country)} $size={20} />
          <span>{country}</span>
        </PlotCardTitle>
      </CardHeader>

      <CardBody className="p-0">
        <Col>
          <Row noGutters>
            <Col>
              <StateDistributionPlot distribution={distribution} cluster_names={cluster_names} />
            </Col>
          </Row>
        </Col>
      </CardBody>
    </Card>
  )
}
