import React, { useMemo } from 'react'
import { Props as DefaultTooltipContentProps } from 'recharts/types/component/DefaultTooltipContent'

import { useRecoilValue } from 'recoil'
import { useReactTable } from '@tanstack/react-table'
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/table-core'
import {
  getRowDataFromPayload,
  tooltipTableEstimatedCasesColumn,
  tooltipTableFrequencyColumn,
  tooltipTableVariantColumn,
} from '../Cases/CasesPlotTooltip'
import { clusterDisplayNameToLineagesMapSelector, getClusterColorsSelector } from 'src/state/Clusters'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { FREQUENCY_DISPLAY_THRESHOLD, getWeekFromPayload, Tooltip } from 'src/components/Common/tooltip/Tooltip'
import { tooltipSortAtomFamily } from 'src/state/TooltipSort'
import { TooltipTable } from 'src/components/Common/tooltip/TooltipTable'

type Payload = { total: number; week: number } & Record<string, number>

export const CountryDistributionPlotTooltipId = 'countryDistribution'

export function CountryDistributionPlotTooltip(props: DefaultTooltipContentProps<number, string>) {
  const data = props.payload?.[0]?.payload as Payload | undefined

  if (!data) {
    return null
  }

  return <TooltipInner rawData={data} />
}

function TooltipInner({ rawData }: { rawData: Payload }) {
  const getClusterColor = useRecoilValue(getClusterColorsSelector)
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineagesMap = useRecoilValue(clusterDisplayNameToLineagesMapSelector)

  const data = useMemo(() => getRowDataFromPayload(rawData), [rawData])
  const week = useMemo(() => getWeekFromPayload(rawData), [rawData])

  const { column: sortingColumn, sortDirection } = useRecoilValue(
    tooltipSortAtomFamily(CountryDistributionPlotTooltipId),
  )

  const sorting = useMemo(() => {
    return {
      id: sortingColumn,
      desc: sortDirection === 'desc',
    }
  }, [sortDirection, sortingColumn])

  const table = useReactTable({
    data,
    columns: [
      tooltipTableVariantColumn({
        getClusterColor,
        enablePangolin,
        pangoLineagesMap,
      }),
      tooltipTableEstimatedCasesColumn(),
      tooltipTableFrequencyColumn(),
    ],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      sorting: [sorting],
      columnFilters: [
        {
          id: 'frequency',
          value: FREQUENCY_DISPLAY_THRESHOLD,
        },
      ],
    },
  })

  return (
    <Tooltip title={week}>
      <TooltipTable table={table} />
    </Tooltip>
  )
}
