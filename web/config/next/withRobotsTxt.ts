import { NextConfig } from 'next'
import { addWebpackPlugin } from './lib/addWebpackPlugin'
import EmitFilePlugin from 'emit-file-webpack-plugin'

export const getWithRobotsTxt = (content: string) => (nextConfig: NextConfig) => {
  return addWebpackPlugin(
    nextConfig,
    new EmitFilePlugin({
      path: '.',
      filename: 'robots.txt',
      content,
      hash: false,
    }),
  )
}
