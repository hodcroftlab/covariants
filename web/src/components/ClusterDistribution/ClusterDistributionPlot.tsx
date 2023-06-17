/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import { get } from 'lodash'
import { DateTime } from 'luxon'
import { CartesianGrid, Line, LineChart, ReferenceArea, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from 'styled-components'
import { useRecoilState } from 'recoil'

import { getCountryColor, getCountryStrokeDashArray } from 'src/io/getCountryColor'
import { formatDateHumanely, formatProportion } from 'src/helpers/format'
import type { ClusterDistributionDatum } from 'src/io/getPerClusterData'
import { ClusterDistributionPlotTooltip } from 'src/components/ClusterDistribution/ClusterDistributionPlotTooltip'
import { ChartContainer } from 'src/components/Common/ChartContainer'
import { dateFilterAtom } from 'src/state/DateFilter'
import { useDateFilter } from 'src/helpers/useDateFilter'
import { useZoomArea, zoomAreaStyleProps } from 'src/helpers/useZoomArea'

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
  width: number
  height: number
  country_names: string[]
  distribution: ClusterDistributionDatum[]
}

function LinePlot({ width, height, country_names, distribution }: LinePlotProps) {
  const theme = useTheme()

  const data = useMemo(
    () =>
      distribution.map(({ week, ...rest }) => {
        const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
        const maxY = Object.values(rest.frequencies).reduce<number>((y, max = 0) => Math.max(y, max), 0)
        return {
          week: weekSec,
          maxY,
          ...rest,
        }
      }),
    [distribution],
  )

  const [dateFilter, setDateFilter] = useRecoilState(dateFilterAtom)
  const { domainX, domainY, ticks } = useDateFilter(dateFilter, data, width)
  const { handleMouseDown, handleMouseMove, handleMouseUp, style, zoomArea } = useZoomArea(setDateFilter)

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
    <LineChart
      width={width}
      height={height}
      margin={theme.plot.margin}
      data={data}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <XAxis
        dataKey="week"
        type="number"
        tickFormatter={formatDateHumanely}
        domain={domainX}
        ticks={ticks}
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

      {lines}

      <CartesianGrid stroke="#2222" />

      {zoomArea && (
        <ReferenceArea x1={zoomArea[0]} x2={zoomArea[1]} y1={domainY[0]} y2={domainY[1]} {...zoomAreaStyleProps} />
      )}

      {!zoomArea && (
        <Tooltip
          content={ClusterDistributionPlotTooltip}
          isAnimationActive={false}
          allowEscapeViewBox={allowEscapeViewBox}
          offset={50}
        />
      )}
    </LineChart>
  )
}

export interface ClusterDistributionPlotProps {
  country_names: string[]
  distribution: ClusterDistributionDatum[]
}

export function ClusterDistributionPlot({ country_names, distribution }: ClusterDistributionPlotProps) {
  return (
    <ChartContainer>
      {({ width, height }) => (
        <LinePlot width={width} height={height} country_names={country_names} distribution={distribution} />
      )}
    </ChartContainer>
  )
}
