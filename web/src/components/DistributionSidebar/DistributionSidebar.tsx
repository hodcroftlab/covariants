import { get } from 'lodash'
import React, { useState, useMemo } from 'react'
import { Col, Row } from 'reactstrap'

import type { Continent, Country } from 'src/state/Places'
import type { ClusterState } from 'src/io/getPerCountryData'
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
  countries: Country[]
  continents: Continent[]
  clusters?: ClusterState
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

  const clustersSorted = useMemo(() => sortClusters(clusters), [clusters])

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
