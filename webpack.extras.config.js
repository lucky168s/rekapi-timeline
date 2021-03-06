const commonConfig = require('./webpack.common.config');
const path = require('path');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { name, version } = require('./package.json');

const dist = 'dist';

module.exports = Object.assign(commonConfig, {
  entry: {
    demo: './demo/index.js'
  },
  output: {
    path: path.join(__dirname, `${dist}`),
    filename: '[name].js',
    library: 'rekapi-timeline',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        unused: true
      },
      output: {
        comments: false
      }
    }),
    new CopyWebpackPlugin([
      { from: 'index.html' }
    ])
  ]
});
