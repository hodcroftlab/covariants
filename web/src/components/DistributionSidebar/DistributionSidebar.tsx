import { get } from 'lodash'
import React, { useState, useMemo, SetStateAction, Dispatch } from 'react'

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
  selectedCountry: string
  setSelectedCountry: Dispatch<SetStateAction<string>>
  selectedVariant?: string
  setSelectedVariant: Dispatch<SetStateAction<string>>
}

export function DistributionSidebar({
  clusters,
  countries,
  clustersCollapsedByDefault = true,
  coutriesCollapsedByDefault = true,
  enabledFilters,
  onClusterFilterChange,
  onCountryFilterChange,
  selectedCountry,
  setSelectedCountry,
  selectedVariant,
  setSelectedVariant,
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
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
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
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      ),
      clusters: clusters && (
        <ClusterFilters
          key="cluster-filters"
          clusters={clusters}
          onFilterChange={onClusterFilterChange}
          collapsed={clustersColapsed}
          setCollapsed={setClustersCollapsed}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
      ),
    }),
    [
      clusters,
      clustersColapsed,
      countries,
      countriesCollapsed,
      onClusterFilterChange,
      onCountryFilterChange,
      selectedCountry,
      setSelectedCountry,
      selectedVariant,
      setSelectedVariant,
    ],
  )

  return (
    <Row noGutters>
      <Col>{enabledFilters.map((filterName) => get(availableFilters, filterName))}</Col>
    </Row>
  )
}
