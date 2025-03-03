import React, { ReactNode, Suspense, useMemo } from 'react'

import { Table as TableBase, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { styled } from 'styled-components'

import { ErrorBoundary } from 'react-error-boundary'
import { WhoBadge } from './Badges/WhoBadge'
import { VariantBadge } from './Badges/VariantBadge'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { NameTableDatum, NameTableEntry, useNameTable } from 'src/io/useNameTable'
import { FetchError } from 'src/components/Error/FetchError'
import { LOADING } from 'src/components/Loading/Loading'
import { LineageBadge } from 'src/components/Common/Badges/LineageBadge'

const Table = styled(TableBase)`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;

  & > thead > tr,
  & > tbody > tr,
  & > tbody > td {
    border: #aaa solid 1px;
    border-collapse: collapse;
  }

  & > tbody > tr:nth-child(even) {
    background-color: white;
  }

  & > tbody > tr:nth-child(odd) {
    background-color: #f5f5f5;
  }

  & > thead > tr > th {
    font-size: 0.9rem;
    text-align: center;
    height: 3rem;
    border: #aaa solid 1px;
  }

  & > tbody > tr > td {
    font-family: ${(props) => props.theme.font.monospace};
    font-size: 0.8rem;
    text-align: left;
    border: #aaa solid 1px;
    min-width: 100px;
    padding: 2px;
  }
`

export function joinWithCommas(elems: ReactNode[]): ReactNode {
  if (elems.length === 0) {
    return ' '
  }

  return elems.reduce((prev, curr) => [prev, ', ', curr])
}

export interface NameTableEntryProps {
  entry: NameTableEntry
}

export function NameTableEntryComponent({ entry }: NameTableEntryProps) {
  const { name, url } = entry

  if (!url) {
    return <span>{name}</span>
  }

  return <LinkExternal href={url}>{name}</LinkExternal>
}

export interface NameTableRowProps {
  datum: NameTableDatum
}

export function NameTableRow({ datum }: NameTableRowProps) {
  const { clade, lineages, who, others } = datum

  const lineageEntries = useMemo(
    () =>
      joinWithCommas(
        lineages.map<ReactNode>((entry) => (
          <LineageBadge key={entry.name} name={entry.name} href={entry.url ?? undefined} prefix="" />
        )),
      ),
    [lineages],
  )

  const otherEntries = useMemo(
    () => joinWithCommas(others.map<ReactNode>((entry) => <NameTableEntryComponent key={entry.name} entry={entry} />)),
    [others],
  )

  return (
    <Tr>
      <Td>
        <VariantBadge name={clade} prefix="" />
      </Td>
      <Td>{lineageEntries}</Td>
      <Td>{who && <WhoBadge name={who} />}</Td>
      <Td>{otherEntries}</Td>
    </Tr>
  )
}

export function NameTableRaw() {
  const { t } = useTranslationSafe()
  const nameTable = useNameTable()

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>{t('{{nextstrain}} Clade', { nextstrain: 'Nextstrain' })}</Th>
          <Th>{t('Pango Lineage')}</Th>
          <Th>
            <LinkExternal href="https://www.who.int/en/activities/tracking-SARS-CoV-2-variants/">
              {t('WHO Label')}
            </LinkExternal>
          </Th>
          <Th>{t('Other')}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {nameTable.map((datum) => (
          <NameTableRow key={datum.clade} datum={datum} />
        ))}
      </Tbody>
    </Table>
  )
}

// Wrap component in error boundary here because it is used in .md file
export function NameTable() {
  return (
    <ErrorBoundary FallbackComponent={FetchError}>
      <Suspense fallback={LOADING}>
        <NameTableRaw />
      </Suspense>
    </ErrorBoundary>
  )
}
