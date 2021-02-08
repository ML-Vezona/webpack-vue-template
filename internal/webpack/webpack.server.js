const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const merge = require('webpack-merge');
// const nodeExternals = require('webpack-node-externals');

const base = require('./webpack.base');

module.exports = merge(base, {
  target: 'node',
  devtool: false,
  mode: 'production',
  entry: './js/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  },
  // externals: [nodeExternals()],
  externals: Object.keys(require('../../package.json').dependencies),
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.VUE_ENV': JSON.stringify('server'),
    }),
    new VueSSRServerPlugin(),
  ],
});

