import React, { useMemo } from 'react'

import { useQuery } from 'react-query'
import { Row, Col } from 'reactstrap'

import type { ClusterDatum } from 'src/io/getClusters'
import { getMutationCounts, MutationCountsDatum, MutationCountsGeneRecord } from 'src/io/getMutationCounts'
import { AminoacidMutationBadge } from 'src/components/Common/MutationBadge'
import { TableSlim } from 'src/components/Common/TableSlim'
import { Link } from 'src/components/Link/Link'
import styled from 'styled-components'

export const Table = styled(TableSlim)`
  max-width: 350px;
  margin: auto;
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
      <td className="text-right">{counts.count}</td>
      <td className="text-right">{`${freq}%`}</td>
    </tr>
  )
}

export interface MutationCountsSummarySubTableProps {
  record: MutationCountsGeneRecord
}

export function MutationCountsSummarySubTable({ record }: MutationCountsSummarySubTableProps) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th className="text-center">{'Mutation'}</th>
          <th className="text-center">{'Count'}</th>
          <th className="text-center">{'Frequency'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="font-weight-bold">{'Total'}</td>
          <td className="font-weight-bold text-right">{record.total}</td>
          <td className="font-weight-bold text-right">{'100.00%'}</td>
        </tr>
        {record.counts.map((counts) => (
          <MutationCountsSummaryRow key={counts.key} counts={counts} total={record.total} />
        ))}
      </tbody>
    </Table>
  )
}

export function useMutationCounts(clusterBuildName: string) {
  return useQuery(['mutationCounts', clusterBuildName], async () => getMutationCounts(clusterBuildName), {
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: Number.POSITIVE_INFINITY,
  })
}

export interface MutationCountsSummaryProps {
  currentCluster: ClusterDatum
}

export function MutationCountsSummary({ currentCluster }: MutationCountsSummaryProps) {
  const { data, isError, error, isLoading } = useMutationCounts(currentCluster.build_name)

  if (!data) {
    return null
  }

  const { S, others } = data

  return (
    <Row noGutters>
      <Col>
        <Row noGutters>
          <Col>
            <h5 className="text-center mb-2">
              <span className="d-inline">{'Non-defining mutation counts '}</span>
              <span className="small">
                <span>{'('}</span>
                <span>
                  <Link href="/">{'Details'}</Link>
                </span>
                <span>{')'}</span>
              </span>
            </h5>
          </Col>
        </Row>

        <Row noGutters>
          <Col className="d-flex mx-1 my-1">
            <MutationCountsSummarySubTable record={S} />
          </Col>

          <Col className="d-flex mx-1 my-1">
            <MutationCountsSummarySubTable record={others} />
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            {isLoading && <div className="mx-auto">{'Loading...'}</div>}
            {isError && (
              <div className="mx-auto">
                <div>{`Mutation counts are not yet available`}</div>
                <div className="text-danger">{process.env.NODE_ENV === 'development' && formatError(error)}</div>
              </div>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
