import type { NextConfig, NextWebpackOptions } from 'next'
import type { Configuration } from 'webpack'

export type CustomWebpackConfig = (
  nextConfig: NextConfig,
  webpackConfig: Configuration,
  options: NextWebpackOptions,
) => Configuration
