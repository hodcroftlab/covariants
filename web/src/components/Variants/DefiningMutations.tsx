import React from 'react'

import styled from 'styled-components'

import type { ClusterDatum } from 'src/io/getClusters'
import { AminoacidMutationBadge, NucleotideMutationBadge } from 'src/components/Common/MutationBadge'
import { Row, Col } from 'reactstrap'

const Container = styled.div`
  width: 100%;
  margin: 10px 5px;
  padding: 0.65rem 1rem;
  box-shadow: ${(props) => props.theme.shadows.light};
  border-radius: 3px;
`

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`

const Li = styled.li`
  line-height: 1.33rem;
  padding: 0;
`

const H3 = styled.h3`
  font-size: 1.2rem;
`

const H4 = styled.h4`
  font-size: 1rem;
`

export function NoMutations() {
  return <p>{'None. See notes below'}</p>
}

export interface DefiningMutationsProps {
  cluster: ClusterDatum
}

export function hasDefiningMutations(cluster: ClusterDatum) {
  // prettier-ignore
  const hasNonsynonymous =
    cluster.mutations?.nonsynonymous?.length !== undefined &&
    cluster.mutations?.nonsynonymous?.length > 0;

  // prettier-ignore
  const hasSynonymous =
    cluster.mutations?.synonymous?.length !== undefined &&
    cluster.mutations?.synonymous?.length > 0;

  return hasNonsynonymous || hasSynonymous
}

export function DefiningMutations({ cluster }: DefiningMutationsProps) {
  if (!cluster?.mutations) {
    return null
  }

  const hasNonsynonymous = cluster.mutations?.nonsynonymous?.length && cluster.mutations?.nonsynonymous?.length > 0
  const hasSynonymous = cluster.mutations?.synonymous?.length && cluster.mutations?.synonymous?.length > 0

  return (
    <Container>
      <Row noGutters>
        <Col>
          <H3>{'Defining mutations'}</H3>
        </Col>
      </Row>

      <Row noGutters>
        <Col className="my-2">
          <H4>{'Nonsynonymous'}</H4>
          {hasNonsynonymous ? (
            <Ul>
              {cluster.mutations?.nonsynonymous?.map((mutation) => (
                <Li key={`${mutation?.gene ?? ''}:${mutation.left ?? ''}${mutation.pos ?? ''}${mutation.right ?? ''}`}>
                  <AminoacidMutationBadge mutation={mutation} />
                </Li>
              ))}
            </Ul>
          ) : (
            <NoMutations />
          )}
        </Col>

        <Col className="my-2">
          <H4>{'Synonymous'}</H4>
          {hasSynonymous ? (
            <Ul>
              {cluster.mutations?.synonymous?.map((mutation) => (
                <Li key={`${mutation.left ?? ''}${mutation.pos ?? ''}${mutation.right ?? ''}`}>
                  <NucleotideMutationBadge mutation={mutation} />
                </Li>
              ))}
            </Ul>
          ) : (
            <NoMutations />
          )}
        </Col>
      </Row>
    </Container>
  )
}
