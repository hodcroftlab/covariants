import path from 'path'

import type { NextConfig } from 'next'
import { findModuleRoot } from '../../lib/findModuleRoot'
import { addWebpackConfig } from './lib/addWebpackConfig'

const { moduleRoot } = findModuleRoot()

export default function withResolve(nextConfig: NextConfig) {
  return addWebpackConfig(nextConfig, (nextConfig, webpackConfig, options) => {
    webpackConfig.resolve = {
      ...webpackConfig.resolve,
      modules: [
        ...(webpackConfig.resolve?.modules ?? []),
        path.resolve(moduleRoot),
        path.resolve(moduleRoot, '..'),
        path.resolve(moduleRoot, 'src'),
        path.resolve(moduleRoot, 'node_modules'),
      ],
    }

    return webpackConfig
  })
}
