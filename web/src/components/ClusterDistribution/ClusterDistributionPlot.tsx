/* eslint-disable camelcase */
import React from 'react'

import styled from 'styled-components'
import { XAxis, YAxis, CartesianGrid, Tooltip, Line, LineChart } from 'recharts'
import { Props as DefaultTooltipContentProps } from 'recharts/types/component/DefaultTooltipContent'
import { DateTime } from 'luxon'

const clusterColors = [
  '#a6cee3',
  '#1f78b4',
  '#c4c663',
  '#33a02c',
  '#fb9a99',
  '#e31a1c',
  '#fdbf6f',
  '#ff7f00',
  '#cab2d6',
  '#6a3d9a',
  '#b2df8a',
  '#b15928',
  '#000000',
  '#9900cc',
  '#ffcc00',
  '#a6a6a6',
  '#0099ff',
  '#d9d9d9',
  '#990000',
]

function getClusterColor(i: number) {
  return clusterColors[i % clusterColors.length]
}

const toPercent = (decimal: number, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0
  return toPercent(ratio, 2)
}

export interface TooltipPayload {
  payload: { name: string; value: number; color: string }[]
  label: string
}

export function renderTooltipContent({ payload, label }: DefaultTooltipContentProps<number, string>) {
  const total = payload?.reduce((result, { value }) => result + (value ?? 0), 0) ?? 0

  return (
    <div className="bg-white">
      <ul className="list">
        {payload?.map(({ color, name, value }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`item-${index}`} style={{ color }}>
            {`${name ?? ''}: ${value ?? 0}(${getPercent(value ?? 0, total)})`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const LineChartStyled = styled(LineChart)`
  margin: 10px auto;
`

const dateFormatter = (date: number) => {
  return DateTime.fromSeconds(date).toISODate()
}

export interface ClusterDistributionDatum {
  week: string
  frequencies: {
    [key: string]: number | undefined
  }
}

export interface ClusterDistributionPlotProps {
  country_names: string[]
  distribution: ClusterDistributionDatum[]
}

export function ClusterDistributionPlot({ country_names, distribution }: ClusterDistributionPlotProps) {
  const data = distribution.map(({ week, frequencies }) => {
    const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
    return { week: weekSec, ...frequencies }
  })

  return (
    <LineChartStyled width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="week" scale="time" tickFormatter={dateFormatter} />
      <YAxis tickFormatter={toPercent} />
      <Tooltip content={renderTooltipContent} />
      {country_names.map((cluster, i) => (
        <Line
          key={cluster}
          type="monotone"
          dataKey={cluster}
          stroke={getClusterColor(i)}
          dot={false}
          isAnimationActive={false}
        />
      ))}
    </LineChartStyled>
  )
}
