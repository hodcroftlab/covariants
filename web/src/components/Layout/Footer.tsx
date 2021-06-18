import React from 'react'

import { Col, Container, Row } from 'reactstrap'
import styled from 'styled-components'

import { PROJECT_NAME, COMPANY_NAME } from 'src/constants'
import { SharingPanel } from 'src/components/Common/SharingPanel'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { TeamCredits } from 'src/components/Common/TeamCredits'
import { PoweredBy } from 'src/components/Common/PoweredBy'

import { getCopyrightYearRange } from 'src/helpers/getCopyrightYearRange'
import { getVersionString } from 'src/helpers/getVersionString'

const FooterContainer = styled(Container)`
  padding: 7px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`

const CopyrightText = styled.div`
  font-size: 0.75rem;
  width: 100%;
  text-align: center;
  @media (max-width: 767.98px) {
    font-size: 0.5rem;
  }
`

const GisaidTacText = styled.div`
  width: 100%;
  font-size: 0.75rem;
  text-align: center;
  @media (max-width: 767.98px) {
    font-size: 0.5rem;
  }
`

const VersionText = styled.div`
  width: 100%;
  font-size: 0.75rem;
  text-align: center;
  @media (max-width: 767.98px) {
    font-size: 0.5rem;
  }
`

export function FooterContent() {
  const copyrightYearRange = getCopyrightYearRange()

  return (
    <FooterContainer fluid tag="footer">
      <Row noGutters>
        <Col>
          <SharingPanel />
        </Col>
      </Row>

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

      <Row noGutters>
        <Col className="d-flex p-0 flex-wrap">
          <CopyrightText>{`${PROJECT_NAME} (c) ${copyrightYearRange} ${COMPANY_NAME}`}</CopyrightText>

          <GisaidTacText>
            <span>{'GISAID data provided on this website are subject to '}</span>
            <LinkExternal href="https://www.gisaid.org/registration/terms-of-use/" icon={null}>
              {'GISAID Terms and Conditions'}
            </LinkExternal>
          </GisaidTacText>

          <VersionText>
            <span>{getVersionString()}</span>
          </VersionText>
        </Col>
      </Row>
    </FooterContainer>
  )
}
