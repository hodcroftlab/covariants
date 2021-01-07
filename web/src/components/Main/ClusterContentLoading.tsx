import React from 'react'

import { Col, Container, Row } from 'reactstrap'

import { URL_GITHUB } from 'src/constants'
import { LinkExternal } from 'src/components/Link/LinkExternal'

export type ClusterContentLoadingProps = {
  error: Error | null
}

export function ClusterContentLoading({ error }: ClusterContentLoadingProps) {
  if (!error) {
    return null
  }

  return (
    <Container fluid>
      <Row noGutters>
        <Col>
          <p>{'Details are not yet available for this cluster'}</p>
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <p>
            {'Consider '}
            <LinkExternal href={`${URL_GITHUB}/tree/master/content/clusters`}>{'contributing on Github'}</LinkExternal>
          </p>
        </Col>
      </Row>
    </Container>
  )
}
