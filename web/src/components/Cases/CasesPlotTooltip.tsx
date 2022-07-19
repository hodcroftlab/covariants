import React, { useMemo } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { sortBy, reverse, isEmpty, isNil, sum } from 'lodash'
import { getClusterColor } from 'src/io/getClusters'
import styled, { ThemeProvider } from 'styled-components'

import { theme } from 'src/theme'
import { formatDateBiweekly, formatProportion } from 'src/helpers/format'
import { notUndefinedOrNull } from 'src/helpers/notUndefined'
import { ColoredBox } from 'src/components/Common/ColoredBox'

const Tooltip = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.gray100};
  border-radius: 3px;
`

const TooltipTitle = styled.h1`
  font-size: 1rem;
  margin: 5px auto;
  font-weight: 600;
`

const TooltipTable = styled.table`
  padding: 30px 35px;
  font-size: 0.9rem;
  border: none;
  min-width: 250px;

  & > tbody > tr:nth-child(odd) {
    background-color: ${(props) => props.theme.gray200};
  }
`

const TooltipTableBody = styled.tbody``

export const ClusterNameText = styled.span`
  font-family: ${(props) => props.theme.font.monospace};
`

export interface PlotTooltipDatum {
  seriesName: string
  value: [number, number | undefined, number | undefined]
  axisValue: number
}

export function CasesPlotTooltip({ data }: { data: PlotTooltipDatum[] }) {
  const dataPrepared = useMemo(() => {
    if (isEmpty(data)) {
      return null
    }

    const week = formatDateBiweekly(data[0].axisValue)

    let valuesRaw = data
      .map(({ seriesName, value }) => {
        return { name: seriesName, count: value[1], frequency: value[2], color: getClusterColor(seriesName) }
      })
      .filter(({ count }) => notUndefinedOrNull(count))
      .filter(({ frequency }) => notUndefinedOrNull(frequency))
      .filter(({ count }) => count !== 0)
      .filter(({ frequency }) => frequency !== 0)

    valuesRaw = reverse(sortBy(valuesRaw, 'count'))

    const values = valuesRaw.map((datum) => ({ ...datum, frequency: formatProportion(datum.frequency ?? 0) }))
    const total = sum(values.map(({ count }) => count))

    return { week, values, total }
  }, [data])

  if (isNil(dataPrepared)) {
    return null
  }

  const { week, values, total } = dataPrepared

  return (
    <Tooltip>
      <TooltipTitle>{week}</TooltipTitle>

      <TooltipTable>
        <thead>
          <tr className="w-100">
            <th className="px-2 text-left">{'Variant'}</th>
            <th className="px-2 text-left">{'Count'}</th>
            <th className="px-2 text-right">{'Freq'}</th>
          </tr>
        </thead>
        <TooltipTableBody>
          {values.map(({ name, count, frequency, color }) => (
            <tr key={name}>
              <td className="px-2 text-left">
                <ColoredBox $color={color} $size={10} $aspect={1.66} />
                <ClusterNameText>{name}</ClusterNameText>
              </td>
              <td className="px-2 text-right">{count}</td>
              <td className="px-2 text-right">{frequency}</td>
            </tr>
          ))}

          <tr>
            <td className="px-2 text-left">
              <span>
                <b>{'Total'}</b>
              </span>
            </td>
            <td className="px-2 text-right">{total}</td>
            <td className="px-2 text-right">{'1.00'}</td>
          </tr>
        </TooltipTableBody>
      </TooltipTable>
    </Tooltip>
  )
}

export function renderCasesPlotTooltip(data: PlotTooltipDatum[]) {
  return renderToStaticMarkup(
    <ThemeProvider theme={theme}>
      <CasesPlotTooltip data={data} />
    </ThemeProvider>,
  )
}
