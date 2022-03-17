import { NextConfig } from 'next'
import CopyPlugin, { PluginOptions as CopyPluginOptions } from 'copy-webpack-plugin'
import { addWebpackPlugin } from './lib/addWebpackPlugin'

const getWithCopy = (options: CopyPluginOptions) => (nextConfig: NextConfig) => {
  return addWebpackPlugin(nextConfig, new CopyPlugin(options))
}

export default getWithCopy

export { type PluginOptions as CopyPluginOptions } from 'copy-webpack-plugin'
