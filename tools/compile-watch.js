import gutil from 'gutil';
import webpack from 'webpack';

import webpackConfig from './webpack.conf';

function run() {
  console.log('compiling');
  const compiler = webpack(webpackConfig);
  compiler.watch({}, (err, stats) => {
    gutil.log('[webpack:build]', stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true,
    }));
  });
}

run();
