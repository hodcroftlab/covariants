/* eslint-disable camelcase */
import React, { useCallback, useMemo, useState } from 'react'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from 'recharts'
import { DateTime } from 'luxon'

import type { CountryDistributionDatum } from 'src/io/getPerCountryData'
import { theme } from 'src/theme'
import { getTicks, timeDomain } from 'src/io/getParams'
import { CLUSTER_NAME_OTHERS, getClusterColor } from 'src/io/getClusters'
import { formatDateHumanely, formatProportion } from 'src/helpers/format'
import { adjustTicks } from 'src/helpers/adjustTicks'
import { ChartContainer } from 'src/components/Common/ChartContainer'
import { useRecoilState } from 'recoil'
import { dateFilterAtom } from 'src/state/DateFilter'
import { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart'
import { CountryDistributionPlotTooltip } from './CountryDistributionPlotTooltip'

const allowEscapeViewBox = { x: false, y: true }

export interface AreaPlotProps {
  width?: number
  height?: number
  cluster_names: string[]
  distribution: CountryDistributionDatum[]
}

const hoverStyle = { cursor: 'cell' }

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
          total_clusters_pct: total_cluster_sequences / total_sequences,
        }
      }),
    [distribution],
  )

  const [zoomArea, setZoomArea] = useState<[number, number] | undefined>()
  const [dateFilter, setDateFilter] = useRecoilState(dateFilterAtom)
  // const [selectedArea, setSelectedArea] = useState<[number, number] | undefined>()
  const [hovering, setHovering] = useState(false)

  const { adjustedTicks, domainX, domainY } = useMemo(() => {
    const ticks = getTicks(dateFilter || timeDomain)
    const adjustedTicks = adjustTicks(ticks, width ?? 0, theme.plot.tickWidthMin).slice(1) // slice ensures first tick is not outside domain
    const domainX = [timeDomain[0], timeDomain[1]]
    const domainY = [0, 1]
    return { adjustedTicks, domainX, domainY }
  }, [width, dateFilter])

  const calculatedDomainY = useMemo(() => {
    if (dateFilter) {
      let max = 0
      data.forEach((d) => {
        if (d.week >= dateFilter[0] && d.week <= dateFilter[1]) {
          max = Math.max(max, d.total_clusters_pct)
        }
      })
      return [0, Math.min(1, max + max * 0.1)]
    }
    return domainY
  }, [data, dateFilter, domainY])

  const handleMouseDown = useCallback<CategoricalChartFunc>((e) => {
    if (e && e.activeLabel) {
      const value = Number.parseFloat(e.activeLabel)
      setZoomArea([value, value])
    }
  }, [])

  const handleMouseMove = useCallback<CategoricalChartFunc>(
    (e) => {
      if (e && e.activeLabel) {
        setHovering(true)
        if (zoomArea) {
          const value = Number.parseFloat(e.activeLabel)
          setZoomArea([zoomArea[0], value])
        }
      } else {
        setHovering(false)
      }
    },
    [zoomArea],
  )

  const handleMouseUp = useCallback<CategoricalChartFunc>(() => {
    if (zoomArea) {
      if (zoomArea[0] !== zoomArea[1]) {
        setDateFilter(zoomArea[0] < zoomArea[1] ? zoomArea : [zoomArea[1], zoomArea[0]])
      }
      setZoomArea(undefined)
    }
  }, [zoomArea, setDateFilter])

  return (
    <AreaChart
      margin={theme.plot.margin}
      data={data}
      stackOffset="expand"
      width={width}
      height={height}
      style={hovering ? hoverStyle : null}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <XAxis
        dataKey="week"
        type="number"
        tickFormatter={formatDateHumanely}
        domain={dateFilter || domainX}
        ticks={adjustedTicks}
        tick={theme.plot.tickStyle}
        tickMargin={theme.plot.tickMargin?.x}
        allowDataOverflow
      />
      <YAxis
        type="number"
        tickFormatter={formatProportion}
        domain={calculatedDomainY}
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

      {zoomArea && (
        <ReferenceArea
          x1={zoomArea[0]}
          x2={zoomArea[1]}
          y1={calculatedDomainY[0]}
          y2={calculatedDomainY[1]}
          fill={theme.black}
          fillOpacity={0.25}
        />
      )}

      {!zoomArea && (
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
