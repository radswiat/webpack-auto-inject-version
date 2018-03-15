const path = require('path');

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
    filename: 'js/[name].js?[chunkhash]',
    path: path.resolve(process.cwd(), 'dist'),
    chunkFilename: 'js/[id].js?[chunkhash]',
    publicPath: '/', // Public path to 'dist' scope in production
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
  ],
};
