import React, { useMemo } from 'react'

import { useQuery } from 'react-query'

import { TableSlim } from 'src/components/Common/TableSlim'

import type { ClusterDatum } from 'src/io/getClusters'
import { getMutationCounts, MutationCountsDatum } from 'src/io/getMutationCounts'

export interface MutationCountsSummaryRowProps {
  total: number
  counts: MutationCountsDatum
}

export function MutationCountsSummaryRow({ total, counts }: MutationCountsSummaryRowProps) {
  const freq = useMemo(() => ((100 * counts.count) / total).toFixed(2), [counts.count, total])
  return (
    <tr>
      <td>{counts.mut}</td>
      <td>{counts.count}</td>
      <td>{freq}</td>
    </tr>
  )
}

export function useMutationCounts(clusterBuildName: string) {
  return useQuery(
    ['mutationCounts', clusterBuildName],
    async () => {
      const mutationCounts = await getMutationCounts(clusterBuildName)
    },
    {
      staleTime: Number.POSITIVE_INFINITY,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: Number.POSITIVE_INFINITY,
    },
  )
}

export interface MutationCountsSummaryProps {
  currentCluster: ClusterDatum
}

export function MutationCountsSummary({ currentCluster }: MutationCountsSummaryProps) {
  const { data, isError, isLoading } = useMutationCounts('21A.Delta')

  return (
    <div>
      <TableSlim>
        <thead>
          <tr>
            <th>{'Mutation'}</th>
            <th>{'Count'}</th>
            <th>{'Frequency'}</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.counts.map((counts) => (
              <MutationCountsSummaryRow key={counts.mut} counts={counts} total={data.total} />
            ))}
        </tbody>
      </TableSlim>
    </div>
  )
}
