import React, { useCallback, useMemo } from 'react'

import { Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useRecoilState } from 'recoil'
import { SharingPanel } from 'src/components/Common/SharingPanel'
import {
  clustersAtom,
  ClustersDataFlavor,
  disableAllClusters,
  enableAllClusters,
  toggleCluster,
} from 'src/state/Clusters'
import {
  continentsAtom,
  countriesAtom,
  disableAllCountries,
  enableAllCountries,
  toggleContinent,
  toggleCountry,
} from 'src/state/Places'
import { tooltipSortAtom, TooltipSortCriterion } from 'src/state/TooltipSort'
import styled from 'styled-components'

import { getPerClusterData, filterClusters, filterCountries } from 'src/io/getPerClusterData'
import { ClusterDistributionPlotCard } from 'src/components/ClusterDistribution/ClusterDistributionPlotCard'
import { ColCustom } from 'src/components/Common/ColCustom'
import { Dropdown as DropdownBase } from 'src/components/Common/Dropdown'
import { stringToOption } from 'src/components/Common/DropdownOption'
import { Editable, CenteredEditable } from 'src/components/Common/Editable'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { Layout } from 'src/components/Layout/Layout'
import { PageHeading } from 'src/components/Common/PageHeading'

import PerClusterIntro from '../../../../content/PerClusterIntro.md'

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
  const handleSortByChange = useCallback(
    (value: string) => onSortByChange(TooltipSortCriterion[value as keyof typeof TooltipSortCriterion]),
    [onSortByChange],
  )

  return (
    <FormGroup check inline>
      <Label htmlFor="per-variant-sort-by">
        <span className="mr-2">{'Tooltip sort by:'}</span>
        <Dropdown
          identifier="per-variant-sort-by"
          options={sortByOptions}
          value={stringToOption(perCountryTooltipSortBy)}
          onValueChange={handleSortByChange}
          isSearchable={false}
        />
      </Label>
    </FormGroup>
  )
}

export interface SortReverseCheckboxProps {
  reverse: boolean
  setReverse(reverse: boolean): void
}

export function SortReverseCheckbox({ reverse, setReverse }: SortReverseCheckboxProps) {
  const onChange = useCallback(() => setReverse(!reverse), [setReverse, reverse])

  return (
    <FormGroup check inline>
      <Label htmlFor="per-variant-sort-reverse" check>
        <Input id="per-variant-sort-reverse" type="checkbox" checked={reverse} onChange={onChange} />
        <span>{'Reversed'}</span>
      </Label>
    </FormGroup>
  )
}

const StickyRow = styled(Row)`
  position: sticky;
  top: 0;
  z-index: 1;
  align-self: flex-start;
`

export function ClusterDistributionPage() {
  const [countries, setCountries] = useRecoilState(countriesAtom(undefined))
  const [continents, setContinents] = useRecoilState(continentsAtom(undefined))
  const [clusters, setClusters] = useRecoilState(
    clustersAtom({ dataFlavor: ClustersDataFlavor.PerCluster, region: 'World' }),
  )

  const [tooltipSort, setTooltipSort] = useRecoilState(tooltipSortAtom)
  const perCountryTooltipSortBy = tooltipSort.criterion
  const perCountryTooltipSortReversed = tooltipSort.reversed

  const { clusterBuildNames, clusterDistributions } = getPerClusterData()

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

  const clusterDistributionComponents = useMemo(
    () =>
      withCountriesFiltered.map(({ cluster, distribution }) => (
        <ColCustom key={cluster} md={12} lg={6} xl={6} xxl={4}>
          <ClusterDistributionPlotCard
            key={cluster}
            clusterBuildName={clusterBuildNames.get(cluster) || ''}
            clusterDisplayName={cluster}
            distribution={distribution}
            country_names={enabledCountries}
          />
        </ColCustom>
      )),
    [clusterBuildNames, enabledCountries, withCountriesFiltered],
  )

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
      <Row noGutters>
        <Col>
          <PageHeading>{'Overview of Variants/Mutations'}</PageHeading>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <CenteredEditable githubUrl="blob/master/content/PerClusterIntro.md">
            <PerClusterIntro />
          </CenteredEditable>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <SharingPanel />
        </Col>
      </Row>

      <Row noGutters>
        <Col className="pb-10">
          <Editable githubUrl="blob/master/scripts" text={'View data generation scripts'}>
            <WrapperFlex>
              <SidebarFlex>
                <DistributionSidebar
                  countries={countries}
                  continents={continents}
                  clusters={clusters}
                  regionsTitle="Countries"
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
                <StickyRow noGutters>
                  <Col>
                    <Card className="m-2">
                      <CardBody className="px-3 py-2">
                        <Form inline>
                          <SortByDropdown
                            perCountryTooltipSortBy={perCountryTooltipSortBy}
                            onSortByChange={setSortBy}
                          />
                          <SortReverseCheckbox reverse={perCountryTooltipSortReversed} setReverse={setSortReversed} />
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </StickyRow>

                <Row noGutters>
                  <Col>
                    <Row noGutters>{clusterDistributionComponents}</Row>
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
