import React, { useMemo } from 'react'
import { Props as DefaultTooltipContentProps } from 'recharts/types/component/DefaultTooltipContent'

import { useRecoilValue } from 'recoil'
import { useReactTable } from '@tanstack/react-table'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/table-core'
import { clusterDisplayNameToLineagesMapSelector, getClusterColorsSelector } from 'src/state/Clusters'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { FREQUENCY_DISPLAY_THRESHOLD, getWeekFromPayload, Tooltip } from 'src/components/Common/tooltip/Tooltip'
import { tooltipSortAtomFamily } from 'src/state/TooltipSort'
import { TooltipTable } from 'src/components/Common/tooltip/TooltipTable'
import { formatProportion } from 'src/helpers/format'
import { ColoredBox } from 'src/components/Common/ColoredBox'
import { ClusterNameText } from 'src/components/Cases/CasesPlotTooltip'

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
      tooltipTableNumberOfSequencesColumn(),
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

export interface CountryDistributionTooltipRow {
  cluster: string
  frequency: number | undefined
  sequences: number | undefined
}

function getRowDataFromPayload(payload: Payload) {
  const keys = Object.keys(payload).filter((key) => key !== 'total' && key !== 'week')
  return keys.map((key) => {
    const numberOfSequences = payload[key]
    return {
      cluster: key,
      frequency: numberOfSequences === undefined ? undefined : numberOfSequences / payload.total,
      sequences: numberOfSequences,
    }
  })
}

function tooltipTableFrequencyColumn() {
  const columnHelper = createColumnHelper<CountryDistributionTooltipRow>()

  return columnHelper.accessor('frequency', {
    header: 'Frequency',
    cell: ({ getValue }) => {
      const frequency = getValue()
      return <span>{formatProportion(frequency ?? 0)}</span>
    },
    sortingFn: 'basic',
    filterFn: (row, columnId, value) => {
      const frequency = row.getValue(columnId)
      return typeof frequency === 'number' && frequency > value
    },
    footer: '1',
  })
}

export function tooltipTableVariantColumn({
  getClusterColor,
  enablePangolin,
  pangoLineagesMap,
}: {
  getClusterColor: (clusterName: string) => string
  enablePangolin: boolean
  pangoLineagesMap: Map<string, string[]>
}) {
  const columnHelper = createColumnHelper<CountryDistributionTooltipRow>()

  return columnHelper.accessor('cluster', {
    header: 'Cluster',
    cell: ({ getValue }) => {
      const variant = getValue()
      return (
        <div className="text-left">
          <ColoredBox $color={getClusterColor(variant ?? '')} $size={10} $aspect={1.66} />
          <ClusterNameText>
            {enablePangolin ? ((variant && pangoLineagesMap.get(variant)?.join(', ')) ?? variant) : variant}
          </ClusterNameText>
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      const clusterA = String(rowA.original.cluster)
      const clusterB = String(rowB.original.cluster)

      const aCluster = enablePangolin
        ? ((clusterA && pangoLineagesMap.get(clusterA)?.join(', ')) ?? clusterA)
        : clusterA
      const bCluster = enablePangolin
        ? ((clusterB && pangoLineagesMap.get(clusterB)?.join(', ')) ?? clusterB)
        : clusterB

      return aCluster.localeCompare(bCluster)
    },
    invertSorting: true, // Invert sorting to start with letter A on ascending sort
    footer: 'Total',
  })
}

export function tooltipTableNumberOfSequencesColumn() {
  const columnHelper = createColumnHelper<CountryDistributionTooltipRow>()

  return columnHelper.accessor('sequences', {
    header: 'Sequences',
    cell: ({ getValue }) => {
      const nSequences = getValue()
      return <span>{nSequences}</span>
    },
    sortingFn: 'basic',
    footer: ({ table }) => {
      return table.getFilteredRowModel().rows.reduce((sum, row) => {
        const value = row.getValue('sequences')
        return sum + (typeof value === 'number' ? value : 0)
      }, 0)
    },
  })
}
