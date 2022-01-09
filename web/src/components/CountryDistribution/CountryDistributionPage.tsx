import { mapValues } from 'lodash'
import { stringify } from 'querystring'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import { Col, Row } from 'reactstrap'

import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { ColCustom } from 'src/components/Common/ColCustom'
import { RegionSwitcher } from 'src/components/CountryDistribution/RegionSwitcher'

import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { Layout } from 'src/components/Layout/Layout'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { getRegionPerCountryContent } from 'src/io/getRegionContent'
import { disableAllPlaces, enableAllPlaces, toggleContinent, toggleCountry } from 'src/io/getPlaces'

import {
  Region,
  filterClusters,
  filterCountries,
  getPerCountryIntroContentFilename,
  getRegions,
  toggleCluster,
} from 'src/io/getPerCountryData'

import { CountryDistributionPlotCard } from './CountryDistributionPlotCard'
import { useCountryAndClusterQuery } from './useCountryQuery'
import { getCurrentQs } from './utils'
import { CountryFlag } from '../Common/CountryFlag'
import { USStateCode } from '../Common/USStateCode'
import { PageHeading } from '../Common/PageHeading'

const enabledFilters = ['clusters', 'countriesWithIcons']
const { regionNames, regionsHaveData } = getRegions()

export function CountryDistributionPage() {
  const router = useRouter()
  const {
    state: { region, setPlaces, places, countryDistributions, currentClusters, setClusters },
  } = useCountryAndClusterQuery()

  const regionsTitle = useMemo(() => (region === Region.WORLD ? 'Countries' : 'Regions'), [region])
  const iconComponent = useMemo(() => {
    if (region === Region.WORLD) return CountryFlag
    if (region === Region.UNITED_STATES) return USStateCode
    return undefined
  }, [region])

  const { enabledClusters, withClustersFiltered } = useMemo(() => {
    const { withCountriesFiltered } = filterCountries(places, countryDistributions)
    const filteredClusters = filterClusters(currentClusters, withCountriesFiltered)

    const { enabledClusters, withClustersFiltered } = filteredClusters

    return { enabledClusters, withClustersFiltered }
  }, [countryDistributions, currentClusters, places])

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
    (clusterName: string) => {
      setClusters((oldClusters) => toggleCluster(oldClusters, clusterName))
    },
    [setClusters],
  )

  const handleClusterSelectAll = useCallback(() => {
    setClusters((oldClusters) => mapValues(oldClusters, (cluster) => ({ ...cluster, enabled: true })))
  }, [setClusters])

  const handleClusterDeselectAll = useCallback(() => {
    setClusters((oldClusters) => mapValues(oldClusters, (cluster) => ({ ...cluster, enabled: false })))
  }, [setClusters])

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
    const contentFilename = getPerCountryIntroContentFilename(region)
    return getRegionPerCountryContent(contentFilename)
  }, [region])

  const setRegion = useCallback(
    (nextRegion: Region) => {
      if (region === nextRegion) {
        return
      }
      const fullPath = `${router.basePath}${router.pathname}`
      const nextRegionQs = { ...getCurrentQs(router) }

      if (nextRegion === Region.WORLD) {
        delete nextRegionQs.countries
      } else if (nextRegion === Region.UNITED_STATES) {
        nextRegionQs.countries = 'usa'
      } else if (nextRegion === Region.SWITZERLAND) {
        nextRegionQs.countries = 'switzerland'
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.replace(`${fullPath}?${stringify(nextRegionQs)}`)
    },
    [region, router],
  )

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
            currentRegion={region}
            setCurrentRegion={setRegion}
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
                  clusters={currentClusters}
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
