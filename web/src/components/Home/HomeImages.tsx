import React from 'react'

import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

import { Link } from 'src/components/Link/Link'
import { ReactComponent as PerCountry } from 'src/assets/images/perCountry.svg'
import { ReactComponent as PerVariant } from 'src/assets/images/perVariant.svg'

export const Figure = styled.figure`
  text-align: center;
  max-width: 400px;
  margin: 10px auto;
`

export function HomeImages() {
  return (
    <Row>
      <Col sm={6}>
        <Link href="/per-country">
          <Figure>
            <PerCountry />
          </Figure>
        </Link>
      </Col>

      <Col sm={6}>
        <Link href="/per-variant">
          <Figure>
            <PerVariant />
          </Figure>
        </Link>
      </Col>
    </Row>
  )
}
