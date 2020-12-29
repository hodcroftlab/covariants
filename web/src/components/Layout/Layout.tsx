import React, { PropsWithChildren } from 'react'
import { Container, Row, Col } from 'reactstrap'

import styled from 'styled-components'

import { NavigationBar } from './NavigationBar'
// import FooterContent from './Footer'

const Header = styled.header`
  flex-shrink: 0;
`

const MainContent = styled.main`
  flex-grow: 1;
  min-height: 2em;
`

// const Footer = styled.footer`
//   flex-shrink: 0;
// `

export interface LayoutProps {
  wide?: boolean
}

export function Layout({ children, wide = false }: PropsWithChildren<LayoutProps>) {
  return (
    <Container fluid={wide}>
      <Row noGutters>
        <Col>
          <Header>
            <NavigationBar />
          </Header>

          <MainContent>{children}</MainContent>

          {/* <Footer> */}
          {/*   <FooterContent /> */}
          {/* </Footer> */}
        </Col>
      </Row>
    </Container>
  )
}
