import React from 'react'

import { sortBy, reverse } from 'lodash'
import { styled } from 'styled-components'
import { Props as DefaultTooltipContentProps } from 'recharts/types/component/DefaultTooltipContent'

import { useRecoilValue } from 'recoil'
import { ColoredBox } from '../Common/ColoredBox'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { formatDateBiweekly, formatInteger, formatProportion } from 'src/helpers/format'
import { clusterPangoLineageMapSelector, getClusterColorsSelector } from 'src/state/Clusters'
import { enablePangolinAtom } from 'src/state/Nomenclature'

export function CasesPlotTooltip(props: DefaultTooltipContentProps<number, string>) {
  const { t } = useTranslationSafe()
  const getClusterColor = useRecoilValue(getClusterColorsSelector)
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineageMap = useRecoilValue(clusterPangoLineageMapSelector)

  const { payload } = props
  if (!payload || payload.length === 0) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
  const week = formatDateBiweekly(payload[0]?.payload.week)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
  const total: number = formatInteger(payload[0]?.payload.total ?? 0)

  const payloadSorted = reverse(sortBy(payload, 'value'))
  const payloadNonZero = payloadSorted.filter((pld) => pld.value !== undefined && pld.value > EPSILON)

  return (
    <Tooltip>
      <TooltipTitle>{week}</TooltipTitle>

      <TooltipTable>
        <thead>
          <tr className="w-100">
            <th className="px-2 text-left">{t('Variant')}</th>
            <th className="px-2 text-right">{t('Est. cases')}</th>
            <th className="px-2 text-right">{t('Freq')}</th>
          </tr>
        </thead>
        <TooltipTableBody>
          {payloadNonZero.map(({ name, value }) => (
            <tr key={name}>
              <td className="px-2 text-left">
                <ColoredBox $color={getClusterColor(name ?? '')} $size={10} $aspect={1.66} />
                <ClusterNameText>
                  {enablePangolin ? ((name && pangoLineageMap.get(name)) ?? name) : name}
                </ClusterNameText>
              </td>
              <td className="px-2 text-right">{value !== undefined && value > EPSILON ? formatInteger(value) : '-'}</td>
              <td className="px-2 text-right">
                {value !== undefined && value > EPSILON ? formatProportion(value / total) : '-'}
              </td>
            </tr>
          ))}

          <tr>
            <td className="px-2 text-left">
              <span>
                <b>{t('Total')}</b>
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

const EPSILON = 1e-2

const Tooltip = styled.div`
  display: flex;
  flex-direction: column;

  padding: 5px 10px;
  background-color: ${(props) => props.theme.gray100};
  box-shadow: ${(props) => props.theme.shadows.slight};
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
