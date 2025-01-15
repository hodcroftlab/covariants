/* eslint-disable camelcase */
import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { styled } from 'styled-components'

import type { PerCountryCasesDistributionDatum } from 'src/io/getPerCountryCasesData'
import { PlotCardTitle } from 'src/components/Common/PlotCardTitle'
import { CountryFlagProps } from 'src/components/Common/CountryFlag'
import { USStateCodeProps } from 'src/components/Common/USStateCode'
import { CasesPlot } from 'src/components/Cases/CasesPlot'
import { Ticks, TimeDomain } from 'src/io/useParams'

const FlagAlignment = styled.span`
  display: flex;
  align-items: center;
  > * + * {
    margin-left: 0.5em;
  }
`
export interface CasesPlotCardProps {
  country: string
  distribution: PerCountryCasesDistributionDatum[]
  cluster_names: string[]
  Icon?: React.ComponentType<CountryFlagProps | USStateCodeProps>
  ticks: Ticks
  timeDomain: TimeDomain
}

export function CasesPlotCard({ country, distribution, cluster_names, Icon, ticks, timeDomain }: CasesPlotCardProps) {
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
        <Col className="p-0">
          <Row className={'gx-0'}>
            <Col className="p-0">
              <CasesPlot
                distribution={distribution}
                cluster_names={cluster_names}
                ticks={ticks}
                timeDomain={timeDomain}
              />
            </Col>
          </Row>
        </Col>
      </CardBody>
    </Card>
  )
}
