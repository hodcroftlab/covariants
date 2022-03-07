/* eslint-disable camelcase */
import React, { useRef } from 'react'

import dynamic from 'next/dynamic'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DateTime } from 'luxon'
import ReactResizeDetector from 'react-resize-detector'

import type { PerCountryCasesDistributionDatum } from 'src/io/getPerCountryCasesData'
import { theme } from 'src/theme'
import { ticks, timeDomain } from 'src/io/getParams'
import { CLUSTER_NAME_OTHERS, getClusterColor } from 'src/io/getClusters'
import { formatDateHumanely, formatProportion } from 'src/helpers/format'
import { adjustTicks } from 'src/helpers/adjustTicks'
import { PlotPlaceholder } from 'src/components/Common/PlotPlaceholder'
import { ChartContainerOuter, ChartContainerInner } from 'src/components/Common/PlotLayout'
import { CasesPlotTooltip } from './CasesPlotTooltip'

export interface CasesPlotProps {
  cluster_names: string[]
  distribution: PerCountryCasesDistributionDatum[]
}

export function CasesPlotComponent({ cluster_names, distribution }: CasesPlotProps) {
  const chartRef = useRef(null)

  const data = distribution.map(({ week, total_cases, estimated_cases }) => {
    const totalCasesWithKnownVariant = Object.values(estimated_cases) // prettier-ignore
      .reduce<number>((result, count = 0) => result + (count ?? 0), 0)

    const others = total_cases - totalCasesWithKnownVariant
    const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
    return { week: weekSec, ...estimated_cases, others, total: total_cases }
  })

  return (
    <ChartContainerOuter>
      <ChartContainerInner>
        <ReactResizeDetector handleWidth refreshRate={300} refreshMode="debounce">
          {({ width }: { width?: number }) => {
            const adjustedTicks = adjustTicks(ticks, width ?? 0, theme.plot.tickWidthMin).slice(1) // slice ensures first tick is not outside domain
            return (
              <ResponsiveContainer aspect={theme.plot.aspectRatio} debounce={0}>
                <AreaChart margin={theme.plot.margin} data={data} stackOffset="expand" ref={chartRef}>
                  <XAxis
                    dataKey="week"
                    type="number"
                    tickFormatter={formatDateHumanely}
                    domain={[timeDomain[0], timeDomain[1]]}
                    ticks={adjustedTicks}
                    tick={theme.plot.tickStyle}
                    tickMargin={theme.plot.tickMargin?.x}
                    allowDataOverflow
                  />
                  <YAxis
                    type="number"
                    tickFormatter={formatProportion}
                    domain={[0, 1]}
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
                    content={CasesPlotTooltip}
                    isAnimationActive={false}
                    allowEscapeViewBox={{ x: false, y: true }}
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
