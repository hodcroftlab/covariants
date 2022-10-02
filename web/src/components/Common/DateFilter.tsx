import React, { useCallback, useEffect, useMemo, useState } from 'react'

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
import { useRecoilState } from 'recoil'

import { CardCollapsible } from 'src/components/Common/CardCollapsible'
import { getWeeks } from 'src/io/getParams'
import { dateFilterAtom } from 'src/state/DateFilter'
import MinMaxSlider from './MinMaxSlider'

export const CardBody = styled(CardBodyBase)``

export interface DateFiltersProps {
  collapsed: boolean
  setCollapsed(collapsed: boolean): void
}

export function DateFilter({ collapsed, setCollapsed }: DateFiltersProps) {
  const weeks = React.useMemo(() => getWeeks(), [])

  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(weeks.length - 1)

  const [dateFilter, setDateFilter] = useRecoilState(dateFilterAtom)

  useEffect(() => {
    setDateFilter(() => [weeks[minIndex], weeks[maxIndex]])
  }, [minIndex, maxIndex])

  // useEffect(() => {
  //   if (dateFilter !== null) {
  //     const [min, max] = dateFilter
  //     console.log(min, weeks.indexOf(min), max, weeks.indexOf(max))
  //     setMinIndex(weeks.indexOf(min))
  //     setMaxIndex(weeks.indexOf(max))
  //   }
  // }, [dateFilter])

  return (
    <CardCollapsible className="m-2" title="Dates" collapsed={collapsed} setCollapsed={setCollapsed}>
      <CardBody>
        <Container fluid>
          <Row noGutters>
            <MinMaxSlider
              min={0}
              max={weeks.length - 1}
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
