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
} from 'src/io/getPerCountryData'

import { CountryDistributionPlotCard } from './CountryDistributionPlotCard'
import { useRouterQuery } from './useCountryQuery'
import { getCurrentQs, RegionQueryString } from './utils'
import { CountryFlag } from '../Common/CountryFlag'
import { USStateCode } from '../Common/USStateCode'
import { PageHeading } from '../Common/PageHeading'

const enabledFilters = ['clusters', 'countriesWithIcons']
const { regionNames, regionsHaveData } = getRegions()

export function CountryDistributionPage() {
  const router = useRouter()
  const {
    state: { region, setPlaces, places, countryDistributions, currentClusters },
  } = useRouterQuery()

  const regionsTitle = useMemo(() => (region === Region.World ? 'Countries' : 'Regions'), [region])
  const iconComponent = useMemo(() => {
    if (region === Region.World) return CountryFlag
    if (region === Region.UnitedStates) return USStateCode
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
      if (nextRegion === Region.World) {
        delete nextRegionQs.region
      } else if (nextRegion === Region.UnitedStates) {
        nextRegionQs.region = RegionQueryString.UnitedStates
      } else if (nextRegion === Region.Switzerland) {
        nextRegionQs.region = RegionQueryString.Switzerland
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.replace(`${fullPath}?${stringify(nextRegionQs)}`)
    },
    [region, router],
  )

  const setClusterState = useCallback(
    (variant: 'all' | 'none' | string) => {
      const fullPath = `${router.basePath}${router.pathname}`
      const nextQs = { ...getCurrentQs(router) }
      if (variant === 'all') {
        nextQs.variants = 'all'
      } else if (variant === 'none') {
        nextQs.variants = 'none'
      } else {
        const allClusterKeys = Object.keys(currentClusters)
        const allCurrentlySelected =
          nextQs.variants === 'all' ||
          (Array.isArray(nextQs.variants) && nextQs.variants.length === 1 && nextQs.variants[0] === 'all')
        const currentVariants: string[] = (Array.isArray(nextQs.variants)
          ? [...nextQs.variants].filter(Boolean).filter((v) => v !== 'all' && v !== 'none')
          : [nextQs.variants].filter(Boolean).filter((v) => v !== 'all' && v !== 'none')) as string[]
        const variantAlreadySelected = currentVariants.includes(variant)
        if (allCurrentlySelected) {
          // currently all cluster -> click on one checkbox, to deselect the cluster represented by the checkbox
          const newSelectedVariants = allClusterKeys.filter((v) => v !== variant)
          nextQs.variants = [...newSelectedVariants]
        } else if (variantAlreadySelected) {
          // currently this cluster is already selected -> deselect this cluster
          nextQs.variants = currentVariants.filter((v) => v !== variant)
        } else {
          // current this cluster is not selected -> select this cluster
          const newSelectedVariants = [...currentVariants, variant]
          // special case, if all clusters are selected -> set the query string to 'all'
          nextQs.variants =
            newSelectedVariants.length !== allClusterKeys.length ? [...currentVariants, variant] : ['all']
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(`${fullPath}?${stringify(nextQs)}`, undefined, { scroll: false })
    },
    [currentClusters, router],
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
                  onClusterFilterChange={(variant: string) => {
                    setClusterState(variant)
                  }}
                  onClusterFilterSelectAll={() => {
                    setClusterState('all')
                  }}
                  onClusterFilterDeselectAll={() => {
                    setClusterState('none')
                  }}
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
