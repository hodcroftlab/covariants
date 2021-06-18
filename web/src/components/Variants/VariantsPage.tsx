import React, { useMemo } from 'react'

import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'

import { theme } from 'src/theme'
import type { ClusterDatum } from 'src/io/getClusters'
import { getClusterContent } from 'src/io/getClusterContent'
import { getClusterRedirects, getClusters } from 'src/io/getClusters'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { Layout } from 'src/components/Layout/Layout'
import { Editable } from 'src/components/Common/Editable'
import { VariantsPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { ClusterButtonPanel } from 'src/components/ClusterButtonPanel/ClusterButtonPanel'
import { DefiningMutations, hasDefiningMutations } from 'src/components/Variants/DefiningMutations'
import { VariantTitle } from 'src/components/Variants/VariantTitle'

import { ReactComponent as NextstrainIconBase } from 'src/assets/images/nextstrain_logo.svg'

import { PlotCard } from './PlotCard'
import { ProteinCard } from './ProteinCard'

const clusters = getClusters()
const clusterRedirects = getClusterRedirects()

const EditableClusterContent = styled(Editable)``

const NextstrainIcon = styled(NextstrainIconBase)`
  display: inline;
  margin: auto;
  width: 25px;
  height: 25px;
`

export function useCurrentClusterName(clusterName?: string) {
  const router = useRouter()

  if (clusterName) {
    const clusterNewName = clusterRedirects.get(clusterName)
    if (clusterNewName) {
      void router.replace(`/variants/${clusterNewName}`) // eslint-disable-line no-void
      return clusterNewName
    }
  }

  return clusterName
}

export interface VariantsPageProps {
  clusterName?: string
}

export function VariantsPage({ clusterName: clusterNameUnsafe }: VariantsPageProps) {
  const clusterName = useCurrentClusterName(clusterNameUnsafe)
  const currentCluster = useMemo(() => clusters.find((cluster) => cluster.build_name === clusterName), [clusterName])

  return (
    <Layout>
      <VariantsPageContainer fluid>
        <Row noGutters>
          <Col>
            <VariantTitle cluster={currentCluster} />
          </Col>
        </Row>

        <Row noGutters>
          <Col lg={3} xl={2}>
            <ClusterButtonPanel currentCluster={currentCluster} />
          </Col>

          {currentCluster && <VariantsPageContent currentCluster={currentCluster} />}
        </Row>
      </VariantsPageContainer>
    </Layout>
  )
}

export function VariantsPageContent({ currentCluster }: { currentCluster: ClusterDatum }) {
  const ClusterContent = getClusterContent(currentCluster.build_name)
  const showDefiningMutations = useMemo(() => hasDefiningMutations(currentCluster), [currentCluster])

  return (
    <>
      <Col lg={showDefiningMutations ? 7 : 9} xl={showDefiningMutations ? 8 : 10}>
        <EditableClusterContent githubUrl={`blob/master/content/clusters/${currentCluster.build_name}.md`}>
          <Row noGutters className="mb-3">
            <Col className="d-flex w-100">
              {currentCluster.nextstrain_url ? (
                <LinkExternal
                  href={currentCluster.nextstrain_url}
                  icon={<NextstrainIcon />}
                  color={theme.link.dim.color}
                >
                  {`Dedicated ${currentCluster.display_name} Nextstrain build`}
                </LinkExternal>
              ) : (
                <span>{'No dedicated Nextstrain build is available'}</span>
              )}
            </Col>
          </Row>

          <Row noGutters className="mb-2">
            <Col>
              <ClusterContent />
            </Col>
          </Row>

          <Row noGutters className="mb-2">
            <Col>
              <PlotCard cluster={currentCluster} />
            </Col>
          </Row>

          <Row noGutters className="mb-2">
            <Col>
              <ProteinCard cluster={currentCluster} />
            </Col>
          </Row>
        </EditableClusterContent>
      </Col>

      {showDefiningMutations && (
        <Col lg={2} xl={2}>
          <DefiningMutations cluster={currentCluster} />
        </Col>
      )}
    </>
  )
}
