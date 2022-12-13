import { useRouter } from 'next/router'
import React from 'react'

import styled from 'styled-components'
import { Nav as NavBase, Navbar as NavbarBase, NavItem as NavItemBase, NavLink as NavLinkBase } from 'reactstrap'
import classNames from 'classnames'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { TWITTER_USERNAME_RAW, URL_GITHUB } from 'src/constants'
import { PoweredByGisaid } from 'src/components/Layout/PoweredByGisaid'
import BrandLogoBase from 'src/assets/images/logo.svg'
import BrandLogoLargeBase from 'src/assets/images/logo_text_right.svg'

export const HEIGHT_NAVBAR = 69

let navLinksLeft: Record<string, string> = {
  '/': 'Home',
  '/per-country': 'Countries',
  '/per-variant': 'Variants',
  '/cases': 'Cases',
  '/shared-mutations': 'Mutations',
  '/credits': 'Credits',
  '/faq': 'FAQ',
}

if (process.env.NODE_ENV === 'development' || process.env.DOMAIN?.includes('vercel')) {
  navLinksLeft = { ...navLinksLeft, '/debug': 'Debug' }
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
    title: `Follow @${TWITTER_USERNAME_RAW} on Twitter`,
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
  min-height: ${HEIGHT_NAVBAR}px;
  box-shadow: 0 2px 10px 2px #222f;
  background: rgb(18, 42, 113);
  background: linear-gradient(0deg, rgba(18, 42, 113, 1) 0%, rgb(79, 11, 136) 100%);
`

export const Nav = styled(NavBase)`
  background-color: transparent !important;
`

export const NavWrappable = styled(NavBase)`
  overflow-y: scroll;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  width: 100%;

  & .nav-link {
    padding: 5px;
  }
`

export const NavItem = styled(NavItemBase)`
  padding: 0;

  flex-grow: 0;
  flex-shrink: 0;

  font-weight: bold;

  &.active {
  }

  & > .nav-link {
    padding: 5px;
    color: #ddda !important;
  }

  &.active > .nav-link {
    color: #fff !important;
    text-decoration: #fffa solid underline 3px;
  }

  @media (max-width: 991.98px) {
    margin: 0 auto;
  }
`

export const NavLink = styled(NavLinkBase)`
  margin: 0 auto;
`

const SIZE_NAV_BUTTON_RIGHT = 37

export const NavLinkRight = styled(NavLinkBase)`
  background-color: #fffb;
  width: ${SIZE_NAV_BUTTON_RIGHT}px;
  height: ${SIZE_NAV_BUTTON_RIGHT}px;
  border-radius: ${SIZE_NAV_BUTTON_RIGHT}px;
  margin: 0 0.25rem;
  padding: 5px;
`

export const LinkRight = styled(LinkExternal)``

export const BrandLogoSmall = styled(BrandLogoBase)`
  height: 40px;
  margin: auto;
`

export const BrandLogoLarge = styled(BrandLogoLargeBase)`
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
`

const BrandWrapper = styled.div`
  margin-right: 2rem;
  margin-left: 1rem;
`

const BrandRowUpper = styled.div``

const BrandRowLower = styled.div`
  position: relative;
  top: -12px;
  left: 50px;
`

export function NavigationBar() {
  const { pathname } = useRouter()

  return (
    <Navbar expand="xs" role="navigation">
      <BrandWrapper>
        <BrandRowUpper>
          <Link href="/">
            <BrandLogoLarge className="d-none d-lg-block" />
            <BrandLogoSmall className="d-block d-lg-none" />
          </Link>
          <BrandRowLower className="d-none d-lg-block">
            <PoweredByGisaid />
          </BrandRowLower>
        </BrandRowUpper>
      </BrandWrapper>

      <NavWrappable navbar>
        {Object.entries(navLinksLeft).map(([url, text]) => {
          return (
            <NavItem key={url} className={classNames(matchingUrl(url, pathname) && 'active')}>
              <NavLink tag={Link} href={url}>
                {text}
              </NavLink>
            </NavItem>
          )
        })}
      </NavWrappable>

      <Nav className="ml-auto" navbar>
        {navLinksRight.map(({ text, title, url, alt, icon }) => (
          <NavItem key={title}>
            <NavLinkRight tag={LinkRight} title={title} href={url} alt={alt} icon={null}>
              <span>
                <span className="mr-2">{icon}</span>
                <span className="d-inline d-sm-none">{text}</span>
              </span>
            </NavLinkRight>
          </NavItem>
        ))}
      </Nav>
    </Navbar>
  )
}
