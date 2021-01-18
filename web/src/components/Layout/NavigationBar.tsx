import React from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'

import { connect } from 'react-redux'

import { ReactComponent as BrandLogo } from 'src/assets/images/logo.svg'
import { NavigationLink } from 'src/components/Layout/NavigationLink'

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
}

export function matchingUrl(url: string, pathname: string): boolean {
  if (pathname.startsWith('/variants')) {
    return url === '/variants'
  }

  return url === pathname
}

const navLinksRight = [
  {
    title: 'Follow me on Twitter',
    url: `https://twitter.com/${TWITTER_USERNAME_RAW}`,
    alt: 'Link to Twitter, with blue Twitter bird logo',
    icon: <FaTwitter size={28} color='#08a0e9' />,
  },
  {
    title: 'Let\'s collaborate on GitHub',
    url: URL_GITHUB,
    alt: 'Link to Github page, with grey Github Octocat logo',
    icon: <FaGithub size={28} color='#24292E' />,
  },
]

export interface NavigationBarProps {
  pathname: string
}

const mapStateToProps = (state: State) => ({
  pathname: selectPathname(state),
})

const mapDispatchToProps = {}

export const NavigationBar = connect(mapStateToProps, mapDispatchToProps)(NavigationBarDisconnected)

export function NavigationBarDisconnected({ pathname }: NavigationBarProps) {
  return (
    <nav
      className='navbar navbar-expand navbar-light navbar-scroll hide-native-scrollbar'
      role='navigation'
      data-testid='NavigationBar'
    >
      <Link className='navbar-brand d-flex' href='/' role='button'>
        <BrandLogo className='navigation-bar-product-logo' />
      </Link>

      <ul className='navbar-nav'>
        {Object.entries(navLinksLeft).map(([url, text]) => {
          return (
            <NavigationLink key={url} url={url} active={matchingUrl(url, pathname)}>
              {text}
            </NavigationLink>
          )
        })}
      </ul>

      <ul className='navbar-nav ml-auto d-flex'>
        {navLinksRight.map(({ title, url, alt, icon }) => (
          <li key={title} className='nav-item mx-2 my-auto'>
            <LinkExternal title={title} href={url} alt={alt} icon={null}>
              {icon}
            </LinkExternal>
          </li>
        ))}
      </ul>
    </nav>
  )
}
