import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { MdxContent } from 'src/i18n/getMdxContent'
import { CenteredEditable } from 'src/components/Common/Editable'
import { PageHeading } from 'src/components/Common/PageHeading'
import { Layout } from 'src/components/Layout/Layout'

export function FaqPage() {
  return (
    <Layout>
      <Container>
        <Row noGutters>
          <Col>
            <PageHeading>{'Frequently asked questions'}</PageHeading>
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <CenteredEditable githubUrl="blob/master/content/Faq.md">
              <MdxContent filepath="Faq.md" />
            </CenteredEditable>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
