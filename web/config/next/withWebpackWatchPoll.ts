import { set } from 'lodash'

import type { NextConfig } from 'next'
import { addWebpackConfig } from './lib/addWebpackConfig'

export default function withWebpackWatchPoll(nextConfig: NextConfig) {
  return addWebpackConfig(nextConfig, (nextConfig, webpackConfig, options) => {
    set(webpackConfig, 'watchOptions.poll', 1000)
    return webpackConfig
  })
}
