/* eslint-disable camelcase */
import React, { CSSProperties, useMemo, useRef } from 'react'

import dynamic from 'next/dynamic'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts'
import { DateTime } from 'luxon'
import ReactResizeDetector from 'react-resize-detector'

import type { PerCountryCasesDistributionDatum } from 'src/io/getPerCountryCasesData'
import { ticks, timeDomain } from 'src/io/getParams'
import { getClusterColor } from 'src/io/getClusters'
import { formatDateHumanely } from 'src/helpers/format'
import { adjustTicks } from 'src/helpers/adjustTicks'
import { PlotPlaceholder } from 'src/components/Common/PlotPlaceholder'
import { ChartContainerOuter, ChartContainerInner } from 'src/components/Common/PlotLayout'
import { useTheme } from 'styled-components'
import { CasesPlotTooltip } from './CasesPlotTooltip'

const CHART_MARGIN = { left: 10, top: 12, bottom: 6, right: 12 }
const ALLOW_ESCAPE_VIEW_BOX = { x: false, y: true }

export interface CasesPlotProps {
  cluster_names: string[]
  distribution: PerCountryCasesDistributionDatum[]
}

export function CasesPlotComponent({ cluster_names, distribution }: CasesPlotProps) {
  const theme = useTheme()
  const chartRef = useRef(null)

  const data = distribution.map(({ week, stand_total_cases, stand_estimated_cases }) => {
    const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
    return { week: weekSec, ...stand_estimated_cases, total: stand_total_cases }
  })

  const yAxisLabelStyle: CSSProperties = useMemo(
    () => ({
      textAnchor: 'middle',
      fontSize: '80%',
      fill: theme.gray800,
    }),
    [theme],
  )

  return (
    <ChartContainerOuter>
      <ChartContainerInner>
        <ReactResizeDetector handleWidth refreshRate={300} refreshMode="debounce">
          {({ width }: { width?: number }) => {
            const adjustedTicks = adjustTicks(ticks, width ?? 0, theme.plot.tickWidthMin).slice(1) // slice ensures first tick is not outside domain
            return (
              <ResponsiveContainer aspect={theme.plot.aspectRatio} debounce={0}>
                <AreaChart margin={CHART_MARGIN} data={data} ref={chartRef}>
                  <XAxis
                    dataKey="week"
                    type="number"
                    tickFormatter={formatDateHumanely}
                    domain={timeDomain}
                    ticks={adjustedTicks}
                    tick={theme.plot.tickStyle}
                    tickMargin={theme.plot.tickMargin?.x}
                    allowDataOverflow
                  />
                  <YAxis
                    type="number"
                    name="Cases per million"
                    tick={theme.plot.tickStyle}
                    tickMargin={theme.plot.tickMargin?.y}
                    allowDataOverflow
                  >
                    <Label
                      style={yAxisLabelStyle}
                      position="insideLeft"
                      offset={0}
                      angle={270}
                      value={'Cases per million people'}
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

                  <CartesianGrid stroke={theme.plot.cartesianGrid.stroke} />

                  <Tooltip
                    content={CasesPlotTooltip}
                    isAnimationActive={false}
                    allowEscapeViewBox={ALLOW_ESCAPE_VIEW_BOX}
                    offset={50}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )
          }}
        </ReactResizeDetector>
      </ChartContainerInner>
    </ChartContainerOuter>
  )
}

export const CasesPlot = dynamic(() => Promise.resolve(CasesPlotComponent), {
  ssr: false,
  loading: PlotPlaceholder,
})
