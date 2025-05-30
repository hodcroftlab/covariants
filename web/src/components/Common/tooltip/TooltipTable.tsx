import { flexRender, Header } from '@tanstack/react-table'
import React from 'react'
import type { Table } from '@tanstack/table-core'
import { SortingIndicator } from 'src/components/Common/table/SortingIndicator'

export function TooltipTable({
  table,
  caption,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>
  caption?: string
}) {
  return (
    <table className={'table table-striped table-sm small mb-0'}>
      {caption && <caption>{caption}</caption>}
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <React.Fragment key={headerGroup.id}>
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div className={'d-flex justify-content-between text-nowrap gap-2'}>
                    <HeaderText header={header} />
                    <SortingIndicator sorted={header.column.getIsSorted()} />
                  </div>
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
            <td colSpan={table.getVisibleFlatColumns().length} className={'p-2 small'}>
              No data
            </td>
          </tr>
        )}
      </tbody>
      {table.getFooterGroups().length > 0 && (
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      )}
    </table>
  )
}

function HeaderText({ header }: { header: Header<unknown, unknown> }) {
  return <>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</>
}
