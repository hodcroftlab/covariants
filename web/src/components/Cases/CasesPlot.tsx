/* eslint-disable camelcase */
import React, { CSSProperties, useMemo, useRef } from 'react'

import dynamic from 'next/dynamic'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label, ReferenceArea } from 'recharts'
import { DateTime } from 'luxon'

import type { PerCountryCasesDistributionDatum } from 'src/io/getPerCountryCasesData'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { CLUSTER_NAME_OTHERS, getClusterColor } from 'src/io/getClusters'
import { formatDateHumanely } from 'src/helpers/format'
import { PlotPlaceholder } from 'src/components/Common/PlotPlaceholder'
import { ChartContainer } from 'src/components/Common/ChartContainer'
import { useTheme } from 'styled-components'
import { useRecoilState } from 'recoil'
import { dateFilterAtom } from 'src/state/DateFilter'
import { useDateFilter } from 'src/helpers/useDateFilter'
import { useZoomArea, zoomAreaStyleProps } from 'src/helpers/useZoomArea'
import { CasesPlotTooltip } from './CasesPlotTooltip'

const CHART_MARGIN = { left: 10, top: 12, bottom: 6, right: 12 }
const ALLOW_ESCAPE_VIEW_BOX = { x: false, y: true }

export interface CasesPlotProps {
  cluster_names: string[]
  distribution: PerCountryCasesDistributionDatum[]
}

export interface CasesPlotComponentProps {
  width: number
  height: number
}

export function CasesPlotComponent({
  width,
  height,
  cluster_names,
  distribution,
}: CasesPlotProps & CasesPlotComponentProps) {
  const { t } = useTranslationSafe()
  const theme = useTheme()
  const chartRef = useRef(null)

  const data = distribution.map(({ week, stand_total_cases, stand_estimated_cases }) => {
    const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
    return { week: weekSec, ...stand_estimated_cases, total: stand_total_cases, maxY: stand_total_cases }
  })

  const initialDomainY = data.reduce(
    (memo, d) => {
      return [0, Math.max(memo[1], d.maxY)]
    },
    [0, 0],
  )

  const [dateFilter, setDateFilter] = useRecoilState(dateFilterAtom)
  const { domainX, domainY, ticks } = useDateFilter(dateFilter, data, width, initialDomainY)
  const { handleMouseDown, handleMouseMove, handleMouseUp, style, zoomArea } = useZoomArea(setDateFilter)

  const yAxisLabelStyle: CSSProperties = useMemo(
    () => ({
      textAnchor: 'middle',
      fontSize: '80%',
      fill: theme.gray800,
      userSelect: 'none',
    }),
    [theme],
  )

  return (
    <AreaChart
      width={width}
      height={height}
      margin={CHART_MARGIN}
      data={data}
      ref={chartRef}
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
        name="Cases per million"
        domain={domainY}
        tick={theme.plot.tickStyle}
        tickMargin={theme.plot.tickMargin?.y}
        allowDataOverflow
      >
        <Label
          style={yAxisLabelStyle}
          position="insideLeft"
          offset={0}
          angle={270}
          value={t('Cases per million people')}
        />
      </YAxis>

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

      {zoomArea && (
        <ReferenceArea x1={zoomArea[0]} x2={zoomArea[1]} y1={domainY[0]} y2={domainY[1]} {...zoomAreaStyleProps} />
      )}

      {!zoomArea && (
        <Tooltip
          content={CasesPlotTooltip}
          isAnimationActive={false}
          allowEscapeViewBox={ALLOW_ESCAPE_VIEW_BOX}
          offset={50}
        />
      )}
    </AreaChart>
  )
}

function CasesPlotContainer(props: CasesPlotProps) {
  return (
    <ChartContainer>
      {({ width, height }) => <CasesPlotComponent width={width} height={height} {...props} />}
    </ChartContainer>
  )
}

export const CasesPlot = dynamic(() => Promise.resolve(CasesPlotContainer), {
  ssr: false,
  loading: PlotPlaceholder,
})
