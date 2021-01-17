require('./config/dotenv')

const development = process.env.NODE_ENV === 'development'
const production = process.env.NODE_ENV === 'production'
const analyze = process.env.ANALYZE === '1'
const debuggableProd = process.env.DEBUGGABLE_PROD === '1'

module.exports = (api) => {
  const test = api.caller((caller) => !!(caller && caller.name === 'babel-jest'))
  const node = api.caller((caller) => !!(caller && ['@babel/node', '@babel/register'].includes(caller.name)))
  const web = !(test || node)

  if (node) {
    return {
      compact: false,
      presets: [
        '@babel/preset-typescript',
        [
          '@babel/preset-env',
          {
            corejs: false,
            modules: 'commonjs',
            shippedProposals: true,
            targets: { node: '12' },
            exclude: ['transform-typeof-symbol'],
          },
        ],
      ],
      plugins: [
        'babel-plugin-transform-typescript-metadata', // goes before "proposal-decorators"
        ['@babel/plugin-proposal-decorators', { legacy: true }], // goes before "class-properties"
        'babel-plugin-parameter-decorator',
        ['@babel/plugin-proposal-class-properties'],
        ['@babel/plugin-proposal-numeric-separator'],
      ].filter(Boolean),
    }
  }

  return {
    compact: false,
    presets: [
      [
        'next/babel',
        {
          'preset-env': {
            useBuiltIns: 'usage',
            corejs: '3',
            modules: web ? false : undefined,
          },
          // 'transform-runtime': {},
          // 'styled-jsx': {},
          'class-properties': { loose: true },
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      'babel-plugin-parameter-decorator',
      '@babel/plugin-proposal-numeric-separator',
      ['babel-plugin-styled-components', { ssr: true }],
      'babel-plugin-lodash',
      (development || debuggableProd) && web && !analyze && ['babel-plugin-typescript-to-proptypes', { typeCheck: './src/**/*.ts' }], // prettier-ignore
      // (development || debuggableProd) && web && !analyze && 'babel-plugin-redux-saga', // prettier-ignore
      (((development || analyze || debuggableProd) && web) || (node)) && 'babel-plugin-smart-webpack-import', // prettier-ignore
      production && web && ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }], // prettier-ignore
      production && web && '@babel/plugin-transform-flow-strip-types',

      // Breaks MDX. See https://github.com/mdx-js/mdx/issues/1327
      // !(development || debuggableProd) && web && '@babel/plugin-transform-react-inline-elements', // prettier-ignore

      !(development || debuggableProd) && web && '@babel/plugin-transform-react-constant-elements', // prettier-ignore
      ['babel-plugin-strip-function-call', { strip: ['timerStart', 'timerEnd'] }],
    ].filter(Boolean),
  }
}
