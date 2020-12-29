import React, { PropsWithChildren } from 'react'
import { Container as ContainerBase, Row, Col } from 'reactstrap'

import styled from 'styled-components'

import { NavigationBar } from './NavigationBar'
import { FooterContent } from './Footer'

const Container = styled(ContainerBase)`
  display: flex;
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

const MainRow = styled(Row)`
  display: flex;
  flex-grow: 1;
  min-height: 2em;
  padding: 0;
`

const MainCol = styled(Col)`
  display: flex;
  flex-grow: 1;
  padding: 0;
  min-height: 100vh;
`

const FooterRow = styled(Row)`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 0;
`

const FooterCol = styled(Col)`
  flex-grow: 1;
  flex-shrink: 0;
  padding: 0;
`

export interface LayoutProps {
  wide?: boolean
}

export function Layout({ children, wide = false }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <Container fluid>
        <HeaderRow noGutter>
          <HeaderCol>
            <NavigationBar />
          </HeaderCol>
        </HeaderRow>
      </Container>

      <Container fluid={wide}>
        <MainRow noGutter>
          <MainCol>{children}</MainCol>
        </MainRow>
      </Container>

      <Container fluid>
        <FooterRow noGutter>
          <FooterCol>
            <FooterContent />
          </FooterCol>
        </FooterRow>
      </Container>
    </>
  )
}
