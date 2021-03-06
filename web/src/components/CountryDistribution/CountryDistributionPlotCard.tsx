/* eslint-disable camelcase */
import React from 'react'

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { ColoredCircle } from 'src/components/Common/ColoredCircle'
import { PlotCardTitle } from 'src/components/Common/PlotCardTitle'
import { getCountryColor } from 'src/io/getCountryColor'
import {
  CountryDistributionDatum,
  CountryDistributionPlot,
} from 'src/components/CountryDistribution/CountryDistributionPlot'

export interface CountryDistributionPlotCardProps {
  country: string
  distribution: CountryDistributionDatum[]
  cluster_names: string[]
}

export function CountryDistributionPlotCard({
  country,
  distribution,
  cluster_names,
}: CountryDistributionPlotCardProps) {
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
              <CountryDistributionPlot distribution={distribution} cluster_names={cluster_names} />
            </Col>
          </Row>
        </Col>
      </CardBody>
    </Card>
  )
}
