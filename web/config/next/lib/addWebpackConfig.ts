import type { NextConfig } from 'next'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'
import type { Configuration } from 'webpack'

import { CustomWebpackConfig } from './CustomWebpackConfig'

export function addWebpackConfig(nextConfig: NextConfig, customWebpackConfig: CustomWebpackConfig) {
  const webpack = (webpackConfig: Configuration, options: WebpackConfigContext) => {
    const newConfig = customWebpackConfig(nextConfig, webpackConfig, options)

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(newConfig, options)
    }

    return newConfig
  }

  return { ...nextConfig, webpack }
}
