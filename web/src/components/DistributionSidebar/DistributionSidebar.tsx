import React from 'react'

import { Card, Col, Row } from 'reactstrap'

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
      <Col xs={12}>
        <Card>
          <ClusterFilters clusters={clusters} onFilterChange={onClusterFilterChange} />
        </Card>
      </Col>

      <Col xs={12}>
        <Card>
          <CountryFilters countries={countries} onFilterChange={onCountryFilterChange} />
        </Card>
      </Col>
    </Row>
  )
}
