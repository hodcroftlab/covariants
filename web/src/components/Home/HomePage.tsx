import React from 'react'

import { Col, Row } from 'reactstrap'
import { ClusterButtonPanelLayout } from 'src/components/ClusterButtonPanel/ClusterButtonPanelLayout'

import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { Editable } from 'src/components/Common/Editable'

import HomeContent from '../../../../content/Home.md'

export function HomePage() {
  return (
    <NarrowPageContainer>
      <Row noGutters>
        <Col>
          <h1 className="display-4 mb-4 text-center">CoVariants</h1>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <ClusterButtonPanelLayout>
            <Editable>
              <HomeContent />
            </Editable>
          </ClusterButtonPanelLayout>
        </Col>
      </Row>
    </NarrowPageContainer>
  )
}
