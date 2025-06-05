import React, { PropsWithChildren, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { startCase } from 'lodash'
import { tooltipSortAtomFamily } from 'src/state/TooltipSort'
import { SortingIndicator } from 'src/components/Common/table/SortingIndicator'
import { formatDateBiweekly } from 'src/helpers/format'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

export function Tooltip({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="d-flex flex-column p-2 shadow rounded-1 bg-white">
      <div className="h5">{title}</div>
      {children}
    </div>
  )
}

export function TooltipConfig({ columns, tooltipId }: { columns: string[]; tooltipId: string }) {
  const { t } = useTranslationSafe()

  return (
    <div className="card">
      <div className="card-header">{t('Tooltip sorting')}</div>
      <div className="card-body d-flex flex-column">
        <div className="d-flex gap-4">
          {columns.map((column) => {
            return <TooltipSortButton key={column} column={column} tooltipId={tooltipId} />
          })}
        </div>
      </div>
    </div>
  )
}

function TooltipSortButton({ column, tooltipId }: { column: string; tooltipId: string }) {
  const [clusterTooltipSort, setClusterTooltipSort] = useRecoilState(tooltipSortAtomFamily(tooltipId))

  const isSorted = clusterTooltipSort.column === column

  const onClick = useCallback(() => {
    setClusterTooltipSort({
      column,
      sortDirection: isSorted ? (clusterTooltipSort.sortDirection === 'desc' ? 'asc' : 'desc') : 'desc',
    })
  }, [clusterTooltipSort.sortDirection, column, isSorted, setClusterTooltipSort])

  return (
    <button className="d-flex gap-2 btn btn-outline-primary align-items-center" onClick={onClick}>
      <div>{startCase(column)}</div>
      <SortingIndicator sorted={isSorted ? clusterTooltipSort.sortDirection : false} />
    </button>
  )
}

export function getWeekFromPayload(payload: { week: string | number }) {
  return formatDateBiweekly(Number(payload.week))
}

export const FREQUENCY_DISPLAY_THRESHOLD = 1e-2
