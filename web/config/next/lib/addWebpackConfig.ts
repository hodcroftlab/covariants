import type { NextWebpackOptions, NextConfig } from 'next'
import type { Configuration } from 'webpack'

import { CustomWebpackConfig } from './CustomWebpackConfig'

export function addWebpackConfig(nextConfig: NextConfig, customWebpackConfig: CustomWebpackConfig) {
  const webpack = (webpackConfig: Configuration, options: NextWebpackOptions) => {
    const newConfig = customWebpackConfig(nextConfig, webpackConfig, options)

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(newConfig, options)
    }

    return newConfig
  }

  return { ...nextConfig, webpack }
}
