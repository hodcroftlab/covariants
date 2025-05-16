import React, { useMemo, useState } from 'react'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'
import { getMutationFromNucleotideMutation, SilentMutation } from 'src/io/getDefiningMutationsClusters'
import { DEFAULT_PAGE_SIZES, getDefaultPaginationState } from 'src/components/Common/table/Pagination'
import { TableWithSearchPaginationFilter } from 'src/components/Common/table/TableWithSearchPaginationFilter'
import { formatMutation } from 'src/components/Common/formatMutation'
import { Annotation } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsTables'
import { NucleotideMutationBadge } from 'src/components/Common/Badges/NucleotideMutationBadge'

export function SilentNucleotideMutationsTable({ silentMutations }: { silentMutations: SilentMutation[] }) {
  const columns = useMemo(() => [getNucleotideMutationColumn()], [])

  const [pagination, setPagination] = useState<PaginationState>(getDefaultPaginationState())

  const table = useReactTable({
    data: silentMutations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [{ id: 'nucMutation', desc: false }],
    },
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return <TableWithSearchPaginationFilter table={table} pageSizes={DEFAULT_PAGE_SIZES} />
}

function getNucleotideMutationColumn() {
  const columnHelper = createColumnHelper<SilentMutation>()

  return columnHelper.accessor('nucMutation', {
    header: () => <span>Nucleotide Mutations</span>,
    cell: ({ getValue, row }) => {
      const nucleotideMutation = getValue()
      return (
        <div className={'d-flex'}>
          <NucleotideMutationBadge
            key={formatMutation(nucleotideMutation)}
            mutation={getMutationFromNucleotideMutation(nucleotideMutation)}
          />
          {row.original.notes ? <Annotation annotationText={row.original.notes}></Annotation> : null}
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      const firstNucMutA = rowA.original.nucMutation
      const firstNucMutB = rowB.original.nucMutation
      if (!firstNucMutA || !firstNucMutB) {
        return 0
      }
      return firstNucMutA.pos - firstNucMutB.pos
    },
    filterFn: (row, _, filterValue: string) => {
      const mutationString = formatMutation(getMutationFromNucleotideMutation(row.original.nucMutation))

      return mutationString.includes(filterValue)
    },
  })
}
