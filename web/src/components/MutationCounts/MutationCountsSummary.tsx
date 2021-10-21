import React, { useMemo } from 'react'

import { partition } from 'lodash'
import { useQuery } from 'react-query'
import { Row, Col } from 'reactstrap'

import type { ClusterDatum } from 'src/io/getClusters'
import { getMutationCounts, MutationCountsDatum } from 'src/io/getMutationCounts'
import { AminoacidMutationBadge } from 'src/components/Common/MutationBadge'
import { TableSlim } from 'src/components/Common/TableSlim'
import { Link } from 'src/components/Link/Link'
import styled from 'styled-components'

const NUM_ROWS_IN_MUTATION_COUNTS_SUMMARY = 20

export const Table = styled(TableSlim)`
  max-width: 500px;
`

export function formatError(error: unknown) {
  let message = 'Unable to load data: '
  if (error instanceof Error) {
    message += error.message
  }
  return message
}

export interface MutationCountsSummaryRowProps {
  total: number
  counts: MutationCountsDatum
}

export function MutationCountsSummaryRow({ total, counts }: MutationCountsSummaryRowProps) {
  const freq = useMemo(() => ((100 * counts.count) / total).toFixed(2), [counts.count, total])
  return (
    <tr>
      <td>
        <AminoacidMutationBadge mutation={counts.mut} />
      </td>
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
      const [geneS, geneNonS] = partition(mutationCounts.counts, (x) => x.mut.gene === 'S') // eslint-disable-line lodash/matches-prop-shorthand
      const counts = [
        ...geneS.slice(0, NUM_ROWS_IN_MUTATION_COUNTS_SUMMARY / 2),
        ...geneNonS.slice(0, NUM_ROWS_IN_MUTATION_COUNTS_SUMMARY / 2),
      ]
      return { ...mutationCounts, counts }
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
  const { data, isError, error, isLoading } = useMutationCounts(currentCluster.build_name)

  return (
    <Row noGutters>
      <Col>
        <div>
          <h5 className="d-inline">{'Mutation counts summary '}</h5>
          <span>{'('}</span>
          <span>
            <Link href="/">{'Details'}</Link>
          </span>
          <span>{')'}</span>
        </div>

        {data && (
          <Table>
            <thead>
              <tr>
                <th>{'Mutation'}</th>
                <th>{'Count'}</th>
                <th>{'Frequency'}</th>
              </tr>
            </thead>
            <tbody>
              {data.counts.map((counts) => (
                <MutationCountsSummaryRow key={counts.key} counts={counts} total={data.total} />
              ))}
            </tbody>
          </Table>
        )}
        {isLoading && <div>{'Loading...'}</div>}
        {isError && (
          <div>
            <div>{`Mutation counts are not yet available`}</div>
            <div className="text-danger">{process.env.NODE_ENV === 'development' && formatError(error)}</div>
          </div>
        )}
      </Col>
    </Row>
  )
}
