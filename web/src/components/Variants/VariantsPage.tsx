import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import { useRecoilValue } from 'recoil'
import { theme } from 'src/theme'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { DefiningMutations, hasDefiningMutations } from 'src/components/Variants/DefiningMutations'
import NextstrainIconBase from 'src/assets/images/nextstrain_logo.svg'
import { AquariaLinksCard } from 'src/components/Variants/AquariaLinksCard'
import { ProteinCard } from 'src/components/Variants/ProteinCard'
import { currentClusterAtom } from 'src/state/Clusters'
import dynamic from 'next/dynamic'
// import { PlotCard } from 'src/components/Variants/PlotCard'
// import { MutationCountsSummaryCard } from 'src/components/MutationCounts/MutationCountsSummaryCard'

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
  flex-direction: column;
  flex: 1 0;
`

const NextstrainIcon = styled(NextstrainIconBase)`
  display: inline;
  margin: auto;
  width: 25px;
  height: 25px;
`

const NEXTSTRAIN_ICON = <NextstrainIcon />

function getClusterContent(cluster: string) {
  return dynamic(() => import(`../../../../content/clusters/${cluster}.md`), { ssr: false })
}

export function VariantsPage() {
  const currentCluster = useRecoilValue(currentClusterAtom)
  const ClusterContent = getClusterContent(currentCluster.build_name)
  const showDefiningMutations = useMemo(() => hasDefiningMutations(currentCluster), [currentCluster])

  const AquariaSection = useMemo(() => {
    return (
      (currentCluster.aquaria_urls?.length ?? 0) > 0 && (
        <Row noGutters className="mb-2">
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

        {/* <Row noGutters className="mb-2"> */}
        {/*   <Col> */}
        {/*     <PlotCard cluster={currentCluster} /> */}
        {/*   </Col> */}
        {/* </Row> */}

        {/* <Row noGutters> */}
        {/*   <Col> */}
        {/*     <MutationCountsSummaryCard currentCluster={currentCluster} /> */}
        {/*   </Col> */}
        {/* </Row> */}

        <Row noGutters>
          <Col>{AquariaSection}</Col>
        </Row>

        <Row noGutters className="mb-2">
          <Col>
            <ProteinCard cluster={currentCluster} />
          </Col>
        </Row>
      </FlexGrowing>

      {showDefiningMutations && (
        <FlexFixed>
          <DefiningMutations cluster={currentCluster} />
        </FlexFixed>
      )}
    </FlexContainer>
  )
}
