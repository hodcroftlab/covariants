import React, { useCallback, useMemo } from 'react'

import { Button, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'

import { getClusterColor } from 'src/io/getClusters'
import { ColoredBox } from 'src/components/Common/ColoredBox'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'
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
  collapsed: boolean
  onFilterChange(cluster: string): void
  onFilterSelectAll(): void
  onFilterDeselectAll(): void
  setCollapsed(collapsed: boolean): void
}

export function ClusterFilters({
  clusters,
  collapsed,
  onFilterSelectAll,
  onFilterDeselectAll,
  onFilterChange,
  setCollapsed,
}: ClusterFiltersProps) {
  const filters = useMemo(() => Object.entries(clusters), [clusters])

  return (
    <CardCollapsible className="m-2" title={'Variants'} collapsed={collapsed} setCollapsed={setCollapsed}>
      <CardBody>
        <Container fluid>
          <Row noGutters>
            <Col className="d-flex">
              <FormGroup className="flex-grow-0 mx-auto">
                <Button type="button" color="link" onClick={onFilterSelectAll}>
                  {'Select all'}
                </Button>
                <Button type="button" color="link" onClick={onFilterDeselectAll}>
                  {'Deselect all'}
                </Button>
              </FormGroup>
            </Col>
          </Row>

          <Row noGutters>
            <Col>
              <Form>
                {filters.map(([cluster, { enabled }]) => (
                  <ClusterFilterCheckbox
                    key={cluster}
                    cluster={cluster}
                    enabled={enabled}
                    onFilterChange={onFilterChange}
                  />
                ))}
              </Form>
            </Col>
          </Row>
        </Container>
      </CardBody>
    </CardCollapsible>
  )
}
