/* eslint-disable camelcase,unicorn/consistent-function-scoping */
import React from 'react'

import dynamic from 'next/dynamic'
import { DateTime } from 'luxon'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { theme } from 'src/theme'
import { timeDomain } from 'src/io/getParams'
import { getCountryColor, getCountryStyle } from 'src/io/getCountryColor'
import { formatDate, formatProportion } from 'src/helpers/format'
import { lineStyleToStrokeDashArray } from 'src/helpers/lineStyleToStrokeDashArray'

import { ClusterDistributionPlotTooltip } from 'src/components/ClusterDistribution/ClusterDistributionPlotTooltip'
import { ChartContainerInner, ChartContainerOuter } from 'src/components/Common/PlotLayout'
import { PlotPlaceholder } from 'src/components/Common/PlotPlaceholder'
import { get } from 'lodash'

export interface ClusterDistributionDatum {
  week: string
  frequencies: {
    [country: string]: number | undefined
  }
  interp: {
    [country: string]: boolean | undefined
  }
  orig: {
    [country: string]: boolean | undefined
  }
}

export interface ClusterDistributionPlotProps {
  country_names: string[]
  distribution: ClusterDistributionDatum[]
}

export function ClusterDistributionPlotComponent({ country_names, distribution }: ClusterDistributionPlotProps) {
  const data = distribution.map(({ week, ...rest }) => {
    const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
    return { week: weekSec, ...rest }
  })

  const getValueOrig = (country: string) => (value: ClusterDistributionDatum) => {
    const orig = get(value.orig, country, false)
    if (orig) {
      return get(value.frequencies, country)
    }

    return undefined
  }

  const getValueInterp = (country: string) => (value: ClusterDistributionDatum) => {
    const interp = get(value.interp, country, false)
    if (interp) {
      return get(value.frequencies, country)
    }

    return undefined
  }

  return (
    <ChartContainerOuter>
      <ChartContainerInner>
        <ResponsiveContainer aspect={theme.plot.aspectRatio}>
          <LineChart margin={theme.plot.margin} data={data}>
            <XAxis
              dataKey="week"
              tickFormatter={formatDate}
              domain={timeDomain}
              tick={theme.plot.tickStyle}
              allowDataOverflow
            />
            <YAxis tickFormatter={formatProportion} domain={[0, 1]} tick={theme.plot.tickStyle} allowDataOverflow />
            <Tooltip
              content={ClusterDistributionPlotTooltip}
              isAnimationActive={false}
              allowEscapeViewBox={{ x: false, y: true }}
              offset={50}
            />
            {country_names.map((country, i) => (
              <Line
                key={country}
                type="monotone"
                name={country}
                dataKey={getValueOrig(country)}
                stroke={getCountryColor(country)}
                strokeWidth={1.5}
                strokeDasharray={lineStyleToStrokeDashArray(getCountryStyle(country).ls)}
                dot={false}
                isAnimationActive={false}
              />
            ))}

            {country_names.map((country, i) => (
              <Line
                key={`${country}_interp`}
                type="monotone"
                name={country}
                dataKey={getValueInterp(country)}
                stroke={getCountryColor(country)}
                strokeWidth={1.5}
                strokeDasharray="3 3"
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
