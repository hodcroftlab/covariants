import React, { useMemo } from 'react'

import { useRouter } from 'next/router'
import { ClusterButtonPanelLayout } from 'src/components/ClusterButtonPanel/ClusterButtonPanelLayout'
import { MutationCountsSummaryCard } from 'src/components/MutationCounts/MutationCountsSummaryCard'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'

import { theme } from 'src/theme'
import type { ClusterDatum } from 'src/io/getClusters'
import { getClusterContent } from 'src/io/getClusterContent'
import { getClusterRedirects, getClusters } from 'src/io/getClusters'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { Layout } from 'src/components/Layout/Layout'
import { Editable } from 'src/components/Common/Editable'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { DefiningMutations, hasDefiningMutations } from 'src/components/Variants/DefiningMutations'
import { VariantTitle } from 'src/components/Variants/VariantTitle'

import NextstrainIconBase from 'src/assets/images/nextstrain_logo.svg'

import { PlotCard } from './PlotCard'
import { ProteinCard } from './ProteinCard'

const clusters = getClusters()
const clusterRedirects = getClusterRedirects()

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 991.98px) {
    flex-direction: column;
  }
`

const FlexFixed = styled.div`
  flex: 0 0 180px;
  display: flex;

  @media (max-width: 991.98px) {
    flex: 1 0;
  }
`

const FlexGrowing = styled.div`
  display: flex;
  flex: 1 0;
`

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
      <NarrowPageContainer>
        <VariantTitle cluster={currentCluster} />

        <ClusterButtonPanelLayout currentCluster={currentCluster}>
          {currentCluster && <VariantsPageContent currentCluster={currentCluster} />}
        </ClusterButtonPanelLayout>
      </NarrowPageContainer>
    </Layout>
  )
}

const NEXTSTRAIN_ICON = <NextstrainIcon />

export function VariantsPageContent({ currentCluster }: { currentCluster: ClusterDatum }) {
  const ClusterContent = getClusterContent(currentCluster.build_name)
  const showDefiningMutations = useMemo(() => hasDefiningMutations(currentCluster), [currentCluster])

  return (
    <FlexContainer>
      <FlexGrowing>
        <EditableClusterContent githubUrl={`blob/master/content/clusters/${currentCluster.build_name}.md`}>
          <Row noGutters className="mb-3">
            <Col className="d-flex w-100">
              {currentCluster.nextstrain_url ? (
                <LinkExternal href={currentCluster.nextstrain_url} icon={NEXTSTRAIN_ICON} color={theme.link.dim.color}>
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

          <Row noGutters>
            <Col>
              <MutationCountsSummaryCard currentCluster={currentCluster} />
            </Col>
          </Row>

          <Row noGutters className="mb-2">
            <Col>
              <ProteinCard cluster={currentCluster} />
            </Col>
          </Row>
        </EditableClusterContent>
      </FlexGrowing>

      {showDefiningMutations && (
        <FlexFixed>
          <DefiningMutations cluster={currentCluster} />
        </FlexFixed>
      )}
    </FlexContainer>
  )
}
