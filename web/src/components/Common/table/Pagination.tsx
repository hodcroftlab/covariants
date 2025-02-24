import React, { ChangeEvent, useCallback } from 'react'
import type { Table } from '@tanstack/table-core'

interface PaginationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>
}

export type PageSizes = number | number[]

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
    (event: ChangeEvent<HTMLInputElement>) => {
      const page = event.currentTarget.value ? Number(event.currentTarget.value) - 1 : 0
      table.setPageIndex(page)
    },
    [table],
  )

  if (table.getRowModel().rows.length === 0) {
    return null
  }

  return (
    <label className="d-flex align-items-center small gap-2">
      Go to page
      <input
        type="number"
        min="1"
        max={table.getPageCount()}
        defaultValue={table.getState().pagination.pageIndex + 1}
        onChange={onChange}
        className="border p-1 rounded"
        aria-label="Enter page number to go to"
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
        className="btn btn-secondary "
        onClick={onClickFirstPage}
        disabled={!table.getCanPreviousPage()}
        aria-label="First page"
      >
        <div className="bi bi-chevron-bar-left"></div>
      </button>
      <button
        type="button"
        className="btn btn-secondary "
        onClick={onClickPreviousPage}
        disabled={!table.getCanPreviousPage()}
        aria-label="Previous page"
      >
        <div className="bi bi-chevron-left"></div>
      </button>
      <button
        type="button"
        className="btn btn-secondary "
        onClick={onClickNextPage}
        disabled={!table.getCanNextPage()}
        aria-label="Next page"
      >
        <div className="bi bi-chevron-right"></div>
      </button>
      <button
        type="button"
        className="btn btn-secondary "
        onClick={onClickLastPage}
        disabled={!table.getCanNextPage()}
        aria-label="Last page"
      >
        <div className="bi bi-chevron-bar-right"></div>
      </button>
    </div>
  )
}
