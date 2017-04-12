import path from 'path';
const webpack = require('webpack');
// import nodeExternals from 'webpack-node-externals';

export default {
  target: 'node',
  // externals: [nodeExternals()],
  entry: ['babel-polyfill', './src/main.js'],
  resolve: {
    extensions: ['.js']
  },
  output: {
    filename: 'WebpackAutoInjectVersion.js',
    path: path.resolve(process.cwd(), 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    // rules: [
    //   {   // eslint feature
    //     enforce: 'pre',
    //     test: /\.js$/,
    //     loader: 'eslint-loader',
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve('src')
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [

  ]
};
