import { NextConfig } from 'next'
import path from 'path'

import { uniq } from 'lodash'

import getWithMDX from '@next/mdx'
import withPlugins from 'next-compose-plugins'
import getWithTranspileModules from 'next-transpile-modules'

import { findModuleRoot } from '../../lib/findModuleRoot'
import { getGitBranch } from '../../lib/getGitBranch'
import { getBuildNumber } from '../../lib/getBuildNumber'
import { getBuildUrl } from '../../lib/getBuildUrl'
import { getGitCommitHash } from '../../lib/getGitCommitHash'
import { getEnvVars } from './lib/getEnvVars'

import getWithExtraWatch from './withExtraWatch'
import getWithFriendlyConsole from './withFriendlyConsole'
import getWithLodash from './withLodash'
import { getWithRobotsTxt } from './withRobotsTxt'
import getWithTypeChecking from './withTypeChecking'
import withSvg from './withSvg'
import withIgnore from './withIgnore'
import withoutMinification from './withoutMinification'
import withFriendlyChunkNames from './withFriendlyChunkNames'
import withResolve from './withResolve'
import withWebpackWatchPoll from './withWebpackWatchPoll'
import withUrlAsset from './withUrlAsset'

const {
  // BABEL_ENV,
  // NODE_ENV,
  // ANALYZE,
  PROFILE,
  PRODUCTION,
  ENABLE_SOURCE_MAPS,
  ENABLE_ESLINT,
  ENABLE_TYPE_CHECKS,
  // ENABLE_STYLELINT,
  DOMAIN,
  DOMAIN_STRIPPED,
  WATCH_POLL,
} = getEnvVars()

const BRANCH_NAME = getGitBranch()

const { pkg, moduleRoot } = findModuleRoot()

const clientEnv = {
  BRANCH_NAME,
  PACKAGE_VERSION: pkg.version ?? '',
  BUILD_NUMBER: getBuildNumber(),
  TRAVIS_BUILD_WEB_URL: getBuildUrl(),
  COMMIT_HASH: getGitCommitHash(),
  DOMAIN,
  DOMAIN_STRIPPED,
}

console.info(`Client-side Environment:\n${JSON.stringify(clientEnv, null, 2)}`)

const nextConfig: NextConfig = {
  distDir: `.build/${process.env.NODE_ENV}/tmp`,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx', 'all-contributorsrc'],
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
  modern: false,
  // reactStrictMode: true,
  experimental: {
    // reactMode: 'concurrent',
    // reactRoot: true,
    scrollRestoration: true,
  },
  swcMinify: true,
  productionBrowserSourceMaps: ENABLE_SOURCE_MAPS,
  excludeDefaultMomentLocales: true,
  devIndicators: {
    buildActivity: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  env: clientEnv,
  poweredByHeader: false,
  webpack(config) {
    config.experiments.topLevelAwait = true
    return config
  },
}

const withMDX = getWithMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      // prettier-ignore
      require('remark-breaks'),
      require('remark-images'),
      require('remark-math'),
      require('remark-slug'),
      [
        require('remark-toc'),
        {
          tight: true,
        },
      ],
      // [
      //   require('remark-autolink-headings'),
      //   {
      //     behavior: 'prepend',
      //     content: {
      //       type: 'element',
      //       tagName: 'i',
      //       properties: { className: ['bi', 'bi-link-45deg', 'mdx-link-icon'] },
      //     },
      //   },
      // ],
    ],
    rehypePlugins: [],
  },
})

const withFriendlyConsole = getWithFriendlyConsole({
  clearConsole: false,
  projectRoot: path.resolve(moduleRoot),
  packageName: pkg.name || 'web',
  progressBarColor: '#6529ff',
})

const withExtraWatch = getWithExtraWatch({
  files: [path.join(moduleRoot, 'src/types/**/*.d.ts')],
  dirs: [],
})

const withLodash = getWithLodash({ unicode: false })

const withTypeChecking = getWithTypeChecking({
  typeChecking: ENABLE_TYPE_CHECKS,
  eslint: ENABLE_ESLINT,
  memoryLimit: 4096,
})

const transpilationListDev = [
  // prettier-ignore
  "d3-scale",
]

const transpilationListProd = uniq([
  // prettier-ignore
  ...transpilationListDev,
  'debug',
  'lodash',
  'react-share',
  'recharts',
  'semver',
])

const withTranspileModules = getWithTranspileModules(PRODUCTION ? transpilationListProd : transpilationListDev)

const withRobotsTxt = getWithRobotsTxt(`User-agent: *\nDisallow:${BRANCH_NAME === 'release' ? '' : ' *'}\n`)

const config = withPlugins(
  [
    [withIgnore],
    [withExtraWatch],
    [withSvg],
    [withFriendlyConsole],
    [withMDX],
    [withLodash],
    [withTypeChecking],
    [withTranspileModules],
    PROFILE && [withoutMinification],
    WATCH_POLL && [withWebpackWatchPoll],
    [withFriendlyChunkNames],
    [withResolve],
    [withRobotsTxt],
    [withUrlAsset],
  ].filter(Boolean),
  nextConfig,
)

export default config
