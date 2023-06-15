import React, { useMemo } from 'react'

import { useQuery } from 'react-query'
import { Row, Col, CardHeader, Card, CardBody } from 'reactstrap'
import { LinkExternal } from 'src/components/Link/LinkExternal'

import type { ClusterDatum } from 'src/io/getClusters'
import { getMutationCounts, MutationCountsDatum, MutationCountsGeneRecord } from 'src/io/getMutationCounts'
import { AminoacidMutationBadge } from 'src/components/Common/MutationBadge'
import { TableSlim } from 'src/components/Common/TableSlim'
import styled from 'styled-components'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

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
  const { t } = useTranslationSafe()

  return (
    <Table striped>
      <Caption>{title}</Caption>
      <thead>
        <tr>
          <th className="text-center">{t('Mutation')}</th>
          <th className="text-center">{t('Count')}</th>
          <th className="text-center">{t('Frequency')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="font-weight-bold">{t('Total')}</td>
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

export function MutationCountsSummaryCard({ currentCluster }: MutationCountsSummaryProps) {
  const { t } = useTranslationSafe()

  const { data, isError, error, isLoading } = useMutationCounts(currentCluster.build_name)

  if (!data) {
    return null
  }

  const { S, others } = data

  return (
    <Card>
      <CardHeader>
        <span>{t('Non-defining mutation counts')}</span>
        <span>{' ('}</span>
        <span>{t('Data is from {{source}}', { source: '' })}</span>
        <span>
          <LinkExternal href="https://cov-spectrum.org/">{'CoV-Spectrum'}</LinkExternal>
        </span>
        <span>{')'}</span>
      </CardHeader>
      <MutationCountsSummaryCardBody>
        <Row noGutters>
          <Col>
            <Row noGutters>
              <Col className="d-flex mx-1 my-1 mb-auto">
                <MutationCountsSummarySubTable title={t('Gene S')} record={S} />
              </Col>

              <Col className="d-flex mx-1 my-1 mb-auto">
                <MutationCountsSummarySubTable title={t('Other genes')} record={others} />
              </Col>
            </Row>

            <Row noGutters>
              <Col>
                {isLoading && <div className="mx-auto">{'Loading...'}</div>}
                {isError && (
                  <div className="mx-auto">
                    <div>{t('Mutation counts are not yet available')}</div>
                    <div className="text-danger">{process.env.NODE_ENV === 'development' && formatError(error)}</div>
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </MutationCountsSummaryCardBody>
    </Card>
  )
}
