import React, { useState } from 'react'

import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  Collapse,
  Nav as NavBase,
  Navbar as NavbarBase,
  NavbarToggler as NavbarTogglerBase,
  NavItem as NavItemBase,
  NavLink as NavLinkBase,
} from 'reactstrap'
import classNames from 'classnames'
import { FaGithub, FaTwitter } from 'react-icons/fa'

import { ReactComponent as BrandLogoBase } from 'src/assets/images/logo.svg'
import { ReactComponent as BrandLogoLargeBase } from 'src/assets/images/logo_text_right.svg'

import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { TWITTER_USERNAME_RAW, URL_GITHUB } from 'src/constants'

import { State } from 'src/state/reducer'
import { selectPathname } from 'src/state/router/router.selectors'

const navLinksLeft = {
  '/': 'Home',
  '/faq': 'FAQ',
  '/variants': 'Variants',
  '/per-country': 'Per country',
  '/per-variant': 'Per variant',
  '/shared-mutations': 'Shared Mutations',
}

export function matchingUrl(url: string, pathname: string): boolean {
  if (pathname.startsWith('/variants')) {
    return url === '/variants'
  }

  return url === pathname
}

const navLinksRight = [
  {
    text: 'Follow',
    title: `Follow @${TWITTER_USERNAME_RAW} me on Twitter`,
    url: `https://twitter.com/${TWITTER_USERNAME_RAW}`,
    alt: 'Link to Twitter, with blue Twitter bird logo',
    icon: <FaTwitter size={22} color="#08a0e9" />,
    color: '#08a0e9',
  },
  {
    text: 'Fork',
    title: "Let's collaborate on GitHub",
    url: URL_GITHUB,
    alt: 'Link to Github page, with grey Github Octocat logo',
    icon: <FaGithub size={22} color="#24292E" />,
    color: '#24292E',
  },
]

export const Navbar = styled(NavbarBase)`
  box-shadow: none;
`

export const Nav = styled(NavBase)`
  & .nav-link {
    padding: 5px;
  }
`

export const NavItem = styled(NavItemBase)`
  margin: 3px auto;
  padding: 0;
`

export const NavLink = styled(NavLinkBase)`
  margin: 0 auto;
`

export const LinkRight = styled(LinkExternal)``

export const NavbarToggler = styled(NavbarTogglerBase)`
  border: none;
`

export const BrandLogo = styled(BrandLogoBase)`
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 4px;
`

export const BrandLogoLarge = styled(BrandLogoLargeBase)`
  height: 40px;
  margin: 7px 10px 10px;
`

export interface NavigationBarProps {
  pathname: string
}

const mapStateToProps = (state: State) => ({
  pathname: selectPathname(state),
})

const mapDispatchToProps = {}

export const NavigationBar = connect(mapStateToProps, mapDispatchToProps)(NavigationBarDisconnected)

export function NavigationBarDisconnected({ pathname }: NavigationBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar expand="md" color="light" light role="navigation">
      <Link href="/">
        <BrandLogoLarge className="d-none d-lg-block" />
        <BrandLogo className="d-block d-lg-none" />
      </Link>

      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          {Object.entries(navLinksLeft).map(([url, text]) => {
            return (
              <NavItem key={url} className={classNames(matchingUrl(url, pathname) && 'active')}>
                <NavLink tag={Link} href={url}>
                  {text}
                </NavLink>
              </NavItem>
            )
          })}
        </Nav>

        <Nav className="ml-auto" navbar>
          {navLinksRight.map(({ text, title, url, alt, icon }) => (
            <NavItem key={title}>
              <NavLink tag={LinkRight} title={title} href={url} alt={alt} icon={null}>
                <span>
                  <span className="mr-2">{icon}</span>
                  <span className="d-inline d-sm-none">{text}</span>
                </span>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  )
}
