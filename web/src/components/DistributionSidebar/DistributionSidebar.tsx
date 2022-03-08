import { get } from 'lodash'
import React, { useState, useMemo } from 'react'
import { Col, Row } from 'reactstrap'
import { Cluster } from 'src/state/Clusters'

import type { Continent, Country } from 'src/state/Places'
import { sortClusters } from 'src/io/getClusters'
import { ClusterFilters } from './ClusterFilters'
import { CountryFilters } from './CountryFilters'

import { CountryFlagProps } from '../Common/CountryFlag'

export interface DistributionSidebarProps {
  countries: Country[]
  continents: Continent[]
  clusters?: Cluster[]
  regionsTitle: string
  clustersCollapsedByDefault?: boolean
  countriesCollapsedByDefault?: boolean
  enabledFilters: string[]
  Icon?: React.ComponentType<CountryFlagProps>
  onClusterFilterChange(cluster: string): void
  onClusterFilterSelectAll(): void
  onClusterFilterDeselectAll(): void
  onCountryFilterChange(country: string): void
  onRegionFilterChange(regionName: string): void
  onCountryFilterSelectAll(): void
  onCountryFilterDeselectAll(): void
}

export function DistributionSidebar({
  countries,
  continents,
  clusters,
  regionsTitle,
  clustersCollapsedByDefault = true,
  countriesCollapsedByDefault = true,
  enabledFilters,
  Icon,
  onClusterFilterChange,
  onClusterFilterSelectAll,
  onClusterFilterDeselectAll,
  onRegionFilterChange,
  onCountryFilterChange,
  onCountryFilterSelectAll,
  onCountryFilterDeselectAll,
}: DistributionSidebarProps) {
  const [clustersCollapsed, setClustersCollapsed] = useState(clustersCollapsedByDefault)
  const [countriesCollapsed, setCountriesCollapsed] = useState(countriesCollapsedByDefault)
  const clustersSorted = useMemo(() => sortClusters(clusters ?? []), [clusters])

  const availableFilters: { [key: string]: React.ReactNode } = useMemo(
    () => ({
      countries: (
        <CountryFilters
          key="country-filters"
          countries={countries}
          continents={continents}
          regionsTitle={regionsTitle}
          onFilterSelectRegion={onRegionFilterChange}
          onFilterChange={onCountryFilterChange}
          onFilterSelectAll={onCountryFilterSelectAll}
          onFilterDeselectAll={onCountryFilterDeselectAll}
          collapsed={countriesCollapsed}
          setCollapsed={setCountriesCollapsed}
        />
      ),
      countriesWithIcons: (
        <CountryFilters
          key="country-filters"
          regionsTitle={regionsTitle}
          countries={countries}
          continents={continents}
          withIcons
          Icon={Icon}
          onFilterChange={onCountryFilterChange}
          onFilterSelectRegion={onRegionFilterChange}
          onFilterSelectAll={onCountryFilterSelectAll}
          onFilterDeselectAll={onCountryFilterDeselectAll}
          collapsed={countriesCollapsed}
          setCollapsed={setCountriesCollapsed}
        />
      ),
      clusters: clusters && (
        <ClusterFilters
          key="cluster-filters"
          clusters={clustersSorted}
          onFilterChange={onClusterFilterChange}
          onFilterSelectAll={onClusterFilterSelectAll}
          onFilterDeselectAll={onClusterFilterDeselectAll}
          collapsed={clustersCollapsed}
          setCollapsed={setClustersCollapsed}
        />
      ),
    }),
    [
      Icon,
      clustersCollapsed,
      clusters,
      clustersSorted,
      countriesCollapsed,
      onClusterFilterChange,
      onClusterFilterDeselectAll,
      onClusterFilterSelectAll,
      onCountryFilterChange,
      onCountryFilterDeselectAll,
      onCountryFilterSelectAll,
      onRegionFilterChange,
      regionsTitle,
      countries,
      continents,
    ],
  )

  return (
    <Row noGutters>
      <Col>{enabledFilters.map((filterName) => get(availableFilters, filterName))}</Col>
    </Row>
  )
}
