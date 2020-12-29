import React, { useCallback, useMemo } from 'react'

import { CardBody, Form, FormGroup, Input, Label } from 'reactstrap'

import { getClusterColor } from 'src/io/getClusterColors'
import { ColoredBox } from 'src/components/Common/ColoredBox'
import type { ClusterState } from 'src/components/CountryDistribution/CountryDistributionPage'

export interface ClusterFilterCheckboxProps {
  cluster: string
  enabled: boolean
  onFilterChange(cluster: string): void
}

export function ClusterFilterCheckbox({ cluster, enabled, onFilterChange }: ClusterFilterCheckboxProps) {
  const onChange = useCallback(() => onFilterChange(cluster), [onFilterChange, cluster])

  return (
    <FormGroup key={cluster} check>
      <Label htmlFor={CSS.escape(cluster)} check>
        <Input id={CSS.escape(cluster)} type="checkbox" checked={enabled} onChange={onChange} />
        <ColoredBox $color={getClusterColor(cluster)} $size={14} $aspect={16 / 9} />
        <span>{cluster}</span>
      </Label>
    </FormGroup>
  )
}

export interface ClusterFiltersProps {
  clusters: ClusterState
  onFilterChange(cluster: string): void
}

export function ClusterFilters({ clusters, onFilterChange }: ClusterFiltersProps) {
  const filters = useMemo(() => Object.entries(clusters), [clusters])

  return (
    <CardBody>
      <Form>
        {filters.map(([cluster, { enabled }]) => (
          <ClusterFilterCheckbox key={cluster} cluster={cluster} enabled={enabled} onFilterChange={onFilterChange} />
        ))}
      </Form>
    </CardBody>
  )
}
