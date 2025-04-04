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
  AminoAcidMutation,
  AminoAcidMutationWithNucleotideMutations,
  getMutationFromAminoAcidMutation,
  getMutationFromNucleotideMutation,
  NucleotideMutation,
} from 'src/io/getDefiningMutationsClusters'
import { DEFAULT_PAGE_SIZES, getDefaultPaginationState } from 'src/components/Common/table/Pagination'
import { TableWithSearchPaginationFilter } from 'src/components/Common/table/TableWithSearchPaginationFilter'
import { formatMutation } from 'src/components/Common/formatMutation'
import { Annotation } from 'src/components/DefiningMutations/DefiningMutationByCluster/DefiningMutationsTables'
import { AminoacidMutationBadge } from 'src/components/Common/Badges/AminoacidMutationBadge'
import { NucleotideMutationBadge } from 'src/components/Common/Badges/NucleotideMutationBadge'

interface CodingMutationsTableData {
  aminoAcidMutation: AminoAcidMutation
  nucleotideMutations: NucleotideMutation[]
}

export function CodingMutationsTable({
  aminoAcidMutations,
}: {
  aminoAcidMutations: AminoAcidMutationWithNucleotideMutations[]
}) {
  const data = useMemo(
    () =>
      aminoAcidMutations.map((aminoAcidMutation) => {
        return {
          aminoAcidMutation: {
            gene: aminoAcidMutation.gene,
            pos: aminoAcidMutation.pos,
            annotation: aminoAcidMutation.annotation,
            ref: aminoAcidMutation.ref,
            alt: aminoAcidMutation.alt,
          },
          nucleotideMutations: aminoAcidMutation.nucMuts,
        }
      }),
    [aminoAcidMutations],
  )

  const columns = useMemo(() => [getAminoAcidMutationColumn(), getNucleotideMutationsColumn()], [])

  const [pagination, setPagination] = useState<PaginationState>(getDefaultPaginationState())

  const table = useReactTable({
    data,
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
  const columnHelper = createColumnHelper<CodingMutationsTableData>()

  return columnHelper.accessor('aminoAcidMutation', {
    header: () => <span>Amino acid mutations</span>,
    cell: ({ getValue }) => {
      const aminoAcidMutation = getValue()
      return (
        <div className={'d-flex gap-2 align-items-center'}>
          <AminoacidMutationBadge
            key={formatMutation(aminoAcidMutation)}
            mutation={getMutationFromAminoAcidMutation(aminoAcidMutation)}
          />
          {aminoAcidMutation.annotation ? (
            <Annotation annotationText={aminoAcidMutation.annotation}></Annotation>
          ) : null}
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      return rowA.original.aminoAcidMutation.gene.localeCompare(rowB.original.aminoAcidMutation.gene)
    },
    filterFn: (row, _, filterValue: string) => {
      const mutationString = formatMutation(getMutationFromAminoAcidMutation(row.original.aminoAcidMutation))
      return mutationString.includes(filterValue)
    },
  })
}

function getNucleotideMutationsColumn() {
  const columnHelper = createColumnHelper<CodingMutationsTableData>()

  return columnHelper.accessor('nucleotideMutations', {
    header: () => <span>Nucleotide Mutations</span>,
    cell: ({ getValue }) => {
      const nucMuts = getValue()
      return (
        <div className={'d-flex gap-2 flex-wrap align-items-center'}>
          {nucMuts.map((nucMut) => (
            <React.Fragment key={formatMutation(nucMut)}>
              <NucleotideMutationBadge mutation={getMutationFromNucleotideMutation(nucMut)} />
              {nucMut.annotation ? <Annotation annotationText={nucMut.annotation}></Annotation> : null}
            </React.Fragment>
          ))}
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      const firstNucMutA = rowA.original.nucleotideMutations[0]
      const firstNucMutB = rowB.original.nucleotideMutations[0]
      if (!firstNucMutA || !firstNucMutB) {
        return 0
      }
      return firstNucMutA.pos - firstNucMutB.pos
    },
    filterFn: (row, _, filterValue: string) => {
      const mutationStrings = row.original.nucleotideMutations.map((mutation) =>
        formatMutation(getMutationFromNucleotideMutation(mutation)),
      )
      return mutationStrings.some((mutation) => mutation.includes(filterValue))
    },
  })
}
