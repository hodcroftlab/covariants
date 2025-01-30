import React, { Suspense } from 'react'
import { Col, Row } from 'reactstrap'
import { useRecoilState } from 'recoil'
import { ErrorBoundary } from 'react-error-boundary'
import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { MdxContent } from 'src/i18n/getMdxContent'
import { clustersCasesAtom } from 'src/state/ClustersForCaseData'
import { continentsCasesAtom, countriesCasesAtom } from 'src/state/PlacesForCaseData'
import { CountryFlag } from 'src/components/Common/CountryFlag'
import { PageHeading } from 'src/components/Common/PageHeading'
import { SharingPanel } from 'src/components/Common/SharingPanel'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { CasesComponents } from 'src/components/Cases/CasesComponents'
import { FetchError } from 'src/components/Error/FetchError'
import { LOADING } from 'src/components/Loading/Loading'

const enabledFilters = ['clusters', 'countriesWithIcons']

function CasesPlotSection() {
  const { t } = useTranslationSafe()
  const [countries, setCountries] = useRecoilState(countriesCasesAtom)
  const [continents, setContinents] = useRecoilState(continentsCasesAtom)
  const [clusters, setClusters] = useRecoilState(clustersCasesAtom)

  return (
    <WrapperFlex>
      <SidebarFlex>
        <DistributionSidebar
          countries={countries}
          continents={continents}
          clusters={clusters}
          setClusters={setClusters}
          setContinents={setContinents}
          setCountries={setCountries}
          regionsTitle={t('Countries')}
          enabledFilters={enabledFilters}
          clustersCollapsedByDefault={false}
          countriesCollapsedByDefault={false}
          Icon={CountryFlag}
        />
      </SidebarFlex>

      <MainFlex>
        <Row className={'gx-0'}>
          <Col>
            <ErrorBoundary FallbackComponent={FetchError}>
              <Suspense fallback={LOADING}>
                <CasesComponents countries={countries} clusters={clusters} />
              </Suspense>
            </ErrorBoundary>
          </Col>
        </Row>
      </MainFlex>
    </WrapperFlex>
  )
}

export function CasesPage() {
  const { t } = useTranslationSafe()

  return (
    <Layout wide>
      <Row className={'gx-0'}>
        <Col>
          <PageHeading>{t('Estimated Cases by Variant')}</PageHeading>
        </Col>
      </Row>

      <Row className={'gx-0'}>
        <Col>
          <CenteredEditable githubUrl="tree/master/web/src/content/en/PerCountryCasesIntro.md">
            <MdxContent filepath="PerCountryCasesIntro.md" />
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
            <CasesPlotSection />
          </Editable>
        </Col>
      </Row>
    </Layout>
  )
}
