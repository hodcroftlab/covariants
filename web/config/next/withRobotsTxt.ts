import { NextConfig } from 'next'
import EmitFilePlugin from 'emit-file-webpack-plugin'
import { addWebpackPlugin } from './lib/addWebpackPlugin'

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
