import React, { Suspense, useMemo } from 'react'
import { Col, Row } from 'reactstrap'
import { ErrorBoundary } from 'react-error-boundary'
import { MdxContent } from 'src/i18n/getMdxContent'
import { CenteredEditable, Editable } from 'src/components/Common/Editable'
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
import { usePlacesPerCountry } from 'src/state/PlacesForPerCountryData'
import { CountryFlag } from 'src/components/Common/CountryFlag'
import { USStateCode } from 'src/components/Common/USStateCode'
import { PageHeading } from 'src/components/Common/PageHeading'
import { FetchError } from 'src/components/Error/FetchError'
import { LOADING } from 'src/components/Loading/Loading'
import { CountryDistributionComponents } from 'src/components/CountryDistribution/CountryDistributionComponents'

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
                  setCountries={setCountries}
                  setClusters={setClusters}
                  setContinents={setContinents}
                  regionsTitle={regionsTitle}
                  enabledFilters={enabledFilters}
                  clustersCollapsedByDefault={false}
                  Icon={iconComponent}
                />
              </SidebarFlex>

              <MainFlex>
                <Row className={'gx-0'}>
                  <Col>
                    <ErrorBoundary FallbackComponent={FetchError}>
                      <Suspense fallback={LOADING}>
                        <CountryDistributionComponents
                          withClustersFiltered={withClustersFiltered}
                          enabledClusters={enabledClusters}
                          iconComponent={iconComponent}
                        />
                      </Suspense>
                    </ErrorBoundary>
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
