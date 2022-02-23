import type { NextConfig, NextWebpackOptions } from 'next'

import type { Configuration, RuleSetRule } from 'webpack'

import { addWebpackConfig } from './addWebpackConfig'

export type GetLoaderFunction = (webpackConfig: Configuration, options: NextWebpackOptions) => RuleSetRule

export function addWebpackLoader(nextConfig: NextConfig, getLoader: GetLoaderFunction) {
  return addWebpackConfig(nextConfig, (nextConfig, webpackConfig, options) => {
    const loader = getLoader(webpackConfig, options)
    webpackConfig?.module?.rules?.push(loader)
    return webpackConfig
  })
}
