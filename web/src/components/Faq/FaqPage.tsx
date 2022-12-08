import React from 'react'

import { Col, Container, Row } from 'reactstrap'
import { CenteredEditable } from 'src/components/Common/Editable'
import { PageHeading } from 'src/components/Common/PageHeading'

import Faq from '../../../../content/Faq.md'

export function FaqPage() {
  return (
    <Container>
      <Row noGutters>
        <Col>
          <PageHeading>{'Frequently asked questions'}</PageHeading>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <CenteredEditable githubUrl="blob/master/content/Faq.md">
            <Faq />
          </CenteredEditable>
        </Col>
      </Row>
    </Container>
  )
}
