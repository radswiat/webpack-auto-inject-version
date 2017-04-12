let argv = require('optimist').argv;

/**
 * Get argv from webpack env[argv]
 * Since webpack 2.0 we have to pass args by the env
 * example:
 * - webpack --config ./webpack.conf.js --env.patch
 * @param arg
 * @returns {boolean}
 */
export function isArgv(arg) {
  if (typeof argv.env === 'undefined') {
    return false;
  }
  if (typeof argv.env[arg] === 'undefined') {
    return false;
  }
  return Boolean(argv.env[arg]);
}

