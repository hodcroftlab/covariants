import React from 'react'

import { get, sortBy, reverse, uniqBy } from 'lodash'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import type { ClusterDistributionDatum } from 'src/components/ClusterDistribution/ClusterDistributionPlot'
import type { Props as DefaultTooltipContentProps } from 'recharts/types/component/DefaultTooltipContent'
import { selectPerCountryTooltipSortBy, selectPerCountryTooltipSortReversed } from 'src/state/ui/ui.selectors'
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

const TooltipFooter = styled.div`
  margin: 5px;
`

const TooltipTableBody = styled.tbody``

export type ClusterDistributionPlotTooltipProps = DefaultTooltipContentProps<number, string>

export function ClusterDistributionPlotTooltip(props: ClusterDistributionPlotTooltipProps) {
  const perCountryTooltipSortBy = useSelector(selectPerCountryTooltipSortBy)
  const perCountryTooltipSortReversed = useSelector(selectPerCountryTooltipSortReversed)

  const { payload } = props
  if (!payload || payload.length === 0) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const data = payload[0]?.payload as ClusterDistributionDatum

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const week = formatDate(data?.week)

  let payloadSorted = sortBy(payload, perCountryTooltipSortBy === 'country' ? 'name' : 'value')

  if (perCountryTooltipSortReversed) {
    payloadSorted = reverse(payloadSorted)
  }

  const payloadUnique = uniqBy(payloadSorted, (payload) => payload.name)

  return (
    <Tooltip>
      <TooltipTitle>{`Week: ${week}`}</TooltipTitle>

      <TooltipTable>
        <thead>
          <tr className="w-100">
            <th className="px-2 text-left">{'Country'}</th>
            <th />
            <th className="px-2 text-right">{'Frequency'}</th>
          </tr>
        </thead>
        <TooltipTableBody>
          {/* @ts-ignore */}
          {payloadUnique.map(({ name, value, payload }) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const interpolated = !get(payload?.orig, name, false) // eslint-disable-line @typescript-eslint/no-unsafe-member-access
            return (
              <tr key={name}>
                <td className="px-2 text-left">
                  <ColoredCircle $color={getCountryColor(name ?? '')} $size={10} />
                  <span>{name}</span>
                </td>
                <td>{interpolated && '*'}</td>
                <td className="px-2 text-right">
                  {value !== undefined && value > EPSILON ? formatProportion(value) : '-'}
                </td>
              </tr>
            )
          })}
        </TooltipTableBody>
      </TooltipTable>

      <TooltipFooter>
        <small>{'* Interpolated values'}</small>
      </TooltipFooter>
    </Tooltip>
  )
}
