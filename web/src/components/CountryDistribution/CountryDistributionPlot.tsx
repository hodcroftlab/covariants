/* eslint-disable camelcase */
import React from 'react'

import dynamic from 'next/dynamic'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DateTime } from 'luxon'

import { theme } from 'src/theme'
import { timeDomain } from 'src/io/getParams'
import { getClusterColor } from 'src/io/getClusters'
import { formatDate, formatProportion } from 'src/helpers/format'

import { PlotPlaceholder } from 'src/components/Common/PlotPlaceholder'
import { ChartContainerOuter, ChartContainerInner } from 'src/components/Common/PlotLayout'
import { CountryDistributionPlotTooltip } from './CountryDistributionPlotTooltip'

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

export function CountryDistributionPlotComponent({ cluster_names, distribution }: CountryDistributionPlotProps) {
  const data = distribution.map(({ week, total_sequences, cluster_counts }) => {
    const total_cluster_sequences = Object.values(cluster_counts) // prettier-ignore
      .reduce<number>((result, count = 0) => result + (count ?? 0), 0)

    const others = total_sequences - total_cluster_sequences
    const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
    return { week: weekSec, ...cluster_counts, others }
  })

  return (
    <ChartContainerOuter>
      <ChartContainerInner>
        <ResponsiveContainer width="99%" aspect={theme.plot.aspectRatio} debounce={0}>
          <AreaChart margin={theme.plot.margin} data={data} stackOffset="expand">
            <XAxis
              dataKey="week"
              tickFormatter={formatDate}
              domain={timeDomain}
              tick={theme.plot.tickStyle}
              allowDataOverflow
            />
            <YAxis tickFormatter={formatProportion} domain={[0, 1]} tick={theme.plot.tickStyle} allowDataOverflow />
            <Tooltip
              content={CountryDistributionPlotTooltip}
              isAnimationActive={false}
              allowEscapeViewBox={{ x: false, y: true }}
              offset={50}
            />
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

            <Area type="monotone" dataKey="others" stackId="1" stroke="none" fill="none" isAnimationActive={false} />

            <CartesianGrid stroke="#2222" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainerInner>
    </ChartContainerOuter>
  )
}

export const CountryDistributionPlot = dynamic(() => Promise.resolve(CountryDistributionPlotComponent), {
  ssr: false,
  loading: PlotPlaceholder,
})
