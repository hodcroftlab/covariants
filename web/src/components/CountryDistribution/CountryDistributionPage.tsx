import React, { Suspense, useMemo } from 'react'
import { Col, Row } from 'reactstrap'
import { ErrorBoundary } from 'react-error-boundary'
import { useRecoilState, useRecoilValue } from 'recoil'
import { MdxContent } from 'src/i18n/getMdxContent'
import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { SharingPanel } from 'src/components/Common/SharingPanel'
import { RegionSwitcher } from 'src/components/CountryDistribution/RegionSwitcher'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { Layout } from 'src/components/Layout/Layout'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import {
  perCountryContinentsAtom,
  perCountryCountriesAtom,
  perCountryRegionAtom,
} from 'src/state/PlacesForPerCountryData'
import { CountryFlag } from 'src/components/Common/CountryFlag'
import { USStateCode } from 'src/components/Common/USStateCode'
import { PageHeading } from 'src/components/Common/PageHeading'
import { FetchError } from 'src/components/Error/FetchError'
import { LOADING } from 'src/components/Loading/Loading'
import { CountryDistributionComponents } from 'src/components/CountryDistribution/CountryDistributionComponents'
import { clustersForPerCountryDataAtom } from 'src/state/ClustersForPerCountryData'
import { perCountryDataIntroContentFilenameSelector } from 'src/state/PerCountryData'
import { REGIONS } from 'src/state/Places'

const enabledFilters = ['clusters', 'countriesWithIcons']

function CountryDistributionPlotSection() {
  const { t } = useTranslationSafe()
  const region = useRecoilValue(perCountryRegionAtom)
  const [countries, setCountries] = useRecoilState(perCountryCountriesAtom(region))
  const [continents, setContinents] = useRecoilState(perCountryContinentsAtom)
  const [clusters, setClusters] = useRecoilState(clustersForPerCountryDataAtom(region))
  const regionsTitle = useMemo(() => (region === REGIONS.WORLD ? t('Countries') : t('Regions')), [region, t])

  const iconComponent = useMemo(() => {
    if (region === REGIONS.WORLD) return CountryFlag
    if (region === REGIONS.UNITED_STATES) return USStateCode
    return undefined
  }, [region])

  return (
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
                  countries={countries}
                  clusters={clusters}
                  region={region}
                  iconComponent={iconComponent}
                />
              </Suspense>
            </ErrorBoundary>
          </Col>
        </Row>
      </MainFlex>
    </WrapperFlex>
  )
}

function CountryDistributionPageBody() {
  const { t } = useTranslationSafe()

  const contentFilename = useRecoilValue(perCountryDataIntroContentFilenameSelector)
  const IntroContent = useMemo(() => {
    return <MdxContent filepath={`PerCountryIntro/${contentFilename}`} />
  }, [contentFilename])

  return (
    <>
      <Row className={'gx-0'}>
        <Col>
          <RegionSwitcher />
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
            <CountryDistributionPlotSection />
          </Editable>
        </Col>
      </Row>
    </>
  )
}

export function CountryDistributionPage() {
  const { t } = useTranslationSafe()

  return (
    <Layout wide>
      <Row className={'gx-0'}>
        <Col>
          <PageHeading>{t('Overview of Variants in Countries')}</PageHeading>
        </Col>
      </Row>
      <CountryDistributionPageBody />
    </Layout>
  )
}
