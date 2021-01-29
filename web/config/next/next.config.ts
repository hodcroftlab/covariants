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
import withRaw from './withRaw'
import withJson from './withJson'
import withSvg from './withSvg'
import withImages from './withImages'
import withIgnore from './withIgnore'
import withoutMinification from './withoutMinification'
import withFriendlyChunkNames from './withFriendlyChunkNames'
import withResolve from './withResolve'
import getWithCopy from './withCopy'

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
  ENABLE_REDUX_DEV_TOOLS,
  ENABLE_REDUX_IMMUTABLE_STATE_INVARIANT,
  ENABLE_REDUX_LOGGER,
  DEBUG_SET_INITIAL_DATA,
  DOMAIN,
  DOMAIN_STRIPPED,
} = getEnvVars()

const BRANCH_NAME = getGitBranch()

const { pkg, moduleRoot } = findModuleRoot()

const clientEnv = {
  ENABLE_REDUX_DEV_TOOLS: ENABLE_REDUX_DEV_TOOLS.toString(),
  ENABLE_REDUX_LOGGER: ENABLE_REDUX_LOGGER.toString(),
  ENABLE_REDUX_IMMUTABLE_STATE_INVARIANT: ENABLE_REDUX_IMMUTABLE_STATE_INVARIANT.toString(),
  DEBUG_SET_INITIAL_DATA: DEBUG_SET_INITIAL_DATA.toString(),
  BRANCH_NAME,
  PACKAGE_VERSION: pkg.version ?? '',
  BUILD_NUMBER: getBuildNumber(),
  TRAVIS_BUILD_WEB_URL: getBuildUrl(),
  COMMIT_HASH: getGitCommitHash(),
  DOMAIN,
  DOMAIN_STRIPPED,
}

console.info(`Client-side Environment:\n${JSON.stringify(clientEnv, null, 2)}`)

const nextConfig = {
  distDir: `.build/${process.env.NODE_ENV}/tmp`,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx', 'all-contributorsrc'],
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
  experimental: {
    modern: false, // this breaks Threads.js workers in production
    productionBrowserSourceMaps: ENABLE_SOURCE_MAPS,
  },
  future: {
    excludeDefaultMomentLocales: true,
  },
  devIndicators: {
    buildActivity: false,
    autoPrerender: false,
  },
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true,
  },
  env: clientEnv,
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

// const withStaticComprression = getWithStaticComprression({ brotli: false })

const withTypeChecking = getWithTypeChecking({
  typeChecking: ENABLE_TYPE_CHECKS,
  eslint: ENABLE_ESLINT,
  memoryLimit: 2048,
})

const transpilationListDev = [
  // prettier-ignore
  "d3-scale",
]

const transpilationListProd = uniq([
  ...transpilationListDev,
  '!d3-array/src/cumsum.js',
  '@loadable',
  'create-color',
  'd3-array',
  'debug',
  'delay',
  'immer',
  'is-observable',
  'lodash',
  'observable-fns',
  'p-min-delay',
  'proper-url-join',
  'query-string',
  'react-router',
  'react-share',
  'recharts',
  'redux-saga',
  'redux/es',
  'semver',
  'split-on-first',
  'strict-uri-encode',
  'threads',
])

const withTranspileModules = getWithTranspileModules(PRODUCTION ? transpilationListProd : transpilationListDev)

const withCopy = getWithCopy({
  patterns: [
    { from: path.join(moduleRoot, '..', 'content', 'proteins'), to: 'static/content/proteins' },
    { from: path.join(moduleRoot, 'content', 'proteins'), to: 'static/content/proteins' },
  ],
})

const withRobotsTxt = getWithRobotsTxt(`User-agent: *\nDisallow:${BRANCH_NAME === 'release' ? '' : ' *'}\n`)

const config = withPlugins(
  [
    [withCopy],
    [withIgnore],
    [withExtraWatch],
    [withSvg],
    [withImages],
    [withRaw],
    [withJson],
    [withFriendlyConsole],
    [withMDX],
    [withLodash],
    [withTypeChecking],
    [withTranspileModules],
    PROFILE && [withoutMinification],
    [withFriendlyChunkNames],
    [withResolve],
    [withRobotsTxt],
  ].filter(Boolean),
  nextConfig,
)

export default config
