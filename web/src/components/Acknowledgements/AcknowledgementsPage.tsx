import React from 'react'

import styled from 'styled-components'
import { Col, Container, Row } from 'reactstrap'

import { getClusters } from 'src/io/getClusters'
import { Layout } from 'src/components/Layout/Layout'
import { AcknowledgementsCard } from 'src/components/Acknowledgements/AcknowledgementsCard'

import AcknowledgementsContent from './AcknowledgementsContent.md'

export const AcknowledgementsPageContainer = styled(Container)`
  max-width: 1200px;
`

const clusters = getClusters()

export function AcknowledgementsPage() {
  return (
    <Layout>
      <AcknowledgementsPageContainer>
        <Row noGutters>
          <Col>
            <h1 className="text-center">{'Acknowledgements'}</h1>
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <AcknowledgementsContent />
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            {clusters.map((cluster) => (
              <AcknowledgementsCard key={cluster.build_name} cluster={cluster} />
            ))}
          </Col>
        </Row>
      </AcknowledgementsPageContainer>
    </Layout>
  )
}
