import React from 'react'

import { sortBy, reverse } from 'lodash'
import styled from 'styled-components'
import { Props as DefaultTooltipContentProps } from 'recharts/types/component/DefaultTooltipContent'

import { formatDate, formatProportion } from 'src/helpers/format'
import { getCountryColor } from 'src/io/getCountryColor'
import { ColoredCircle } from 'src/components/Common/ColoredCircle'

const EPSILON = 1e-2

const Tooltip = styled.div`
  display: flex;
  flex-direction: column;

  padding: 5px 10px;
  background-color: ${(props) => props.theme.gray100};
  box-shadow: ${(props) => props.theme.shadows.slight};
  border-radius: 3px;
`

const TooltipTitle = styled.h1`
  font-size: 1rem;
  margin: 5px auto;
`

const TooltipTable = styled.table`
  padding: 30px 35px;
  font-size: 0.9rem;
  border: none;
  min-width: 250px;

  & > tbody > tr:nth-child(odd) {
    background-color: ${(props) => props.theme.gray200};
  }
`

const TooltipTableBody = styled.tbody``

export function ClusterDistributionPlotTooltip(props: DefaultTooltipContentProps<number, string>) {
  const { payload } = props
  if (!payload || payload?.length === 0) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const week = formatDate(payload[0]?.payload.week)

  const payloadSorted = reverse(sortBy(payload, 'value'))

  return (
    <Tooltip>
      <TooltipTitle>{`Week: ${week}`}</TooltipTitle>

      <TooltipTable>
        <TooltipTableBody>
          {payloadSorted.map(({ color, name, value }, index) => (
            <tr key={name}>
              <td className="px-2">
                <ColoredCircle $color={getCountryColor(name ?? '')} $size={10} />
                <span>{name}</span>
              </td>
              <td className="px-2">{value !== undefined && value > EPSILON ? formatProportion(value) : '-'}</td>
            </tr>
          ))}
        </TooltipTableBody>
      </TooltipTable>
    </Tooltip>
  )
}
