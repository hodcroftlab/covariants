import React, { PropsWithChildren, HTMLProps } from 'react'

import styled from 'styled-components'

import { NavigationBar } from './NavigationBar'
import FooterContent from './Footer'

export const LayoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`

const Header = styled.header`
  flex-shrink: 0;
`

const MainContent = styled.main`
  flex-grow: 1;
  min-height: 2em;
  padding: 0 20px;
`

const Footer = styled.footer`
  flex-shrink: 0;
`

export function Layout({ children }: PropsWithChildren<HTMLProps<HTMLDivElement>>) {
  return (
    <LayoutContainer>
      <Header>
        <NavigationBar />
      </Header>

      <MainContent>{children}</MainContent>

      {/*<Footer>*/}
      {/*  <FooterContent />*/}
      {/*</Footer>*/}
    </LayoutContainer>
  )
}
