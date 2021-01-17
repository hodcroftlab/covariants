import React, { useCallback } from 'react'

import { replace } from 'connected-next-router'
import { connect } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { VariantsPageContainer } from 'src/components/Common/ClusterSidebarLayout'

import { ClusterDatum, getClusters } from 'src/io/getClusters'

import { ClusterButtonPanel } from 'src/components/ClusterButtonPanel/ClusterButtonPanel'
import { Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'

import HomeContent from '../../../../content/Home.md'

const clusters = getClusters()

const mapStateToProps = null

const mapDispatchToProps = {
  routerReplace: replace,
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageDisconnected)

export interface HomePagePageProps {
  routerReplace(url: string): void
}

export function HomePageDisconnected({ routerReplace }: HomePagePageProps) {
  const switchCluster = useCallback(
    (cluster: ClusterDatum) => {
      routerReplace(`/variants/${cluster.build_name}`)
    },
    [routerReplace],
  )

  return (
    <Layout>
      <VariantsPageContainer fluid>
        <Row noGutters>
          <Col>
            <h1 className="text-center">{'CoVariants'}</h1>
          </Col>
        </Row>

        <Row noGutters>
          <Col lg={3} xl={2}>
            <ClusterButtonPanel clusters={clusters} switchCluster={switchCluster} />
          </Col>

          <Col lg={9} xl={10}>
            <Editable githubUrl="blob/master/content/Home.md">
              <HomeContent />
            </Editable>
          </Col>
        </Row>
      </VariantsPageContainer>
    </Layout>
  )
}
