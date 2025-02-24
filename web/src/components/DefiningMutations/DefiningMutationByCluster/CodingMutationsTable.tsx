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
import {
  CodingMutation,
  getMutationFromAminoAcidMutation,
  getMutationFromNucleotideMutation,
} from 'src/io/getDefiningMutationsClusters'
import { DEFAULT_PAGE_SIZES, getDefaultPaginationState } from 'src/components/Common/table/Pagination'
import { TableWithSearchPaginationFilter } from 'src/components/Common/table/TableWithSearchPaginationFilter'
import { formatMutation } from 'src/components/Common/formatMutation'
import { Annotation } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsTables'
import { AminoacidMutationBadge } from 'src/components/Common/Badges/AminoacidMutationBadge'
import { NucleotideMutationBadge } from 'src/components/Common/Badges/NucleotideMutationBadge'

export function CodingMutationsTable({ codingMutations }: { codingMutations: CodingMutation[] }) {
  const columns = useMemo(() => [getAminoAcidMutationColumn(), getNucleotideMutationsColumn()], [])

  const [pagination, setPagination] = useState<PaginationState>(getDefaultPaginationState())

  const table = useReactTable({
    data: codingMutations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [{ id: 'nucleotideMutations', desc: false }],
    },
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return <TableWithSearchPaginationFilter table={table} pageSizes={DEFAULT_PAGE_SIZES} />
}

function getAminoAcidMutationColumn() {
  const columnHelper = createColumnHelper<CodingMutation>()

  return columnHelper.accessor('aaMutation', {
    header: () => <span>Amino acid mutations</span>,
    cell: ({ getValue, row }) => {
      const aminoAcidMutation = getValue()
      return (
        <div className={'d-flex gap-2 align-items-center'}>
          <AminoacidMutationBadge
            key={formatMutation(aminoAcidMutation)}
            mutation={getMutationFromAminoAcidMutation(aminoAcidMutation)}
          />
          {row.original.notes ? <Annotation annotationText={row.original.notes}></Annotation> : null}
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      return rowA.original.aaMutation.gene.localeCompare(rowB.original.aaMutation.gene)
    },
    filterFn: (row, _, filterValue: string) => {
      const mutationString = formatMutation(getMutationFromAminoAcidMutation(row.original.aaMutation))
      return mutationString.includes(filterValue)
    },
  })
}

function getNucleotideMutationsColumn() {
  const columnHelper = createColumnHelper<CodingMutation>()

  return columnHelper.accessor('nucMutations', {
    header: () => <span>Nucleotide Mutations</span>,
    cell: ({ getValue, row }) => {
      const nucMuts = getValue()

      return (
        <div className={'d-flex gap-2 flex-wrap align-items-center'}>
          {nucMuts.map((nucMut) => (
            <React.Fragment key={formatMutation(nucMut)}>
              <NucleotideMutationBadge mutation={getMutationFromNucleotideMutation(nucMut)} />
              {row.original.notes ? <Annotation annotationText={row.original.notes}></Annotation> : null}
            </React.Fragment>
          ))}
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      const firstNucMutA = rowA.original.nucMutations[0]
      const firstNucMutB = rowB.original.nucMutations[0]
      if (!firstNucMutA || !firstNucMutB) {
        return 0
      }
      return firstNucMutA.pos - firstNucMutB.pos
    },
    filterFn: (row, _, filterValue: string) => {
      const mutationStrings = row.original.nucMutations.map((mutation) =>
        formatMutation(getMutationFromNucleotideMutation(mutation)),
      )
      return mutationStrings.some((mutation) => mutation.includes(filterValue))
    },
  })
}
