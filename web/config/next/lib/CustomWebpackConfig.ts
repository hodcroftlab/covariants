import type { NextConfig } from 'next'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'
import type { Configuration } from 'webpack'

export type CustomWebpackConfig = (
  nextConfig: NextConfig,
  webpackConfig: Configuration,
  options: WebpackConfigContext,
) => Configuration
