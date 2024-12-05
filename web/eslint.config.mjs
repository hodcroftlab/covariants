import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import arrayFunc from 'eslint-plugin-array-func'
import cflint from 'eslint-plugin-cflint'
import importPlugin from 'eslint-plugin-import'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import noLoops from 'eslint-plugin-no-loops'
import noSecrets from 'eslint-plugin-no-secrets'
import node from 'eslint-plugin-node'
import onlyAscii from 'eslint-plugin-only-ascii'
import promise from 'eslint-plugin-promise'
import react from 'eslint-plugin-react'
import reactPerf from 'eslint-plugin-react-perf'
import security from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import onlyWarn from 'eslint-plugin-only-warn'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      '**/3rdparty',
      '**/.build',
      '**/.next',
      '**/.coverage',
      '**/.playwright-report',
      '**/.cache',
      '**/.env',
      '**/.github',
      '**/.idea',
      '**/.ignore',
      '**/.reports',
      '**/.vscode',
      'infra/lambda-at-edge/basicAuth.js',
      '**/node_modules',
      '**/public',
      '**/styles',
      '**/tsconfig.json',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  arrayFunc.configs.all,
  // TODO: there is an issue with sonar that should soon be fixed: https://community.sonarsource.com/t/eslint-plugin-sonarjs-doesn-t-work-with-eslint-9-15-0/130771
  // once this is fixed, uncomment the line below and remove sonarjs from the plugins. See https://github.com/hodcroftlab/covariants/issues/439
  // sonarjs.configs.recommended,
  security.configs.recommended,
  unicorn.configs['flat/recommended'],
  reactPerf.configs.flat.all,
  react.configs.flat.recommended,
  promise.configs['flat/recommended'],
  importPlugin.flatConfigs.errors,
  importPlugin.flatConfigs.warnings,
  importPlugin.flatConfigs.typescript,
  jsxA11Y['flatConfigs'].recommended,

  ...fixupConfigRules(
    compat.extends(
      'plugin:@next/eslint-plugin-next/core-web-vitals',
      'plugin:lodash/recommended',
      'plugin:prettier/recommended',
      'plugin:react-hooks/recommended',
    ),
  ),
  {
    plugins: {
      'array-func': arrayFunc,
      'cflint': fixupPluginRules(cflint),
      'no-loops': noLoops,
      'no-secrets': noSecrets,
      node,
      'only-ascii': onlyAscii,
      sonarjs,
      'only-warn': onlyWarn,
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: ['./tsconfig.eslint.json'],
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },

    settings: {
      'react': {
        version: 'detect',
      },

      'import/parsers': {
        '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
      },

      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      '@next/next/no-title-in-document-head': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/unbound-method': ['off'],
      'camelcase': 'warn',
      'cflint/no-substr': 'warn',
      'cflint/no-this-assignment': 'warn',

      'import/extensions': [
        'warn',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          mjs: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      'import/no-extraneous-dependencies': [
        'warn',
        {
          devDependencies: true,
        },
      ],

      'import/no-webpack-loader-syntax': 'off',
      'import/no-cycle': 'off',
      'import/order': 'warn',
      'import/prefer-default-export': 'off',

      'jsx-a11y/label-has-associated-control': [
        'warn',
        {
          assert: 'either',
        },
      ],

      'lodash/chaining': 'off',
      'lodash/import-scope': 'off',
      'lodash/prefer-constant': 'off',
      'lodash/prefer-lodash-chain': 'off',
      'lodash/prefer-lodash-method': 'off',
      'lodash/prefer-lodash-typecheck': 'off',
      'lodash/prefer-noop': 'off',
      'lodash/prop-shorthand': 'off',
      'max-classes-per-file': 'off',

      'no-console': [
        'warn',
        {
          allow: ['info', 'warn', 'error'],
        },
      ],

      'no-loops/no-loops': 'warn',

      'no-param-reassign': [
        'warn',
        {
          ignorePropertyModificationsFor: ['draft'],
        },
      ],

      'no-secrets/no-secrets': [
        'warn',
        {
          tolerance: 5,
        },
      ],

      'no-shadow': 'off',
      'only-ascii/only-ascii': 'warn',
      'prefer-for-of': 'off',
      'prettier/prettier': 'warn',
      'react/jsx-curly-brace-presence': 'off',

      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],

      'react/jsx-props-no-spreading': 'off',
      'react/no-unused-prop-types': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/state-in-constructor': 'off',
      'security/detect-non-literal-fs-filename': 'off',
      'security/detect-object-injection': 'off',
      'sonarjs/cognitive-complexity': ['warn', 20],
      'unicorn/escape-case': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/new-for-builtins': 'off',
      'unicorn/no-abusive-eslint-disable': 'warn',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-fn-reference-in-iterator': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-reduce': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/no-zero-fractions': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/prevent-abbreviations': 'off',

      'lines-between-class-members': [
        'warn',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],

      'require-await': 'off',
      '@typescript-eslint/require-await': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-duplicate-imports': 'off',
    },
  },
  {
    files: ['src/pages/**/*', 'src/types/**/*'],

    rules: {
      'no-restricted-exports': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],

    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'import/no-duplicates': 'off',
      'no-useless-constructor': 'off',
      'react/prefer-stateless-function': 'off',
    },
  },
  {
    files: ['!src/**/*'],

    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'global-require': 'off',
      'import/extensions': 'off',
      'import/no-anonymous-default-export': 'off',
      'import/no-import-module-exports': 'off',
      'security/detect-child-process': 'off',
      'sonarjs/cognitive-complexity': ['warn', 50],
      'unicorn/prefer-module': 'off',
    },
  },
  {
    files: ['**/*.test.*', '**/__test__/**', '**/__tests__/**', '**/test/**', '**/tests/**'],

    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-identical-functions': 'off',
    },
  },
]
