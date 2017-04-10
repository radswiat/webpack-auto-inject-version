import webpack from 'webpack';
import gutil from 'gutil';
import webpackConfig from './webpack.conf';

function run() {
  console.log('compiling');
  let compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    gutil.log('[webpack:build]', stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    }));
  });
}

run();
