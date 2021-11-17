// noinspection DuplicatedCode

import { mapValues, pickBy } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { Col, Row } from 'reactstrap'

import { Editable } from 'src/components/Common/Editable'
import { ColCustom } from 'src/components/Common/ColCustom'

import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { Layout } from 'src/components/Layout/Layout'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { getGenevaClusterData } from 'src/io/getClusterData'

import PerCountryIntroGeneva from '../../../../content/PerCountryIntro/Geneva.md'

import { CountryDistributionPlotCard } from './CountryDistributionPlotCard'
import { CountryDistributionDatum } from './CountryDistributionPlot'

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

export function filterCountries(countries: CountryState, countryDistributions: CountryDistribution[]) {
  const enabledCountries = Object.entries(countries)
    .filter(([_0, { enabled }]) => enabled)
    .map(([country]) => country)

  const withCountriesFiltered = countryDistributions.filter(({ country }) => {
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

const enabledFilters = ['clusters', 'countriesWithIcons']

const { clustersState, countriesState, countryDistributions } = getGenevaClusterData()

export function CountryDistributionPageGeneva() {
  const [countries, setCountries] = useState<CountryState>(countriesState)
  const [clusters, setClusters] = useState<ClusterState>(clustersState)

  const { withCountriesFiltered } =
    /* prettier-ignore */
    useMemo(() => filterCountries(countries, countryDistributions), [countries])

  const { enabledClusters, withClustersFiltered } =
    /* prettier-ignore */
    useMemo(() => filterClusters(clusters, withCountriesFiltered), [clusters, withCountriesFiltered])

  const countryDistributionComponents = useMemo(
    () =>
      withClustersFiltered.map(({ country, distribution }) => (
        <ColCustom key={country} md={12} lg={6} xl={6} xxl={4}>
          <CountryDistributionPlotCard
            country={country}
            distribution={distribution}
            cluster_names={enabledClusters}
            Icon={undefined}
          />
        </ColCustom>
      )),
    [enabledClusters, withClustersFiltered],
  )

  const handleClusterCheckedChange = useCallback(
    (cluster: string) =>
      setClusters((oldClusters) => {
        return { ...oldClusters, [cluster]: { ...oldClusters[cluster], enabled: !oldClusters[cluster].enabled } }
      }),
    [],
  )

  const handleClusterSelectAll = useCallback(
    () => setClusters((oldClusters) => mapValues(oldClusters, (cluster) => ({ ...cluster, enabled: true }))),
    [],
  )

  const handleClusterDeselectAll = useCallback(
    () => setClusters((oldClusters) => mapValues(oldClusters, (cluster) => ({ ...cluster, enabled: false }))),
    [],
  )

  const handleCountryCheckedChange = useCallback(
    (country: string) =>
      setCountries((oldCountries) => {
        return { ...oldCountries, [country]: { ...oldCountries[country], enabled: !oldCountries[country].enabled } }
      }),
    [],
  )

  const handleCountrySelectAll = useCallback(
    () =>
      setCountries((oldCountries: CountryState) =>
        mapValues(oldCountries, (country) => ({ ...country, enabled: true })),
      ),
    [],
  )

  const handleCountryDeselectAll = useCallback(
    () =>
      setCountries((oldCountries: CountryState) =>
        mapValues(oldCountries, (country) => ({ ...country, enabled: false })),
      ),
    [],
  )

  return (
    <Layout wide>
      <Row noGutters>
        <Col>
          <h1 className="text-center">{'Overview of Variants in Geneva'}</h1>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <Editable githubUrl="tree/master/content/PerCountryIntro/">{<PerCountryIntroGeneva />}</Editable>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <Editable githubUrl="blob/master/scripts" text={'View data generation scripts'}>
            <WrapperFlex>
              <SidebarFlex>
                <DistributionSidebar
                  clusters={clusters}
                  countries={countries}
                  regionsTitle={'Regions'}
                  enabledFilters={enabledFilters}
                  clustersCollapsedByDefault={false}
                  Icon={undefined}
                  onClusterFilterChange={handleClusterCheckedChange}
                  onClusterFilterSelectAll={handleClusterSelectAll}
                  onClusterFilterDeselectAll={handleClusterDeselectAll}
                  onCountryFilterChange={handleCountryCheckedChange}
                  onCountryFilterSelectAll={handleCountrySelectAll}
                  onCountryFilterDeselectAll={handleCountryDeselectAll}
                />
              </SidebarFlex>

              <MainFlex>
                <Row noGutters>
                  <Col>
                    <Row noGutters>{countryDistributionComponents}</Row>
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
