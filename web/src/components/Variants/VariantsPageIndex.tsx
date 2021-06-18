import React from 'react'

import { Col, Row } from 'reactstrap'

import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'

import VariantsPageIntro from '../../../../content/VariantsPageIntro.md'
import { ClusterButtonPanelLayout } from '../ClusterButtonPanel/ClusterButtonPanelLayout'

export function VariantsPageIndex() {
  return (
    <Layout>
      <NarrowPageContainer>
        <Row noGutters>
          <Col>
            <h1 className="text-center">{'Overview of Variants/Mutations'}</h1>
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
