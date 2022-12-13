import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { HEIGHT_NAVBAR, NavigationBar } from 'src/components/Layout/NavigationBar'
// import { FooterContent } from 'src/components/Layout/Footer'
import { ClusterButtonPanel } from 'src/components/ClusterButtonPanel/ClusterButtonPanel'

const Header = styled.div`
  height: ${HEIGHT_NAVBAR}px;
`

const Body = styled.div`
  position: absolute;
  top: ${HEIGHT_NAVBAR}px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  background-color: ${(props) => props.theme.bodyBg};
`

const Sidebar = styled.div`
  flex: 0 0 240px;
  display: flex;
  flex-direction: column;
  background-color: rgba(18, 42, 113, 1);
`

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  overflow: auto;
`

const Box = styled.div`
  min-height: min-content;
  display: flex;
`

export interface LayoutProps {
  wide?: boolean
}

export function Layout({ children }: PropsWithChildren<LayoutProps>) {
  return (
    <div className="bg-danger">
      <Header>
        <NavigationBar />
      </Header>

      <Body>
        <Sidebar>
          <Content>
            <Box>
              <ClusterButtonPanel />
            </Box>
          </Content>
        </Sidebar>

        <Main>
          <Content>
            <Box>
              {children}
              {/* <FooterWrapper> */}
              {/*   <FooterContent /> */}
              {/* </FooterWrapper> */}
            </Box>
          </Content>
        </Main>
      </Body>
    </div>
  )
}
