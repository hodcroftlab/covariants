import React, { Suspense, useMemo } from 'react'
import { Row, Col, CardHeader, Card, CardBody } from 'reactstrap'
import { ErrorBoundary as ErrorBoundaryBase } from 'react-error-boundary'
import styled from 'styled-components'
import type { ClusterDatum } from 'src/io/getClusters'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { MutationCountsDatum, MutationCountsGeneRecord, useMutationCounts } from 'src/io/getMutationCounts'
import { AminoacidMutationBadge } from 'src/components/Common/MutationBadge'
import { TableSlim } from 'src/components/Common/TableSlim'
import { SPINNER } from 'src/components/Loading/Loading'

const MutationCountsSummaryCardBody = styled(CardBody)`
  padding: 1rem;
  padding-top: 0.5rem;
`
export const Table = styled(TableSlim)`
  max-width: 350px;
  margin: auto;
  font-family: ${(props) => props.theme.font.monospace};
  font-size: 0.85rem;
`

export const Caption = styled.caption`
  caption-side: top;
  text-align: center;
  padding: 0;
  color: ${(props) => props.theme.gray700};
  font-size: 1.1rem;
  font-weight: bold;
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
  title: string
}

export function MutationCountsSummarySubTable({ record, title }: MutationCountsSummarySubTableProps) {
  return (
    <Table striped>
      <Caption>{title}</Caption>
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

export interface MutationCountsSummaryCardBodyContentProps {
  currentClusterBuildName: string
}

export function MutationCountsSummaryCardBodyContent({
  currentClusterBuildName,
}: MutationCountsSummaryCardBodyContentProps) {
  const { data } = useMutationCounts(currentClusterBuildName)

  if (!data) {
    return null
  }

  const { S, others } = data

  return (
    <Row noGutters>
      <Col className="d-flex mx-1 my-1 mb-auto">
        <MutationCountsSummarySubTable title="Gene S" record={S} />
      </Col>

      <Col className="d-flex mx-1 my-1 mb-auto">
        <MutationCountsSummarySubTable title="Other genes" record={others} />
      </Col>
    </Row>
  )
}

function ErrorFallbackComponent({ error }: { error: unknown }) {
  return (
    <div className="mx-auto">
      <div>{`Mutation counts are not yet available`}</div>
      <div className="text-danger">{process.env.NODE_ENV === 'development' && formatError(error)}</div>
    </div>
  )
}

export interface MutationCountsSummaryProps {
  currentCluster: ClusterDatum
}

export function MutationCountsSummaryCard({ currentCluster }: MutationCountsSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <span>{'Non-defining mutation counts (data from '}</span>
        <span>
          <LinkExternal href="https://cov-spectrum.org/">{'CoV-Spectrum'}</LinkExternal>
        </span>
        <span>{')'}</span>
      </CardHeader>
      <MutationCountsSummaryCardBody>
        <Row noGutters>
          <Col>
            <ErrorBoundaryBase FallbackComponent={ErrorFallbackComponent}>
              <Suspense fallback={SPINNER}>
                <MutationCountsSummaryCardBodyContent currentClusterBuildName={currentCluster.build_name} />
              </Suspense>
            </ErrorBoundaryBase>
          </Col>
        </Row>
      </MutationCountsSummaryCardBody>
    </Card>
  )
}
