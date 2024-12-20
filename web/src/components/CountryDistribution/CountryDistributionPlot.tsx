/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { DateTime } from 'luxon'

import { CountryDistributionPlotTooltip } from './CountryDistributionPlotTooltip'
import type { CountryDistributionDatum } from 'src/io/getPerCountryData'
import { theme } from 'src/theme'
import { CLUSTER_NAME_OTHERS, getClusterColor } from 'src/io/getClusters'
import { formatDateHumanely, formatProportion } from 'src/helpers/format'
import { adjustTicks } from 'src/helpers/adjustTicks'
import { ChartContainer } from 'src/components/Common/ChartContainer'
import { Ticks, TimeDomain } from 'src/io/useParams'

const allowEscapeViewBox = { x: false, y: true }

export interface AreaPlotProps {
  width?: number
  height?: number
  cluster_names: string[]
  distribution: CountryDistributionDatum[]
  ticks: Ticks
  timeDomain: TimeDomain
}

function AreaPlot({ width, height, cluster_names, distribution, ticks, timeDomain }: AreaPlotProps) {
  const data = useMemo(
    () =>
      distribution.map(({ week, total_sequences, cluster_counts }) => {
        const total_cluster_sequences = Object.values(cluster_counts) // prettier-ignore
          .reduce<number>((result, count = 0) => result + (count ?? 0), 0)

        const others = total_sequences - total_cluster_sequences
        const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
        return { week: weekSec, ...cluster_counts, others, total: total_sequences }
      }),
    [distribution],
  )

  const { adjustedTicks, domainX, domainY } = useMemo(() => {
    const adjustedTicks = adjustTicks(ticks, width ?? 0, theme.plot.tickWidthMin).slice(1) // slice ensures first tick is not outside domain
    const domainX = [timeDomain[0], timeDomain[1]]
    const domainY = [0, 1]
    return { adjustedTicks, domainX, domainY }
  }, [width, ticks, timeDomain])

  return (
    <AreaChart margin={theme.plot.margin} data={data} stackOffset="expand" width={width} height={height}>
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
      />

      <CartesianGrid stroke={theme.plot.cartesianGrid.stroke} />

      <Tooltip
        content={CountryDistributionPlotTooltip}
        isAnimationActive={false}
        allowEscapeViewBox={allowEscapeViewBox}
        offset={50}
      />
    </AreaChart>
  )
}

export interface CountryDistributionPlotProps {
  cluster_names: string[]
  distribution: CountryDistributionDatum[]
  ticks: Ticks
  timeDomain: TimeDomain
}

export function CountryDistributionPlot({
  cluster_names,
  distribution,
  ticks,
  timeDomain,
}: CountryDistributionPlotProps) {
  return (
    <ChartContainer>
      {({ width, height }) => (
        <AreaPlot
          width={width}
          height={height}
          cluster_names={cluster_names}
          distribution={distribution}
          ticks={ticks}
          timeDomain={timeDomain}
        />
      )}
    </ChartContainer>
  )
}
