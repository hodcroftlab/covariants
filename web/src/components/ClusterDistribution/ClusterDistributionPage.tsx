/* eslint-disable camelcase */
import copy from 'fast-copy'
import { pickBy } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'

import { Col, Row } from 'reactstrap'
import { ColCustom } from 'src/components/Common/ColCustom'

import { ClusterState, CountryState } from 'src/components/CountryDistribution/CountryDistributionPage'
import { Editable } from 'src/components/Common/Editable'

import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { Layout } from 'src/components/Layout/Layout'

import perClusterData from 'src/../data/perClusterData.json'

import { ClusterDistributionDatum, ClusterDistributionPlot } from './ClusterDistributionPlot'

const COUNTRIES = copy(perClusterData.country_names).sort()
const COUNTRIES_STATE = COUNTRIES.reduce((result, country) => {
  return { ...result, [country]: { enabled: true } }
}, {})

const CLUSTERS = perClusterData.distributions.map(({ cluster }) => cluster).sort()
const CLUSTERS_STATE = CLUSTERS.reduce((result, cluster) => {
  return { ...result, [cluster]: { enabled: true } }
}, {})

export interface ClusterDistribution {
  cluster: string
  distribution: ClusterDistributionDatum[]
}

export interface ClusterDistributionJson {
  country_names: string[]
  distributions: ClusterDistribution[]
}

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

export function filterClusters(clusters: ClusterState, clusterDistrubutions: ClusterDistribution[]) {
  const enabledClusters = Object.entries(clusters)
    .filter(([_0, { enabled }]) => enabled)
    .map(([country]) => country)

  const withClustersFiltered = clusterDistrubutions.filter(({ cluster }) => {
    return enabledClusters.some((candidate) => candidate === cluster)
  })

  return { enabledClusters, withClustersFiltered }
}

export function filterCountries(countries: CountryState, withClustersFiltered: ClusterDistribution[]) {
  const enabledCountries = Object.entries(countries)
    .filter(([_0, { enabled }]) => enabled)
    .map(([country]) => country)

  const withCountriesFiltered = withClustersFiltered.map(({ cluster, distribution }) => {
    const distributionFiltered = distribution.map((dist) => {
      const frequenciesFiltered = pickBy(dist.frequencies, (_0, country) => {
        return enabledCountries.some((candidate) => candidate === country)
      })

      return { ...dist, frequencies: frequenciesFiltered }
    })
    return { cluster, distribution: distributionFiltered }
  })

  return { enabledCountries, withCountriesFiltered }
}

// eslint-disable-next-line prefer-destructuring
const distributions: ClusterDistribution[] = perClusterData.distributions

export function ClusterDistributionPage() {
  const [clusters, setClusters] = useState<ClusterState>(CLUSTERS_STATE)
  const [countries, setCountries] = useState<CountryState>(COUNTRIES_STATE)

  const { withClustersFiltered } = useMemo(() => filterClusters(clusters, distributions), [clusters])
  const { enabledCountries, withCountriesFiltered } =
    /* prettier-ignore */
    useMemo(() => filterCountries(countries, withClustersFiltered), [countries, withClustersFiltered])

  const clusterDistributionComponents = useMemo(
    () =>
      withCountriesFiltered.map(({ cluster, distribution }) => (
        <ColCustom key={cluster} md={12} lg={6} xl={6} xxl={4}>
          <ClusterDistribution
            key={cluster}
            cluster={cluster}
            distribution={distribution}
            country_names={enabledCountries}
          />
        </ColCustom>
      )),
    [],
  )

  const handleClusterCheckedChange = useCallback(
    (cluster: string) =>
      setClusters((oldClusters) => {
        return { ...oldClusters, [cluster]: { ...oldClusters[cluster], enabled: !oldClusters[cluster].enabled } }
      }),
    [],
  )

  const handleCountryCheckedChange = useCallback(
    (country: string) =>
      setCountries((oldCountries) => {
        return { ...oldCountries, [country]: { ...oldCountries[country], enabled: !oldCountries[country].enabled } }
      }),
    [],
  )

  return (
    <Layout wide>
      <Row noGutters>
        <Col>
          <Editable githubUrl={'TODO'} text={'Add or edit this data'}>
            <WrapperFlex>
              <SidebarFlex>
                <DistributionSidebar
                  clusters={clusters}
                  countries={countries}
                  onClusterFilterChange={handleClusterCheckedChange}
                  onCountryFilterChange={handleCountryCheckedChange}
                />
              </SidebarFlex>

              <MainFlex>
                <Row noGutters>
                  <Col>
                    <Row noGutters>{clusterDistributionComponents}</Row>
                  </Col>
                </Row>
              </MainFlex>
            </WrapperFlex>
          </Editable>
        </Col>
      </Row>
    </Layout>
  )
}
