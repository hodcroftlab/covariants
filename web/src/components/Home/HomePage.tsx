import React, { useCallback } from 'react'

import { replace } from 'connected-next-router'
import { connect } from 'react-redux'
import { Col, Row } from 'reactstrap'

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
      <Row noGutters>
        <Col>
          <ClusterButtonPanel clusters={clusters} switchCluster={switchCluster} />
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <Editable githubUrl="blob/master/content/Home.md">
            <HomeContent />
          </Editable>
        </Col>
      </Row>
    </Layout>
  )
}
