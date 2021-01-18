import React from 'react'

import { Col, Container, Row } from 'reactstrap'
import styled from 'styled-components'

import { PROJECT_NAME, COMPANY_NAME } from 'src/constants'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { TeamCredits } from 'src/components/Common/TeamCredits'
import { PoweredBy } from 'src/components/Common/PoweredBy'

import { getCopyrightYearRange } from 'src/helpers/getCopyrightYearRange'
import { getVersionString } from 'src/helpers/getVersionString'

import gisaidLogoUrl from 'src/assets/images/gisaid_logo.png'

const FooterContainer = styled(Container)`
  padding: 7px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`

const CopyrightText = styled.div`
  font-size: 0.75rem;
  flex-grow: 1;

  @media (max-width: 576px) {
    font-size: 0.5rem;
  }
`

const VersionText = styled.div`
  flex-grow: 1;
  font-size: 0.75rem;
  text-align: right;

  @media (max-width: 992px) {
    display: none;
  }
`

export function FooterContent() {
  const copyrightYearRange = getCopyrightYearRange()

  return (
    <FooterContainer fluid tag="footer">
      <Row noGutters>
        <Col>
          <TeamCredits />
        </Col>
      </Row>

      <Row noGutters>
        <Col>
          <PoweredBy />
        </Col>
      </Row>

      <Row noGutters className="my-1">
        <Col className="d-flex">
          <small className="ml-auto">
            {'Enabled by data from '}
            <LinkExternal href="https://www.gisaid.org/" icon={null}>
              <img className="my-auto" src={gisaidLogoUrl} alt="GISAID logo" height={18} />
            </LinkExternal>
          </small>
        </Col>
      </Row>

      <Row noGutters>
        <Col className="d-flex p-0">
          <CopyrightText className="mr-auto my-auto">
            {`${PROJECT_NAME} (c) ${copyrightYearRange} ${COMPANY_NAME}`}
          </CopyrightText>

          <VersionText className="ml-auto my-auto">{getVersionString()}</VersionText>
        </Col>
      </Row>
    </FooterContainer>
  )
}
