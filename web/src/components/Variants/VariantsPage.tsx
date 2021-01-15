/* eslint-disable camelcase */
import React, { useMemo, useState } from 'react'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { theme } from 'src/theme'

import styled from 'styled-components'
import { Col, Row, Button } from 'reactstrap'
import dynamic from 'next/dynamic'

import { ReactComponent as NextstrainIconBase } from 'src/assets/images/nextstrain_logo.svg'

import { Layout } from 'src/components/Layout/Layout'
import { ClusterDatum, getClusters } from 'src/io/getClusters'
import { Editable } from 'src/components/Common/Editable'
import { PlotCard } from './PlotCard'
import { ProteinCard } from './ProteinCard'
import { ClusterContentLoading } from './ClusterContentLoading'

const ClustersRow = styled(Row)`
  justify-content: center;
`

const ClusterCol = styled(Col)`
  flex-grow: 0;
`

const ClusterButtonCol = styled(Col)`
  height: 50px;
  justify-content: center;
`

const ClusterButtonComponent = styled(Button)<{ $isCurrent: boolean }>`
  min-width: 220px;
  max-width: 400px;
  margin: 6px 10px;
  padding: 0;
  box-shadow: ${(props) => props.theme.shadows.normal};
  border-radius: 3px;
  cursor: pointer;

  background: ${({ $isCurrent, theme }) => ($isCurrent ? theme.white : theme.gray200)};

  &:active,
  &:focus,
  &:hover {
    box-shadow: ${(props) => props.theme.shadows.normal};
    background: ${({ $isCurrent, theme }) => ($isCurrent ? theme.white : theme.gray300)};
  }
`

const ColorPill = styled.div<{ $color: string }>`
  background-color: ${(props) => props.$color};
  width: 30px;
  height: 100%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`

const ClusterTitle = styled.h1<{ $isCurrent: boolean }>`
  font-size: ${(props) => (props.$isCurrent ? '1.5rem' : '1.33rem')};
  margin: auto;
  font-weight: ${(props) => props.$isCurrent && 600};
`

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

export interface ClusterButtonProps {
  cluster: ClusterDatum
  onClick(cluster: string): void
  isCurrent: boolean
}

export function ClusterButton({ cluster, onClick, isCurrent }: ClusterButtonProps) {
  const { display_name, col } = cluster
  const handleClick = useMemo(() => () => onClick(display_name), [display_name, onClick])

  return (
    <ClusterCol>
      <ClusterButtonComponent onClick={handleClick} $isCurrent={isCurrent}>
        <Row noGutters>
          <ClusterButtonCol className="d-flex">
            <ColorPill $color={col} />
            <ClusterTitle $isCurrent={isCurrent}>{display_name}</ClusterTitle>
          </ClusterButtonCol>
        </Row>
      </ClusterButtonComponent>
    </ClusterCol>
  )
}

const getClusterContent = (cluster: string) =>
  dynamic(() => import(`../../../../content/clusters/${cluster}.md`), { ssr: true, loading: ClusterContentLoading })

const clusters = getClusters()

export function VariantsPage() {
  const [currentCluster, setCurrentCluster] = useState(clusters[0])

  const handleClusterButtonClick = (cluster: ClusterDatum) => () => {
    setCurrentCluster(cluster)
  }

  const ClusterContent = getClusterContent(currentCluster.display_name)

  return (
    <Layout>
      <Row noGutters>
        <Col>
          <ClustersRow noGutters>
            {clusters.map((cluster, index) => (
              <ClusterButton
                key={cluster.display_name}
                cluster={cluster}
                onClick={handleClusterButtonClick(cluster)}
                isCurrent={cluster.display_name === currentCluster.display_name}
              />
            ))}
          </ClustersRow>

          <EditableClusterContent githubUrl={`blob/master/content/clusters/${currentCluster.display_name}.md`}>
            <Row noGutters className="mb-3">
              <Col>
                <ClusterNameTitle>{`${currentCluster.display_name}`}</ClusterNameTitle>
                <span className="ml-2">
                  {currentCluster.display_name2 && (
                    <ClusterNameSubtitle>{`(${currentCluster.display_name2})`}</ClusterNameSubtitle>
                  )}
                </span>
              </Col>
            </Row>

            <Row noGutters className="mb-3">
              <Col className="d-flex w-100">
                <LinkExternal href={currentCluster.build_url} icon={<NextstrainIcon />} color={theme.link.dim.color}>
                  {`Dedicated ${currentCluster.display_name} Nextstrain build`}
                </LinkExternal>
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
    </Layout>
  )
}
