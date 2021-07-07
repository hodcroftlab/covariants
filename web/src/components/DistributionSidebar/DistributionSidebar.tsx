import { get } from 'lodash'
import React, { useState, useMemo } from 'react'
import { Col, Row } from 'reactstrap'

import type { ClusterState, CountryState } from 'src/components/CountryDistribution/CountryDistributionPage'
import { getClusterNames } from 'src/io/getClusters'
import { ClusterFilters } from './ClusterFilters'
import { CountryFilters } from './CountryFilters'

import { CountryFlagProps } from '../Common/CountryFlag'

const clusterNames = getClusterNames()

export function sortClusters(clusters?: ClusterState): ClusterState | undefined {
  if (!clusters) {
    return clusters
  }

  const clustersArray = Object.entries(clusters)
  return clusterNames.reduce((result, name) => {
    const cluster = clustersArray.find((cluster) => cluster[0] === name)
    if (cluster) {
      return { ...result, [cluster[0]]: cluster[1] }
    }
    return result
  }, {} as ClusterState)
}

export interface DistributionSidebarProps {
  clusters?: ClusterState
  countries?: CountryState
  regionsTitle: string
  clustersCollapsedByDefault?: boolean
  coutriesCollapsedByDefault?: boolean
  enabledFilters: string[]
  Icon?: React.ComponentType<CountryFlagProps>
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
  Icon,
  onClusterFilterChange,
  onClusterFilterSelectAll,
  onClusterFilterDeselectAll,
  onCountryFilterChange,
  onCountryFilterSelectAll,
  onCountryFilterDeselectAll,
}: DistributionSidebarProps) {
  const [clustersColapsed, setClustersCollapsed] = useState(clustersCollapsedByDefault)
  const [countriesCollapsed, setCountriesCollapsed] = useState(coutriesCollapsedByDefault)

  const clustersSorted = useMemo(() => sortClusters(clusters), [clusters])

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
          Icon={Icon}
          countries={countries}
          onFilterChange={onCountryFilterChange}
          onFilterSelectAll={onCountryFilterSelectAll}
          onFilterDeselectAll={onCountryFilterDeselectAll}
          collapsed={countriesCollapsed}
          setCollapsed={setCountriesCollapsed}
        />
      ),
      clusters: clustersSorted && (
        <ClusterFilters
          key="cluster-filters"
          clusters={clustersSorted}
          onFilterChange={onClusterFilterChange}
          onFilterSelectAll={onClusterFilterSelectAll}
          onFilterDeselectAll={onClusterFilterDeselectAll}
          collapsed={clustersColapsed}
          setCollapsed={setClustersCollapsed}
        />
      ),
    }),
    [
      clustersColapsed,
      clustersSorted,
      countries,
      countriesCollapsed,
      onClusterFilterChange,
      onClusterFilterDeselectAll,
      onClusterFilterSelectAll,
      onCountryFilterChange,
      onCountryFilterDeselectAll,
      onCountryFilterSelectAll,
      regionsTitle,
      Icon,
    ],
  )

  return (
    <Row noGutters>
      <Col>{enabledFilters.map((filterName) => get(availableFilters, filterName))}</Col>
    </Row>
  )
}
