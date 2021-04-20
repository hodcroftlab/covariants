import { get } from 'lodash'
import React, { useState, useMemo } from 'react'

import { Col, Row } from 'reactstrap'

import type { ClusterState, CountryState } from 'src/components/CountryDistribution/CountryDistributionPage'
import { ClusterFilters } from './ClusterFilters'
import { CountryFilters } from './CountryFilters'

export interface DistributionSidebarProps {
  clusters?: ClusterState
  countries?: CountryState
  regionsTitle: string
  clustersCollapsedByDefault?: boolean
  coutriesCollapsedByDefault?: boolean
  enabledFilters: string[]
  onClusterFilterChange(cluster: string): void
  onClusterFilterSelectAll(): void
  onClusterFilterDeselectAll(): void
  onCountryFilterChange(country: string): void
  onCountryFilterSelectAll(): void
  onCountryFilterDeselectAll(): void
}

export function DistributionSidebar({
  clusters,
  countries,
  regionsTitle,
  clustersCollapsedByDefault = true,
  coutriesCollapsedByDefault = true,
  enabledFilters,
  onClusterFilterChange,
  onClusterFilterSelectAll,
  onClusterFilterDeselectAll,
  onCountryFilterChange,
  onCountryFilterSelectAll,
  onCountryFilterDeselectAll,
}: DistributionSidebarProps) {
  const [clustersColapsed, setClustersCollapsed] = useState(clustersCollapsedByDefault)
  const [countriesCollapsed, setCountriesCollapsed] = useState(coutriesCollapsedByDefault)

  const availableFilters: { [key: string]: React.ReactNode } = useMemo(
    () => ({
      countries: countries && (
        <CountryFilters
          key="country-filters"
          regionsTitle={regionsTitle}
          countries={countries}
          onFilterChange={onCountryFilterChange}
          onFilterSelectAll={onCountryFilterSelectAll}
          onFilterDeselectAll={onCountryFilterDeselectAll}
          collapsed={countriesCollapsed}
          setCollapsed={setCountriesCollapsed}
        />
      ),
      countriesWithIcons: countries && (
        <CountryFilters
          key="country-filters"
          regionsTitle={regionsTitle}
          withIcons
          countries={countries}
          onFilterChange={onCountryFilterChange}
          onFilterSelectAll={onCountryFilterSelectAll}
          onFilterDeselectAll={onCountryFilterDeselectAll}
          collapsed={countriesCollapsed}
          setCollapsed={setCountriesCollapsed}
        />
      ),
      clusters: clusters && (
        <ClusterFilters
          key="cluster-filters"
          clusters={clusters}
          onFilterChange={onClusterFilterChange}
          onFilterSelectAll={onClusterFilterSelectAll}
          onFilterDeselectAll={onClusterFilterDeselectAll}
          collapsed={clustersColapsed}
          setCollapsed={setClustersCollapsed}
        />
      ),
    }),
    [
      clusters,
      clustersColapsed,
      countries,
      countriesCollapsed,
      onClusterFilterChange,
      onClusterFilterDeselectAll,
      onClusterFilterSelectAll,
      onCountryFilterChange,
      onCountryFilterDeselectAll,
      onCountryFilterSelectAll,
    ],
  )

  return (
    <Row noGutters>
      <Col>{enabledFilters.map((filterName) => get(availableFilters, filterName))}</Col>
    </Row>
  )
}
