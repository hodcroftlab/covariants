import React, { Suspense } from 'react'
import { Col, Row } from 'reactstrap'
import { useRecoilState } from 'recoil'
import { ErrorBoundary } from 'react-error-boundary'
import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { MdxContent } from 'src/i18n/getMdxContent'
import { clustersCasesAtom } from 'src/state/ClustersForCaseData'
import { continentsCasesAtom, countriesCasesAtom } from 'src/state/PlacesForCaseData'
import { CountryFlag } from 'src/components/Common/CountryFlag'
import { SharingPanel } from 'src/components/Common/SharingPanel'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { CasesComponents } from 'src/components/Cases/CasesComponents'
import { FetchError } from 'src/components/Error/FetchError'
import { LOADING } from 'src/components/Loading/Loading'
import { clusterSidebarCollapsedAtoms, countriesSidebarCollapsedAtoms } from 'src/state/DistributionSidebar'

export function Cases() {
  const { t } = useTranslationSafe()

  return (
    <div>
      <CenteredEditable githubUrl="tree/master/web/src/content/en/PerCountryCasesIntro.md">
        <MdxContent filepath="PerCountryCasesIntro.mdx" />
      </CenteredEditable>

      <SharingPanel />

      <Editable githubUrl="blob/master/scripts" text={t('View data generation scripts')}>
        <CasesPlotSection />
      </Editable>
    </div>
  )
}

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
          clustersCollapsedAtom={clusterSidebarCollapsedAtoms.cases}
          countriesCollapsedAtom={countriesSidebarCollapsedAtoms.cases}
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
