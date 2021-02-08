const path = require('path');
const { toFilename, createPugHtmlLoaderOptions } = require('./util');

const DEV_MODE = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve('src'),
  entry: {
    app: ['./js/entry-client.js'],
  },
  devtool: DEV_MODE ? 'inline-source-map' : false,
  output: {
    path: path.resolve('dist'),
    filename: toFilename('asset/js/[name]'),
    chunkFilename: toFilename('asset/js/[name]-chunk'),
    publicPath: process.env.SSR ? '/' : '',
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/asset'),
      path.resolve('node_modules'),
    ],
    alias: {
      '~': path.resolve('src'),
      '@': path.resolve('src/js'),
      img: path.resolve('src/img'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          // https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#options
          options: {},
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules\/(?!(dom7|swiper|ansi-regex|strip-ansi)\/).*/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'asset/[path][name].[ext]?[hash:8]',
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: ['pug-plain-loader'],
        exclude: path.resolve('src/html'),
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true, // <img src="${require(`./images/gallery.png`)}">
              // attrs: ['img:src', 'link:href'],
            },
          },
          {
            loader: 'pug-html-loader',
            options: createPugHtmlLoaderOptions(),
          },
        ],
        include: path.resolve('src/html'),
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:8]',
                },
              },
            ],
          },
          {
            use: [
              'vue-style-loader',
              'css-loader',
            ],
          },
        ],
        include: path.resolve('src'),
      },
      {
        test: /\.(styl|stylus)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
                  /* browsers: [
                    'last 5 versions',
                    'iOS >=10',
                    'not ie <= 11',
                    '>3%',
                  ], */
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              paths: 'src/css/',
              sourceMap: true,
              import: [path.resolve('src/css/markvann.styl')],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: !DEV_MODE ? 'warning' : false,
  },
};
