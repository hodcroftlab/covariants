import path from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import type { NextConfig } from 'next'

import { findModuleRoot } from '../../lib/findModuleRoot'
import tsConfig from '../../tsconfig.json'
import { addWebpackPlugin } from './lib/addWebpackPlugin'

const { moduleRoot } = findModuleRoot()

export interface CreateFormatterParams {
  warningsAreErrors: boolean
}

export interface GetWithTypeCheckingParams {
  eslint: boolean
  typeChecking: boolean
  memoryLimit?: number
  exclude?: string[]
}

const getWithTypeChecking =
  ({ eslint, typeChecking, memoryLimit = 512, exclude }: GetWithTypeCheckingParams) =>
  (nextConfig: NextConfig) => {
    if (!typeChecking && !eslint) {
      return nextConfig
    }

    return addWebpackPlugin(
      nextConfig,
      new ForkTsCheckerWebpackPlugin({
        issue: {
          exclude: exclude?.map((file) => ({ origin: 'typescript', file })),
        },

        typescript: {
          configFile: path.join(moduleRoot, 'tsconfig.json'),
          memoryLimit,
          mode: 'write-references',
          diagnosticOptions: { syntactic: true, semantic: true, declaration: true, global: true },
          configOverwrite: {
            compilerOptions: {
              ...tsConfig.compilerOptions,
              skipLibCheck: true,
              sourceMap: false,
              inlineSourceMap: false,
              declarationMap: false,
            },
            include: [
              'lib/**/*.js',
              'lib/**/*.jsx',
              'lib/**/*.ts',
              'lib/**/*.tsx',
              'src/**/*.js',
              'src/**/*.jsx',
              'src/**/*.ts',
              'src/**/*.tsx',
            ],
            exclude: [...tsConfig.exclude, ...(exclude ?? [])],
          },
        },

        formatter: 'codeframe',
      }),
    )
  }

export default getWithTypeChecking
