/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import get from 'lodash/get'
import { DateTime } from 'luxon'
import { CartesianGrid, Line, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from 'styled-components'

import { useRecoilValue } from 'recoil'
import { formatDateHumanely, formatProportion } from 'src/helpers/format'
import { adjustTicks } from 'src/helpers/adjustTicks'
import type { ClusterDistributionDatum } from 'src/io/getPerClusterData'
import { ClusterDistributionPlotTooltip } from 'src/components/ClusterDistribution/ClusterDistributionPlotTooltip'
import { ChartContainer } from 'src/components/Common/ChartContainer'
import { ticksSelector, timeDomainSelector } from 'src/state/Params'
import { getCountryStylesSelector } from 'src/state/CountryStyles'

import { ChartWithZoom } from 'src/components/Common/ChartWithZoom'

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

const ZOOM_ATOM_ID = 'perVariant'

function LinePlot({ width, height, country_names, distribution }: LinePlotProps) {
  const theme = useTheme()
  const getCountryStyle = useRecoilValue(getCountryStylesSelector)

  const ticks = useRecoilValue(ticksSelector(ZOOM_ATOM_ID))
  const timeDomain = useRecoilValue(timeDomainSelector(ZOOM_ATOM_ID))

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
  }, [theme.plot.tickWidthMin, width, ticks, timeDomain])

  const lines = useMemo(() => {
    const linesOrig = country_names.map((country) => (
      <Line
        key={country}
        type="monotone"
        name={country}
        dataKey={getValueOrig(country)}
        stroke={getCountryStyle(country).color}
        strokeWidth={2}
        strokeDasharray={getCountryStyle(country).strokeDashArray}
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
        stroke={getCountryStyle(country).color}
        strokeWidth={1.2}
        strokeDasharray="1 2"
        dot={false}
        isAnimationActive={false}
      />
    ))

    return [...linesOrig, linesInterp]
  }, [country_names, getCountryStyle])

  return (
    <ChartWithZoom
      type="line"
      zoomAtomId="perVariant"
      width={width}
      height={height}
      margin={theme.plot.margin}
      data={data}
      zoomWindowColor={theme.gray500}
    >
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

      <CartesianGrid stroke={theme.plot.cartesianGrid.stroke} />

      {lines}
    </ChartWithZoom>
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
