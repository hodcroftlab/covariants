/* eslint-disable camelcase */
import React from 'react'

import styled from 'styled-components'
import { XAxis, YAxis, CartesianGrid, Tooltip, Line, LineChart, ResponsiveContainer } from 'recharts'
import { Props as DefaultTooltipContentProps } from 'recharts/types/component/DefaultTooltipContent'
import { DateTime } from 'luxon'

import { getCountryColor } from 'src/io/getCountryColor'

const ChartContainerOuter = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`

const ChartContainerInner = styled.div`
  flex: 0 1 100%;
  width: 0;
`

export interface TooltipPayload {
  payload: { name: string; value: number; color: string }[]
  label: string
}

export function renderTooltipContent({ payload, label }: DefaultTooltipContentProps<number, string>) {
  return (
    <div className="bg-white">
      <ul className="list">
        {payload?.map(({ color, name, value }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`item-${index}`} style={{ color }}>
            {`${name ?? ''}: ${value ?? 0}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const LineChartStyled = styled(LineChart)`
  margin: 10px auto;
`

const margin = { left: -20, top: 0, bottom: 0, right: 10 }

const tickStyle = { fontSize: 12 }

const yAxisFormatter = (value: number) => value.toFixed(2)

const dateFormatter = (date: number) => {
  return DateTime.fromSeconds(date).toISODate()
}

export interface ClusterDistributionDatum {
  week: string
  frequencies: {
    [key: string]: number | undefined
  }
}

export interface ClusterDistributionPlotProps {
  country_names: string[]
  distribution: ClusterDistributionDatum[]
}

export function ClusterDistributionPlot({ country_names, distribution }: ClusterDistributionPlotProps) {
  const data = distribution.map(({ week, frequencies }) => {
    const weekSec = DateTime.fromFormat(week, 'yyyy-MM-dd').toSeconds()
    return { week: weekSec, ...frequencies }
  })

  return (
    <ChartContainerOuter>
      <ChartContainerInner>
        <ResponsiveContainer width="99%" aspect={1.5} debounce={0}>
          <LineChartStyled margin={margin} data={data}>
            <XAxis dataKey="week" tickFormatter={dateFormatter} tick={tickStyle} allowDataOverflow />
            <YAxis tickFormatter={yAxisFormatter} domain={[0, 1]} tick={tickStyle} allowDataOverflow />
            <Tooltip content={renderTooltipContent} />
            {country_names.map((country, i) => (
              <Line
                key={country}
                type="monotone"
                dataKey={country}
                stroke={getCountryColor(country)}
                dot={false}
                isAnimationActive={false}
              />
            ))}

            <CartesianGrid stroke="#2222" />
          </LineChartStyled>
        </ResponsiveContainer>
      </ChartContainerInner>
    </ChartContainerOuter>
  )
}
