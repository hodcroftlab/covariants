import type { NextConfig } from 'next'

import { addWebpackLoader } from './lib/addWebpackLoader'

export default function withSvg(nextConfig: NextConfig) {
  return addWebpackLoader(nextConfig, (_webpackConfig, _context) => ({
    test: /\.svg$/i,
    issuer: /\.(ts|tsx|js|jsx|md|mdx|scss|sass|css)$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          removeViewbox: false,
          typescript: false,
        },
      },
    ],
  }))
}
