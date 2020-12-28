/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import { Col, Row } from 'reactstrap'
import { Editable } from 'src/components/Common/Editable'

import perClusterData from 'src/../data/perClusterData.json'
import { Layout } from 'src/components/Layout/Layout'

import { ClusterDistributionDatum, ClusterDistributionPlot } from './ClusterDistributionPlot'

export interface ClusterDistributionProps {
  cluster: string
  distribution: ClusterDistributionDatum[]
  country_names: string[]
}

export function ClusterDistribution({ cluster, distribution, country_names }: ClusterDistributionProps) {
  return (
    <Col>
      <Row noGutters>
        <Col className="d-flex flex-sm-column">
          <h3 className="mx-auto">{cluster}</h3>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <ClusterDistributionPlot distribution={distribution} country_names={country_names} />
        </Col>
      </Row>
    </Col>
  )
}

export function ClusterDistributionPage() {
  const countryDistributionComponents = useMemo(
    () =>
      perClusterData.distributions.map(({ cluster, distribution }) => (
        <ClusterDistribution
          key={cluster}
          cluster={cluster}
          distribution={distribution}
          country_names={perClusterData.country_names}
        />
      )),
    [],
  )

  return (
    <Layout wide>
      <Editable githubUrl={'TODO'} text={'Add or edit this data'}>
        <div className="border-secondary">{'TODO: add checkboxes here to toggle countries on and off'}</div>
        <div className="border-secondary">{'TODO: add checkboxes here to toggle clusters on and off'}</div>

        <Row noGutters>{countryDistributionComponents}</Row>
      </Editable>
    </Layout>
  )
}
