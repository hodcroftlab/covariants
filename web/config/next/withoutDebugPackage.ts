import path from 'path'

import type { NextConfig } from 'next'

import { addWebpackLoader } from './lib/addWebpackLoader'

export default function withoutDebugPackage(nextConfig: NextConfig) {
  return addWebpackLoader(nextConfig, (_webpackConfig, _context) => ({
    test: /\.(ts|tsx|js|jsx)$/i,
    use: [
      {
        loader: path.resolve(__dirname, 'loaders', 'removeDebugPackageLoader.js'),
      },
    ],
  }))
}
