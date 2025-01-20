import React, { Suspense, useCallback } from 'react'
import { Card, CardBody, Col, Form, Input, Label, Row } from 'reactstrap'
import { useRecoilState } from 'recoil'
import { styled } from 'styled-components'
import { ErrorBoundary } from 'react-error-boundary'
import { SharingPanel } from 'src/components/Common/SharingPanel'
import { disableAllClusters, enableAllClusters, toggleCluster } from 'src/state/Clusters'
import { clustersForPerClusterDataAtom } from 'src/state/ClustersForPerClusterData'
import { disableAllCountries, enableAllCountries, toggleContinent, toggleCountry } from 'src/state/Places'
import { usePlacesPerCluster } from 'src/state/PlacesForPerClusterData'
import { tooltipSortAtom, TooltipSortCriterion } from 'src/state/TooltipSort'
import { MdxContent } from 'src/i18n/getMdxContent'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { Dropdown as DropdownBase } from 'src/components/Common/Dropdown'
import { stringToOption } from 'src/components/Common/DropdownOption'
import { Editable, CenteredEditable } from 'src/components/Common/Editable'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { Layout } from 'src/components/Layout/Layout'
import { PageHeading } from 'src/components/Common/PageHeading'
import { ClusterDistributionComponents } from 'src/components/ClusterDistribution/ClusterDistributionComponents'
import { FetchError } from 'src/components/Error/FetchError'
import { LOADING } from 'src/components/Loading/Loading'

const Dropdown = styled(DropdownBase)`
  min-width: 130px;
`

const enabledFilters = ['countries', 'clusters']

export interface SortByDropdownProps {
  perCountryTooltipSortBy: TooltipSortCriterion

  onSortByChange(perCountryTooltipSortBy: TooltipSortCriterion): void
}

const sortByOptions = Object.entries(TooltipSortCriterion).map(([key, value]) => ({ value, label: key }))

export function SortByDropdown({ perCountryTooltipSortBy, onSortByChange }: SortByDropdownProps) {
  const { t } = useTranslationSafe()

  const handleSortByChange = useCallback(
    (value: string) => onSortByChange(TooltipSortCriterion[value as keyof typeof TooltipSortCriterion]),
    [onSortByChange],
  )

  return (
    <Col className={'d-flex flex-row align-items-center justify-between me-2'}>
      <Label for="per-variant-sort-by" className={'mb-0 me-2'}>
        {t('Tooltip sort by:')}
      </Label>
      <Dropdown
        identifier="per-variant-sort-by"
        options={sortByOptions}
        value={stringToOption(perCountryTooltipSortBy)}
        onValueChange={handleSortByChange}
        isSearchable={false}
      />
    </Col>
  )
}

export interface SortReverseCheckboxProps {
  reverse: boolean
  setReverse(reverse: boolean): void
}

export function SortReverseCheckbox({ reverse, setReverse }: SortReverseCheckboxProps) {
  const { t } = useTranslationSafe()
  const onChange = useCallback(() => setReverse(!reverse), [setReverse, reverse])

  return (
    <Col>
      <Input id="per-variant-sort-reverse" type="checkbox" checked={reverse} onChange={onChange} className={'me-1'} />
      <Label for="per-variant-sort-reverse" check>
        {t('Reversed')}
      </Label>
    </Col>
  )
}

const StickyRow = styled(Row)`
  position: sticky;
  top: 0;
  z-index: 1;
  align-self: flex-start;
`

function ClusterDistributionPlotSection() {
  const { t } = useTranslationSafe()
  const { countriesSelected, setCountriesSelected, continentsSelected, setContinentsSelected } = usePlacesPerCluster()
  const [clustersSelected, setClustersSelected] = useRecoilState(clustersForPerClusterDataAtom)

  const [tooltipSort, setTooltipSort] = useRecoilState(tooltipSortAtom)
  const perCountryTooltipSortBy = tooltipSort.criterion
  const perCountryTooltipSortReversed = tooltipSort.reversed

  const setSortBy = useCallback(
    (criterion: TooltipSortCriterion) => {
      setTooltipSort((tooltipSort) => ({ ...tooltipSort, criterion }))
    },
    [setTooltipSort],
  )

  const setSortReversed = useCallback(
    (reversed: boolean) => {
      setTooltipSort((tooltipSort) => ({ ...tooltipSort, reversed }))
    },
    [setTooltipSort],
  )

  const handleClusterCheckedChange = useCallback(
    (cluster: string) => {
      setClustersSelected((oldClusters) => toggleCluster(oldClusters, cluster))
    },
    [setClustersSelected],
  )

  const handleClusterSelectAll = useCallback(() => {
    setClustersSelected((oldClusters) => enableAllClusters(oldClusters))
  }, [setClustersSelected])

  const handleClusterDeselectAll = useCallback(() => {
    setClustersSelected((oldClusters) => disableAllClusters(oldClusters))
  }, [setClustersSelected])

  const handleCountryCheckedChange = useCallback(
    (countryName: string) => {
      setCountriesSelected((oldCountries) => toggleCountry(oldCountries, countryName))
    },
    [setCountriesSelected],
  )

  const handleContinentCheckedChange = useCallback(
    (continentName: string) => {
      setContinentsSelected((oldContinents) => toggleContinent(oldContinents, continentName))
    },
    [setContinentsSelected],
  )

  const handleCountrySelectAll = useCallback(() => {
    setCountriesSelected(enableAllCountries)
  }, [setCountriesSelected])

  const handleCountryDeselectAll = useCallback(() => {
    setCountriesSelected(disableAllCountries)
  }, [setCountriesSelected])
  return (
    <WrapperFlex>
      <SidebarFlex>
        <DistributionSidebar
          countries={countriesSelected}
          continents={continentsSelected}
          clusters={clustersSelected}
          regionsTitle={t('Countries')}
          countriesCollapsedByDefault={false}
          enabledFilters={enabledFilters}
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
        <StickyRow className={'gx-0'}>
          <Col>
            <Card className="m-2">
              <CardBody className="px-3 py-2">
                <Form>
                  <Row className="row-cols-lg-auto gx-0 align-items-center">
                    <SortByDropdown perCountryTooltipSortBy={perCountryTooltipSortBy} onSortByChange={setSortBy} />
                    <SortReverseCheckbox reverse={perCountryTooltipSortReversed} setReverse={setSortReversed} />
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </StickyRow>

        <Row className={'gx-0'}>
          <Col>
            <ErrorBoundary FallbackComponent={FetchError}>
              <Suspense fallback={LOADING}>
                <ClusterDistributionComponents
                  clustersSelected={clustersSelected}
                  countriesSelected={countriesSelected}
                />
              </Suspense>
            </ErrorBoundary>
          </Col>
        </Row>
      </MainFlex>
    </WrapperFlex>
  )
}

export function ClusterDistributionPage() {
  const { t } = useTranslationSafe()

  return (
    <Layout wide>
      <Row className={'gx-0'}>
        <Col>
          <PageHeading>{t('Overview of Variants/Mutations')}</PageHeading>
        </Col>
      </Row>

      <Row className={'gx-0'}>
        <Col>
          <CenteredEditable githubUrl="blob/master/content/PerClusterIntro.md">
            <MdxContent filepath="PerClusterIntro.md" />
          </CenteredEditable>
        </Col>
      </Row>

      <Row className={'gx-0'}>
        <Col>
          <SharingPanel />
        </Col>
      </Row>

      <Row className={'gx-0'}>
        <Col className="pb-10">
          <Editable githubUrl="blob/master/scripts" text={t('View data generation scripts')}>
            <ClusterDistributionPlotSection />
          </Editable>
        </Col>
      </Row>
    </Layout>
  )
}
