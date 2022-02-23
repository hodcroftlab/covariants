/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextWebpackOptions, NextConfig } from 'next'
import type { Compiler, Configuration, WebpackPluginFunction, WebpackPluginInstance } from 'webpack'

import { addWebpackConfig } from './addWebpackConfig'

export function addWebpackPlugin(
  nextConfig: NextConfig,
  plugin: WebpackPluginInstance | WebpackPluginFunction | ((this: Compiler, compiler: Compiler) => void) | any,
) {
  return addWebpackConfig(
    nextConfig,
    (nextConfig: NextConfig, webpackConfig: Configuration, { isServer }: NextWebpackOptions) => {
      if (!isServer) {
        if (webpackConfig?.plugins) {
          webpackConfig.plugins.push(plugin)
        } else {
          return { plugins: [plugin] }
        }
      }
      return webpackConfig
    },
  )
}
