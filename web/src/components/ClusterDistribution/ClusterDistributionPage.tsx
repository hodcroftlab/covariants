import React, { Suspense, useCallback, useMemo } from 'react'
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
import { usePerClusterData, filterClusters, filterCountries } from 'src/io/getPerClusterData'
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

export function ClusterDistributionPage() {
  const { t } = useTranslationSafe()

  const { countries, setCountries, continents, setContinents } = usePlacesPerCluster()
  const [clusters, setClusters] = useRecoilState(clustersForPerClusterDataAtom)

  const [tooltipSort, setTooltipSort] = useRecoilState(tooltipSortAtom)
  const perCountryTooltipSortBy = tooltipSort.criterion
  const perCountryTooltipSortReversed = tooltipSort.reversed

  const { clusterBuildNames, clusterDistributions } = usePerClusterData()

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

  const { withClustersFiltered } = useMemo(
    () => filterClusters(clusters, clusterDistributions),
    [clusterDistributions, clusters],
  )
  const { enabledCountries, withCountriesFiltered } =
    /* prettier-ignore */
    useMemo(() => filterCountries(countries, withClustersFiltered), [countries, withClustersFiltered])

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
            <WrapperFlex>
              <SidebarFlex>
                <DistributionSidebar
                  countries={countries}
                  continents={continents}
                  clusters={clusters}
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
                            <SortByDropdown
                              perCountryTooltipSortBy={perCountryTooltipSortBy}
                              onSortByChange={setSortBy}
                            />
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
                          withCountriesFiltered={withCountriesFiltered}
                          clusterBuildNames={clusterBuildNames}
                          enabledCountries={enabledCountries}
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
