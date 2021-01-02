import React, { useState, useMemo } from 'react'
import { MdEdit } from 'react-icons/md'

import { CardBody, Col, Row } from 'reactstrap'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'
import styled from 'styled-components'

import { theme } from 'src/theme'
import { ClusterDatum } from 'src/io/getClusters'
import { LinkExternal } from 'src/components/Link/LinkExternal'

import { ReactComponent as NextstrainIconBase } from 'src/assets/images/nextstrain_logo.svg'

const NextstrainCardHeading = styled.h1`
  display: inline;
  margin: auto 0;
  font-size: 1.2rem;
`

const NextstrainIcon = styled(NextstrainIconBase)`
  display: inline;
  margin: auto 5px;
  width: 20px;
  height: 20px;
`

const IframeCardBody = styled(CardBody)`
  padding: 0;
`

const IframeCol = styled(Col)``

const Iframe = styled.iframe`
  width: 100%;
  height: 500px;
  margin: 0;
  padding: 0;
  border: none;
`

export interface NextstrainCardProps {
  cluster: ClusterDatum
}

export function NextstrainCardTitle({ cluster }: NextstrainCardProps) {
  return (
    <span className="d-flex w-100">
      <NextstrainIcon />
      <NextstrainCardHeading>{`Dedicated ${cluster.display_name} Nextstrain build`}</NextstrainCardHeading>
      <span className="ml-auto">
        <LinkExternal href={cluster.build_url} icon={<MdEdit />} color={theme.link.dim.color}>
          {'Open in a new tab'}
        </LinkExternal>
      </span>
    </span>
  )
}

export function NextstrainCard({ cluster }: NextstrainCardProps) {
  const [collapsed, setCollapsed] = useState(true)
  const title = useMemo(() => <NextstrainCardTitle cluster={cluster} />, [cluster])

  const nextstrain = useMemo(
    () => (
      <Iframe
        hidden={collapsed}
        src={collapsed ? undefined : cluster.build_url}
        referrerPolicy="no-referrer"
        loading="lazy"
        frameBorder={0}
        allowFullScreen
        seamless
      />
    ),
    [cluster.build_url, collapsed],
  )

  return (
    <CardCollapsible title={title} collapsed={collapsed} setCollapsed={setCollapsed}>
      <IframeCardBody>
        <Row noGutters>
          <IframeCol>{nextstrain}</IframeCol>
        </Row>
      </IframeCardBody>
    </CardCollapsible>
  )
}
