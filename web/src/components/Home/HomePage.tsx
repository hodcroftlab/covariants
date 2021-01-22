import React from 'react'

import { Col, Row } from 'reactstrap'

import { getClusters } from 'src/io/getClusters'

import { ClusterButtonPanel } from 'src/components/ClusterButtonPanel/ClusterButtonPanel'
import { VariantsPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { MutationComparison } from 'src/components/MutationComparison/MutationComparison'
import { Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'

import HomeContent from '../../../../content/Home.md'

const clusters = getClusters()

export function HomePage() {
  return (
    <Layout>
      <VariantsPageContainer fluid>
        <Row noGutters>
          <Col>
            <MutationComparison />
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <h1 className="text-center">{'CoVariants'}</h1>
          </Col>
        </Row>

        <Row noGutters>
          <Col lg={3} xl={2}>
            <ClusterButtonPanel clusters={clusters} />
          </Col>

          <Col lg={9} xl={10}>
            <Editable githubUrl="blob/master/content/Home.md">
              <HomeContent />
            </Editable>
          </Col>
        </Row>
      </VariantsPageContainer>
    </Layout>
  )
}
