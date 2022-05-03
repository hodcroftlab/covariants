import React from 'react'

import { Col, Container, Row } from 'reactstrap'
import styled from 'styled-components'

import { CenteredEditable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'

import SharedMutationsIntro from '../../../../content/SharedMutations.md'
import { SharedMutations } from './SharedMutations'
import { PageHeading } from '../Common/PageHeading'

export const SharedMutationsPageContainer = styled(Container)``

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
    <Layout wide>
      <SharedMutationsPageContainer fluid>
        <Row noGutters>
          <Col>
            <PageHeading>{'Shared mutations'}</PageHeading>
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <CenteredEditable githubUrl="blob/master/content/SharedMutations.md">
              <SharedMutationsIntro />
            </CenteredEditable>
          </Col>
        </Row>

        <Row noGutters>
          <Col className="pb-10">
            <SharedMutationsWrapper>
              <SharedMutations />
            </SharedMutationsWrapper>
          </Col>
        </Row>
      </SharedMutationsPageContainer>
    </Layout>
  )
}
