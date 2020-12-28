import React from 'react'

import { connect } from 'react-redux'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { TWITTER_USERNAME_RAW, URL_GITHUB } from 'src/constants'

import { State } from 'src/state/reducer'
import { selectPathname } from 'src/state/router/router.selectors'

import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { NavigationLink } from 'src/components/Layout/NavigationLink'

import { ReactComponent as BrandLogo } from 'src/assets/images/logo.svg'

const navLinksLeft = {
  '/': 'SARS-CoV-2 Clusters',
  '/distributions': 'Cluster Distribution',
  '/faq': 'FAQ',
  '/team': 'Team',
}

const navLinksRight = [
  {
    title: 'Follow me on Twitter',
    url: `https://twitter.com/${TWITTER_USERNAME_RAW}`,
    alt: 'Link to Twitter, with blue Twitter bird logo',
    icon: <FaTwitter size={28} color="#08a0e9" />,
  },
  {
    title: "Let's collaborate on GitHub",
    url: URL_GITHUB,
    alt: 'Link to Github page, with grey Github Octocat logo',
    icon: <FaGithub size={28} color="#24292E" />,
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
      className="navbar navbar-expand navbar-light navbar-scroll hide-native-scrollbar"
      role="navigation"
      data-testid="NavigationBar"
    >
      <Link className="navbar-brand d-flex" href="/" role="button">
        <BrandLogo className="navigation-bar-product-logo" />
      </Link>

      <ul className="navbar-nav">
        {Object.entries(navLinksLeft).map(([url, text]) => {
          return (
            <NavigationLink key={url} url={url} active={pathname === url}>
              {text}
            </NavigationLink>
          )
        })}
      </ul>

      <ul className="navbar-nav ml-auto d-flex">
        {navLinksRight.map(({ title, url, alt, icon }) => (
          <li key={title} className="nav-item mx-2 my-auto">
            <LinkExternal title={title} url={url} alt={alt}>
              {icon}
            </LinkExternal>
          </li>
        ))}
      </ul>
    </nav>
  )
}
