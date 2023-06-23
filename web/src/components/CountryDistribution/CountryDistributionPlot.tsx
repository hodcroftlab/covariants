/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from 'recharts'
import { DateTime } from 'luxon'

import type { CountryDistributionDatum } from 'src/io/getPerCountryData'
import { theme } from 'src/theme'
import { CLUSTER_NAME_OTHERS, getClusterColor } from 'src/io/getClusters'
import { formatDateHumanely, formatProportion } from 'src/helpers/format'
import { ChartContainer } from 'src/components/Common/ChartContainer'
import { useRecoilState } from 'recoil'
import { dateFilterAtom } from 'src/state/DateFilter'
import { useDateFilter } from 'src/helpers/useDateFilter'
import { useZoomArea, zoomAreaStyleProps } from 'src/helpers/useZoomArea'
import { CountryDistributionPlotTooltip } from './CountryDistributionPlotTooltip'

const allowEscapeViewBox = { x: false, y: true }

export interface AreaPlotProps {
  width?: number
  height?: number
  cluster_names: string[]
  distribution: CountryDistributionDatum[]
}

function AreaPlot({ width, height, cluster_names, distribution }: AreaPlotProps) {
  const data = useMemo(
    () =>
      distribution.map(({ week, total_sequences, cluster_counts }) => {
        const total_cluster_sequences = Object.values(cluster_counts) // prettier-ignore
          .reduce<number>((result, count = 0) => result + (count ?? 0), 0)

        const others = total_sequences - total_cluster_sequences
        const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
        return {
          week: weekSec,
          ...cluster_counts,
          others,
          total: total_sequences,
          maxY: total_cluster_sequences / total_sequences,
        }
      }),
    [distribution],
  )

  const [dateFilter, setDateFilter] = useRecoilState(dateFilterAtom)
  const { domainX, domainY, ticks } = useDateFilter(dateFilter, data, width)
  const { handleMouseDown, handleMouseMove, handleMouseUp, isZooming, style, zoomArea } = useZoomArea(setDateFilter)

  return (
    <AreaChart
      margin={theme.plot.margin}
      data={data}
      stackOffset="expand"
      width={width}
      height={height}
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

      {cluster_names.map((cluster) => (
        <Area
          key={cluster}
          type="monotone"
          dataKey={cluster}
          stackId="1"
          stroke="none"
          fill={getClusterColor(cluster)}
          fillOpacity={1}
          isAnimationActive={false}
          // animationDuration={500}
        />
      ))}

      <Area
        type="monotone"
        dataKey={CLUSTER_NAME_OTHERS}
        stackId="1"
        stroke="none"
        fill={theme.clusters.color.others}
        fillOpacity={1}
        isAnimationActive={false}
        // animationDuration={500}
      />

      <CartesianGrid stroke={theme.plot.cartesianGrid.stroke} />

      {zoomArea && isZooming && (
        <ReferenceArea x1={zoomArea[0]} x2={zoomArea[1]} y1={domainY[0]} y2={domainY[1]} {...zoomAreaStyleProps} />
      )}

      {!isZooming && (
        <Tooltip
          content={CountryDistributionPlotTooltip}
          isAnimationActive={false}
          allowEscapeViewBox={allowEscapeViewBox}
          offset={50}
        />
      )}
    </AreaChart>
  )
}

export interface CountryDistributionPlotProps {
  cluster_names: string[]
  distribution: CountryDistributionDatum[]
}

export function CountryDistributionPlot({ cluster_names, distribution }: CountryDistributionPlotProps) {
  return (
    <ChartContainer>
      {({ width, height }) => (
        <AreaPlot width={width} height={height} cluster_names={cluster_names} distribution={distribution} />
      )}
    </ChartContainer>
  )
}
