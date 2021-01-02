/* eslint-disable camelcase */
import React, { useMemo, useState, useRef } from 'react'

import { Layout } from 'src/components/Layout/Layout'
import { NextstrainCard } from 'src/components/Main/NextstrainCard'
import { ClusterDatum, getClusters } from 'src/io/getClusters'

import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import dynamic from 'next/dynamic'

import { Link } from 'src/components/Link/Link'
import { Editable } from 'src/components/Common/Editable'

import { PlotCard } from './PlotCard'

import Intro from '../../../../content/Intro.md'

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

const ClusterCard = styled.div`
  min-width: 220px;
  max-width: 400px;
  margin: 6px 10px;
  padding: 0;
  box-shadow: ${(props) => props.theme.shadows.light};
  border-radius: 3px;
  cursor: pointer;
`

const ColorPill = styled.div<{ $color: string }>`
  background-color: ${(props) => props.$color};
  width: 30px;
  height: 100%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`

const ClusterTitle = styled.h1`
  font-size: 1.5rem;
  margin: auto;
`

const EditableClusterContent = styled(Editable)`
  min-height: 1000px;
`

export interface ClusterButtonProps {
  index: number
  cluster: ClusterDatum
  onClick(cluster: string): void
}

export function ClusterButton({ cluster, onClick, index }: ClusterButtonProps) {
  const { display_name, col } = cluster
  const handleClick = useMemo(() => () => onClick(display_name), [display_name, onClick])

  return (
    <ClusterCol>
      <ClusterCard onClick={handleClick}>
        <Row noGutters>
          <ClusterButtonCol className="d-flex">
            <ColorPill $color={col} />
            <ClusterTitle>{display_name}</ClusterTitle>
          </ClusterButtonCol>
        </Row>
      </ClusterCard>
    </ClusterCol>
  )
}

const getClusterContent = (cluster: string) =>
  dynamic(() => import(`../../../../content/clusters/${cluster}.md`), { ssr: true })

const clusters = getClusters()

export function MainPage() {
  const [cluster, setCluster] = useState(clusters[0])
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollToClusters = () => scrollRef.current?.scrollIntoView()

  const handleClusterButtonClick = (cluster: ClusterDatum) => () => {
    setCluster(cluster)
    scrollToClusters()
  }

  const ClusterContent = getClusterContent(cluster.display_name)

  return (
    <Layout>
      <Row noGutters>
        <Col>
          <Editable githubUrl={'Intro'}>
            <Intro />

            <p>
              {'Check out our '}
              <Link href="/faq">{'"Frequently asked questions"'}</Link>
              {' section for more details.'}
            </p>
          </Editable>

          <div ref={scrollRef} />
          <Editable githubUrl={'TODO'}>
            <ClustersRow noGutters>
              {clusters.map((cluster, index) => (
                <ClusterButton
                  key={cluster.display_name}
                  cluster={cluster}
                  onClick={handleClusterButtonClick(cluster)}
                  index={index}
                />
              ))}
            </ClustersRow>
          </Editable>

          <EditableClusterContent githubUrl={cluster.display_name}>
            <Row noGutters className="mb-2">
              <Col>
                <ClusterContent />
              </Col>
            </Row>

            <Row noGutter className="mb-2" s>
              <Col>
                <PlotCard cluster={cluster} />
              </Col>
            </Row>

            <Row noGutters className="mb-2">
              <Col>
                <NextstrainCard cluster={cluster} />
              </Col>
            </Row>
          </EditableClusterContent>
        </Col>
      </Row>
    </Layout>
  )
}
