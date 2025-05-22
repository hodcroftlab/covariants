/* eslint-disable camelcase */
import React, { useMemo } from 'react'

import { Area, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'

import { useRecoilValue } from 'recoil'
import { CountryDistributionPlotTooltip } from './CountryDistributionPlotTooltip'
import type { CountryDistributionDatum } from 'src/io/getPerCountryData'
import { theme } from 'src/theme'
import { CLUSTER_NAME_OTHERS } from 'src/io/getClusters'
import { formatDateHumanely, formatProportion } from 'src/helpers/format'
import { adjustTicks } from 'src/helpers/adjustTicks'
import { ChartContainer } from 'src/components/Common/ChartContainer'
import { ticksSelector, timeDomainSelector } from 'src/state/Params'
import { getClusterColorsSelector } from 'src/state/Clusters'
import { ChartWithZoom } from 'src/components/Common/ChartWithZoom'

const allowEscapeViewBox = { x: false, y: true }

export interface AreaPlotProps {
  width?: number
  height?: number
  cluster_names: string[]
  distribution: CountryDistributionDatum[]
}

const ZOOM_ATOM_ID = 'perCountry'

function AreaPlot({ width, height, cluster_names, distribution }: AreaPlotProps) {
  const getClusterColor = useRecoilValue(getClusterColorsSelector)
  const ticks = useRecoilValue(ticksSelector(ZOOM_ATOM_ID))
  const timeDomain = useRecoilValue(timeDomainSelector(ZOOM_ATOM_ID))

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
  }, [ticks, width, timeDomain])

  return (
    <ChartWithZoom
      type="area"
      zoomAtomId={ZOOM_ATOM_ID}
      margin={theme.plot.margin}
      data={data}
      stackOffset="expand"
      width={width}
      height={height}
      zoomWindowColor={theme.white}
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
    </ChartWithZoom>
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
