require('./config/dotenv')

module.exports = {
  comments: false,
  compact: false,
  minified: false,
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        corejs: false,
        modules: 'commonjs',
        shippedProposals: true,
        targets: { node: '14' },
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
