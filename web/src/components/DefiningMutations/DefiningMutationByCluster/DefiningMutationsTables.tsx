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
  DefiningMutationCluster,
  getMutationFromAminoAcidMutation,
  getMutationFromNucleotideMutation,
  NucleotideMutation,
} from 'src/io/getDefiningMutationsClusters'
import { parsePositionOrThrow } from 'src/components/Common/parsePosition'
import { AminoacidMutationBadge, MutationBadgeBox, NucleotideMutationBadge } from 'src/components/Common/MutationBadge'
import { formatMutation } from 'src/components/Common/formatMutation'
import { TableWithSearchPaginationFilter } from 'src/components/Common/table/TableWithSearchPaginationFilter'

export interface DefiningMutationsTableProps {
  currentCluster: DefiningMutationCluster
  referenceSequenceName: string
}

export function DefiningMutationsTables({ currentCluster, referenceSequenceName }: DefiningMutationsTableProps) {
  const tableData = useMemo(() => {
    const mutations = currentCluster.mutations[referenceSequenceName]
    if (!mutations) {
      return null
    }

    const nucleotideMutations: NucleotideMutation[] = Object.entries(mutations.nuc).map(([posStr, nucMut]) => {
      const pos = parsePositionOrThrow(posStr)
      return { pos, ...nucMut }
    })

    const aminoAcidMutations: AminoAcidMutationWithNucleotideMutations[] = Object.entries(mutations.aa).flatMap(
      ([gene, aaMuts]) =>
        Object.entries(aaMuts).map(([posStr, aaMut]) => {
          const pos = parsePositionOrThrow(posStr)
          const nucMuts = nucleotideMutations.filter((nucMut) => aaMut.nucPos?.includes(nucMut.pos))
          return { gene, pos, ...aaMut, nucMuts }
        }),
    )

    const codingPositions = new Set(aminoAcidMutations.flatMap((aaMut) => aaMut.nucPos))
    const silentNucleotideMutations = nucleotideMutations.filter((nucMut) => !codingPositions.has(nucMut.pos))

    return { aminoAcidMutations, silentNucleotideMutations }
  }, [referenceSequenceName, currentCluster.mutations])

  if (!tableData) {
    return null
  }

  return (
    <div className={'d-flex gap-2 flex-column flex-lg-row'}>
      <div>
        <h3>Coding mutations</h3>
        <CodingMutationsTable aminoAcidMutations={tableData.aminoAcidMutations} />
      </div>
      <div>
        <h3>Silent mutations</h3>
        <SilentNucleotideMutationsTable nucleotideMutations={tableData.silentNucleotideMutations} />
      </div>
    </div>
  )
}

interface CodingMutationsTableData {
  aminoAcidMutation: AminoAcidMutation
  nucleotideMutations: NucleotideMutation[]
}

function CodingMutationsTable({
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

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<CodingMutationsTableData>()

    return [
      columnHelper.accessor('aminoAcidMutation', {
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
      }),
      columnHelper.accessor('nucleotideMutations', {
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
      }),
    ]
  }, [])

  const pageSizes = useMemo(() => [10, 20, 50], [])

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizes[0],
  })

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

  return <TableWithSearchPaginationFilter table={table} pageSizes={pageSizes} />
}

interface SilentMutationsTableData {
  nucleotideMutation: NucleotideMutation
}

function SilentNucleotideMutationsTable({ nucleotideMutations }: { nucleotideMutations: NucleotideMutation[] }) {
  const data = useMemo(() => {
    return nucleotideMutations.map((mutation) => {
      return {
        nucleotideMutation: mutation,
      }
    })
  }, [nucleotideMutations])

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<SilentMutationsTableData>()

    return [
      columnHelper.accessor('nucleotideMutation', {
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
      }),
    ]
  }, [])

  const pageSizes = useMemo(() => [10, 20, 50], [])

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizes[0],
  })

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

  return <TableWithSearchPaginationFilter table={table} pageSizes={pageSizes} />
}

function Annotation({ annotationText }: { annotationText: string }) {
  return (
    <MutationBadgeBox className={'text-info'} data-bs-toggle="tooltip" title={annotationText}>
      <span aria-label="Annotation" className="bi bi-info-circle"></span>
    </MutationBadgeBox>
  )
}
