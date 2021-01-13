/* eslint-disable camelcase */
import React, { useCallback, useMemo, useState } from 'react'

import copy from 'fast-copy'
import { pickBy } from 'lodash'
import { Col, Row } from 'reactstrap'

import perClusterData from 'src/../data/perClusterData.json'
import { ClusterDistributionPlotCard } from 'src/components/ClusterDistribution/ClusterDistributionPlotCard'
import { ColCustom } from 'src/components/Common/ColCustom'
import { Editable } from 'src/components/Common/Editable'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { ClusterState, CountryState } from 'src/components/CountryDistribution/CountryDistributionPage'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { Layout } from 'src/components/Layout/Layout'

import PerClusterIntro from 'src/../../content/PerClusterIntro.md'
import { ClusterDistributionDatum } from './ClusterDistributionPlot'

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
const enabledFilters = ['countries', 'clusters']

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
          <ClusterDistributionPlotCard
            key={cluster}
            cluster={cluster}
            distribution={distribution}
            country_names={enabledCountries}
          />
        </ColCustom>
      )),
    [enabledCountries, withCountriesFiltered],
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
          <Editable githubUrl="blob/master/content/PerClusterIntro.md">
            <PerClusterIntro />
          </Editable>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <Editable githubUrl="blob/master/scripts" text={'View data generation scripts'}>
            <WrapperFlex>
              <SidebarFlex>
                <DistributionSidebar
                  countries={countries}
                  clusters={clusters}
                  coutriesCollapsedByDefault={false}
                  enabledFilters={enabledFilters}
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
