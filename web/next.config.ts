import { NextConfig } from 'next'
import path from 'path'

import { uniq } from 'lodash'

import getWithMDX from '@next/mdx'
import withPlugins from 'next-compose-plugins'
import getWithTranspileModules from 'next-transpile-modules'
import remarkToc from 'remark-toc';
import remarkSlug from 'remark-slug';
import remarkBreaks from 'remark-breaks';
import remarkImages from 'remark-images';
import remarkMath from 'remark-math';

import { findModuleRoot } from './lib/findModuleRoot'
import { getGitBranch } from './lib/getGitBranch'
import { getBuildNumber } from './lib/getBuildNumber'
import { getBuildUrl } from './lib/getBuildUrl'
import { getGitCommitHash } from './lib/getGitCommitHash'
import { getEnvVars } from './config/next/lib/getEnvVars'

import getWithExtraWatch from './config/next/withExtraWatch'
import getWithFriendlyConsole from './config/next/withFriendlyConsole'
import getWithLodash from './config/next/withLodash'
import { getWithRobotsTxt } from './config/next/withRobotsTxt'
import getWithTypeChecking from './config/next/withTypeChecking'
import withSvg from './config/next/withSvg'
import withIgnore from './config/next/withIgnore'
import withoutMinification from './config/next/withoutMinification'
import withFriendlyChunkNames from './config/next/withFriendlyChunkNames'
import withResolve from './config/next/withResolve'
import withWebpackWatchPoll from './config/next/withWebpackWatchPoll'
import withUrlAsset from './config/next/withUrlAsset'

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
  distDir: `.build/${process.env.NODE_ENV}/web`,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx', 'all-contributorsrc'],
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
  // reactStrictMode: true,
  experimental: {
    // reactMode: 'concurrent',
    // reactRoot: true,
    scrollRestoration: true,
  },
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
  sassOptions: {
    includePaths: ['node_modules'], // the correct option should be loadPaths but somehow that does not work (yet)
    // There are a lot of warnings coming from SASS API changes that bootstrap has not implemented, silencing those
    // However, this might mask warnings from our own code, so be sure to check from time to time. `quietDeps` seems to
    // not work completely as intended.
    quietDeps: true,
    silenceDeprecations: ['mixed-decls', 'color-functions', 'legacy-js-api', 'global-builtin', 'import'],
  },
  output: 'export', // TODO: with the cli command, two threads were used here, no idea how to do it with this config option
  // TODO: images option is needed because of static export
  //  (https://nextjs.org/docs/app/building-your-application/deploying/static-exports#image-optimization);
  //  can be removed, once the GISAID svg logo works again
  images: {
    unoptimized: true
  }
}

const withMDX = getWithMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      // prettier-ignore
      remarkBreaks,
      remarkImages,
      remarkMath,
      remarkSlug,
      remarkToc,
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
