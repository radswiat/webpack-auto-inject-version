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
  return Boolean(argv.env[arg]);
}

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
export function merge(obj1,obj2){
  var obj3 = {};
  for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
  return obj3;
}


