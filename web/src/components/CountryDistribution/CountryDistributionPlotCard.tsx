/* eslint-disable camelcase */
import React, { Suspense } from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { styled } from 'styled-components'

import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import type { CountryDistributionDatum } from 'src/io/getPerCountryData'
import { PlotCardTitle } from 'src/components/Common/PlotCardTitle'
import { CountryFlagProps } from 'src/components/Common/CountryFlag'
import { USStateCodeProps } from 'src/components/Common/USStateCode'
import { CountryDistributionPlot } from 'src/components/CountryDistribution/CountryDistributionPlot'
import { LOADING } from 'src/components/Loading/Loading'
import { Ticks, TimeDomain } from 'src/io/useParams'

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
  ticks: Ticks
  timeDomain: TimeDomain
}

export function CountryDistributionPlotCard({
  country,
  distribution,
  cluster_names,
  Icon,
  ticks,
  timeDomain,
}: CountryDistributionPlotCardProps) {
  const { t } = useTranslationSafe()

  return (
    <Card className="m-2">
      <CardHeader className="d-flex flex-sm-column">
        <PlotCardTitle>
          <FlagAlignment>
            {Icon && <Icon country={country} />}
            <span>{t(country)}</span>
          </FlagAlignment>
        </PlotCardTitle>
      </CardHeader>

      <CardBody className="p-0">
        <Col className="p-0">
          <Row className={'gx-0'}>
            <Col className="p-0">
              <Suspense fallback={LOADING}>
                <CountryDistributionPlot
                  distribution={distribution}
                  cluster_names={cluster_names}
                  ticks={ticks}
                  timeDomain={timeDomain}
                />
              </Suspense>
            </Col>
          </Row>
        </Col>
      </CardBody>
    </Card>
  )
}
