const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Require WebpackAutoInject from npm installed modules ( preferred )
// var WebpackAutoInject = require('webpack-auto-inject-version');
// Require WebpackAutoInject from dist - dev purpose only ( do not use the below line )
const WebpackAutoInject = require('../dist/WebpackAutoInjectVersion');


module.exports = {
  watch: true,
  entry: {
    index: ['./src/main.js'],
  },
  resolve: {
    extensions: ['.js', '.html'],
  },
  output: {
    // filename: '[name]-bundle.js',
    // path: path.resolve(process.cwd(), 'dist'),
    // publicPath: '/', // Public path to 'dist' scope in production
    filename: 'js/main.js?[chunkhash]',
    path: path.resolve(process.cwd(), 'dist'),
    chunkFilename: 'js/main.js?[chunkhash]',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve('src'),
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader!html-minify-loader',
      },
    ],
  },
  plugins: [
    new WebpackAutoInject({
      components: {
        AutoIncreaseVersion: true,
        InjectAsComment: true,
        InjectByTag: true,
      },
      componentsOptions: {
        AutoIncreaseVersion: {
          runInWatchMode: false, // it will increase version with every single build!
        },
        InjectAsComment: {
          tag: 'Version: {version}, {date}',
        },
        InjectByTag: {
          fileRegex: /\.+/,
          dateFormat: 'h:MM:ss',
        },
      },
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
    new UglifyJsPlugin(),
  ],
};
