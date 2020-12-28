/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import { Col, Row } from 'reactstrap'
import { Editable } from 'src/components/Common/Editable'

import { DistributionDatum, DistributionPlot } from './DistributionPlot'

import DistributionIntro from '../../../content/DistributionIntro.md'

import euClusters from 'src/../data/EUClusters_data.web.json'

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

  // const d = euClusters.distributions[0]
  //
  // console.log({ d })
  //
  // const countryDistributionComponents = [
  //   <CountryDistribution key={d.country} country={d.country} distribution={d.distribution}  />,
  // ]

  return (
    <div>
      <Editable githubUrl={'TODO'}>
        <DistributionIntro />
      </Editable>

      <Editable githubUrl={'TODO'} text={'Add or edit this data'}>
        <div className="border-secondary">{'TODO: add checkboxes here to toggle countries on and off'}</div>
        <div className="border-secondary">{'TODO: add checkboxes here to toggle clusters on and off'}</div>

        <Row noGutters>{countryDistributionComponents}</Row>
      </Editable>
    </div>
  )
}
