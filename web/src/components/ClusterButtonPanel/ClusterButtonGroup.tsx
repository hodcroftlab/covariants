import React, { useMemo, useState } from 'react'

import styled from 'styled-components'
import { Button, Col, Container, Row } from 'reactstrap'

import type { ClusterDatum } from 'src/io/getClusters'
import { ClusterButton } from 'src/components/ClusterButtonPanel/ClusterButton'

const ClusterGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
`

const ShowMoreButton = styled(Button)`
  margin: 0 auto;
`

export interface ClusterButtonArrayProps {
  cluster: ClusterDatum
  isCurrent: boolean
  showNonImportant: boolean
}

export function ClusterButtonOptional({ cluster, isCurrent, showNonImportant }: ClusterButtonArrayProps) {
  const shouldShow = useMemo(
    // prettier-ignore
    () => cluster.important || showNonImportant || isCurrent,
    [cluster.important, isCurrent, showNonImportant],
  )

  if (!shouldShow) {
    return null
  }

  return <ClusterButton key={cluster.display_name} cluster={cluster} isCurrent={isCurrent} />
}

export interface ClusterButtonGroupProps {
  clusterGroup: ClusterDatum[]
  currentCluster?: ClusterDatum
}

export function ClusterButtonGroup({ clusterGroup, currentCluster }: ClusterButtonGroupProps) {
  const [showNonImportant, setShowNonImportant] = useState(false)
  const toggleShowNonImportant = useMemo(() => (_: unknown) => setShowNonImportant(!showNonImportant), [showNonImportant]) // prettier-ignore

  return (
    <Container>
      <Row noGutters>
        <Col>
          <ClusterGroupContainer>
            {clusterGroup.map((cluster) => (
              <ClusterButtonOptional
                key={cluster.build_name}
                cluster={cluster}
                isCurrent={cluster.display_name === currentCluster?.display_name}
                showNonImportant={showNonImportant}
              />
            ))}
          </ClusterGroupContainer>
        </Col>
      </Row>

      <Row noGutters>
        <Col className="d-flex">
          <ShowMoreButton type="button" color="link" onClick={toggleShowNonImportant}>
            {showNonImportant ? 'Show less' : 'Show more'}
          </ShowMoreButton>
        </Col>
      </Row>
    </Container>
  )
}
