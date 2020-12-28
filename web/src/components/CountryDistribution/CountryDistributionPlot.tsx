/* eslint-disable camelcase */
import React from 'react'

import styled from 'styled-components'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Props as DefaultTooltipContentProps } from 'recharts/types/component/DefaultTooltipContent'
import { DateTime } from 'luxon'

import { getClusterColor } from 'src/io/getClusterColors'

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

  let labelString = ''
  if (typeof label === 'string') {
    labelString = label
  }

  return (
    <div className="bg-white">
      <p className="total">{`${labelString} (Total: ${total})`}</p>
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

export const AreaChartStyled = styled(AreaChart)`
  margin: 10px auto;
`

const dateFormatter = (date: number) => {
  return DateTime.fromSeconds(date).toISODate()
}

export interface CountryDistributionDatum {
  week: string
  total_sequences: number
  cluster_counts: {
    [key: string]: number | undefined
  }
}

export interface CountryDistributionPlotProps {
  cluster_names: string[]
  distribution: CountryDistributionDatum[]
}

export function CountryDistributionPlot({ cluster_names, distribution }: CountryDistributionPlotProps) {
  const data = distribution.map(({ week, total_sequences, cluster_counts }) => {
    const total_cluster_sequences = Object.values(cluster_counts) // prettier-ignore
      .reduce<number>((result, count = 0) => result + (count ?? 0), 0)

    const others = total_sequences - total_cluster_sequences
    const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
    return { week: weekSec, ...cluster_counts, others }
  })

  return (
    <AreaChartStyled width={500} height={300} data={data} stackOffset="expand">
      <XAxis dataKey="week" scale="time" tickFormatter={dateFormatter} />
      <YAxis tickFormatter={toPercent} />
      <Tooltip content={renderTooltipContent} />
      {cluster_names.map((cluster, i) => (
        <Area
          key={cluster}
          type="monotone"
          dataKey={cluster}
          stackId="1"
          stroke="none"
          fill={getClusterColor(cluster)}
          isAnimationActive={false}
        />
      ))}

      <Area
        type="monotone"
        dataKey="others"
        stackId="1"
        stroke="transparent"
        fill="transparent"
        isAnimationActive={false}
      />

      <CartesianGrid strokeDasharray="3 5" stroke="#2225" />
    </AreaChartStyled>
  )
}
