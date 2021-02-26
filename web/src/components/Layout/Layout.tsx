import React, { PropsWithChildren } from 'react'

import styled from 'styled-components'
import { Container as ContainerBase, Row, Col } from 'reactstrap'

import { ReactComponent as GisaidLogoBase } from 'src/assets/images/GISAID_logo.svg'

import { LinkExternal } from 'src/components/Link/LinkExternal'
import { NavigationBar } from './NavigationBar'
import { FooterContent } from './Footer'

const Container = styled(ContainerBase)`
  min-height: 100%;
`

const HeaderRow = styled(Row)`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 0;
`

const HeaderCol = styled(Col)`
  flex-grow: 1;
  flex-shrink: 0;
  padding: 0;
`

const MainContainer = styled(ContainerBase)`
  overflow: hidden;
  padding-bottom: 100px;
`

const MainRow = styled(Row)``

const MainCol = styled(Col)``

const FooterRow = styled(Row)`
  position: relative;
  margin-top: -100px; /* negative value of footer height */
  height: 100px;
  clear: both;
  padding-top: 50px;

  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
`

const FooterCol = styled(Col)`
  flex-grow: 1;
  flex-shrink: 0;
  padding: 0;
`

const GisaidText = styled.small`
  font-size: 0.9rem;
`

const GisaidLogo = styled(GisaidLogoBase)`
  margin-bottom: 4px;
`

export interface LayoutProps {
  wide?: boolean
}

export function Layout({ children }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <Container fluid>
        <HeaderRow noGutters>
          <HeaderCol>
            <NavigationBar />
          </HeaderCol>
        </HeaderRow>

        <Row noGutters className="ml-3 mt-n1 d-none d-md-block">
          <Col className="d-flex">
            <GisaidText className="d-flex mr-auto">
              <span className="mr-1">{'Enabled by data from '}</span>
              <LinkExternal href="https://www.gisaid.org/" icon={null}>
                <GisaidLogo height={20} />
              </LinkExternal>
            </GisaidText>
          </Col>
        </Row>

        <MainContainer fluid>
          <MainRow noGutters>
            <MainCol>{children}</MainCol>
          </MainRow>
        </MainContainer>

        <FooterRow noGutters>
          <FooterCol>
            <FooterContent />
          </FooterCol>
        </FooterRow>
      </Container>
    </>
  )
}
