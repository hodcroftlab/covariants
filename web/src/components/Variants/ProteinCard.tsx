import React, { useCallback, useEffect, useMemo, useState } from 'react'

import styled from 'styled-components'
import { SiMoleculer } from 'react-icons/si'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'

import { URL_GITHUB } from 'src/constants'
import type { ClusterDatum } from 'src/io/getClusters'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import GifPlayer from 'src/components/Common/GifPlayer'

import { ReactComponent as GisaidLogo } from 'src/assets/images/GISAID_logo.svg'

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
          <p>{'Protein model is not yet available for this variant'}</p>
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
        gif={`/proteins/gif/${cluster.build_name}.gif`}
        still={`/proteins/jpg/${cluster.build_name}.jpg`}
      />
    )
  }, [cluster.build_name, condition, handleError, handleLoad, style])

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <ProteinCardBody>
        <Row noGutters>
          <Col tag="figure">
            <GifPlayerWrapper>{Player}</GifPlayerWrapper>
            <figcaption className="d-flex">
              <small className="mx-auto">
                {`Protein model for ${cluster.display_name}. Figure made via `}
                <LinkExternal href="https://www.gisaid.org/" icon={null}>
                  <GisaidLogo className="my-auto" height={18} />
                </LinkExternal>
              </small>
            </figcaption>
          </Col>
        </Row>
      </ProteinCardBody>
    </Card>
  )
}
