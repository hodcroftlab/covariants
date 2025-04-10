import React, { PropsWithChildren } from 'react'
import { styled } from 'styled-components'
import { Container as ContainerBase, Row, Col } from 'reactstrap'
import { NavigationBar } from './NavigationBar'
import { FooterContent } from './Footer'
import { ChristmasLightRope, Santa, Snowfall } from 'src/components/Common/Christmas'

export function Layout({ children }: PropsWithChildren) {
  return (
    <Container fluid>
      <HeaderRow className={'gx-0'}>
        <HeaderCol>
          <NavigationBar />
          <ChristmasLightRope />
        </HeaderCol>
      </HeaderRow>

      <MainContainer fluid>
        <MainRow className={'gx-0 mt-4 mt-md-2'}>
          <MainCol>{children}</MainCol>
        </MainRow>
      </MainContainer>

      <FooterRow className={'gx-0'}>
        <FooterCol>
          <FooterContent />
        </FooterCol>
      </FooterRow>

      <Snowfall />
      <Santa />
    </Container>
  )
}

const Container = styled(ContainerBase)`
  min-height: 100%;
  width: 100%;
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
