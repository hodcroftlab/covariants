require('../dotenv')

const { findModuleRoot } = require('../../lib/findModuleRoot')

const { moduleRoot } = findModuleRoot()

module.exports = {
  rootDir: moduleRoot,
  roots: ['<rootDir>/src'],
  displayName: { name: 'test', color: 'cyan' },
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: {
        pathRegex: /(\/__tests?__\/.*|([./])(test|spec))\.[jt]sx?$/,
        warnOnly: true,
      },
    },
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'ts-jest',
    '^.+\\.(md|mdx)$': 'jest-transformer-mdx',
    '\\.(txt|fasta|csv|tsv)': 'jest-raw-loader',
  },
  testMatch: [
    '<rootDir>/src/**/*.(spec|test).{js,jsx,ts,tsx}',
    '<rootDir>/src/**/__test__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/test/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/tests/**/*.{js,jsx,ts,tsx}',
  ],
  transformIgnorePatterns: ['node_modules/(?!(d3-scale)/)'],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1',
    '\\.(eot|otf|webp|ttf|woff\\d?|svg|png|jpe?g|gif)$': '<rootDir>/config/jest/mocks/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
    'react-children-utilities': '<rootDir>/config/jest/mocks/mockReactChildrenUtilities.js',
    'react-i18next': '<rootDir>/config/jest/mocks/mockReactI18next.js',
    'popper-js': '<rootDir>/config/jest/mockPopperJS.js',
    'use-debounce': '<rootDir>/config/jest/mocks/mockUseDebounce.js',
  },
  setupFiles: ['core-js', 'regenerator-runtime'],
  setupFilesAfterEnv: [
    '<rootDir>/config/jest/setupDotenv.js',
    'jest-chain',
    'jest-extended',
    'jest-axe/extend-expect',
    '@testing-library/jest-dom/extend-expect',
  ],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
}
