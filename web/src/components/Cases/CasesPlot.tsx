/* eslint-disable camelcase */
import React, { CSSProperties, useMemo } from 'react'

import dynamic from 'next/dynamic'
import { Area, CartesianGrid, Label, Tooltip, XAxis, YAxis } from 'recharts'
import { DateTime } from 'luxon'

import { useTheme } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { CasesPlotTooltip } from './CasesPlotTooltip'
import type { PerCountryCasesDistributionDatum } from 'src/io/getPerCountryCasesData'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { CLUSTER_NAME_OTHERS } from 'src/io/getClusters'
import { formatDateHumanely } from 'src/helpers/format'
import { adjustTicks } from 'src/helpers/adjustTicks'
import { PlotPlaceholder } from 'src/components/Common/PlotPlaceholder'
import { ChartContainer } from 'src/components/Common/ChartContainer'
import { ticksSelector, timeDomainSelector } from 'src/state/Params'
import { getClusterColorsSelector } from 'src/state/Clusters'

import { ChartWithZoom } from 'src/components/Common/ChartWithZoom'

const CHART_MARGIN = { left: 10, top: 12, bottom: 6, right: 12 }
const ALLOW_ESCAPE_VIEW_BOX = { x: false, y: true }

export interface CasesPlotProps {
  cluster_names: string[]
  distribution: PerCountryCasesDistributionDatum[]
}

const ZOOM_ATOM_ID = 'cases'

export function CasesPlotComponent({ cluster_names, distribution }: CasesPlotProps) {
  const { t } = useTranslationSafe()
  const theme = useTheme()
  const getClusterColor = useRecoilValue(getClusterColorsSelector)

  const ticks = useRecoilValue(ticksSelector(ZOOM_ATOM_ID))
  const timeDomain = useRecoilValue(timeDomainSelector(ZOOM_ATOM_ID))

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
    <ChartContainer>
      {({ width, height }) => {
        const adjustedTicks = adjustTicks(ticks, width ?? 0, theme.plot.tickWidthMin).slice(1) // slice ensures first tick is not outside domain
        return (
          <ChartWithZoom type="area" zoomAtomId="cases" width={width} height={height} margin={CHART_MARGIN} data={data}>
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

            <Tooltip
              content={CasesPlotTooltip}
              isAnimationActive={false}
              allowEscapeViewBox={ALLOW_ESCAPE_VIEW_BOX}
              offset={50}
            />
          </ChartWithZoom>
        )
      }}
    </ChartContainer>
  )
}

export const CasesPlot = dynamic(() => Promise.resolve(CasesPlotComponent), {
  ssr: false,
  loading: PlotPlaceholder,
})
