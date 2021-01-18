import React from 'react'

import { Col, Container, Row } from 'reactstrap'
import { Editable } from 'src/components/Common/Editable'

import { Layout } from 'src/components/Layout/Layout'
import styled from 'styled-components'

import Faq from '../../../../content/Faq.md'

export const FaqPageContainer = styled(Container)`
  max-width: 1200px;
`

export function FaqPage() {
  return (
    <Layout>
      <FaqPageContainer>
        <Row noGutters>
          <Col>
            <h1 className="text-center">{'Frequently asked questions'}</h1>
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <Editable githubUrl="blob/master/content/Faq.md">
              <Faq />
            </Editable>
          </Col>
        </Row>
      </FaqPageContainer>
    </Layout>
  )
}
