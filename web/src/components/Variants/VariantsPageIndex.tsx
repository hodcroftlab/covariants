import React from 'react'

import { Col, Row } from 'reactstrap'
import { ClusterButtonPanel } from 'src/components/ClusterButtonPanel/ClusterButtonPanel'

import { VariantsPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { Editable } from 'src/components/Common/Editable'
import { NameTable } from 'src/components/Common/NameTable'
import { Layout } from 'src/components/Layout/Layout'

import VariantsPageIntro from '../../../../content/VariantsPageIntro.md'

export function VariantsPageIndex() {
  return (
    <Layout>
      <VariantsPageContainer fluid>
        <Row noGutters>
          <Col>
            <h1 className="text-center">{'Overview of Variants/Mutations'}</h1>
          </Col>
        </Row>

        <Row noGutters>
          <Col lg={3} xl={2}>
            <ClusterButtonPanel currentCluster={undefined} />
          </Col>

          <Col lg={8} xl={10}>
            <Row noGutters>
              <Col>
                <Editable githubUrl="blob/master/content/VariantsPageIntro.md">
                  <VariantsPageIntro />
                </Editable>
                <Editable>
                  <NameTable />
                </Editable>
              </Col>
            </Row>
          </Col>
        </Row>
      </VariantsPageContainer>
    </Layout>
  )
}
