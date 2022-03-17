/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import { get } from 'lodash'
import { DateTime } from 'luxon'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from 'styled-components'
import { useResizeDetector } from 'react-resize-detector'

import { ticks, timeDomain } from 'src/io/getParams'
import { getCountryColor, getCountryStrokeDashArray } from 'src/io/getCountryColor'
import { formatDateHumanely, formatProportion } from 'src/helpers/format'
import { adjustTicks } from 'src/helpers/adjustTicks'
import type { ClusterDistributionDatum } from 'src/io/getPerClusterData'
import { ClusterDistributionPlotTooltip } from 'src/components/ClusterDistribution/ClusterDistributionPlotTooltip'
import { ChartContainerInner, ChartContainerOuter } from 'src/components/Common/PlotLayout'

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

const allowEscapeViewBox = { x: false, y: true }

interface LinePlotProps {
  width?: number
  country_names: string[]
  distribution: ClusterDistributionDatum[]
}

function LinePlot({ width, country_names, distribution }: LinePlotProps) {
  const theme = useTheme()

  const data = useMemo(
    () =>
      distribution.map(({ week, ...rest }) => {
        const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
        return { week: weekSec, ...rest }
      }),
    [distribution],
  )

  const { adjustedTicks, domainX, domainY } = useMemo(() => {
    const adjustedTicks = adjustTicks(ticks, width ?? 0, theme.plot.tickWidthMin)
    const domainX = [adjustedTicks[0], timeDomain[1]]
    const domainY = [0, 1]
    return { adjustedTicks, domainX, domainY }
  }, [theme.plot.tickWidthMin, width])

  const lines = useMemo(() => {
    const linesOrig = country_names.map((country) => (
      <Line
        key={country}
        type="monotone"
        name={country}
        dataKey={getValueOrig(country)}
        stroke={getCountryColor(country)}
        strokeWidth={2}
        strokeDasharray={getCountryStrokeDashArray(country)}
        dot={false}
        isAnimationActive={false}
      />
    ))

    const linesInterp = country_names.map((country) => (
      <Line
        key={`${country}_interp`}
        type="monotone"
        name={country}
        dataKey={getValueInterp(country)}
        stroke={getCountryColor(country)}
        strokeWidth={1.2}
        strokeDasharray="1 2"
        dot={false}
        isAnimationActive={false}
      />
    ))

    return [...linesOrig, linesInterp]
  }, [country_names])

  return (
    <ResponsiveContainer aspect={theme.plot.aspectRatio}>
      <LineChart margin={theme.plot.margin} data={data}>
        <XAxis
          dataKey="week"
          type="number"
          tickFormatter={formatDateHumanely}
          domain={domainX}
          ticks={adjustedTicks}
          tick={theme.plot.tickStyle}
          tickMargin={theme.plot.tickMargin?.x}
          allowDataOverflow
        />
        <YAxis
          type="number"
          tickFormatter={formatProportion}
          domain={domainY}
          tick={theme.plot.tickStyle}
          tickMargin={theme.plot.tickMargin?.y}
          allowDataOverflow
        />
        <Tooltip
          content={ClusterDistributionPlotTooltip}
          isAnimationActive={false}
          allowEscapeViewBox={allowEscapeViewBox}
          offset={50}
        />

        <CartesianGrid stroke="#2222" />

        {lines}
      </LineChart>
    </ResponsiveContainer>
  )
}

export interface ClusterDistributionPlotProps {
  country_names: string[]
  distribution: ClusterDistributionDatum[]
}

export function ClusterDistributionPlot({ country_names, distribution }: ClusterDistributionPlotProps) {
  const { ref, width } = useResizeDetector({ handleWidth: true })

  return (
    <ChartContainerOuter ref={ref}>
      <ChartContainerInner>
        <LinePlot width={width} country_names={country_names} distribution={distribution} />
      </ChartContainerInner>
    </ChartContainerOuter>
  )
}
