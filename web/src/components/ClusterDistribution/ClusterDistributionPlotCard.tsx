/* eslint-disable camelcase */
import React from 'react'

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { PlotCardTitle } from 'src/components/Common/PlotCardTitle'
import {
  ClusterDistributionDatum,
  ClusterDistributionPlot,
} from 'src/components/ClusterDistribution/ClusterDistributionPlot'

export interface ClusterDistributionPlotCardProps {
  cluster: string
  distribution: ClusterDistributionDatum[]
  country_names: string[]
  selectedCountry: string
}

export function ClusterDistributionPlotCard({
  cluster,
  distribution,
  country_names,
  selectedCountry,
}: ClusterDistributionPlotCardProps) {
  return (
    <Card className="m-2">
      <CardHeader className="d-flex flex-sm-column">
        <PlotCardTitle>
          <span>{cluster}</span>
        </PlotCardTitle>
      </CardHeader>

      <CardBody className="p-0">
        <Col className="p-0">
          <Row noGutters>
            <Col className="p-0">
              <ClusterDistributionPlot
                distribution={distribution}
                country_names={country_names}
                selectedCountry={selectedCountry}
              />
            </Col>
          </Row>
        </Col>
      </CardBody>
    </Card>
  )
}
