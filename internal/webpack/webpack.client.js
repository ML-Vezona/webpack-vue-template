const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WeinreWebpackPlugin = require('weinre-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBar = require('webpackbar');
const moment = require('moment');

const { toFilename } = require('./util');
const base = require('./webpack.base');
const config = require('../../config');

const DEV_MODE = process.env.NODE_ENV === 'development';
const WEINRE_MODE = DEV_MODE && process.env.WEINRE;

const pugData = {
  ...config,
  DEV_MODE,
  TIME: moment().format('YYYY/MM/DD-HH:mm:ss'),
  HASH: moment().format('YYYYMMDDHHmmss'),
};

const webpackConfig = merge(base, {
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'html/index.pug',
      data: pugData,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new CopyWebpackPlugin([
      { from: 'asset', to: './asset/', ignore: ['.*'] },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VUE_ENV: JSON.stringify('client'),
        APP_ENV: JSON.stringify(process.env.APP_ENV),
        HASH: JSON.stringify(moment().format('mmHHDDD')),
        ...Object.keys(config).reduce((o, key) => {
          const value = config[key];
          o[key] = ['boolean', 'number'].indexOf(typeof value) !== -1
            ? value
            : JSON.stringify(value);
          return o;
        }, {}),
      },
    }),
    new WebpackBar(),
    ...DEV_MODE ? [
      new FriendlyErrorsPlugin(),
    ] : [
      new OptimizeCSSAssetsPlugin({}),
    ],
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 3000,
    hot: true,
    stats: {
      colors: true,
      hash: false,
      chunks: false,
      chunkModules: false,
      children: false,
    },
    host: '0.0.0.0',
    disableHostCheck: true,
    // proxy: [
    //   {
    //     context: ['/upload', '/API'],
    //     target: 'http://52.175.149.244',
    //     changeOrigin: true,
    //   },
    // ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 100,
      minChunks: 1,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendors: {
          name: 'vendor',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          enforce: true,
        },
      },
    },
  },
});

if (WEINRE_MODE) {
  webpackConfig.plugins.push(new WeinreWebpackPlugin({
    httpPort: 8000,
    boundHost: '0.0.0.0',
    verbose: false,
    debug: false,
    readTimeout: 5,
  }));
}

if (process.env.SSR) {
  webpackConfig.plugins.push(new VueSSRClientPlugin());
}

if (!DEV_MODE) {
  const stylusLoader = webpackConfig.module.rules.find(({ test }) => test.test('.stylus'));
  // Replace the `vue-style-loader` with
  // the MiniCssExtractPlugin loader.
  stylusLoader.use[0] = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../../',
    },
  };

  webpackConfig.plugins.push(new MiniCssExtractPlugin({
    filename: toFilename('asset/css/[name]', 'css'),
    chunkFilename: toFilename('asset/css/[name]-chunk', 'css'),
  }));
}

module.exports = webpackConfig;
