/* eslint-disable @typescript-eslint/no-var-requires */
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const aliases = require('./webpack.aliases');

module.exports = {
  // https://github.com/electron/electron/issues/9920
  //target: 'electron-renderer',
  target: 'web',
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      // React Hot Loader Patch
      'react-dom': '@hot-loader/react-dom',
      // Custom Aliases
      ...aliases,
    },
  },
};
