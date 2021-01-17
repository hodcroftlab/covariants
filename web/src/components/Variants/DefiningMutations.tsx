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
  line-height: 1rem;
  padding: 0;
`

const H3 = styled.h3`
  font-size: 1.33rem;
`

export interface DefiningMutationsProps {
  cluster: ClusterDatum
}

export function DefiningMutations({ cluster }: DefiningMutationsProps) {
  if (!cluster?.mutations) {
    return <p>{'None. See notes below'}</p>
  }

  const hasNonsynomous = cluster.mutations?.nonsynonymous?.length && cluster.mutations?.nonsynonymous?.length > 0
  const hasSynomous = cluster.mutations?.synonymous?.length && cluster.mutations?.synonymous?.length > 0

  return (
    <Row noGutters>
      <Col className="mx-2">
        <H3>{'Nonsynonymous:'}</H3>
        {hasNonsynomous ? (
          <Ul>
            {cluster.mutations?.nonsynonymous?.map((mutation) => (
              <Li>
                <AminoacidMutationBadge mutation={mutation} />
              </Li>
            ))}
          </Ul>
        ) : (
          <p>{'None. See notes below'}</p>
        )}
      </Col>

      <Col className="mx-2">
        <H3>{'Synonymous:'}</H3>
        {hasSynomous ? (
          <Ul>
            {cluster.mutations?.synonymous?.map((mutation) => (
              <Li>
                <NucleotideMutationBadge mutation={mutation} />
              </Li>
            ))}
          </Ul>
        ) : (
          <p>{'None. See notes below'}</p>
        )}
      </Col>
    </Row>
  )
}
