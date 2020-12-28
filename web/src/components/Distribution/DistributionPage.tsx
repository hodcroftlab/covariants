/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import { Col, Row } from 'reactstrap'
import { Editable } from 'src/components/Common/Editable'

import { DistributionDatum, DistributionPlot } from './DistributionPlot'

import euClusters from '../../../../cluster_tables/EUClusters_data.web.json'

export interface CountryDistributionProps {
  country: string
  distribution: DistributionDatum[]
  cluster_names: string[]
}

export function CountryDistribution({ country, distribution, cluster_names }: CountryDistributionProps) {
  return (
    <Col>
      <Row noGutters>
        <Col className="d-flex flex-sm-column">
          <h3 className="mx-auto">{country}</h3>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <DistributionPlot distribution={distribution} cluster_names={cluster_names} />
        </Col>
      </Row>
    </Col>
  )
}

export function DistributionPage() {
  const countryDistributionComponents = useMemo(
    () =>
      euClusters.distributions.map(({ country, distribution }) => (
        <CountryDistribution
          key={country}
          country={country}
          distribution={distribution}
          cluster_names={euClusters.cluster_names}
        />
      )),
    [euClusters],
  )

  return (
    <div>
      <Editable githubUrl={'TODO'} text={'Add or edit this data'}>
        <div className="border-secondary">{'TODO: add checkboxes here to toggle countries on and off'}</div>
        <div className="border-secondary">{'TODO: add checkboxes here to toggle clusters on and off'}</div>

        <Row noGutters>{countryDistributionComponents}</Row>
      </Editable>
    </div>
  )
}
