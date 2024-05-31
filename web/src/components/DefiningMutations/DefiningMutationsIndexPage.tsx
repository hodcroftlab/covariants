import React from 'react'
import { Col, Row } from 'reactstrap'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { DefiningMutationsClusterIndexTableWithSearch } from 'src/components/DefiningMutations/DefiningMutationsClusterIndexTable'
import { Layout } from 'src/components/Layout/Layout'
import { MdxContent } from 'src/i18n/getMdxContent'
import { getDefMutClusters } from 'src/io/getDefiningMutationsClusters'

const clusters = getDefMutClusters()

export default function DefiningMutationsIndexPage() {
  return (
    <Layout>
      <NarrowPageContainer>
        <Row noGutters>
          <Col>
            <MdxContent filepath="DefiningMutationsIndexIntro.mdx" />
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <DefiningMutationsClusterIndexTableWithSearch clusters={clusters} />
          </Col>
        </Row>
      </NarrowPageContainer>
    </Layout>
  )
}
