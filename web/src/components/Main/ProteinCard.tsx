import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { URL_GITHUB } from 'src/constants'

import styled from 'styled-components'
import { SiMoleculer } from 'react-icons/si'
import { CardBody, Col, Container, Row } from 'reactstrap'

import type { ClusterDatum } from 'src/io/getClusters'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'
import GifPlayer from 'src/components/Common/GifPlayer'

const ProteinCardTitleIcon = styled(SiMoleculer)`
  margin: auto 5px;
  width: 20px;
  height: 20px;
`

const ProteinCardBody = styled(CardBody)`
  padding: 0;
`

const ProteinCardHeading = styled.h1`
  display: inline;
  margin: auto 0;
  font-size: 1.2rem;
`

const GifPlayerWrapper = styled.div`
  display: flex;

  margin: auto;
  min-height: 200px;
  height: 100%;

  .gif_player {
    margin: auto;
    height: 100%;

    img {
      margin: 0 auto;
    }
  }
`

export interface ProteinCardProps {
  cluster: ClusterDatum
}

export function ProteinCardTitle({ cluster }: ProteinCardProps) {
  return (
    <span className="d-flex w-100">
      <ProteinCardTitleIcon />
      <ProteinCardHeading>{`Protein model for ${cluster.display_name}`}</ProteinCardHeading>
    </span>
  )
}

export function Placeholder() {
  return (
    <Container fluid className="">
      <Row noGutters>
        <Col>
          <p>{'Protein model is not yet available for this cluster'}</p>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <p>
            {'Consider '}
            <LinkExternal href={`${URL_GITHUB}/tree/master/content/clusters/proteins`}>
              {'contributing on Github'}
            </LinkExternal>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

enum GifPlayerCondition {
  success,
  error,
  loading,
}

export function ProteinCard({ cluster }: ProteinCardProps) {
  const [condition, setCondition] = useState(GifPlayerCondition.loading)
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    setCondition(GifPlayerCondition.loading)
  }, [cluster])

  const title = useMemo(() => <ProteinCardTitle cluster={cluster} />, [cluster])
  const style: { visibility: 'visible' | 'hidden' } = useMemo(
    () => ({ visibility: condition === GifPlayerCondition.success ? 'visible' : 'hidden' }),
    [condition],
  )

  const handleError = useCallback(() => {
    setCondition(GifPlayerCondition.error)
  }, [])

  const handleLoad = useCallback(() => {
    setCondition(GifPlayerCondition.success)
  }, [])

  const Player = useMemo(() => {
    if (condition === GifPlayerCondition.error) {
      return <Placeholder />
    }

    return (
      <GifPlayer
        style={style}
        onError={handleError}
        onLoad={handleLoad}
        gif={`/_next/static/content/proteins/${cluster.display_name}.gif`}
        still={`/_next/static/content/proteins/${cluster.display_name}.jpg`}
      />
    )
  }, [cluster.display_name, condition, handleError, handleLoad, style])

  return (
    <CardCollapsible title={title} collapsed={collapsed} setCollapsed={setCollapsed}>
      {!collapsed && (
        <ProteinCardBody>
          <Row noGutters>
            <Col className="d-flex">
              <GifPlayerWrapper>{Player}</GifPlayerWrapper>
            </Col>
          </Row>
        </ProteinCardBody>
      )}
    </CardCollapsible>
  )
}
