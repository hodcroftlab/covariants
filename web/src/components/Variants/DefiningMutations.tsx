import React from 'react'

import styled from 'styled-components'

import type { ClusterDatum } from 'src/io/getClusters'
import { AminoacidMutationBadge, NucleotideMutationBadge } from 'src/components/Common/MutationBadge'
import { Row, Col } from 'reactstrap'

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`

const Li = styled.li`
  line-height: 1.33rem;
  padding: 0;
`

const H3 = styled.h3`
  font-size: 1.33rem;
`

export function NoMutations() {
  return <p>{'None. See notes below'}</p>
}

export interface DefiningMutationsProps {
  cluster: ClusterDatum
}

export function hasDefiningMutations(cluster: ClusterDatum) {
  return (
    cluster.mutations?.nonsynonymous?.length &&
    cluster.mutations?.nonsynonymous?.length > 0 &&
    cluster.mutations?.synonymous?.length &&
    cluster.mutations?.synonymous?.length > 0
  )
}

export function DefiningMutations({ cluster }: DefiningMutationsProps) {
  if (!cluster?.mutations) {
    return null
  }

  const hasNonsynonymous = cluster.mutations?.nonsynonymous?.length && cluster.mutations?.nonsynonymous?.length > 0
  const hasSynonymous = cluster.mutations?.synonymous?.length && cluster.mutations?.synonymous?.length > 0

  return (
    <Row noGutters>
      <Col className="mx-2">
        <H3>{'Nonsynonymous:'}</H3>
        {hasNonsynonymous ? (
          <Ul>
            {cluster.mutations?.nonsynonymous?.map((mutation) => (
              <Li key={`${mutation?.gene ?? ''}:${mutation.left}${mutation.pos}${mutation.right}`}>
                <AminoacidMutationBadge mutation={mutation} />
              </Li>
            ))}
          </Ul>
        ) : (
          <NoMutations />
        )}
      </Col>

      <Col className="mx-2">
        <H3>{'Synonymous:'}</H3>
        {hasSynonymous ? (
          <Ul>
            {cluster.mutations?.synonymous?.map((mutation) => (
              <Li key={`${mutation.left}${mutation.pos}${mutation.right}`}>
                <NucleotideMutationBadge mutation={mutation} />
              </Li>
            ))}
          </Ul>
        ) : (
          <NoMutations />
        )}
      </Col>
    </Row>
  )
}
