import React, { ChangeEvent, useCallback, useState } from 'react'
import type { Table } from '@tanstack/table-core'
import { DebouncedInput } from 'src/components/Common/table/TableWithSearchPaginationFilter'

interface PaginationProps {
  table: Table<unknown>
}

export type PageSizes = number | number[]

export const DEFAULT_PAGE_SIZES = [10, 20, 50]

export function getDefaultPaginationState(pageSizes: number[] = DEFAULT_PAGE_SIZES) {
  return {
    pageIndex: 0,
    pageSize: pageSizes[0],
  }
}

export function Pagination({
  table,
  pageSizes,
}: PaginationProps & {
  pageSizes: PageSizes
}) {
  return (
    <div className="d-flex align-items-center gap-4 justify-content-end flex-wrap">
      <PageSizeSelector table={table} pageSizes={pageSizes} />
      <PageIndicator table={table} />
      <GotoPageSelector table={table} />
      <SelectPageButtons table={table} />
    </div>
  )
}

function PageIndicator({ table }: PaginationProps) {
  if (table.getRowModel().rows.length <= 1) {
    return null
  }

  return (
    <span className="d-flex align-items-center gap-1 small">
      <div>Page</div>
      <div className={'fw-bold'}>
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
      </div>
    </span>
  )
}

function PageSizeSelector({
  table,
  pageSizes,
}: PaginationProps & {
  pageSizes: PageSizes
}) {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      table.setPageSize(Number(event.currentTarget?.value))
    },
    [table],
  )

  if (typeof pageSizes === 'number' || pageSizes.length <= 1) {
    return null
  }

  return (
    <label className="d-flex align-items-center gap-2">
      <div className={'text-nowrap small'}>Rows per page:</div>
      <select
        className={'form-select form-select-sm'}
        value={table.getState().pagination.pageSize}
        onChange={onChange}
        aria-label="Select number of rows per page"
      >
        {pageSizes.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </label>
  )
}

function GotoPageSelector({ table }: PaginationProps) {
  const onChange = useCallback(
    (input: string | number) => {
      const page = Number(input) - 1
      if (input === '' || Number.isNaN(page)) {
        setError('Please provide a valid page number.')
      } else if (page < table.getPageCount() && page >= 0) {
        table.setPageIndex(page)
        setError('')
      } else {
        setError(`Could not find page number ${input}.`)
      }
    },
    [table],
  )
  const [error, setError] = useState('')

  if (table.getRowModel().rows.length === 0) {
    return null
  }

  return (
    // false positive: DebouncedInput is an input element
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="d-flex align-items-center small gap-2">
      Go to page
      <DebouncedInput
        value={table.getState().pagination.pageIndex + 1}
        type="number"
        min="1"
        max={table.getPageCount()}
        onChange={onChange}
        className={`border p-1 rounded ${error ? 'border-danger' : ''}`}
        aria-label="Enter page number to go to"
        title={error}
      />
    </label>
  )
}

function SelectPageButtons({ table }: PaginationProps) {
  const onClickFirstPage = useCallback(() => table.firstPage(), [table])
  const onClickPreviousPage = useCallback(() => table.previousPage(), [table])
  const onClickNextPage = useCallback(() => table.nextPage(), [table])
  const onClickLastPage = useCallback(() => table.lastPage(), [table])

  return (
    <div className={'btn-group btn-group-sm'} role="group" aria-label="Pagination controls">
      <button
        type="button"
        className="btn btn-light "
        onClick={onClickFirstPage}
        disabled={!table.getCanPreviousPage()}
        aria-label="First page"
      >
        <div className="bi bi-chevron-bar-left" />
      </button>
      <button
        type="button"
        className="btn btn-light "
        onClick={onClickPreviousPage}
        disabled={!table.getCanPreviousPage()}
        aria-label="Previous page"
      >
        <div className="bi bi-chevron-left" />
      </button>
      <button
        type="button"
        className="btn btn-light "
        onClick={onClickNextPage}
        disabled={!table.getCanNextPage()}
        aria-label="Next page"
      >
        <div className="bi bi-chevron-right" />
      </button>
      <button
        type="button"
        className="btn btn-light "
        onClick={onClickLastPage}
        disabled={!table.getCanNextPage()}
        aria-label="Last page"
      >
        <div className="bi bi-chevron-bar-right" />
      </button>
    </div>
  )
}
