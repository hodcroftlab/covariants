import React, { ReactNode, useMemo } from 'react'

import { Table as TableBase, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import styled from 'styled-components'

import { LinkExternal } from 'src/components/Link/LinkExternal'
import type { NameTableDatum, NameTableEntry } from 'src/io/getNameTable'
import { NAME_TABLE } from 'src/io/getNameTable'
import { Var } from './MutationBadge'

const Table = styled(TableBase)`
  max-width: 700px;
  margin: auto;
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
    text-align: center;
    height: 3rem;
  }

  & > tbody > tr > td {
    text-align: center;
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
        lineages.map<ReactNode>((entry) => <NameTableEntryComponent key={entry.name} entry={entry} />),
      ),
    [lineages],
  )

  const otherEntries = useMemo(
    () =>
      joinWithCommas(
        others.map<ReactNode>((entry) => <NameTableEntryComponent key={entry.name} entry={entry} />),
      ),
    [others],
  )

  return (
    <Tr>
      <Td>
        <Var name={clade} prefix="" />
      </Td>
      <Td>{lineageEntries}</Td>
      <Td>{who}</Td>
      <Td>{otherEntries}</Td>
    </Tr>
  )
}

export function NameTable() {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>{'Nextstrain Clade'}</Th>
          <Th>{'Pango Lineage'}</Th>
          <Th>
            <LinkExternal href="https://www.who.int/en/activities/tracking-SARS-CoV-2-variants/">
              {'WHO Label'}
            </LinkExternal>
          </Th>
          <Th>{'Other Names'}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {NAME_TABLE.map((datum) => (
          <NameTableRow key={datum.clade} datum={datum} />
        ))}
      </Tbody>
    </Table>
  )
}
