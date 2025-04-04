import { getMutationFromNucleotideMutation, NucleotideMutation } from 'src/io/getDefiningMutationsClusters'
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
import { DEFAULT_PAGE_SIZES, getDefaultPaginationState } from 'src/components/Common/table/Pagination'
import { TableWithSearchPaginationFilter } from 'src/components/Common/table/TableWithSearchPaginationFilter'
import { formatMutation } from 'src/components/Common/formatMutation'
import { Annotation } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsTables'
import {NucleotideMutationBadge} from "src/components/Common/Badges/NucleotideMutationBadge";

interface SilentMutationsTableData {
  nucleotideMutation: NucleotideMutation
}

export function SilentNucleotideMutationsTable({ nucleotideMutations }: { nucleotideMutations: NucleotideMutation[] }) {
  const data = useMemo(() => {
    return nucleotideMutations.map((mutation) => {
      return {
        nucleotideMutation: mutation,
      }
    })
  }, [nucleotideMutations])

  const columns = useMemo(() => [getNucleotideMutationColumn()], [])

  const [pagination, setPagination] = useState<PaginationState>(getDefaultPaginationState())

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [{ id: 'nucleotideMutation', desc: false }],
    },
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return <TableWithSearchPaginationFilter table={table} pageSizes={DEFAULT_PAGE_SIZES} />
}

function getNucleotideMutationColumn() {
  const columnHelper = createColumnHelper<SilentMutationsTableData>()

  return columnHelper.accessor('nucleotideMutation', {
    header: () => <span>Nucleotide Mutations</span>,
    cell: ({ getValue }) => {
      const nucleotideMutation = getValue()
      return (
        <div className={'d-flex'}>
          <NucleotideMutationBadge
            key={formatMutation(nucleotideMutation)}
            mutation={getMutationFromNucleotideMutation(nucleotideMutation)}
          />
          {nucleotideMutation.annotation ? (
            <Annotation annotationText={nucleotideMutation.annotation}></Annotation>
          ) : null}
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      const firstNucMutA = rowA.original.nucleotideMutation
      const firstNucMutB = rowB.original.nucleotideMutation
      if (!firstNucMutA || !firstNucMutB) {
        return 0
      }
      return firstNucMutA.pos - firstNucMutB.pos
    },
    filterFn: (row, _, filterValue: string) => {
      const mutationString = formatMutation(getMutationFromNucleotideMutation(row.original.nucleotideMutation))

      return mutationString.includes(filterValue)
    },
  })
}
