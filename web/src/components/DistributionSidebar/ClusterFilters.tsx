import React, { useCallback } from 'react'

import {
  Button,
  CardBody,
  Col,
  Container,
  Form as FormBase,
  FormGroup as FormGroupBase,
  Input,
  Label,
  Row,
} from 'reactstrap'

import type { Cluster } from 'src/state/Clusters'
import { getClusterColor } from 'src/io/getClusters'
import { ColoredBox } from 'src/components/Common/ColoredBox'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'
import styled from 'styled-components'

export const FormGroup = styled(FormGroupBase)`
  flex: 1 0 320px;
`

export const Form = styled(FormBase)`
  display: flex;
  flex-wrap: wrap;
`

export const ClusterNameText = styled.span`
  font-family: ${(props) => props.theme.font.monospace};
`

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
        <ClusterNameText>{cluster}</ClusterNameText>
      </Label>
    </FormGroup>
  )
}

export interface ClusterFiltersProps {
  clusters: Cluster[]
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
                {clusters.map(({ cluster, enabled }) => (
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
