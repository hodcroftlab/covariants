import React from 'react'

import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

import { Link as LinkBase } from 'src/components/Link/Link'
import { ReactComponent as PerCountry } from 'src/assets/images/perCountry.svg'
import { ReactComponent as PerVariant } from 'src/assets/images/perVariant.svg'

const Link = styled(LinkBase)`
  &:hover {
    text-decoration: none;
  }
`

export const Figure = styled.figure`
  text-align: center;
  max-width: 400px;
  margin: 10px auto;

  font-weight: 600;
  color: ${(props) => props.theme.gray700};
`

export function HomeImages() {
  return (
    <Row>
      <Col sm={6}>
        <Link href="/per-country">
          <Figure>
            <PerCountry />
            {'Per Country'}
          </Figure>
        </Link>
      </Col>

      <Col sm={6}>
        <Link href="/per-variant">
          <Figure>
            <PerVariant />
            {'Per Variant'}
          </Figure>
        </Link>
      </Col>
    </Row>
  )
}
