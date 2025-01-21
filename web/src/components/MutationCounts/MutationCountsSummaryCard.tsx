import React, { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Row, Col, CardHeader, Card, CardBody } from 'reactstrap'
import { styled } from 'styled-components'
import { LinkExternal } from 'src/components/Link/LinkExternal'

import type { ClusterDatum } from 'src/io/getClusters'
import { getMutationCounts, MutationCountsDatum, MutationCountsGeneRecord } from 'src/io/getMutationCounts'
import { AminoacidMutationBadge } from 'src/components/Common/MutationBadge'
import { TableSlim } from 'src/components/Common/TableSlim'
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
  return useQuery({
    queryKey: ['mutationCounts', clusterBuildName],
    queryFn: async () => getMutationCounts(clusterBuildName),
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

  const { data } = useMutationCounts(currentCluster.build_name)
  if (!data?.result) {
    return null
  }
  const { S, others } = data.result

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
        <Row className={'gx-0'}>
          <Col>
            <Row className={'gx-0'}>
              <Col className="d-flex mx-1 my-1 mb-auto">
                <MutationCountsSummarySubTable title={t('Gene S')} record={S} />
              </Col>

              <Col className="d-flex mx-1 my-1 mb-auto">
                <MutationCountsSummarySubTable title={t('Other genes')} record={others} />
              </Col>
            </Row>
          </Col>
        </Row>
      </MutationCountsSummaryCardBody>
    </Card>
  )
}
