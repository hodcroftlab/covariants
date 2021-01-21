import type { NextConfig } from 'next'

import { addWebpackLoader } from './lib/addWebpackLoader'

export default function withJson(nextConfig: NextConfig) {
  return addWebpackLoader(nextConfig, (webpackConfig, { dev }) => ({
    test: /\.(all-contributorsrc)$/i,
    use: [
      {
        loader: 'json-loader',
      },
    ],
  }))
}
