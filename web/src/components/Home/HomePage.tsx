import React from 'react'

import { Col, Row } from 'reactstrap'

import { Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'

import HomeContent from '../../../../content/Home.md'

export function HomePage() {
  return (
    <Layout>
      <Row noGutters>
        <Col>
          <h1>{'Covariants'}</h1>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <Editable githubUrl="blob/master/content/Home.md">
            <HomeContent />
          </Editable>
        </Col>
      </Row>
    </Layout>
  )
}
