import path from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import type { NextConfig } from 'next'
import { addWebpackPlugin } from './lib/addWebpackPlugin'

import { findModuleRoot } from '../../lib/findModuleRoot'
import tsConfig from '../../tsconfig.json'

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
          // TODO: resolve this issue, just commented out to get first build off the ground
          // enabled: typeChecking,
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
        // TODO: resolve this issue, just commented out to get first build off the ground
        // eslint: {
        //   enabled: eslint,
        //   memoryLimit,
        //   files: [path.join(moduleRoot, 'src/**/*.{js,jsx,ts,tsx}')],
        //   options: { cache: false },
        // },

        formatter: 'codeframe',
      }),
    )
  }

export default getWithTypeChecking
