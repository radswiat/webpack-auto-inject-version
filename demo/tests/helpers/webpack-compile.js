const webpack = require('webpack');

export default function webpackCompile(webpackConfig, aivConfig) {
  const compiler = webpack(webpackConfig(aivConfig));
  return new Promise((resolve) => {
    compiler.run(() => {
      resolve();
    });
  });
}
