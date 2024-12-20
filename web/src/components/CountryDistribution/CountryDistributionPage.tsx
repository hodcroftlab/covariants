import React, { useCallback, useMemo } from 'react'
import { Col, Row } from 'reactstrap'
import { MdxContent } from 'src/i18n/getMdxContent'
import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { ColCustom } from 'src/components/Common/ColCustom'
import { SharingPanel } from 'src/components/Common/SharingPanel'
import { RegionSwitcher } from 'src/components/CountryDistribution/RegionSwitcher'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { Layout } from 'src/components/Layout/Layout'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import {
  filterClusters,
  filterCountries,
  usePerCountryData,
  usePerCountryIntroContentFilename,
  useRegions,
} from 'src/io/getPerCountryData'
import { disableAllClusters, enableAllClusters, toggleCluster } from 'src/state/Clusters'
import { disableAllCountries, enableAllCountries, toggleContinent, toggleCountry } from 'src/state/Places'
import { usePlacesPerCountry } from 'src/state/PlacesForPerCountryData'
import { CountryDistributionPlotCard } from 'src/components/CountryDistribution/CountryDistributionPlotCard'
import { CountryFlag } from 'src/components/Common/CountryFlag'
import { USStateCode } from 'src/components/Common/USStateCode'
import { PageHeading } from 'src/components/Common/PageHeading'

const enabledFilters = ['clusters', 'countriesWithIcons']

export function CountryDistributionPage() {
  const { t } = useTranslationSafe()

  const { regionNames, regionsHaveData } = useRegions()
  const { region, setRegion, countries, setCountries, continents, setContinents } = usePlacesPerCountry()
  const { countryDistributions, clusters, setClusters } = usePerCountryData(region)

  const regionsTitle = useMemo(() => (region === 'World' ? t('Countries') : t('Regions')), [region, t])

  const iconComponent = useMemo(() => {
    if (region === 'World') return CountryFlag
    if (region === 'United States') return USStateCode
    return undefined
  }, [region])

  const { enabledClusters, withClustersFiltered } = useMemo(() => {
    const { withCountriesFiltered } = filterCountries(countries, countryDistributions)
    const filteredClusters = filterClusters(clusters, withCountriesFiltered)
    const { enabledClusters, withClustersFiltered } = filteredClusters
    return { enabledClusters, withClustersFiltered }
  }, [countries, countryDistributions, clusters])

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
    (cluster: string) => {
      setClusters((oldClusters) => toggleCluster(oldClusters, cluster))
    },
    [setClusters],
  )

  const handleClusterSelectAll = useCallback(() => {
    setClusters((oldClusters) => enableAllClusters(oldClusters))
  }, [setClusters])

  const handleClusterDeselectAll = useCallback(() => {
    setClusters((oldClusters) => disableAllClusters(oldClusters))
  }, [setClusters])

  const handleCountryCheckedChange = useCallback(
    (countryName: string) => {
      setCountries((oldCountries) => toggleCountry(oldCountries, countryName))
    },
    [setCountries],
  )

  const handleContinentCheckedChange = useCallback(
    (continentName: string) => {
      setContinents((oldContinents) => toggleContinent(oldContinents, continentName))
    },
    [setContinents],
  )

  const handleCountrySelectAll = useCallback(() => {
    setCountries(enableAllCountries)
  }, [setCountries])

  const handleCountryDeselectAll = useCallback(() => {
    setCountries(disableAllCountries)
  }, [setCountries])

  const contentFilename = usePerCountryIntroContentFilename(region)
  const IntroContent = useMemo(() => {
    return <MdxContent filepath={`PerCountryIntro/${contentFilename}`} />
  }, [contentFilename])

  return (
    <Layout wide>
      <Row className={'gx-0'}>
        <Col>
          <PageHeading>{t('Overview of Variants in Countries')}</PageHeading>
        </Col>
      </Row>

      <Row className={'gx-0'}>
        <Col>
          <RegionSwitcher
            regions={regionNames}
            regionsHaveData={regionsHaveData}
            currentRegion={region}
            setCurrentRegion={setRegion}
          />
        </Col>
      </Row>

      <Row className={'gx-0'}>
        <Col>
          <CenteredEditable githubUrl="tree/master/web/src/content/en/PerCountryIntro/">
            {IntroContent}
          </CenteredEditable>
        </Col>
      </Row>

      <Row className={'gx-0'}>
        <Col>
          <SharingPanel />
        </Col>
      </Row>

      <Row className={'gx-0'}>
        <Col>
          <Editable githubUrl="blob/master/scripts" text={t('View data generation scripts')}>
            <WrapperFlex>
              <SidebarFlex>
                <DistributionSidebar
                  countries={countries}
                  continents={continents}
                  clusters={clusters}
                  regionsTitle={regionsTitle}
                  enabledFilters={enabledFilters}
                  clustersCollapsedByDefault={false}
                  Icon={iconComponent}
                  onClusterFilterChange={handleClusterCheckedChange}
                  onClusterFilterSelectAll={handleClusterSelectAll}
                  onClusterFilterDeselectAll={handleClusterDeselectAll}
                  onCountryFilterChange={handleCountryCheckedChange}
                  onRegionFilterChange={handleContinentCheckedChange}
                  onCountryFilterSelectAll={handleCountrySelectAll}
                  onCountryFilterDeselectAll={handleCountryDeselectAll}
                />
              </SidebarFlex>

              <MainFlex>
                <Row className={'gx-0'}>
                  <Col>
                    <Row className={'gx-0'}>{countryDistributionComponents}</Row>
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
