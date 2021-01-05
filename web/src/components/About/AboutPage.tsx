import React from 'react'

import { Col, Row } from 'reactstrap'

import { Editable } from 'src/components/Common/Editable'
import { PROJECT_NAME } from 'src/constants'
import { Layout } from 'src/components/Layout/Layout'

import About from '../../../../content/About.md'

export function AboutPage() {
  return (
    <Layout>
      <Row noGutters>
        <Col>
          <h1>{`About ${PROJECT_NAME}`}</h1>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <Editable githubUrl="blob/master/content/About.md">
            <About />
          </Editable>
        </Col>
      </Row>
    </Layout>
  )
}
