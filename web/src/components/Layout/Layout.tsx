import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { Container as ContainerBase, Row, Col } from 'reactstrap'
import { NavigationBar } from 'src/components/Layout/NavigationBar'
import { FooterContent } from 'src/components/Layout/Footer'
import { ClusterButtonPanel } from 'src/components/ClusterButtonPanel/ClusterButtonPanel'

const Container = styled(ContainerBase)`
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const HeaderRow = styled(Row)`
  flex: 0;
  padding: 0;
`

const HeaderCol = styled(Col)`
  padding: 0;
`

const MiddleRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;

  @media (max-width: 767.98px) {
    flex-direction: column;
  }

  @media (min-width: 1120px) {
    height: 100%;
    width: 100%;
  }

  @media (max-width: 1119px) {
    overflow-y: scroll;
  }
`

const MainContainer = styled(ContainerBase)`
  @media (min-width: 1120px) {
    overflow-y: scroll;
  }
`

const Sidebar = styled.aside`
  flex: 0 0 250px;
  flex-wrap: wrap;

  background-color: rgba(18, 42, 113, 1);

  @media (min-width: 1120px) {
    overflow-y: scroll;
  }
`

const FooterWrapper = styled.main`
  margin: 0 auto;
  max-width: ${(props) => props.theme.containerWidth.md};
`

export interface LayoutProps {
  wide?: boolean
}

export function Layout({ children }: PropsWithChildren<LayoutProps>) {
  return (
    <Container fluid>
      <HeaderRow noGutters>
        <HeaderCol>
          <NavigationBar />
        </HeaderCol>
      </HeaderRow>

      <MiddleRow>
        <Sidebar>
          <ClusterButtonPanel />
        </Sidebar>

        <MainContainer fluid>
          {children}
          <FooterWrapper>
            <FooterContent />
          </FooterWrapper>
        </MainContainer>
      </MiddleRow>
    </Container>
  )
}
