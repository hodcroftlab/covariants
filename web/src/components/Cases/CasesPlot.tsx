/* eslint-disable camelcase */
import React, { CSSProperties, useCallback, useMemo, useRef } from 'react'

import dynamic from 'next/dynamic'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts'
import { DateTime } from 'luxon'
import ReactResizeDetector from 'react-resize-detector'

import type { PerCountryCasesDistributionDatum } from 'src/io/getPerCountryCasesData'
import { ticks, timeDomain } from 'src/io/getParams'
import { formatDateHumanely } from 'src/helpers/format'
import { adjustTicks } from 'src/helpers/adjustTicks'
import { PlotPlaceholder } from 'src/components/Common/PlotPlaceholder'
import { useTheme } from 'styled-components'
import { CasesPlotTooltip } from './CasesPlotTooltip'

/* eslint-disable camelcase */
import type { EChartsOption, LineSeriesOption } from 'echarts'
import type { Opts } from 'echarts-for-react/lib/types'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import { LineChart } from 'echarts/charts'
import {
  AxisPointerComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  GridComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { get, sortBy } from 'lodash'
import { PlotTooltipDatum, renderCasesPlotTooltip } from 'src/components/Cases/CasesPlotTooltip'

import { useResizeDetector } from 'react-resize-detector'
import { ChartContainerInner, ChartContainerOuter } from 'src/components/Common/PlotLayout'
import { CLUSTER_NAME_OTHERS, getClusterColor } from 'src/io/getClusters'
import { theme } from 'src/theme'

echarts.use([
  AxisPointerComponent,
  CanvasRenderer,
  DataZoomComponent,
  DataZoomInsideComponent,
  GridComponent,
  LineChart,
  TooltipComponent,
])

const chartConfig: EChartsOption = {
  animation: false,
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'line' },
    formatter: (data) => renderCasesPlotTooltip(data as unknown as PlotTooltipDatum[]),
  },
  grid: {
    top: '5px',
    left: '20px',
    right: '10px',
    bottom: '10px',
    containLabel: true,
  },
  xAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: true,
      lineStyle: {
        width: 1,
        color: theme.gray700,
        opacity: 0.5,
        type: 'solid',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: theme.gray700,
        opacity: 0.2,
        type: 'solid',
      },
    },
    type: 'time',
    zlevel: 10000,
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      show: true,
      lineStyle: {
        width: 1,
        color: theme.gray700,
        opacity: 0.5,
        type: 'solid',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: theme.gray700,
        opacity: 0.2,
        type: 'solid',
      },
    },
    type: 'value',
    min: 0,
    zlevel: 10000,
  },
  dataZoom: [
    {
      type: 'inside',
      id: 'insideX',
      xAxisIndex: 0,
      filterMode: 'none',
      zoomOnMouseWheel: 'shift',
      moveOnMouseMove: true,
    },
  ],
}

const seriesConfig: LineSeriesOption = {
  type: 'line',
  stack: 'y',
  zlevel: 1,
  areaStyle: { opacity: 1 },
  smooth: true,
  lineStyle: { width: 0 },
  showSymbol: false,
}

export interface AreaPlotProps {
  width: number
  cluster_names: string[]
  distribution: PerCountryCasesDistributionDatum[]
}

function AreaPlot({ width, cluster_names: clusterNames, distribution }: AreaPlotProps) {
  const onChartReady = useCallback(() => {}, [])
  const opts: Opts = useMemo(() => ({ width, renderer: 'canvas' }), [width])

  const { xMin, series } = useMemo(() => {
    const seriesMap = Object.fromEntries(
      clusterNames.map((clusterName) => {
        const data = distribution.map(({ week, stand_estimated_cases, stand_total_cases }) => {
          const timestamp = DateTime.fromFormat(week, 'yyyy-MM-dd').toUTC().toMillis()
          const count = get(stand_estimated_cases, clusterName) ?? 0
          const frequency = count / stand_total_cases
          return [timestamp, count, frequency]
        })

        return [
          clusterName,
          {
            ...seriesConfig,
            name: clusterName,
            areaStyle: {
              ...seriesConfig.areaStyle,
              color: getClusterColor(clusterName),
            },
            data,
          },
        ]
      }),
    )

    const series = Object.values(seriesMap)

    // Add data for "others" (unknown variants)
    const data = distribution.map(({ week, stand_estimated_cases, stand_total_cases }) => {
      const timestamp = DateTime.fromFormat(week, 'yyyy-MM-dd').toUTC().toMillis()
      const total_variant_cases = Object.values(stand_estimated_cases) // prettier-ignore
        .reduce<number>((result, count = 0) => result + (count ?? 0), 0)
      const others: number = stand_total_cases - total_variant_cases
      const frequency = others / stand_total_cases
      return [timestamp, others, frequency]
    })

    series.push({
      ...seriesConfig,
      name: 'others',
      areaStyle: {
        ...seriesConfig.areaStyle,
        color: getClusterColor(CLUSTER_NAME_OTHERS),
      },
      data,
    })

    const xMin = series[0].data[0][0]

    return { xMin, series }
  }, [clusterNames, distribution])

  const option: EChartsOption = useMemo(() => {
    return {
      ...chartConfig,
      xAxis: { ...chartConfig.xAxis, min: xMin },
      series,
    }
  }, [series, xMin])

  return (
    <ReactEChartsCore echarts={echarts} option={option} onChartReady={onChartReady} opts={opts} notMerge lazyUpdate />
  )
}

export interface CasesPlotProps {
  cluster_names: string[]
  distribution: PerCountryCasesDistributionDatum[]
}

export function CasesPlot({ cluster_names, distribution }: CasesPlotProps) {
  const { ref, width } = useResizeDetector({ handleWidth: true })

  if (!width) {
    return (
      <ChartContainerOuter ref={ref}>
        <ChartContainerInner />
      </ChartContainerOuter>
    )
  }

  return (
    <ChartContainerOuter ref={ref}>
      <ChartContainerInner>
        <AreaPlot width={width} cluster_names={cluster_names} distribution={sortBy(distribution, 'week')} />
      </ChartContainerInner>
    </ChartContainerOuter>
  )
}
