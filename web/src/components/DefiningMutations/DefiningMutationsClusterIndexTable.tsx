import { isEmpty } from 'lodash'
import { transparentize } from 'polished'
import React, { useMemo, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { getClusters } from 'src/io/getClusters'
import styled from 'styled-components'
import { AMINOACID_COLORS } from 'src/colors'
import { search } from 'src/helpers/search'
import { Table as TableBase, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import {
  variantToObjectAndString,
  MutationBadge,
  LinkUnstyled,
  LineageBadge,
} from 'src/components/Common/MutationBadge'
import { DefMutClusterIndexDatum } from 'src/io/getDefiningMutationsClusters'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { SearchBox } from 'src/components/Common/SearchBox'

const clusters = getClusters()

export const Table = styled(TableBase)`
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

  & > tbody > tr:hover {
    background-color: ${(props) => transparentize(0.8)(props.theme.green)};
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

export interface DefiningMutationsClusterIndexTableRowProps {
  cluster: DefMutClusterIndexDatum
}

export function DefiningMutationsClusterIndexTableRow({ cluster }: DefiningMutationsClusterIndexTableRowProps) {
  const { lineage, nextstrainClade } = cluster

  const variant = useMemo(() => {
    const cl = clusters.find((cl) => cl.nextstrain_name === nextstrainClade)
    const { mutationObj: variant } = variantToObjectAndString(cl?.display_name ?? nextstrainClade)
    if (!variant) {
      return { parent: nextstrainClade }
    }
    return variant
  }, [nextstrainClade])

  return (
    <Tr>
      <Td>
        <LinkUnstyled href={`/defining-mutations/${lineage}`} icon={null} className="d-flex">
          <span className="w-100">
            <MutationBadge prefix="" mutation={variant} colors={AMINOACID_COLORS} />
          </span>
        </LinkUnstyled>
      </Td>
      <Td>
        <LinkUnstyled href={`/defining-mutations/${lineage}`} icon={null} className="d-flex">
          <span className="w-100">
            <LineageBadge name={lineage} prefix="" />
          </span>
        </LinkUnstyled>
      </Td>
    </Tr>
  )
}

export function DefiningMutationsClusterIndexTable({ clusters }: { clusters: DefMutClusterIndexDatum[] }) {
  const { t } = useTranslationSafe()

  const rows = useMemo(() => {
    if (isEmpty(clusters)) {
      return (
        <Tr>
          <Td colspan={2}>
            <div className="d-flex">
              <p className="my-1 mx-auto">{t('Nothing found')}</p>
            </div>
          </Td>
        </Tr>
      )
    }
    return clusters.map((cluster) => <DefiningMutationsClusterIndexTableRow key={cluster.lineage} cluster={cluster} />)
  }, [clusters, t])

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>{t('{{nextstrain}} Clade', { nextstrain: 'Nextstrain' })}</Th>
          <Th>{t('Pango Lineage')}</Th>
        </Tr>
      </Thead>
      <Tbody>{rows}</Tbody>
    </Table>
  )
}

export function DefiningMutationsClusterIndexTableWithSearch({ clusters }: { clusters: DefMutClusterIndexDatum[] }) {
  const { t } = useTranslationSafe()
  const [searchTerm, setSearchTerm] = useState('')

  const clustersFiltered = useMemo(() => {
    if (searchTerm.trim().length === 0) {
      return clusters
    }

    const { itemsStartWith, itemsInclude } = search(clusters, searchTerm, (cluster) => [
      cluster.lineage,
      cluster.nextstrainClade,
    ])

    return [...itemsStartWith, ...itemsInclude]
  }, [clusters, searchTerm])

  return (
    <WrapperOuter>
      <WrapperInner>
        <Row noGutters className="my-2">
          <Col>
            <SearchBox
              searchTitle={t('Search clades & lineages')}
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
            />
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <DefiningMutationsClusterIndexTable clusters={clustersFiltered} />
          </Col>
        </Row>

        <Row noGutters>
          <Col className="d-flex">
            <p className="my-1 mx-auto small">
              {t('Showing {{num}}/{{total}} rows', {
                num: clustersFiltered.length,
                total: clusters.length,
              })}
            </p>
          </Col>
        </Row>
      </WrapperInner>
    </WrapperOuter>
  )
}

const WrapperOuter = styled.div`
  display: flex;
`

const WrapperInner = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 500px;
`
