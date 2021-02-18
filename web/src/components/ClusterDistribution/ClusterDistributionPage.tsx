import React, { useCallback, useMemo, useState } from 'react'

import copy from 'fast-copy'
import { pickBy } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import styled from 'styled-components'

import { ClusterDistributionPlotCard } from 'src/components/ClusterDistribution/ClusterDistributionPlotCard'
import { ColCustom } from 'src/components/Common/ColCustom'
import { Dropdown as DropdownBase } from 'src/components/Common/Dropdown'
import { stringToOption } from 'src/components/Common/DropdownOption'
import { Editable } from 'src/components/Common/Editable'
import { MainFlex, SidebarFlex, WrapperFlex } from 'src/components/Common/PlotLayout'
import { ClusterState, CountryState } from 'src/components/CountryDistribution/CountryDistributionPage'
import { DistributionSidebar } from 'src/components/DistributionSidebar/DistributionSidebar'
import { Layout } from 'src/components/Layout/Layout'
import { shouldPlotCountry } from 'src/io/getCountryColor'

import perClusterData from 'src/../data/perClusterData.json'
import PerClusterIntro from 'src/../../content/PerClusterIntro.md'
import { getClusters } from 'src/io/getClusters'
import { setPerCountryTooltipSortBy, setPerCountryTooltipSortReversed } from 'src/state/ui/ui.actions'
import { PerCountryTooltipSortBy } from 'src/state/ui/ui.reducer'
import { selectPerCountryTooltipSortBy, selectPerCountryTooltipSortReversed } from 'src/state/ui/ui.selectors'
import { ClusterDistributionDatum } from './ClusterDistributionPlot'

const Dropdown = styled(DropdownBase)`
  min-width: 130px;
`

const COUNTRIES = copy(perClusterData.country_names).sort()
const COUNTRIES_STATE = COUNTRIES.reduce((result, country) => {
  return { ...result, [country]: { enabled: shouldPlotCountry(country) } }
}, {})

const CLUSTERS = perClusterData.distributions.map(({ cluster }) => cluster).sort()
const CLUSTERS_STATE = CLUSTERS.reduce((result, cluster) => {
  return { ...result, [cluster]: { enabled: true } }
}, {})

const CLUSTER_BUILD_NAMES: Map<string, string> = new Map(getClusters().map((c) => [c.display_name, c.build_name]))

export interface ClusterDistribution {
  cluster: string
  distribution: ClusterDistributionDatum[]
}

export function filterClusters(clusters: ClusterState, clusterDistrubutions: ClusterDistribution[]) {
  const enabledClusters = Object.entries(clusters)
    .filter(([_0, { enabled }]) => enabled)
    .map(([country]) => country)

  const withClustersFiltered = clusterDistrubutions.filter(({ cluster }) => {
    return enabledClusters.some((candidate) => candidate === cluster)
  })

  return { enabledClusters, withClustersFiltered }
}

export function filterCountries(countries: CountryState, withClustersFiltered: ClusterDistribution[]) {
  const enabledCountries = Object.entries(countries)
    .filter(([_0, { enabled }]) => enabled)
    .map(([country]) => country)

  const withCountriesFiltered = withClustersFiltered.map(({ cluster, distribution }) => {
    const distributionFiltered = distribution.map((dist) => {
      const frequenciesFiltered = pickBy(dist.frequencies, (_0, country) => {
        return enabledCountries.some((candidate) => candidate === country)
      })

      return { ...dist, frequencies: frequenciesFiltered }
    })
    return { cluster, distribution: distributionFiltered }
  })

  return { enabledCountries, withCountriesFiltered }
}

// eslint-disable-next-line prefer-destructuring
const distributions: ClusterDistribution[] = perClusterData.distributions
const enabledFilters = ['countries', 'clusters']

export interface SortByDropdownProps {
  perCountryTooltipSortBy: PerCountryTooltipSortBy
  onSortByChange(perCountryTooltipSortBy: PerCountryTooltipSortBy): void
}

const sortByOptions = Object.entries(PerCountryTooltipSortBy).map(([key, value]) => ({ value, label: key }))

export function SortByDropdown({ perCountryTooltipSortBy, onSortByChange }: SortByDropdownProps) {
  const handleSortByChange = useCallback(
    ({ value }) => onSortByChange(PerCountryTooltipSortBy[value as keyof typeof PerCountryTooltipSortBy]),
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
          onChange={handleSortByChange}
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

export function ClusterDistributionPage() {
  const perCountryTooltipSortBy = useSelector(selectPerCountryTooltipSortBy)
  const perCountryTooltipSortReversed = useSelector(selectPerCountryTooltipSortReversed)
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedVariant, setSelectedVariant] = useState<string>('')

  const dispatch = useDispatch()
  const setSortBy = useCallback(
    (perCountryTooltipSortBy: PerCountryTooltipSortBy) =>
      dispatch(setPerCountryTooltipSortBy({ perCountryTooltipSortBy })),
    [dispatch],
  )

  const setSortReversed = useCallback(
    (perCountryTooltipSortReversed: boolean) =>
      dispatch(setPerCountryTooltipSortReversed({ perCountryTooltipSortReversed })),
    [dispatch],
  )

  const [clusters, setClusters] = useState<ClusterState>(CLUSTERS_STATE)
  const [countries, setCountries] = useState<CountryState>(COUNTRIES_STATE)

  const { withClustersFiltered } = useMemo(() => filterClusters(clusters, distributions), [clusters])
  const { enabledCountries, withCountriesFiltered } =
    /* prettier-ignore */
    useMemo(() => filterCountries(countries, withClustersFiltered), [countries, withClustersFiltered])

  const clusterDistributionComponents = useMemo(
    () =>
      withCountriesFiltered.map(({ cluster, distribution }) => (
        <ColCustom key={cluster} md={12} lg={6} xl={6} xxl={4}>
          <ClusterDistributionPlotCard
            key={cluster}
            clusterBuildName={CLUSTER_BUILD_NAMES.get(cluster) || ''}
            clusterDisplayName={cluster}
            distribution={distribution}
            country_names={enabledCountries}
            selectedCountry={selectedCountry}
          />
        </ColCustom>
      )),
    [enabledCountries, withCountriesFiltered, selectedCountry],
  )

  const handleClusterCheckedChange = useCallback(
    (cluster: string) =>
      setClusters((oldClusters) => {
        return { ...oldClusters, [cluster]: { ...oldClusters[cluster], enabled: !oldClusters[cluster].enabled } }
      }),
    [],
  )

  const handleCountryCheckedChange = useCallback(
    (country: string) =>
      setCountries((oldCountries) => {
        return { ...oldCountries, [country]: { ...oldCountries[country], enabled: !oldCountries[country].enabled } }
      }),
    [],
  )

  return (
    <Layout wide>
      <Row noGutters>
        <Col>
          <h1 className="text-center">{'Overview of Variants/Mutations'}</h1>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <Editable githubUrl="blob/master/content/PerClusterIntro.md">
            <PerClusterIntro />
          </Editable>
        </Col>
      </Row>

      <Row noGutters>
        <Col className="pb-10">
          <Editable githubUrl="blob/master/scripts" text={'View data generation scripts'}>
            <WrapperFlex>
              <SidebarFlex>
                <DistributionSidebar
                  countries={countries}
                  clusters={clusters}
                  coutriesCollapsedByDefault={false}
                  enabledFilters={enabledFilters}
                  onClusterFilterChange={handleClusterCheckedChange}
                  onCountryFilterChange={handleCountryCheckedChange}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                />
              </SidebarFlex>

              <MainFlex>
                <Row noGutters>
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
                </Row>

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
