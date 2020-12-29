/* eslint-disable camelcase */
import React from 'react'

import dynamic from 'next/dynamic'
import { XAxis, YAxis, CartesianGrid, Tooltip, Line, LineChart, ResponsiveContainer } from 'recharts'
import { Props as DefaultTooltipContentProps } from 'recharts/types/component/DefaultTooltipContent'
import { DateTime } from 'luxon'

import { PLOT_ASPECT_RATIO } from 'src/constants'
import { getCountryColor } from 'src/io/getCountryColor'
import { PlotPlaceholder } from 'src/components/Common/PlotPlaceholder'
import { ChartContainerOuter, ChartContainerInner } from 'src/components/Common/PlotLayout'

export interface TooltipPayload {
  payload: { name: string; value: number; color: string }[]
  label: string
}

export function renderTooltipContent({ payload, label }: DefaultTooltipContentProps<number, string>) {
  return (
    <div className="bg-white">
      <ul className="list">
        {payload?.map(({ color, name, value }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`item-${index}`} style={{ color }}>
            {`${name ?? ''}: ${value ?? 0}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

const margin = { left: -20, top: 5, bottom: 5, right: 10 }

const tickStyle = { fontSize: 12 }

const yAxisFormatter = (value: number) => value.toFixed(2)

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

export function ClusterDistributionPlotComponent({ country_names, distribution }: ClusterDistributionPlotProps) {
  const data = distribution.map(({ week, frequencies }) => {
    const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
    return { week: weekSec, ...frequencies }
  })

  return (
    <ChartContainerOuter>
      <ChartContainerInner>
        <ResponsiveContainer aspect={PLOT_ASPECT_RATIO}>
          <LineChart margin={margin} data={data}>
            <XAxis dataKey="week" tickFormatter={dateFormatter} tick={tickStyle} allowDataOverflow />
            <YAxis tickFormatter={yAxisFormatter} domain={[0, 1]} tick={tickStyle} allowDataOverflow />
            <Tooltip content={renderTooltipContent} />
            {country_names.map((country, i) => (
              <Line
                key={country}
                type="monotone"
                dataKey={country}
                stroke={getCountryColor(country)}
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
