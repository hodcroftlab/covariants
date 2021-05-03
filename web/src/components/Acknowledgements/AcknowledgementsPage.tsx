import React from 'react'

import styled from 'styled-components'
import { Col, Container, Row } from 'reactstrap'

import { getClusters } from 'src/io/getClusters'
import { getAcknowledgementsKeys } from 'src/io/getClusterEpiIslsNumChunks'
import { Layout } from 'src/components/Layout/Layout'
import { AcknowledgementsCard } from 'src/components/Acknowledgements/AcknowledgementsCard'

import AcknowledgementsContent from './AcknowledgementsContent.md'

export const AcknowledgementsPageContainer = styled(Container)`
  max-width: 1200px;
  padding: 0 0.5rem;
`

const clusters = getClusters()

const acknowledgementsKeys = getAcknowledgementsKeys()

export function AcknowledgementsPage() {
  const clustersWithAcks = clusters.filter((cluster) => acknowledgementsKeys.has(cluster.build_name))

  return (
    <Layout>
      <AcknowledgementsPageContainer>
        <Row>
          <Col>
            <h1 className="text-center">{'Acknowledgements'}</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <AcknowledgementsContent />
          </Col>
        </Row>

        <Row>
          <Col>
            {clustersWithAcks.map((cluster) => (
              <AcknowledgementsCard key={cluster.build_name} cluster={cluster} />
            ))}
          </Col>
        </Row>
      </AcknowledgementsPageContainer>
    </Layout>
  )
}
