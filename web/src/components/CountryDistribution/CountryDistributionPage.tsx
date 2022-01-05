import { mapValues } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { useRouter } from 'next/router'

import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { ColCustom } from 'src/components/Common/ColCustom'
import { RegionSwitcher } from 'src/components/CountryDistribution/RegionSwitcher'

import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { Layout } from 'src/components/Layout/Layout'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { getRegionPerCountryContent } from 'src/io/getRegionContent'
import { disableAllPlaces, enableAllPlaces, Places, toggleContinent, toggleCountry } from 'src/io/getPlaces'

import {
  Region,
  ClusterState,
  filterClusters,
  filterCountries,
  getPerCountryData,
  getPerCountryIntroContentFilename,
  getRegions,
  toggleCluster,
} from 'src/io/getPerCountryData'

import { CountryDistributionPlotCard } from './CountryDistributionPlotCard'
import { CountryFlag } from '../Common/CountryFlag'
import { USStateCode } from '../Common/USStateCode'
import { PageHeading } from '../Common/PageHeading'

const enabledFilters = ['clusters', 'countriesWithIcons']
const { regionNames, regionsHaveData } = getRegions()

const getRegionBySelectedCountries = (countries: string | string[] | undefined): Region => {
  if (Array.isArray(countries)) {
    if (
      countries.length === 1 &&
      [Region.UNITED_STATES.toLowerCase(), 'usa', 'us'].includes(countries[0].toLowerCase())
    ) {
      return Region.UNITED_STATES
    }
    if (countries.length === 1 && countries[0].toLowerCase() === Region.SWITZERLAND.toLowerCase()) {
      return Region.SWITZERLAND
    }
    return Region.WORLD
  }
  if (countries) {
    switch (countries.toLowerCase()) {
      case Region.UNITED_STATES.toLowerCase():
      case 'usa':
      case 'us':
        return Region.UNITED_STATES
      case Region.SWITZERLAND.toLowerCase():
        return Region.SWITZERLAND
      default:
        return Region.WORLD
    }
  }
  return Region.WORLD
}

const getCurriedClustersBySelectedClusters = (fallbackClusters: ClusterState) => {
  const clusterKeys = Object.keys(fallbackClusters)
  const noClusterSelectedState = clusterKeys.reduce((acc, key) => {
    return { ...acc, [key]: { enabled: false } }
  }, {})
  return (clusters: string | string[] | undefined, deselectAll = false): ClusterState => {
    if (!clusters) {
      if (!deselectAll) {
        return fallbackClusters
      }
      return noClusterSelectedState
    }
    let selectedClusters = new Set<string>()
    if (typeof clusters === 'string') {
      selectedClusters.add(clusters)
    } else if (Array.isArray(clusters)) {
      selectedClusters = new Set(clusters)
    }
    return clusterKeys.reduce((acc, key) => {
      return { ...acc, [key]: { enabled: selectedClusters.has(key) } }
    }, {})
  }
}

export function CountryDistributionPage() {
  const router = useRouter()

  const { countries: selectedCountries, variants: selectedClusters } = router.query
  const initialRegion = getRegionBySelectedCountries(selectedCountries)
  const [currentRegion, setCurrentRegion] = useState(initialRegion)
  const { clusters: initialClusters, places: initialPlaces, countryDistributions } =
    /* prettier-ignore */
    useMemo(() => getPerCountryData(currentRegion), [currentRegion])

  const getClustersBySelectedClusters = getCurriedClustersBySelectedClusters(initialClusters)
  const initialClustersState = getClustersBySelectedClusters(selectedClusters)
  const [places, setPlaces] = useState<Places>(initialPlaces)
  const [clustersState, setClusters] = useState<ClusterState>(initialClustersState)

  useEffect(() => {
    setPlaces(initialPlaces)
  }, [initialPlaces, setPlaces])

  useEffect(() => {
    setCurrentRegion(initialRegion)
  }, [initialRegion, setCurrentRegion])

  useEffect(() => {
    setClusters(initialClustersState)
  }, [initialClustersState, setClusters])

  const regionsTitle = useMemo(() => (currentRegion === Region.WORLD ? 'Countries' : 'Regions'), [currentRegion])
  const iconComponent = useMemo(() => {
    if (currentRegion === Region.WORLD) return CountryFlag
    if (currentRegion === Region.UNITED_STATES) return USStateCode
    return undefined
  }, [currentRegion])

  const { withCountriesFiltered } =
    /* prettier-ignore */
    useMemo(() => filterCountries(places, countryDistributions), [countryDistributions, places])

  const { enabledClusters, withClustersFiltered } =
    /* prettier-ignore */
    useMemo(() => filterClusters(clustersState, withCountriesFiltered), [clustersState, withCountriesFiltered])

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

  const handleClusterCheckedChange = useCallback((clusterName: string) => {
    setClusters((oldClusters) => toggleCluster(oldClusters, clusterName))
  }, [])

  const handleClusterSelectAll = useCallback(() => {
    setClusters((oldClusters) => mapValues(oldClusters, (cluster) => ({ ...cluster, enabled: true })))
  }, [])

  const handleClusterDeselectAll = useCallback(() => {
    setClusters((oldClusters) => mapValues(oldClusters, (cluster) => ({ ...cluster, enabled: false })))
  }, [])

  const handleCountryCheckedChange = useCallback(
    (countryName: string) => {
      setPlaces((oldPlaces) => toggleCountry(oldPlaces, countryName))
    },
    [setPlaces],
  )

  const handleRegionCheckedChange = useCallback(
    (continentName: string) => {
      setPlaces((oldPlaces) => toggleContinent(oldPlaces, continentName))
    },
    [setPlaces],
  )

  const handleCountrySelectAll = useCallback(() => {
    setPlaces(enableAllPlaces)
  }, [setPlaces])

  const handleCountryDeselectAll = useCallback(() => {
    setPlaces(disableAllPlaces)
  }, [setPlaces])

  const IntroContent = useMemo(() => {
    const contentFilename = getPerCountryIntroContentFilename(currentRegion)
    return getRegionPerCountryContent(contentFilename)
  }, [currentRegion])

  return (
    <Layout wide>
      <Row noGutters>
        <Col>
          <PageHeading>{'Overview of Variants in Countries'}</PageHeading>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <RegionSwitcher
            regions={regionNames}
            regionsHaveData={regionsHaveData}
            currentRegion={currentRegion}
            setCurrentRegion={setCurrentRegion}
          />
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <CenteredEditable githubUrl="tree/master/content/PerCountryIntro/">
            <IntroContent />
          </CenteredEditable>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <Editable githubUrl="blob/master/scripts" text={'View data generation scripts'}>
            <WrapperFlex>
              <SidebarFlex>
                <DistributionSidebar
                  clusters={clustersState}
                  places={places}
                  regionsTitle={regionsTitle}
                  enabledFilters={enabledFilters}
                  clustersCollapsedByDefault={false}
                  Icon={iconComponent}
                  onClusterFilterChange={handleClusterCheckedChange}
                  onClusterFilterSelectAll={handleClusterSelectAll}
                  onClusterFilterDeselectAll={handleClusterDeselectAll}
                  onCountryFilterChange={handleCountryCheckedChange}
                  onRegionFilterChange={handleRegionCheckedChange}
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
