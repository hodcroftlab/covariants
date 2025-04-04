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
import { Annotation } from 'src/components/DefiningMutations/DefiningMutationsTables'
import { AminoacidMutationBadge } from 'src/components/Common/Badges/AminoacidMutationBadge'
import { NucleotideMutationBadge } from 'src/components/Common/Badges/NucleotideMutationBadge'

export function CodingMutationsTable({ codingMutations }: { codingMutations: CodingMutation[] }) {
  const columns = useMemo(() => [getAminoAcidMutationsColumn(), getNucleotideMutationsColumn()], [])

  const [pagination, setPagination] = useState<PaginationState>(getDefaultPaginationState())

  const table = useReactTable({
    data: codingMutations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [{ id: 'nucMutations', desc: false }],
    },
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return <TableWithSearchPaginationFilter table={table} pageSizes={DEFAULT_PAGE_SIZES} />
}

function getAminoAcidMutationsColumn() {
  const columnHelper = createColumnHelper<CodingMutation>()

  return columnHelper.accessor('aaMutations', {
    header: () => <span>Amino acid mutations</span>,
    cell: ({ getValue, row }) => {
      const aminoAcidMutations = getValue()
      return (
        <div className={'d-flex gap-2 align-items-center'}>
          {aminoAcidMutations.map((aminoAcidMutation) => (
            <AminoacidMutationBadge
              key={formatMutation(aminoAcidMutation)}
              mutation={getMutationFromAminoAcidMutation(aminoAcidMutation)}
            />
          ))}
          {row.original.notes ? <Annotation annotationText={row.original.notes}></Annotation> : null}
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      return rowA.original.aaMutations[0].gene.localeCompare(rowB.original.aaMutations[0].gene)
    },
    filterFn: (row, _, filterValue: string) => {
      const mutationStrings = row.original.aaMutations.map((aaMutation) =>
        formatMutation(getMutationFromAminoAcidMutation(aaMutation)),
      )
      return mutationStrings.some((mutation) => mutation.includes(filterValue))
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
