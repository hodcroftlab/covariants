import React from 'react'

import { Col, Row } from 'reactstrap'

import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'
import { PageHeading } from 'src/components/Common/PageHeading'

import VariantsPageIntro from '../../../../content/VariantsPageIntro.md'
import { ClusterButtonPanelLayout } from '../ClusterButtonPanel/ClusterButtonPanelLayout'

export function VariantsPageIndex() {
  return (
    <Layout>
      <NarrowPageContainer>
        <Row noGutters>
          <Col>
            <PageHeading>{'Overview of Variants/Mutations'}</PageHeading>
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <ClusterButtonPanelLayout>
              <Editable githubUrl="blob/master/content/VariantsPageIntro.md">
                <VariantsPageIntro />
              </Editable>
            </ClusterButtonPanelLayout>
          </Col>
        </Row>
      </NarrowPageContainer>
    </Layout>
  )
}
