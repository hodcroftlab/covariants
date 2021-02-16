import { get } from 'lodash'
import React, { useState, useMemo } from 'react'

import { Col, Row } from 'reactstrap'

import type { ClusterState, CountryState } from 'src/components/CountryDistribution/CountryDistributionPage'
import { ClusterFilters } from './ClusterFilters'
import { CountryFilters } from './CountryFilters'

export interface DistributionSidebarProps {
  clusters?: ClusterState
  countries?: CountryState
  clustersCollapsedByDefault?: boolean
  coutriesCollapsedByDefault?: boolean
  enabledFilters: string[]
  onClusterFilterChange(cluster: string): void
  onCountryFilterChange(country: string): void
}

export function DistributionSidebar({
  clusters,
  countries,
  clustersCollapsedByDefault = true,
  coutriesCollapsedByDefault = true,
  enabledFilters,
  onClusterFilterChange,
  onCountryFilterChange,
}: DistributionSidebarProps) {
  const [clustersColapsed, setClustersCollapsed] = useState(clustersCollapsedByDefault)
  const [countriesCollapsed, setCountriesCollapsed] = useState(coutriesCollapsedByDefault)

  const availableFilters: { [key: string]: React.ReactNode } = useMemo(
    () => ({
      countries: countries && (
        <CountryFilters
          key="country-filters"
          countries={countries}
          onFilterChange={onCountryFilterChange}
          collapsed={countriesCollapsed}
          setCollapsed={setCountriesCollapsed}
        />
      ),
      countriesWithIcons: countries && (
        <CountryFilters
          key="country-filters"
          withIcons
          countries={countries}
          onFilterChange={onCountryFilterChange}
          collapsed={countriesCollapsed}
          setCollapsed={setCountriesCollapsed}
        />
      ),
      clusters: clusters && (
        <ClusterFilters
          key="cluster-filters"
          clusters={clusters}
          onFilterChange={onClusterFilterChange}
          collapsed={clustersColapsed}
          setCollapsed={setClustersCollapsed}
        />
      ),
    }),
    [clusters, clustersColapsed, countries, countriesCollapsed, onClusterFilterChange, onCountryFilterChange],
  )

  return (
    <Row noGutters>
      <Col>{enabledFilters.map((filterName) => get(availableFilters, filterName))}</Col>
    </Row>
  )
}
