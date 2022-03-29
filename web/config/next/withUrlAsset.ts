import type { NextConfig } from 'next'

import { addWebpackLoader } from './lib/addWebpackLoader'

export default function withUrlAsset(nextConfig: NextConfig) {
  return addWebpackLoader(nextConfig, (_webpackConfig, _context) => ({
    type: 'asset',
    resourceQuery: /url/, // *.svg?url
  }))
}
