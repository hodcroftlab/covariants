import React from 'react'

import { Col, Container, Row } from 'reactstrap'
import styled from 'styled-components'

import { Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'

import SharedMutationsIntro from '../../../../content/SharedMutations.md'
import { SharedMutations } from './SharedMutations'

export const SharedMutationsPageContainer = styled(Container)`
  max-width: 1200px;
`

export const SharedMutationsWrapper = styled.div`
  display: block;
  flex: 0;
  overflow-x: auto;
`

export const SharedMutationsWrapperInner = styled.div`
  flex: 1;
`

export function SharedMutationsPage() {
  return (
    <Layout>
      <SharedMutationsPageContainer>
        <Row noGutters>
          <Col>
            <h1 className="text-center">{'Shared mutations'}</h1>
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <Editable githubUrl="blob/master/content/SharedMutations.md">
              <SharedMutationsIntro />
            </Editable>
          </Col>
        </Row>

        <Row noGutters>
          <Col className="pb-10">
            <Editable githubUrl="blob/master/scripts" text={'View data generation scripts'}>
              <SharedMutationsWrapper>
                <SharedMutations />
              </SharedMutationsWrapper>
            </Editable>
          </Col>
        </Row>
      </SharedMutationsPageContainer>
    </Layout>
  )
}
