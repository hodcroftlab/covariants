import { mapValues } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { Col, Row } from 'reactstrap'

import { Editable } from 'src/components/Common/Editable'
import { ColCustom } from 'src/components/Common/ColCustom'
import { RegionSwitcher } from 'src/components/CountryDistribution/RegionSwitcher'

import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { Layout } from 'src/components/Layout/Layout'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { getRegionPerCountryContent } from 'src/io/getRegionContent'
import { disableAllPlaces, enableAllPlaces, Places, toggleContinent, toggleCountry } from 'src/io/getPlaces'

import {
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

const { defaultRegionName, regionNames, regionsHaveData } = getRegions()
const enabledFilters = ['clusters', 'countriesWithIcons']

export function CountryDistributionPage() {
  const [currentRegion, setCurrentRegion] = useState(defaultRegionName)
  const { clusters: initialClusters, places: initialPlaces, countryDistributions } =
    /* prettier-ignore */
    useMemo(() => getPerCountryData(currentRegion), [currentRegion])

  const [places, setPlaces] = useState<Places>(initialPlaces)
  const [clusters, setClusters] = useState<ClusterState>(initialClusters)

  const regionsTitle = useMemo(() => (currentRegion === 'World' ? 'Countries' : 'Regions'), [currentRegion])
  const iconComponent = useMemo(() => (currentRegion === 'World' ? CountryFlag : undefined), [currentRegion])

  const { withCountriesFiltered } =
    /* prettier-ignore */
    useMemo(() => filterCountries(places, countryDistributions), [countryDistributions, places])

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

  const handleClusterCheckedChange = useCallback((clusterName: string) => {
    setClusters((oldClusters) => toggleCluster(oldClusters, clusterName))
  }, [])

  const handleClusterSelectAll = useCallback(
    () => setClusters((oldClusters) => mapValues(oldClusters, (cluster) => ({ ...cluster, enabled: true }))),
    [],
  )

  const handleClusterDeselectAll = useCallback(
    () => setClusters((oldClusters) => mapValues(oldClusters, (cluster) => ({ ...cluster, enabled: false }))),
    [],
  )

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
          <h1 className="text-center">{'Overview of Variants in Countries'}</h1>
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
