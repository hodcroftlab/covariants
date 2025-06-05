import React, { Suspense, useMemo } from 'react'
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
import { updateUrlOnMismatch } from 'src/state/Clusters'
import { TooltipConfig } from 'src/components/Common/tooltip/Tooltip'
import { CasesPlotTooltipId } from 'src/components/Cases/CasesPlotTooltip'

export function Cases() {
  const { t } = useTranslationSafe()

  return (
    <div>
      <CenteredEditable githubUrl="tree/master/web/src/content/en/PerCountryCasesIntro.mdx">
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
const tooltipColumns = ['cluster', 'estimatedCases', 'frequency']

function CasesPlotSection() {
  const { t } = useTranslationSafe()
  const [countries, setCountries] = useRecoilState(countriesCasesAtom)
  const [continents, setContinents] = useRecoilState(continentsCasesAtom)
  const [clusters, setClusters] = useRecoilState(clustersCasesAtom)

  useMemo(() => {
    updateUrlOnMismatch(countries, clusters)
    // Only on initial render to sync url when navigating, other url updates are done via the atoms
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <WrapperFlex className={'gap-2'}>
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

      <MainFlex className={'d-flex flex-column gap-2'}>
        <div className={'sticky-top'}>
          <TooltipConfig columns={tooltipColumns} tooltipId={CasesPlotTooltipId} />
        </div>

        <ErrorBoundary FallbackComponent={FetchError}>
          <Suspense fallback={LOADING}>
            <CasesComponents countries={countries} clusters={clusters} />
          </Suspense>
        </ErrorBoundary>
      </MainFlex>
    </WrapperFlex>
  )
}
