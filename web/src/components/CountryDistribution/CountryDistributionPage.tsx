/* eslint-disable camelcase */
import React, { useCallback, useMemo, useState } from 'react'

import { pickBy } from 'lodash'
import { Col, Input, Row } from 'reactstrap'
import copy from 'fast-copy'

import { Editable } from 'src/components/Common/Editable'
import perCountryData from 'src/../data/perCountryData.json'
import { CountryDistributionDatum, CountryDistributionPlot } from './CountryDistributionPlot'

const CLUSTERS = copy(perCountryData.cluster_names).sort()
const CLUSTERS_STATE = CLUSTERS.reduce((result, cluster) => {
  return { ...result, [cluster]: { enabled: true } }
}, {})

const COUNTRIES = perCountryData.distributions.map(({ country }) => country).sort()
const COUNTRIES_STATE = COUNTRIES.reduce((result, country) => {
  return { ...result, [country]: { enabled: true } }
}, {})

export interface CountryDistributionProps {
  country: string
  distribution: CountryDistributionDatum[]
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
          <CountryDistributionPlot distribution={distribution} cluster_names={cluster_names} />
        </Col>
      </Row>
    </Col>
  )
}

interface ClusterState {
  [key: string]: { enabled: boolean }
}

export function CountryDistributionPage() {
  const [clusters, setClusters] = useState<ClusterState>(CLUSTERS_STATE)
  const [countries, setCountries] = useState<ClusterState>(COUNTRIES_STATE)

  const enabledCountries = Object.entries(countries)
    .filter(([_0, { enabled }]) => enabled)
    .map(([country]) => country)

  const withCountriesFiltered = perCountryData.distributions.filter(({ country }) => {
    return enabledCountries.some((candidate) => candidate === country)
  })

  const enabledClusters = Object.entries(clusters)
    .filter(([_0, { enabled }]) => enabled)
    .map(([cluster]) => cluster)

  const withClustersFiltered = withCountriesFiltered.map(({ country, distribution }) => {
    const distributionFiltered = distribution.map((dist) => {
      const countsFiltered = pickBy(dist.cluster_counts, (_0, cluster) => {
        return enabledClusters.some((candidate) => candidate === cluster)
      })

      return { ...dist, cluster_counts: countsFiltered }
    })
    return { country, distribution: distributionFiltered }
  })

  const countryDistributionComponents = useMemo(
    () =>
      withClustersFiltered.map(({ country, distribution }) => (
        <CountryDistribution
          key={country}
          country={country}
          distribution={distribution}
          cluster_names={enabledClusters}
        />
      )),
    [enabledClusters, withClustersFiltered],
  )

  const handleClusterCheckedChange = useCallback(
    (cluster: string) => () => {
      setClusters((oldClusters) => {
        return { ...oldClusters, [cluster]: { ...oldClusters[cluster], enabled: !oldClusters[cluster].enabled } }
      })
    },
    [],
  )

  const handleCountryCheckedChange = useCallback(
    (country: string) => () => {
      setCountries((oldCountries) => {
        return { ...oldCountries, [country]: { ...oldCountries[country], enabled: !oldCountries[country].enabled } }
      })
    },
    [],
  )

  return (
    <div>
      <Editable githubUrl={'TODO'} text={'Add or edit this data'}>
        <Row noGutters>
          <Col>
            {Object.entries(clusters).map(([cluster, { enabled }]) => (
              <div key={cluster}>
                <label htmlFor={CSS.escape(cluster)}>
                  <Input
                    id={CSS.escape(cluster)}
                    type="checkbox"
                    checked={enabled}
                    onChange={handleClusterCheckedChange(cluster)}
                  />
                  {cluster}
                </label>
              </div>
            ))}
          </Col>

          <Col>
            {Object.entries(countries).map(([country, { enabled }]) => (
              <div key={country}>
                <label htmlFor={CSS.escape(country)}>
                  <Input
                    id={CSS.escape(country)}
                    type="checkbox"
                    checked={enabled}
                    onChange={handleCountryCheckedChange(country)}
                  />
                  {country}
                </label>
              </div>
            ))}
          </Col>
        </Row>

        <Row noGutters>{countryDistributionComponents}</Row>
      </Editable>
    </div>
  )
}
