import React, { useMemo, useState } from 'react'

import styled from 'styled-components'
import { SiMoleculer } from 'react-icons/si'
import { CardBody, Col, Row } from 'reactstrap'

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
  margin: 0 auto;
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

export function ProteinCard({ cluster }: ProteinCardProps) {
  const [collapsed, setCollapsed] = useState(true)
  const title = useMemo(() => <ProteinCardTitle cluster={cluster} />, [cluster])

  return (
    <CardCollapsible title={title} collapsed={collapsed} setCollapsed={setCollapsed}>
      {!collapsed && (
        <ProteinCardBody>
          <Row noGutters>
            <Col className="d-flex">
              <GifPlayerWrapper>
                <GifPlayer
                  gif={`/_next/static/content/proteins/${cluster.display_name}.gif`}
                  still={`/_next/static/content/proteins/${cluster.display_name}.jpg`}
                />
              </GifPlayerWrapper>
            </Col>
          </Row>
        </ProteinCardBody>
      )}
    </CardCollapsible>
  )
}
