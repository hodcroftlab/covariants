import { Column, flexRender, Header, SortDirection } from '@tanstack/react-table'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { Table } from '@tanstack/table-core'
import { Pagination } from 'src/components/Common/table/Pagination'

const removeAllDefaultStylesForButton = {
  all: 'unset', // Don't show default browser button style, but only the text
  width: '100%',
  fontWeight: 'normal', // don't use bootstrap table head bold font weight
  cursor: 'pointer',
} as const

export function TableWithSearchPaginationFilter({
  table,
  pageSizes,
  equiWidthHeader,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>
  pageSizes: number[]
  equiWidthHeader?: boolean
}) {
  const thStyle = useMemo(() => {
    if (equiWidthHeader) {
      return {
        width: `${100 / table.getFlatHeaders().length}%`,
      }
    }
    return undefined
  }, [equiWidthHeader, table])

  return (
    <div className="border border-2 rounded shadow-sm table-responsive">
      <table className={'table table-striped table-hover'}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} style={thStyle}>
                    <button onClick={header.column.getToggleSortingHandler()} style={removeAllDefaultStylesForButton}>
                      <div className={'d-flex justify-content-between text-nowrap gap-2'}>
                        <HeaderText header={header} />
                        <SortingIndicator sorted={header.column.getIsSorted()} />
                      </div>
                    </button>
                  </th>
                ))}
              </tr>
              <tr>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} />
                      </div>
                    ) : null}
                  </th>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td colSpan={2} className={'p-2 small'}>
                Nothing to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={'m-2'}>
        <Pagination table={table} pageSizes={pageSizes}></Pagination>
      </div>
    </div>
  )
}

function HeaderText({ header }: { header: Header<unknown, unknown> }) {
  return <>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</>
}

function SortingIndicator({ sorted }: { sorted: false | SortDirection }) {
  return <>{sorted ? sorted === 'desc' ? <SortedDescending /> : <SortedAscending /> : <NotSorted />}</>
}

function SortedDescending() {
  return <div aria-label="sorted descending" className="bi bi-sort-down"></div>
}

function SortedAscending() {
  return <div aria-label="sorted ascending" className="bi bi-sort-down-alt"></div>
}

function NotSorted() {
  return <div aria-label="not sorted" className="bi bi-filter"></div>
}

function Filter({ column }: { column: Column<unknown> }) {
  const columnFilterValue = column.getFilterValue()

  const onChange = useCallback((value: string | number) => column.setFilterValue(value), [column])

  return (
    <DebouncedInput
      className="form-control form-control-sm"
      onChange={onChange}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
  )
}

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value), [])

  return <input {...props} value={value} onChange={onChangeInput} />
}
