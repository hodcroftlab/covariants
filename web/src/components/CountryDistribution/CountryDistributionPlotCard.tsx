/* eslint-disable camelcase */
import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import styled from 'styled-components'

import { PlotCardTitle } from 'src/components/Common/PlotCardTitle'
import { CountryFlagProps } from 'src/components/Common/CountryFlag'
import { USStateCodeProps } from 'src/components/Common/USStateCode'
import {
  CountryDistributionDatum,
  CountryDistributionPlot,
} from 'src/components/CountryDistribution/CountryDistributionPlot'

const FlagAlignment = styled.span`
  display: flex;
  align-items: center;
  > * + * {
    margin-left: 0.5em;
  }
`
export interface CountryDistributionPlotCardProps {
  country: string
  distribution: CountryDistributionDatum[]
  cluster_names: string[]
  Icon?: React.ComponentType<CountryFlagProps | USStateCodeProps>
}

export function CountryDistributionPlotCard({
  country,
  distribution,
  cluster_names,
  Icon,
}: CountryDistributionPlotCardProps) {
  return (
    <Card className="m-2">
      <CardHeader className="d-flex flex-sm-column">
        <PlotCardTitle>
          <FlagAlignment>
            {Icon && <Icon country={country} />}
            <span>{country}</span>
          </FlagAlignment>
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
