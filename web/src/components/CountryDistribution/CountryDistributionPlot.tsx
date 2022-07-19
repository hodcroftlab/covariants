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
import {
  PlotTooltipDatum,
  renderCountryDistributionPlotTooltip,
} from 'src/components/CountryDistribution/CountryDistributionPlotTooltip'

import type { CountryDistributionDatum } from 'src/io/getPerCountryData'
import { DateTime } from 'luxon'
import React, { useCallback, useMemo } from 'react'
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
    formatter: (data) => renderCountryDistributionPlotTooltip(data as unknown as PlotTooltipDatum[]),
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
    max: 1,
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
  distribution: CountryDistributionDatum[]
}

function AreaPlot({ width, cluster_names: clusterNames, distribution }: AreaPlotProps) {
  const onChartReady = useCallback(() => {}, [])
  const opts: Opts = useMemo(() => ({ width, renderer: 'canvas' }), [width])

  const { xMin, series } = useMemo(() => {
    const seriesMap = Object.fromEntries(
      clusterNames.map((clusterName) => {
        const data = distribution.map(({ week, cluster_counts, total_sequences }) => {
          const timestamp = DateTime.fromFormat(week, 'yyyy-MM-dd').toUTC().toMillis()
          const count = get(cluster_counts, clusterName) ?? 0
          const frequency = count / total_sequences
          return [timestamp, frequency, count]
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

    const data = distribution.map(({ week, cluster_counts, total_sequences }) => {
      const timestamp = DateTime.fromFormat(week, 'yyyy-MM-dd').toUTC().toMillis()
      const total_cluster_sequences = Object.values(cluster_counts) // prettier-ignore
        .reduce<number>((result, count = 0) => result + (count ?? 0), 0)
      const count = total_sequences - total_cluster_sequences
      const frequency: number = count / total_sequences
      return [timestamp, frequency, count]
    })

    series.push({
      ...seriesConfig,
      name: CLUSTER_NAME_OTHERS,
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

export interface CountryDistributionPlotProps {
  cluster_names: string[]
  distribution: CountryDistributionDatum[]
}

export function CountryDistributionPlot({ cluster_names, distribution }: CountryDistributionPlotProps) {
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
