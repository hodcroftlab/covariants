import { get } from 'lodash'
import React, { useState, useMemo } from 'react'
import { Col, Row } from 'reactstrap'

import type { ClusterState } from 'src/io/getPerCountryData'
import type { Places } from 'src/io/getPlaces'
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
  places: Places
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
  clusters,
  places,
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

  const clustersSorted = useMemo(() => sortClusters(clusters), [clusters])

  const availableFilters: { [key: string]: React.ReactNode } = useMemo(
    () => ({
      countries: (
        <CountryFilters
          key="country-filters"
          regionsTitle={regionsTitle}
          places={places}
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
          withIcons
          Icon={Icon}
          places={places}
          onFilterChange={onCountryFilterChange}
          onFilterSelectRegion={onRegionFilterChange}
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
          collapsed={clustersCollapsed}
          setCollapsed={setClustersCollapsed}
        />
      ),
    }),
    [
      Icon,
      clustersCollapsed,
      clustersSorted,
      countriesCollapsed,
      onClusterFilterChange,
      onClusterFilterDeselectAll,
      onClusterFilterSelectAll,
      onCountryFilterChange,
      onCountryFilterDeselectAll,
      onCountryFilterSelectAll,
      onRegionFilterChange,
      places,
      regionsTitle,
    ],
  )

  return (
    <Row noGutters>
      <Col>{enabledFilters.map((filterName) => get(availableFilters, filterName))}</Col>
    </Row>
  )
}
