import { useRouter } from 'next/router'
import React, { Suspense, useCallback, useMemo, useState } from 'react'

import { styled } from 'styled-components'
import {
  Col,
  Collapse,
  Nav as NavBase,
  Navbar as NavbarBase,
  NavbarToggler as NavbarTogglerBase,
  NavItem as NavItemBase,
  NavLink as NavLinkBase,
  Row,
} from 'reactstrap'
import { FaGithub, FaTwitter } from 'react-icons/fa'

import Image from 'next/image'
import { ErrorBoundary } from 'react-error-boundary'
import { NomenclatureSwitch } from '../../Common/NomenclatureSwitch'
import BrandLogoBase from 'src/assets/images/logo.svg'
import BrandLogoLargeBase from 'src/assets/images/logo_text_right.svg'

import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { DEPLOY_ENVIRONMENT, TWITTER_USERNAME_RAW, URL_GITHUB } from 'src/constants'
import { ChristmasToggle } from 'src/components/Common/Christmas'
import { LanguageSwitcher } from 'src/components/Layout/Base/LanguageSwitcher'
import GisaidLogoPNG from 'src/assets/images/GISAID_logo.png'
import { ChangelogButton } from 'src/components/Common/ChangelogButton'
import { FetchError } from 'src/components/Error/FetchError'
import { LastUpdated } from 'src/components/Common/LastUpdated'

export function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen])

  return (
    <header>
      <Navbar expand="md" color="light" light role="navigation">
        <Brand />

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <NavigationLinks />
          <CallToAction />
        </Collapse>
      </Navbar>

      {isOpen ? (
        <SubNavigationBar className="d-flex mt-2 gx-0 px-3" />
      ) : (
        <SubNavigationBar className="d-none d-md-flex mt-2 gx-0 px-3" />
      )}
    </header>
  )
}

function Brand() {
  return (
    <Link href="/">
      <BrandLogoLarge className="d-none d-lg-block" />
      <BrandLogo className="d-block d-lg-none" />
    </Link>
  )
}

function NavigationLinks() {
  const { t } = useTranslationSafe()
  const { pathname } = useRouter()

  const navLinks = useMemo(() => {
    let navLinksLeft: Record<string, string> = {
      '/': t('Home'),
      '/faq': t('FAQ'),
      '/variants': t('Variants'),
      '/per-country': t('Per country'),
      '/per-variant': t('Per variant'),
      '/cases': t('Cases'),
      '/shared-mutations': t('Shared Mutations'),
      '/defining-mutations': t('Defining Mutations'),
      '/acknowledgements': t('Acknowledgements'),
    }
    if (process.env.NODE_ENV === 'development' || DEPLOY_ENVIRONMENT === 'staging') {
      navLinksLeft = { ...navLinksLeft, '/debug-badges': 'Debug badges' }
    }
    return navLinksLeft
  }, [t])

  return (
    <NavWrappable navbar>
      {Object.entries(navLinks).map(([url, text]) => {
        return (
          <NavItem key={url} className={`${matchingUrl(url, pathname) && 'active'}`}>
            <NavLink tag={Link} href={url}>
              {text}
            </NavLink>
          </NavItem>
        )
      })}
    </NavWrappable>
  )
}

function CallToAction() {
  const { t } = useTranslationSafe()

  const navLinksRight = useMemo(() => {
    return [
      {
        text: t('Follow'),
        title: t('Follow {{twitterUsername}} on Twitter', { twitterUsername: `@${TWITTER_USERNAME_RAW}` }),
        url: `https://twitter.com/${TWITTER_USERNAME_RAW}`,
        alt: t('Link to Twitter, with blue Twitter bird logo'),
        icon: <FaTwitter size={22} color="#08a0e9" />,
        color: '#08a0e9',
      },
      {
        text: t('Collaborate'),
        title: t("Let's collaborate on GitHub"),
        url: URL_GITHUB,
        alt: t('Link to Github page, with grey Github Octocat logo'),
        icon: <FaGithub size={22} color="#24292E" />,
        color: '#24292E',
      },
    ]
  }, [t])

  return (
    <Nav navbar>
      <NavItem>
        <Row className={'gx-0'}>
          <Col>
            <ChristmasToggle className={'mt-2 mx-3'} />
          </Col>
        </Row>
      </NavItem>
      {navLinksRight.map(({ text, title, url, alt, icon }) => (
        <NavItem key={title}>
          <NavLink tag={LinkRight} title={title} href={url} alt={alt} icon={null}>
            <span>
              <span className="me-2">{icon}</span>
              <span className="d-inline d-md-none">{text}</span>
            </span>
          </NavLink>
        </NavItem>
      ))}
      <LanguageSwitcher className="mx-auto mx-md-0" />
    </Nav>
  )
}

function SubNavigationBar({ className }: { className?: string }) {
  const { t } = useTranslationSafe()
  return (
    <div className={className}>
      <GisaidText className="d-none d-md-flex align-items-center gap-1">
        {t('Enabled by data from {{ gisaid }}', { gisaid: '' })}
        <LinkExternal href="https://www.gisaid.org/" icon={null}>
          <Image src={GisaidLogoPNG} alt="GISAID" height={27} width={73} />
        </LinkExternal>
      </GisaidText>

      <NomenclatureSwitch className="mx-auto mx-md-0 ms-md-auto" />

      <ChangelogButton className="d-none d-md-flex">
        <ErrorBoundary FallbackComponent={FetchError}>
          <Suspense>
            <LastUpdated />
          </Suspense>
        </ErrorBoundary>
      </ChangelogButton>
    </div>
  )
}

export function matchingUrl(url: string, pathname: string): boolean {
  if (pathname.startsWith('/variants')) {
    return url === '/variants'
  }

  return url === pathname
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
    linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
    linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
  background-position:
    left center,
    right center,
    left center,
    right center;
  background-repeat: no-repeat;
  background-color: white;
  background-size:
    20px 100%,
    20px 100%,
    10px 100%,
    10px 100%;
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

const GisaidText = styled.small`
  font-size: 0.9rem;
`
