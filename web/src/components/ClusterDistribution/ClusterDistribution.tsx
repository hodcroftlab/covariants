import React, { Suspense, useCallback, useMemo } from 'react'
import { Col, Input, Label } from 'reactstrap'
import { useRecoilState } from 'recoil'
import { styled } from 'styled-components'
import { ErrorBoundary } from 'react-error-boundary'
import { SharingPanel } from 'src/components/Common/SharingPanel'
import { clustersForPerClusterDataAtom } from 'src/state/ClustersForPerClusterData'
import { perClusterContinentsAtom, perClusterCountriesAtom } from 'src/state/PlacesForPerClusterData'
import { tooltipSortAtom, TooltipSortCriterion } from 'src/state/TooltipSort'
import { MdxContent } from 'src/i18n/getMdxContent'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { Dropdown as DropdownBase } from 'src/components/Common/Dropdown'
import { stringToOption } from 'src/components/Common/DropdownOption'
import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { ClusterDistributionComponents } from 'src/components/ClusterDistribution/ClusterDistributionComponents'
import { FetchError } from 'src/components/Error/FetchError'
import { LOADING } from 'src/components/Loading/Loading'
import { clusterSidebarCollapsedAtoms, countriesSidebarCollapsedAtoms } from 'src/state/DistributionSidebar'
import { updateUrlOnMismatch } from 'src/state/Clusters'

export function ClusterDistribution() {
  const { t } = useTranslationSafe()

  return (
    <div>
      <CenteredEditable githubUrl="blob/master/content/PerClusterIntro.mdx">
        <MdxContent filepath="PerClusterIntro.mdx" />
      </CenteredEditable>

      <SharingPanel />

      <Editable githubUrl="blob/master/scripts" text={t('View data generation scripts')}>
        <ClusterDistributionPlotSection />
      </Editable>
    </div>
  )
}

const enabledFilters = ['countries', 'clusters']

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
          <TooltipConfig />
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

export function TooltipConfig() {
  return (
    <div className="card">
      <div className="card-header">Tooltip options</div>
      <div className="card-body d-flex flex-column">
        <SortByDropdown />
        <SortReverseCheckbox />
      </div>
    </div>
  )
}

const sortByOptions = Object.entries(TooltipSortCriterion).map(([key, value]) => ({ value, label: key }))

export function SortByDropdown() {
  const { t } = useTranslationSafe()

  const [tooltipSort, setTooltipSort] = useRecoilState(tooltipSortAtom)
  const sortBy = tooltipSort.criterion

  const handleSortByChange = useCallback(
    (value: string) => {
      const setSortBy = (criterion: TooltipSortCriterion) => {
        setTooltipSort((tooltipSort) => ({ ...tooltipSort, criterion }))
      }
      return setSortBy(TooltipSortCriterion[value as keyof typeof TooltipSortCriterion])
    },
    [setTooltipSort],
  )

  return (
    <div className={'d-flex flex-row align-items-center justify-between me-2'}>
      <Label for="per-variant-sort-by" className={'mb-0 me-2'}>
        {t('Tooltip sort by:')}
      </Label>
      <Dropdown
        identifier="per-variant-sort-by"
        options={sortByOptions}
        value={stringToOption(sortBy)}
        onValueChange={handleSortByChange}
        isSearchable={false}
      />
    </div>
  )
}

const Dropdown = styled(DropdownBase)`
  min-width: 130px;
`

export function SortReverseCheckbox() {
  const { t } = useTranslationSafe()

  const [tooltipSort, setTooltipSort] = useRecoilState(tooltipSortAtom)
  const sortReversed = tooltipSort.reversed

  const setSortReversed = useCallback(
    (reversed: boolean) => {
      setTooltipSort((tooltipSort) => ({ ...tooltipSort, reversed }))
    },
    [setTooltipSort],
  )

  const onChange = useCallback(() => setSortReversed(!sortReversed), [setSortReversed, sortReversed])

  return (
    <Col>
      <Input
        id="per-variant-sort-reverse"
        type="checkbox"
        checked={sortReversed}
        onChange={onChange}
        className={'me-1'}
      />
      <Label for="per-variant-sort-reverse" check>
        {t('Reversed')}
      </Label>
    </Col>
  )
}
