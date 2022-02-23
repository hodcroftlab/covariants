import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

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

let navLinksLeft: Record<string, string> = {
  '/': 'Home',
  '/faq': 'FAQ',
  '/variants': 'Variants',
  '/per-country': 'Per country',
  '/per-variant': 'Per variant',
  '/shared-mutations': 'Shared Mutations',
  '/acknowledgements': 'Acknowledgements',
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

if (process.env.NODE_ENV === 'development' || process.env.DOMAIN?.includes('vercel')) {
  navLinksLeft = { ...navLinksLeft, '/debug-badges': 'Debug badges' }
}

export const Navbar = styled(NavbarBase)`
  box-shadow: none;
`

export const Nav = styled(NavBase)`
  & .nav-link {
    padding: 5px;
  }
`

export const NavWrappable = styled(NavBase)`
  overflow-y: scroll;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  width: 100%;

  background-image: linear-gradient(to right, white, white), linear-gradient(to right, white, white),
    linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)),
    linear-gradient(to left, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 20px 100%, 20px 100%, 10px 100%, 10px 100%;
  background-attachment: local, local, scroll, scroll;

  & .nav-link {
    padding: 5px;
  }
`

export const NavItem = styled(NavItemBase)`
  padding: 0;

  flex-grow: 0;
  flex-shrink: 0;

  &.active {
    background-color: #6bb24e;
    border-radius: 5px;
  }

  &.active > .nav-link {
    color: white !important;
  }

  @media (max-width: 991.98px) {
    margin: 0 auto;
  }
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

export function NavigationBar() {
  const { pathname } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen])

  return (
    <Navbar expand="md" color="light" light role="navigation">
      <Link href="/">
        <BrandLogoLarge className="d-none d-lg-block" />
        <BrandLogo className="d-block d-lg-none" />
      </Link>

      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
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
