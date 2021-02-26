import React from 'react'

import { Col, Row } from 'reactstrap'

import { ClusterButtonPanel } from 'src/components/ClusterButtonPanel/ClusterButtonPanel'
import { VariantsPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'

import HomeContent from '../../../../content/Home.md'

export function HomePage() {
  return (
    <Layout>
      <VariantsPageContainer fluid>
        <Row noGutters>
          <Col>
            <h1 className="text-center">{'CoVariants'}</h1>
          </Col>
        </Row>

        <Row noGutters>
          <Col lg={3} xl={2}>
            <ClusterButtonPanel />
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
