import { mapValues, pickBy } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Col, Row } from 'reactstrap'

import { Editable } from 'src/components/Common/Editable'
import { ColCustom } from 'src/components/Common/ColCustom'
import { RegionSwitcher } from 'src/components/CountryDistribution/RegionSwitcher'

import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { Layout } from 'src/components/Layout/Layout'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { getRegionPerCountryContent } from 'src/io/getRegionContent'

import {
  DEFAULT_REGION,
  getClusterData,
  getPerCountryIntroContentFilename,
  REGIONS,
  REGIONS_HAVE_DATA,
} from 'src/io/getClusterData'

import { CountryDistributionPlotCard } from './CountryDistributionPlotCard'
import { CountryDistributionDatum } from './CountryDistributionPlot'
import { CountryFlag } from '../Common/CountryFlag'
import { USStateCode } from '../Common/USStateCode'

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

export function CountryDistributionPage() {
  const [currentRegion, setCurrentRegion] = useState(DEFAULT_REGION)
  const { clustersState, countriesState, countryDistributions } =
    /* prettier-ignore */
    useMemo(() => getClusterData(currentRegion), [currentRegion])

  const [countries, setCountries] = useState<CountryState>(countriesState)
  const [clusters, setClusters] = useState<ClusterState>(clustersState)

  useEffect(() => {
    setCountries(countriesState)
    setClusters(clustersState)
  }, [clustersState, countriesState])

  const regionsTitle = useMemo(() => (currentRegion === 'World' ? 'Countries' : 'Regions'), [currentRegion])
  const iconComponent = useMemo(() => {
    if (currentRegion === 'World') return CountryFlag
    if (currentRegion === 'United States') return USStateCode
    return undefined
  }, [currentRegion])

  const { withCountriesFiltered } =
    /* prettier-ignore */
    useMemo(() => filterCountries(countries, countryDistributions), [countries, countryDistributions])

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
            Icon={iconComponent}
          />
        </ColCustom>
      )),
    [enabledClusters, withClustersFiltered, iconComponent],
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

  const IntroContent = useMemo(() => {
    const contentFilename = getPerCountryIntroContentFilename(currentRegion)
    return getRegionPerCountryContent(contentFilename)
  }, [currentRegion])

  return (
    <Layout wide>
      <Row noGutters>
        <Col>
          <h1 className="text-center">{'Overview of Variants in Countries'}</h1>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <RegionSwitcher
            regions={REGIONS}
            regionsHaveData={REGIONS_HAVE_DATA}
            currentRegion={currentRegion}
            setCurrentRegion={setCurrentRegion}
          />
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <Editable githubUrl="tree/master/content/PerCountryIntro/">
            <IntroContent />
          </Editable>
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
                  regionsTitle={regionsTitle}
                  enabledFilters={enabledFilters}
                  clustersCollapsedByDefault={false}
                  Icon={iconComponent}
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
