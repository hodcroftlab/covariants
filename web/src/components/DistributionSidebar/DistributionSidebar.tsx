import React from 'react'

import { Col, Row } from 'reactstrap'

import type { ClusterState, CountryState } from 'src/components/CountryDistribution/CountryDistributionPage'
import { ClusterFilters } from './ClusterFilters'
import { CountryFilters } from './CountryFilters'

export interface DistributionSidebarProps {
  clusters: ClusterState
  countries: CountryState
  onClusterFilterChange(cluster: string): void
  onCountryFilterChange(country: string): void
}

export function DistributionSidebar({
  clusters,
  countries,
  onClusterFilterChange,
  onCountryFilterChange,
}: DistributionSidebarProps) {
  return (
    <Row noGutters>
      <Col>
        <ClusterFilters clusters={clusters} onFilterChange={onClusterFilterChange} />
      </Col>

      <Col>
        <CountryFilters countries={countries} onFilterChange={onCountryFilterChange} />
      </Col>
    </Row>
  )
}
