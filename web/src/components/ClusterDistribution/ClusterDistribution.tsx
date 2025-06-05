import React, { Suspense, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { ErrorBoundary } from 'react-error-boundary'
import { SharingPanel } from 'src/components/Common/SharingPanel'
import { clustersForPerClusterDataAtom } from 'src/state/ClustersForPerClusterData'
import { perClusterContinentsAtom, perClusterCountriesAtom } from 'src/state/PlacesForPerClusterData'
import { MdxContent } from 'src/i18n/getMdxContent'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { ClusterDistributionComponents } from 'src/components/ClusterDistribution/ClusterDistributionComponents'
import { FetchError } from 'src/components/Error/FetchError'
import { LOADING } from 'src/components/Loading/Loading'
import { clusterSidebarCollapsedAtoms, countriesSidebarCollapsedAtoms } from 'src/state/DistributionSidebar'
import { updateUrlOnMismatch } from 'src/state/Clusters'
import { getContentGithubUrl } from 'src/helpers/getContentGithubUrl'
import { TooltipConfig } from 'src/components/Common/tooltip/Tooltip'
import { ClusterDistributionPlotTooltipId } from 'src/components/ClusterDistribution/ClusterDistributionPlotTooltip'

export function ClusterDistribution() {
  const { t } = useTranslationSafe()

  const perClusterIntroFilename = 'PerClusterIntro.mdx'

  return (
    <div>
      <CenteredEditable githubUrl={getContentGithubUrl({ filename: perClusterIntroFilename })}>
        <MdxContent filepath={perClusterIntroFilename} />
      </CenteredEditable>

      <SharingPanel />

      <Editable githubUrl="blob/master/scripts" text={t('View data generation scripts')}>
        <ClusterDistributionPlotSection />
      </Editable>
    </div>
  )
}

const enabledFilters = ['countries', 'clusters']
const tooltipColumns = ['country', 'frequency']

function ClusterDistributionPlotSection() {
  const { t } = useTranslationSafe()
  const [countriesSelected, setCountriesSelected] = useRecoilState(perClusterCountriesAtom)
  const [continentsSelected, setContinentsSelected] = useRecoilState(perClusterContinentsAtom)
  const [clustersSelected, setClustersSelected] = useRecoilState(clustersForPerClusterDataAtom)

  useMemo(() => {
    updateUrlOnMismatch(countriesSelected, clustersSelected)
    // Only on initial render to sync url when navigating, other url updates are done via the atoms
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <WrapperFlex className={'gap-2'}>
      <SidebarFlex>
        <DistributionSidebar
          countries={countriesSelected}
          continents={continentsSelected}
          clusters={clustersSelected}
          setCountries={setCountriesSelected}
          setContinents={setContinentsSelected}
          setClusters={setClustersSelected}
          regionsTitle={t('Countries')}
          clustersCollapsedAtom={clusterSidebarCollapsedAtoms.perVariant}
          countriesCollapsedAtom={countriesSidebarCollapsedAtoms.perVariant}
          enabledFilters={enabledFilters}
        />
      </SidebarFlex>

      <MainFlex className={'d-flex flex-column gap-2'}>
        <div className={'sticky-top'}>
          <TooltipConfig columns={tooltipColumns} tooltipId={ClusterDistributionPlotTooltipId} />
        </div>

        <ErrorBoundary FallbackComponent={FetchError}>
          <Suspense fallback={LOADING}>
            <ClusterDistributionComponents clustersSelected={clustersSelected} countriesSelected={countriesSelected} />
          </Suspense>
        </ErrorBoundary>
      </MainFlex>
    </WrapperFlex>
  )
}
