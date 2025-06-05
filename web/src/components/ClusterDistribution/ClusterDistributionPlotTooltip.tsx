import React, { useMemo } from 'react'
import type { Props as DefaultTooltipContentProps } from 'recharts/types/component/DefaultTooltipContent'
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/table-core'
import { useReactTable } from '@tanstack/react-table'
import { useRecoilValue } from 'recoil'
import { FREQUENCY_DISPLAY_THRESHOLD, getWeekFromPayload, Tooltip } from 'src/components/Common/tooltip/Tooltip'
import { ClusterDistributionDatum } from 'src/io/getPerClusterData'
import { formatProportion } from 'src/helpers/format'
import { TooltipTable } from 'src/components/Common/tooltip/TooltipTable'
import { ColoredHorizontalLineIcon } from 'src/components/Common/ColoredHorizontalLineIcon'
import { theme } from 'src/theme'
import { CountryStyle, getCountryStylesSelector } from 'src/state/CountryStyles'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { tooltipSortAtomFamily } from 'src/state/TooltipSort'

export const ClusterDistributionPlotTooltipId = 'clusterDistribution'

export function ClusterDistributionPlotTooltip(props: DefaultTooltipContentProps<number, string>) {
  const data = props.payload?.[0]?.payload as ClusterDistributionDatum | undefined
  if (!data) {
    return null
  }

  return <TooltipInner rawData={data} />
}

function TooltipInner({ rawData }: { rawData: ClusterDistributionDatum }) {
  const { t } = useTranslationSafe()
  const getCountryStyles = useRecoilValue(getCountryStylesSelector)

  const data = useMemo(() => getRowDataFromPayload(rawData), [rawData])
  const week = useMemo(() => getWeekFromPayload(rawData), [rawData])

  const { column: sortingColumn, sortDirection } = useRecoilValue(
    tooltipSortAtomFamily(ClusterDistributionPlotTooltipId),
  )

  const sorting = useMemo(() => {
    return {
      id: sortingColumn,
      desc: sortDirection === 'desc',
    }
  }, [sortDirection, sortingColumn])

  const table = useReactTable({
    data,
    columns: [tooltipTableCountryColumn({ t, getCountryStyles }), tooltipTableFrequencyColumn()],
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
      <TooltipTable table={table} caption={t('{{asterisk}} Interpolated values', { asterisk: '*' })} />
    </Tooltip>
  )
}

function getRowDataFromPayload(payload: ClusterDistributionDatum) {
  const keys = Object.keys(payload.frequencies || {})
  return keys.map((key) => {
    return {
      country: key,
      frequency: payload.frequencies[key],
      isInterpolated: Number(payload.interp[key]),
      isOriginal: Number(payload.orig[key]),
    }
  })
}

interface ClusterDistributionTooltipRow {
  frequency: number | undefined
  isInterpolated: number
  isOriginal: number
  country: string
}

function tooltipTableFrequencyColumn() {
  const columnHelper = createColumnHelper<ClusterDistributionTooltipRow>()

  return columnHelper.accessor('frequency', {
    header: 'Frequency',
    cell: ({ getValue, row }) => {
      const frequency = getValue()
      const isInterpolated = Boolean(row.original.isInterpolated)
      return (
        <div className="d-flex gap-1">
          <span>{formatProportion(frequency ?? 0)}</span>
          {isInterpolated && <span>*</span>}
        </div>
      )
    },
    sortingFn: 'basic',
    filterFn: (row, columnId, value) => {
      const frequency = row.getValue(columnId)
      return typeof frequency === 'number' && frequency > value
    },
  })
}

function tooltipTableCountryColumn({
  t,
  getCountryStyles,
}: {
  t: (t: string) => string
  getCountryStyles: (country: string) => CountryStyle
}) {
  const columnHelper = createColumnHelper<ClusterDistributionTooltipRow>()

  return columnHelper.accessor('country', {
    header: 'Country',
    cell: ({ getValue }) => {
      const country = getValue()
      return (
        <div className="text-left">
          <ColoredHorizontalLineIcon
            width={theme.plot.country.legend.lineIcon.width}
            height={theme.plot.country.legend.lineIcon.height}
            stroke={getCountryStyles(country).color}
            strokeWidth={theme.plot.country.legend.lineIcon.thickness}
            strokeDasharray={getCountryStyles(country).strokeDashArray}
          />
          <span className="ms-2">{t(country)}</span>
        </div>
      )
    },
    sortingFn: 'text',
    invertSorting: true, // Invert sorting to start with letter A on ascending sort
  })
}
