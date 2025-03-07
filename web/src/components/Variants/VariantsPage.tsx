import React, { Suspense, useEffect, useMemo } from 'react'

import { useRouter } from 'next/router'
import { styled } from 'styled-components'
import { Col, Row } from 'reactstrap'
import { ErrorBoundary } from 'react-error-boundary'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { PlotCard } from './PlotCard'
import { AquariaLinksCard } from './AquariaLinksCard'
import { ProteinCard } from './ProteinCard'
import { ClusterButtonPanelLayout } from 'src/components/ClusterButtonPanel/ClusterButtonPanelLayout'
import { MutationCountsSummaryCard } from 'src/components/MutationCounts/MutationCountsSummaryCard'

import { theme } from 'src/theme'
import { MdxContent } from 'src/i18n/getMdxContent'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { ClusterDatum } from 'src/io/getClusters'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { Layout } from 'src/components/Layout/Layout'
import { Editable } from 'src/components/Common/Editable'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { DefiningMutations, hasDefiningMutations } from 'src/components/Variants/DefiningMutations'
import { VariantTitle } from 'src/components/Variants/VariantTitle'

import NextstrainIconBase from 'src/assets/images/nextstrain_logo.svg'
import { FetchError } from 'src/components/Error/FetchError'
import { LOADING } from 'src/components/Loading/Loading'
import {
  clusterLineageToBuildNameMapSelector,
  clusterPangoLineageMapSelector,
  clusterRedirectsSelector,
  hasPageClustersSelector,
} from 'src/state/Clusters'
import { enablePangolinAtom } from 'src/state/Nomenclature'

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

export function useDeriveCurrentClusterNameFromUrl(clusterName?: string): {
  clusterBuildName: string | undefined
  enablePangolinFromUrl: boolean
} {
  const router = useRouter()
  const clusterRedirects = useRecoilValue(clusterRedirectsSelector)
  const lineageToBuildName = useRecoilValue(clusterLineageToBuildNameMapSelector)

  if (clusterName) {
    const clusterNewName = clusterRedirects.get(clusterName)
    if (clusterNewName) {
      void router.replace(`/variants/${clusterNewName}`)
      return { clusterBuildName: clusterNewName, enablePangolinFromUrl: false }
    }
    const clusterBuildName = lineageToBuildName.get(clusterName)
    if (clusterBuildName) {
      return { clusterBuildName: clusterBuildName, enablePangolinFromUrl: true }
    }
  }

  return {
    clusterBuildName: clusterName,
    enablePangolinFromUrl: false,
  }
}

export interface VariantsPageProps {
  clusterName?: string
}

export function VariantsPage({ clusterName: clusterNameUnsafe }: VariantsPageProps) {
  const { clusterBuildName, enablePangolinFromUrl } = useDeriveCurrentClusterNameFromUrl(clusterNameUnsafe)
  const setEnablePangolin = useSetRecoilState(enablePangolinAtom)
  useEffect(() => setEnablePangolin(enablePangolinFromUrl), [enablePangolinFromUrl, setEnablePangolin])
  const clusters = useRecoilValue(hasPageClustersSelector)
  const currentCluster = useMemo(
    () => clusters.find((cluster) => cluster.buildName === clusterBuildName),
    [clusterBuildName, clusters],
  )

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
  const { t } = useTranslationSafe()
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineageMap = useRecoilValue(clusterPangoLineageMapSelector)
  const pangoName = pangoLineageMap.get(currentCluster.displayName) ?? currentCluster.displayName

  const ClusterContent = useMemo(
    () => <MdxContent filepath={`clusters/${currentCluster.buildName}.md`} />,
    [currentCluster.buildName],
  )
  const showDefiningMutations = useMemo(() => hasDefiningMutations(currentCluster), [currentCluster])

  const AquariaSection = useMemo(() => {
    return (
      (currentCluster.aquariaUrls?.length ?? 0) > 0 && (
        <Row className="mb-2 gx-0">
          <Col>
            <AquariaLinksCard cluster={currentCluster} />
          </Col>
        </Row>
      )
    )
  }, [currentCluster])

  return (
    <FlexContainer>
      <FlexGrowing>
        <EditableClusterContent githubUrl={`blob/master/content/clusters/${currentCluster.buildName}.md`}>
          <Row className="mb-3 gx-0">
            <Col className="d-flex w-100">
              {currentCluster.nextstrainUrl ? (
                <LinkExternal href={currentCluster.nextstrainUrl} icon={NEXTSTRAIN_ICON} color={theme.link.dim.color}>
                  {t(`Dedicated {{nextstrain}} build for {{variant}}`, {
                    nextstrain: 'Nextstrain',
                    variant: enablePangolin ? pangoName : currentCluster.displayName,
                  })}
                </LinkExternal>
              ) : (
                <span>{t('No dedicated {{nextstrain}} build is available', { nextstrain: 'Nextstrain' })}</span>
              )}
            </Col>
          </Row>

          <Row className="mb-2 gx-0">
            <Col>{ClusterContent}</Col>
          </Row>

          <Row className="mb-2 gx-0">
            <Col>
              <ErrorBoundary FallbackComponent={FetchError}>
                <Suspense fallback={LOADING}>
                  <PlotCard cluster={currentCluster} />
                </Suspense>
              </ErrorBoundary>
            </Col>
          </Row>

          <Row className={'gx-0'}>
            <Col>
              <MutationCountsSummaryCard currentCluster={currentCluster} />
            </Col>
          </Row>

          {AquariaSection}

          <Row className="mb-2 gx-0">
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
