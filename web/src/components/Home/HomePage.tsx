import React from 'react'

import { Col, Row } from 'reactstrap'
import { ClusterButtonPanelLayout } from 'src/components/ClusterButtonPanel/ClusterButtonPanelLayout'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'
import { MdxContent } from 'src/i18n/getMdxContent'

export function HomePage() {
  return (
    <Layout>
      <NarrowPageContainer>
        <Row className={'gx-0'}>
          <Col>
            <h1 className="display-4 mb-4 text-center">CoVariants</h1>
          </Col>
        </Row>

        <Row className={'gx-0'}>
          <Col>
            <ClusterButtonPanelLayout>
              <Editable>
                <MdxContent filepath="Home.md" />
              </Editable>
            </ClusterButtonPanelLayout>
          </Col>
        </Row>
      </NarrowPageContainer>
    </Layout>
  )
}
