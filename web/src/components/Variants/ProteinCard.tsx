import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { styled } from 'styled-components'
import { SiMoleculer } from 'react-icons/si'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import Image from 'next/image'

import { useRecoilValue } from 'recoil'
import { URL_GITHUB } from 'src/constants'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import type { ClusterDatum } from 'src/io/getClusters'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import GifPlayer from 'src/components/Common/GifPlayer'

import GisaidLogo from 'src/assets/images/GISAID_logo.png'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { clusterDisplayNameToLineageMapSelector } from 'src/state/Clusters'

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
  const { t } = useTranslationSafe()
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineageMap = useRecoilValue(clusterDisplayNameToLineageMapSelector)
  const pangoName = pangoLineageMap.get(cluster.displayName) ?? cluster.displayName
  const variant = enablePangolin ? pangoName : cluster.displayName

  return (
    <span className="d-flex w-100">
      <ProteinCardTitleIcon />
      <ProteinCardHeading>{t('Spike protein model for {{variant}}', { variant })}</ProteinCardHeading>
    </span>
  )
}

export function Placeholder() {
  const { t } = useTranslationSafe()

  return (
    <Container fluid className="">
      <Row className={'gx-0'}>
        <Col>
          <p>{t('Spike protein model is not yet available for this variant')}</p>
        </Col>
      </Row>

      <Row className={'gx-0'}>
        <Col>
          <p>
            {t('Consider contributing on {{github}}', { github: ' ' })}
            <LinkExternal href={`${URL_GITHUB}/tree/master/web/public/proteins/gif`}>{'Github'}</LinkExternal>
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
  const { t } = useTranslationSafe()

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
        gif={`/proteins/gif/${cluster.buildName}.gif`}
        still={`/proteins/jpg/${cluster.buildName}.jpg`}
      />
    )
  }, [cluster.buildName, condition, handleError, handleLoad, style])

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <ProteinCardBody>
        <Row className={'gx-0'}>
          <Col tag="figure">
            <GifPlayerWrapper>{Player}</GifPlayerWrapper>
            <figcaption className="d-flex">
              <small className="mx-auto">
                {t('Spike protein model for {{variant}}', { variant: cluster.displayName })}
                {'. '}
                {t('Figure made via {{source}}', { source: '' })}
                <LinkExternal href="https://www.gisaid.org/" icon={null}>
                  <Image src={GisaidLogo} alt="GISAID" className={'my-auto'} height={18} width={49} />
                </LinkExternal>
              </small>
            </figcaption>
          </Col>
        </Row>
      </ProteinCardBody>
    </Card>
  )
}
