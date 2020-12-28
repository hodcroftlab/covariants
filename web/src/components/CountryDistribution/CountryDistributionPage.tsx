/* eslint-disable camelcase,sonarjs/no-identical-functions */
import React, { useCallback, useMemo, useState } from 'react'

import { pickBy } from 'lodash'
import { Card, CardBody, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap'
import copy from 'fast-copy'

import { getClusterColor } from 'src/io/getClusterColors'
import { Editable } from 'src/components/Common/Editable'
import { ColoredBox } from 'src/components/Common/ColoredBox'
import perCountryData from 'src/../data/perCountryData.json'
import { getCountryColor } from 'src/io/getCountryColor'
import { CountryDistributionDatum, CountryDistributionPlot } from './CountryDistributionPlot'
import { ColoredCircle } from '../Common/ColoredCircle'

const CLUSTERS = copy(perCountryData.cluster_names).sort()
const CLUSTERS_STATE = CLUSTERS.reduce((result, cluster) => {
  return { ...result, [cluster]: { enabled: true } }
}, {})

const COUNTRIES = perCountryData.distributions.map(({ country }) => country).sort()
const COUNTRIES_STATE = COUNTRIES.reduce((result, country) => {
  return { ...result, [country]: { enabled: true } }
}, {})

export interface ClusterState {
  [key: string]: { enabled: boolean }
}

export interface CountryState {
  [key: string]: { enabled: boolean }
}

export interface CountryDistribution {
  country: string
  distribution: CountryDistributionDatum[]
}

export interface CountryDistributionJson {
  cluster_names: string[]
  distributions: CountryDistribution[]
}

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
          <h3 className="mx-auto">
            <ColoredCircle $color={getCountryColor(country)} $size={20} />
            <span>{country}</span>
          </h3>
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

export function filterCountries(countries: CountryState, countryDistrubutions: CountryDistribution[]) {
  const enabledCountries = Object.entries(countries)
    .filter(([_0, { enabled }]) => enabled)
    .map(([country]) => country)

  const withCountriesFiltered = countryDistrubutions.filter(({ country }) => {
    return enabledCountries.some((candidate) => candidate === country)
  })

  return { enabledCountries, withCountriesFiltered }
}

export function filterClusters(clusters: ClusterState, withCountriesFiltered: CountryDistribution[]) {
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

  return { enabledClusters, withClustersFiltered }
}

const countryDistrubutions: CountryDistribution[] = perCountryData.distributions

export function CountryDistributionPage() {
  const [countries, setCountries] = useState<CountryState>(COUNTRIES_STATE)
  const [clusters, setClusters] = useState<ClusterState>(CLUSTERS_STATE)

  const { withCountriesFiltered } = useMemo(() => filterCountries(countries, countryDistrubutions), [countries])
  const { enabledClusters, withClustersFiltered } =
    /* prettier-ignore */
    useMemo(() => filterClusters(clusters, withCountriesFiltered), [clusters, withCountriesFiltered])

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
    <Container fluid>
      <Row noGutters>
        <Col>
          <Editable githubUrl={'TODO'} text={'Add or edit this data'}>
            <Row noGutters>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <Form>
                      {Object.entries(clusters).map(([cluster, { enabled }]) => (
                        <FormGroup key={cluster} check>
                          <Label htmlFor={CSS.escape(cluster)} check>
                            <Input
                              id={CSS.escape(cluster)}
                              type="checkbox"
                              checked={enabled}
                              onChange={handleClusterCheckedChange(cluster)}
                            />
                            <ColoredBox $color={getClusterColor(cluster)} $size={14} $aspect={16 / 9} />
                            <span>{cluster}</span>
                          </Label>
                        </FormGroup>
                      ))}
                    </Form>
                  </CardBody>
                </Card>
              </Col>

              <Col md={8}>
                <Card>
                  <CardBody>
                    <Row noGutters>
                      <Col>
                        <Form>
                          {Object.entries(countries)
                            .slice(0, COUNTRIES.length / 2)
                            .map(([country, { enabled }]) => (
                              <FormGroup key={country} check>
                                <Label htmlFor={CSS.escape(country)} check>
                                  <Input
                                    id={CSS.escape(country)}
                                    type="checkbox"
                                    checked={enabled}
                                    onChange={handleCountryCheckedChange(country)}
                                  />
                                  <ColoredCircle $color={getCountryColor(country)} $size={14} />
                                  <span>{country}</span>
                                </Label>
                              </FormGroup>
                            ))}
                        </Form>
                      </Col>

                      <Col>
                        <Form>
                          {Object.entries(countries)
                            .slice(COUNTRIES.length / 2)
                            .map(([country, { enabled }]) => (
                              <FormGroup key={country} check>
                                <Label htmlFor={CSS.escape(country)} check>
                                  <Input
                                    id={CSS.escape(country)}
                                    type="checkbox"
                                    checked={enabled}
                                    onChange={handleCountryCheckedChange(country)}
                                  />
                                  <ColoredCircle $color={getCountryColor(country)} $size={14} />
                                  <span>{country}</span>
                                </Label>
                              </FormGroup>
                            ))}
                        </Form>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row noGutters>{countryDistributionComponents}</Row>
          </Editable>
        </Col>
      </Row>
    </Container>
  )
}
