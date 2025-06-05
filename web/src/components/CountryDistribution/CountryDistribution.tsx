import React, { Suspense, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRecoilState, useRecoilValue } from 'recoil'
import { MdxContent } from 'src/i18n/getMdxContent'
import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { SharingPanel } from 'src/components/Common/SharingPanel'
import { RegionSwitcher } from 'src/components/CountryDistribution/RegionSwitcher'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import {
  perCountryContinentsAtom,
  perCountryCountriesAtom,
  perCountryRegionAtom,
} from 'src/state/PlacesForPerCountryData'
import { CountryFlag } from 'src/components/Common/CountryFlag'
import { USStateCode } from 'src/components/Common/USStateCode'
import { FetchError } from 'src/components/Error/FetchError'
import { LOADING } from 'src/components/Loading/Loading'
import { CountryDistributionComponents } from 'src/components/CountryDistribution/CountryDistributionComponents'
import { clustersForPerCountryDataAtom } from 'src/state/ClustersForPerCountryData'
import { perCountryDataIntroContentFilenameSelector } from 'src/state/PerCountryData'
import { REGIONS } from 'src/state/Places'
import { clusterSidebarCollapsedAtoms, countriesSidebarCollapsedAtoms } from 'src/state/DistributionSidebar'
import { updateUrlOnMismatch } from 'src/state/Clusters'
import { TooltipConfig } from 'src/components/Common/tooltip/Tooltip'
import { CountryDistributionPlotTooltipId } from 'src/components/CountryDistribution/CountryDistributionPlotTooltip'

export function CountryDistribution() {
  const { t } = useTranslationSafe()

  const contentFilename = useRecoilValue(perCountryDataIntroContentFilenameSelector)
  const IntroContent = useMemo(() => {
    return <MdxContent filepath={`PerCountryIntro/${contentFilename}`} />
  }, [contentFilename])

  return (
    <div>
      <RegionSwitcher />

      <CenteredEditable githubUrl="tree/master/web/src/content/en/PerCountryIntro/">{IntroContent}</CenteredEditable>

      <SharingPanel />

      <Editable githubUrl="blob/master/scripts" text={t('View data generation scripts')}>
        <CountryDistributionPlotSection />
      </Editable>
    </div>
  )
}

const enabledFilters = ['clusters', 'countriesWithIcons']
const tooltipColumns = ['cluster', 'sequences', 'frequency']

function CountryDistributionPlotSection() {
  const { t } = useTranslationSafe()
  const region = useRecoilValue(perCountryRegionAtom)
  const [countries, setCountries] = useRecoilState(perCountryCountriesAtom(region))
  const [continents, setContinents] = useRecoilState(perCountryContinentsAtom)
  const [clusters, setClusters] = useRecoilState(clustersForPerCountryDataAtom(region))
  const regionsTitle = useMemo(() => (region === REGIONS.WORLD ? t('Countries') : t('Regions')), [region, t])

  useMemo(() => {
    updateUrlOnMismatch(countries, clusters, region)
    // Only on initial render to sync url when navigating, other url updates are done via the atoms
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const iconComponent = useMemo(() => {
    if (region === REGIONS.WORLD) return CountryFlag
    if (region === REGIONS.UNITED_STATES) return USStateCode
    return undefined
  }, [region])

  return (
    <WrapperFlex className={'gap-2'}>
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
          clustersCollapsedAtom={clusterSidebarCollapsedAtoms.perCountry}
          countriesCollapsedAtom={countriesSidebarCollapsedAtoms.perCountry}
          Icon={iconComponent}
        />
      </SidebarFlex>

      <MainFlex className={'d-flex flex-column gap-2'}>
        <div className={'sticky-top'}>
          <TooltipConfig columns={tooltipColumns} tooltipId={CountryDistributionPlotTooltipId} />
        </div>
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
      </MainFlex>
    </WrapperFlex>
  )
}
