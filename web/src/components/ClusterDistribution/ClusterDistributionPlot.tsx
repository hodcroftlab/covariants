/* eslint-disable camelcase */
import { DateTime } from 'luxon'

import dynamic from 'next/dynamic'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ClusterDistributionPlotTooltip } from 'src/components/ClusterDistribution/ClusterDistributionPlotTooltip'
import { ChartContainerInner, ChartContainerOuter } from 'src/components/Common/PlotLayout'
import { PlotPlaceholder } from 'src/components/Common/PlotPlaceholder'

import { formatDate, formatProportion } from 'src/helpers/format'
import { lineStyleToStrokeDashArray } from 'src/helpers/lineStyleToStrokeDashArray'
import { getCountryColor, getCountryStyle } from 'src/io/getCountryColor'
import { theme } from 'src/theme'

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

export function ClusterDistributionPlotComponent({ country_names, distribution }: ClusterDistributionPlotProps) {
  const data = distribution.map(({ week, frequencies }) => {
    const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
    return { week: weekSec, ...frequencies }
  })

  return (
    <ChartContainerOuter>
      <ChartContainerInner>
        <ResponsiveContainer aspect={theme.plot.aspectRatio}>
          <LineChart margin={theme.plot.margin} data={data}>
            <XAxis dataKey="week" tickFormatter={formatDate} tick={theme.plot.tickStyle} allowDataOverflow />
            <YAxis tickFormatter={formatProportion} domain={[0, 1]} tick={theme.plot.tickStyle} allowDataOverflow />
            <Tooltip content={ClusterDistributionPlotTooltip} isAnimationActive={false} />
            {country_names.map((country, i) => (
              <Line
                key={country}
                type="monotone"
                dataKey={country}
                stroke={getCountryColor(country)}
                strokeWidth={1.5}
                strokeDasharray={lineStyleToStrokeDashArray(getCountryStyle(country).ls)}
                dot={false}
                isAnimationActive={false}
              />
            ))}

            <CartesianGrid stroke="#2222" />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainerInner>
    </ChartContainerOuter>
  )
}

export const ClusterDistributionPlot = dynamic(() => Promise.resolve(ClusterDistributionPlotComponent), {
  ssr: false,
  loading: PlotPlaceholder,
})
