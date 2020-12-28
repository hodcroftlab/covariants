import React, { useMemo, useState, useRef } from 'react'

import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import dynamic from 'next/dynamic'

import { Link } from 'src/components/Link/Link'
import { Editable } from 'src/components/Common/Editable'

import Intro from '../../../content/Intro.md'
import Index from '../../../content/Clusters.md'

import clusters from '../../../data/clusters.json'

const ClustersRow = styled(Row)`
  justify-content: center;
`

const ClusterCol = styled(Col)`
  flex-grow: 0;
`

const ClusterCard = styled.div`
  min-width: 220px;
  max-width: 400px;
  margin: 5px 5px;
  padding: 0;
  box-shadow: ${(props) => props.theme.shadows.light};
  border-radius: 3px;
  cursor: pointer;
`

const ClusterTitle = styled.h1`
  font-size: 1.25rem;
  margin: 0.5rem auto;
`

const ClusterImageContainer = styled.div`
  width: 100%;
`

const ClusterImage = styled.img`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 85px;
  object-fit: fill;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`

const EditableClusterContent = styled(Editable)`
  min-height: 1000px;
`

export interface ClusterButtonProps {
  index: number
  cluster: string

  onClick(cluster: string): void
}

export function ClusterButton({ cluster, onClick, index }: ClusterButtonProps) {
  const handleClick = useMemo(() => () => onClick(cluster), [cluster, onClick])

  return (
    <ClusterCol>
      <ClusterCard onClick={handleClick}>
        <Row noGutters>
          <Col className="d-flex">
            <ClusterTitle>{cluster}</ClusterTitle>
          </Col>
        </Row>
        <Row noGutters>
          <ClusterImageContainer>
            <ClusterImage src={`https://picsum.photos/300/200.jpg?random=${index}`} alt={cluster} />
          </ClusterImageContainer>
        </Row>
      </ClusterCard>
    </ClusterCol>
  )
}

const getClusterContent = (cluster: string) =>
  dynamic(() => import(`../../../content/clusters/${cluster}.md`), {
    ssr: true,
    // loading: Loading,
  })

const clusterNames = clusters.clusters.map(({ cluster }) => cluster)

export function MainPage() {
  const [cluster, setCluster] = useState(clusterNames[0])
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollToClusters = () => scrollRef.current?.scrollIntoView()

  const handleClusterButtonClick = (cluster: string) => () => {
    setCluster(cluster)
    scrollToClusters()
  }

  const ClusterButtons = clusters.clusters.map(({ cluster }, index) => (
    <ClusterButton key={cluster} cluster={cluster} onClick={handleClusterButtonClick(cluster)} index={index} />
  ))

  const ClusterContent = getClusterContent(cluster)

  return (
    <div>
      <Editable githubUrl={'Index'}>
        <Intro />
      </Editable>

      <Editable githubUrl={'Index'}>
        <Index />

        <p>
          {'Check out our '}
          <Link href="/faq">{'"Frequently asked questions"'}</Link>
          {' section for more details.'}
        </p>
      </Editable>

      <div ref={scrollRef} />
      <Editable githubUrl={'TODO'} text={'Propose more clusters'}>
        <ClustersRow noGutters>{ClusterButtons}</ClustersRow>
      </Editable>

      <EditableClusterContent githubUrl={'cluster'}>
        <ClusterContent />
      </EditableClusterContent>
    </div>
  )
}
