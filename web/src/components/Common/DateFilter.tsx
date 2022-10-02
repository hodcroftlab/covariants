import React, { useCallback, useMemo, useState } from 'react'

import {
  Button,
  CardBody as CardBodyBase,
  Col,
  Container,
  Form as FormBase,
  FormGroup as FormGroupBase,
  Input,
  Label,
  Row,
} from 'reactstrap'
import styled, { useTheme } from 'styled-components'

import { CardCollapsible } from 'src/components/Common/CardCollapsible'
import MinMaxSlider from './MinMaxSlider'

export const CardBody = styled(CardBodyBase)``

export interface DateFiltersProps {
  collapsed: boolean
  setCollapsed(collapsed: boolean): void
}

export function DateFilter({ collapsed, setCollapsed }: DateFiltersProps) {
  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(10)

  return (
    <CardCollapsible className="m-2" title="Dates" collapsed={collapsed} setCollapsed={setCollapsed}>
      <CardBody>
        <Container fluid>
          <Row noGutters>
            <MinMaxSlider
              min={0}
              max={10}
              minValue={minIndex}
              maxValue={maxIndex}
              onMinChange={setMinIndex}
              onMaxChange={setMaxIndex}
            />
            {/* <Col className="d-flex">
              <FormGroup className="flex-grow-0 mx-auto">
                <Button type="button" color="link" onClick={onFilterSelectAll}>
                  {'Select all'}
                </Button>
                <Button type="button" color="link" onClick={onFilterDeselectAll}>
                  {'Deselect all'}
                </Button>
              </FormGroup>
            </Col> */}
          </Row>
        </Container>
      </CardBody>
    </CardCollapsible>
  )
}
