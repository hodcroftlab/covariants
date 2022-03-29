import { unset } from 'lodash'

import type { NextConfig } from 'next'
import { addWebpackConfig } from './lib/addWebpackConfig'

export default function withFriendlyChunkNames(nextConfig: NextConfig) {
  return addWebpackConfig(nextConfig, (nextConfig, webpackConfig, _options) => {
    if (
      typeof webpackConfig.optimization?.splitChunks !== 'boolean' &&
      webpackConfig.optimization?.splitChunks?.cacheGroups
    ) {
      unset(webpackConfig, 'optimization.splitChunks.cacheGroups.lib.name')
      unset(webpackConfig, 'optimization.splitChunks.cacheGroups.shared.name')
    }
    return webpackConfig
  })
}
