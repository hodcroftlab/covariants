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

import { styled } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { Atom, useAtom } from 'jotai'
import { Cluster, clusterDisplayNameToLineageMapSelector, getClusterColorsSelector } from 'src/state/Clusters'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { ColoredBox } from 'src/components/Common/ColoredBox'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

export function ClusterFilters({
  clusters,
  collapsedAtom,
  onFilterSelectAll,
  onFilterDeselectAll,
  onFilterChange,
}: ClusterFiltersProps) {
  const { t } = useTranslationSafe()
  const [collapsed, setCollapsed] = useAtom(collapsedAtom)

  return (
    <CardCollapsible title={t('Variants')} collapsed={collapsed} setCollapsed={setCollapsed}>
      <CardBody>
        <Container fluid>
          <Row className={'gx-0'}>
            <Col className="d-flex">
              <FormGroup className="flex-grow-0 mx-auto">
                <Button type="button" color="link" onClick={onFilterSelectAll}>
                  {t('Select all')}
                </Button>
                <Button type="button" color="link" onClick={onFilterDeselectAll}>
                  {t('Deselect all')}
                </Button>
              </FormGroup>
            </Col>
          </Row>

          <Row className={'gx-0'}>
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

export interface ClusterFiltersProps {
  clusters: Cluster[]
  collapsedAtom: Atom<boolean>
  onFilterChange(cluster: string): void
  onFilterSelectAll(): void
  onFilterDeselectAll(): void
}

export const FormGroup = styled(FormGroupBase)`
  flex: 1 0 320px;
`

export const Form = styled(FormBase)`
  display: flex;
  flex-wrap: wrap;
`

export function ClusterFilterCheckbox({ cluster, enabled, onFilterChange }: ClusterFilterCheckboxProps) {
  const onChange = useCallback(() => onFilterChange(cluster), [onFilterChange, cluster])
  const getClusterColor = useRecoilValue(getClusterColorsSelector)
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineageMap = useRecoilValue(clusterDisplayNameToLineageMapSelector)
  const pangoName = pangoLineageMap.get(cluster) ?? cluster

  return (
    <FormGroup key={cluster} check>
      <Label check>
        <Input type="checkbox" checked={enabled} onChange={onChange} />
        <ColoredBox $color={getClusterColor(cluster)} $size={14} $aspect={16 / 9} />
        <ClusterNameText>{enablePangolin ? pangoName : cluster}</ClusterNameText>
      </Label>
    </FormGroup>
  )
}

export interface ClusterFilterCheckboxProps {
  cluster: string
  enabled: boolean

  onFilterChange(cluster: string): void
}

export const ClusterNameText = styled.span`
  font-family: ${(props) => props.theme.font.monospace};
`
