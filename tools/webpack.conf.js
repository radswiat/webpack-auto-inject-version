import path from 'path';

export default {
  target: 'node',
  entry: ['./src/webpack-auto-inject.js'],
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'WebpackAutoInjectVersion.js',
    path: path.resolve(process.cwd(), 'dist'),
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
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
    ],
  },
  plugins: [

  ],
};
