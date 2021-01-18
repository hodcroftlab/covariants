import React, { useCallback, useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { replace } from 'connected-next-router'
import { ClusterButtonPanel } from 'src/components/ClusterButtonPanel/ClusterButtonPanel'
import { DefiningMutations } from 'src/components/Variants/DefiningMutations'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import dynamic from 'next/dynamic'

import { theme } from 'src/theme'
import { ClusterDatum, getClusters } from 'src/io/getClusters'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { Layout } from 'src/components/Layout/Layout'
import { Editable } from 'src/components/Common/Editable'
import { VariantsPageContainer } from 'src/components/Common/ClusterSidebarLayout'

import { ReactComponent as NextstrainIconBase } from 'src/assets/images/nextstrain_logo.svg'

import { PlotCard } from './PlotCard'
import { ProteinCard } from './ProteinCard'
import { ClusterContentLoading } from './ClusterContentLoading'

const EditableClusterContent = styled(Editable)``

const ClusterNameTitle = styled.h1`
  display: inline;
`

const ClusterNameSubtitle = styled.h2`
  display: inline;
`

const NextstrainIcon = styled(NextstrainIconBase)`
  display: inline;
  margin: auto;
  width: 25px;
  height: 25px;
`

const getClusterContent = (cluster: string) =>
  dynamic(() => import(`../../../../content/clusters/${cluster}.md`), { ssr: true, loading: ClusterContentLoading })

const clusters = getClusters()

const mapStateToProps = null

const mapDispatchToProps = {
  routerReplace: replace,
}

export const VariantsPage = connect(mapStateToProps, mapDispatchToProps)(VariantsPageDisconnected)

export interface VariantsPageBaseProps {
  defaultCluster: ClusterDatum
}

export interface VariantsPageProps extends VariantsPageBaseProps {
  routerReplace(url: string): void
}

export function VariantsPageDisconnected({ defaultCluster, routerReplace }: VariantsPageProps) {
  const [currentCluster, setCurrentCluster] = useState(defaultCluster)

  const switchCluster = useCallback(
    (cluster: ClusterDatum) => {
      routerReplace(`/variants/${cluster.build_name}`)
      setCurrentCluster(cluster)
    },
    [routerReplace],
  )

  useEffect(() => {
    routerReplace(`/variants/${defaultCluster.build_name}`)
  }, [defaultCluster.build_name, routerReplace])

  const ClusterContent = getClusterContent(currentCluster.build_name)

  return (
    <Layout>
      <VariantsPageContainer fluid>
        <Row noGutters>
          <Col>
            <h1 className="text-center">
              <ClusterNameTitle>{`Variant: ${currentCluster.display_name}`}</ClusterNameTitle>
              <span className="ml-2">
                {currentCluster.display_name2 && (
                  <ClusterNameSubtitle>{`(${currentCluster.display_name2})`}</ClusterNameSubtitle>
                )}
              </span>
            </h1>
          </Col>
        </Row>

        <Row noGutters>
          <Col lg={3} xl={2}>
            <ClusterButtonPanel clusters={clusters} currentCluster={currentCluster} switchCluster={switchCluster} />
          </Col>

          <Col lg={9} xl={10}>
            <EditableClusterContent githubUrl={`blob/master/content/clusters/${currentCluster.display_name}.md`}>
              <Row noGutters className="mb-3">
                <Col className="d-flex w-100">
                  <LinkExternal href={currentCluster.build_url} icon={<NextstrainIcon />} color={theme.link.dim.color}>
                    {`Dedicated ${currentCluster.display_name} Nextstrain build`}
                  </LinkExternal>
                </Col>
              </Row>

              <Row noGutters>
                <Col>
                  <Row noGutters>
                    <Col>
                      <h2>{'Defining mutations'}</h2>
                    </Col>
                  </Row>
                  <Row noGutters>
                    <Col>
                      <DefiningMutations cluster={currentCluster} />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row noGutters className="mb-2">
                <Col>
                  <ClusterContent />
                </Col>
              </Row>

              <Row noGutters className="mb-2">
                <Col>
                  <ProteinCard cluster={currentCluster} />
                </Col>
              </Row>

              <Row noGutters className="mb-2">
                <Col>
                  <PlotCard cluster={currentCluster} />
                </Col>
              </Row>
            </EditableClusterContent>
          </Col>
        </Row>
      </VariantsPageContainer>
    </Layout>
  )
}
