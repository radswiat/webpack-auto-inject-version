(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/helpers/createClass"), require("chalk"), require("path"), require("babel-runtime/core-js/promise"), require("fs"), require("os"), require("babel-runtime/helpers/asyncToGenerator"), require("babel-runtime/regenerator"), require("lodash"), require("babel-runtime/core-js/json/stringify"), require("optimist"), require("semver"));
	else if(typeof define === 'function' && define.amd)
		define(["babel-runtime/helpers/classCallCheck", "babel-runtime/helpers/createClass", "chalk", "path", "babel-runtime/core-js/promise", "fs", "os", "babel-runtime/helpers/asyncToGenerator", "babel-runtime/regenerator", "lodash", "babel-runtime/core-js/json/stringify", "optimist", "semver"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/helpers/createClass"), require("chalk"), require("path"), require("babel-runtime/core-js/promise"), require("fs"), require("os"), require("babel-runtime/helpers/asyncToGenerator"), require("babel-runtime/regenerator"), require("lodash"), require("babel-runtime/core-js/json/stringify"), require("optimist"), require("semver")) : factory(root["babel-runtime/helpers/classCallCheck"], root["babel-runtime/helpers/createClass"], root["chalk"], root["path"], root["babel-runtime/core-js/promise"], root["fs"], root["os"], root["babel-runtime/helpers/asyncToGenerator"], root["babel-runtime/regenerator"], root["lodash"], root["babel-runtime/core-js/json/stringify"], root["optimist"], root["semver"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_19__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  PACKAGE_JSON_PATH: './package.json',
  components: {
    AutoIncreaseVersion: true,
    InjectAsComment: true,
    InjectByTag: true
  },
  componentsOptions: {
    InjectByTag: {
      fileRegex: /\.+/
    }
  },
  LOGS_TEXT: {
    AIS_START: 'Auto inject version started'
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

var _utils = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endOfLine = __webpack_require__(9).EOL;

var Log = function () {
  // default 1

  function Log() {
    (0, _classCallCheck3.default)(this, Log);
    this.logLevel = 3;

    this.getLogLevel();
  }

  (0, _createClass3.default)(Log, [{
    key: 'getLogLevel',
    value: function getLogLevel() {
      if ((0, _utils.isArgv)('aiv-log-full')) {
        this.logLevel = 3;
      } else if ((0, _utils.isArgv)('aiv-log-none')) {
        this.logLevel = 0;
      }
    }

    /**
     * Get console log head
     * @returns {string}
     */

  }, {
    key: 'getHead',
    value: function getHead() {
      return endOfLine + _chalk2.default.bgYellow.black('[AIV] : ');
    }

    /**
     * Get log text by ID from config file
     */

  }, {
    key: 'getText',
    value: function getText(id) {
      return _config2.default.LOGS_TEXT[id];
    }

    /**
     * Call any type
     * @param type
     * @param msg
     */

  }, {
    key: 'call',
    value: function call(type, msgId) {
      if (typeof this[type] === 'function') {
        this[type](this.getText(msgId));
      }
    }
  }, {
    key: 'error',
    value: function error(msg) {
      if (this.logLevel < 3) return;
      console.log(this.getHead() + ' ' + _chalk2.default.red('error') + ' : ' + msg);
    }
  }, {
    key: 'info',
    value: function info(msg) {
      if (!this.logLevel) return;
      console.log(this.getHead() + ' ' + _chalk2.default.blue('info') + ' : ' + msg);
    }
  }, {
    key: 'warn',
    value: function warn(msg) {
      if (!this.logLevel) return;
      console.log(this.getHead() + ' ' + _chalk2.default.yellow('warn') + ' : ' + msg);
    }
  }]);
  return Log;
}();

exports.default = new Log();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArgv = isArgv;
exports.merge = merge;
var argv = __webpack_require__(18).argv;

/**
 * Get argv from webpack env[argv]
 * Since webpack 2.0 we have to pass args by the env
 * example:
 * - webpack --config ./webpack.conf.js --env.patch
 * @param arg
 * @returns {boolean}
 */
function isArgv(arg) {
  return Boolean(argv.env[arg]);
}

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
function merge(obj1, obj2) {
  var obj3 = {};
  for (var attrname in obj1) {
    obj3[attrname] = obj1[attrname];
  }
  for (var attrname in obj2) {
    obj3[attrname] = obj2[attrname];
  }
  return obj3;
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(17);

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _semver = __webpack_require__(19);

var _semver2 = _interopRequireDefault(_semver);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _path = __webpack_require__(5);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(7);

var _fs2 = _interopRequireDefault(_fs);

var _utils = __webpack_require__(8);

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

var _log = __webpack_require__(4);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoIncreaseVersion = function () {
  function AutoIncreaseVersion(context) {
    (0, _classCallCheck3.default)(this, AutoIncreaseVersion);

    this.context = context;
  }

  (0, _createClass3.default)(AutoIncreaseVersion, [{
    key: 'apply',
    value: function apply() {
      var _this = this;

      return new _promise2.default(function (resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
        _this.start();
      });
    }

    /**
     * Start version increase
     * - decide scenario: major, minor, patch
     */

  }, {
    key: 'start',
    value: function start() {
      this.packageFile = this.openPackageFile();
      if ((0, _utils.isArgv)('major')) {
        this.major();
      } else if ((0, _utils.isArgv)('minor')) {
        this.minor();
      } else if ((0, _utils.isArgv)('patch')) {
        this.patch();
      } else {
        this.reject();
      }
    }

    /**
     * Open package file
     * @returns {any}
     */

  }, {
    key: 'openPackageFile',
    value: function openPackageFile() {
      return JSON.parse(_fs2.default.readFileSync(_path2.default.resolve(this.context.config.PACKAGE_JSON_PATH), 'utf8'));
    }

    /**
     * Close & save package file
     * @param newVersion
     */

  }, {
    key: 'closePackageFile',
    value: function closePackageFile(newVersion) {
      var _this2 = this;

      this.packageFile.version = newVersion;
      _fs2.default.writeFile(_path2.default.resolve(this.context.config.PACKAGE_JSON_PATH), (0, _stringify2.default)(this.packageFile, null, 4), function (err) {
        if (err) {
          _this2.reject(err);return console.log(err);
        }
        _log2.default.info('autoIncVersion : new version : ' + newVersion);
        _log2.default.info('package.json updated!');
        _this2.context.version = newVersion;
        _this2.resolve();
      });
    }

    /**
     * Increase major
     */

  }, {
    key: 'major',
    value: function major() {
      var newVersion = _semver2.default.inc(this.packageFile.version, 'major');
      this.closePackageFile(newVersion);
    }

    /**
     * Increase minor
     */

  }, {
    key: 'minor',
    value: function minor() {
      var newVersion = _semver2.default.inc(this.packageFile.version, 'minor');
      this.closePackageFile(newVersion);
    }

    /**
     * Increase patch
     */

  }, {
    key: 'patch',
    value: function patch() {
      var newVersion = _semver2.default.inc(this.packageFile.version, 'patch');
      this.closePackageFile(newVersion);
    }
  }]);
  return AutoIncreaseVersion;
}();

AutoIncreaseVersion.componentName = 'AutoIncreaseVersion';
exports.default = AutoIncreaseVersion;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

var _path = __webpack_require__(5);

var _path2 = _interopRequireDefault(_path);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _log = __webpack_require__(4);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endOfLine = __webpack_require__(9).EOL;

/**
 * Inject version number into HTML
 * - done by parsing html file,
 *   > replace: <{version}>
 */

var InjectAsComment = function () {
  function InjectAsComment(context) {
    (0, _classCallCheck3.default)(this, InjectAsComment);

    this.context = context;
  }

  (0, _createClass3.default)(InjectAsComment, [{
    key: 'apply',
    value: function apply() {
      var _this = this;

      this.context.compiler.plugin('emit', function (compilation, cb) {
        for (var basename in compilation.assets) {
          var ext = _path2.default.extname(basename);
          var asset = compilation.assets[basename];
          switch (ext) {
            case '.js':
              _this.injectIntoJs(asset);
              break;
            case '.html':
              _this.injectIntoHtml(asset);
              break;
            case '.css':
              _this.injectIntoCss(asset);
              break;
            case 'default':
              break;
          }
          _log2.default.info('InjectAsComment : match : ' + basename + ' : injected : ' + _this.context.version);
        }
        cb();
      });
      return new _promise2.default(function (resolve, reject) {
        resolve();
      });
    }
  }, {
    key: 'injectIntoCss',
    value: function injectIntoCss(asset) {
      var modAsset = '/** [' + _config2.default.SHORT + '] Build version: ' + this.context.version + ' **/ ' + endOfLine + ' ' + asset.source() + ' ';
      asset.source = function () {
        return modAsset;
      };
    }
  }, {
    key: 'injectIntoHtml',
    value: function injectIntoHtml(asset) {
      var modAsset = '<!-- [' + _config2.default.SHORT + '] Build version: ' + this.context.version + ' --> ' + endOfLine + ' ' + asset.source() + ' ';
      asset.source = function () {
        return modAsset;
      };
    }
  }, {
    key: 'injectIntoJs',
    value: function injectIntoJs(asset) {
      var modAsset = '// [' + _config2.default.SHORT + '] Build version: ' + this.context.version + ' ' + endOfLine + ' ' + asset.source() + ' ';
      asset.source = function () {
        return modAsset;
      };
    }
  }]);
  return InjectAsComment;
}();

InjectAsComment.componentName = 'InjectAsComment';
exports.default = InjectAsComment;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(6);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _log = __webpack_require__(4);

var _log2 = _interopRequireDefault(_log);

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Inject version number into HTML
 * - done by parsing html file,
 *   > replace: <{version}>
 */
var InjectByTag = function () {
  function InjectByTag(context) {
    (0, _classCallCheck3.default)(this, InjectByTag);

    this.context = context;
  }

  (0, _createClass3.default)(InjectByTag, [{
    key: 'apply',
    value: function apply() {
      var _this = this;

      console.log('------------------- INJECT BY TAG! ------------------');
      this.context.compiler.plugin('emit', function (compilation, cb) {
        console.log('------------------- INJECT BY TAG! APPLY! ------------------');
        console.log(compilation.assets);
        // for every output file
        for (var basename in compilation.assets) {
          console.log(_chalk2.default.green.bold('================='));
          console.log(basename);
          // only if match regex
          console.log(basename + ' is: ' + _this.context.config.componentsOptions.InjectByTag.fileRegex.test(basename));
          if (_this.context.config.componentsOptions.InjectByTag.fileRegex.test(basename)) {
            (function () {
              var replaced = 0;
              var asset = compilation.assets[basename];
              var modFile = asset.source().replace(/(\[AIV\]{version}\[\/AIV\])/g, function () {
                console.log('replace?!');
                replaced++;
                return _this.context.version;
              });
              asset.source = function () {
                return modFile;
              };
              _log2.default.info('InjectByTag : match : ' + basename + ' : replaced : ' + replaced);
            })();
          }
        }
        cb();
      });
      return new _promise2.default(function (resolve, reject) {
        resolve();
      });
    }
  }]);
  return InjectByTag;
}();

InjectByTag.componentName = 'InjectByTag';
exports.default = InjectByTag;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(14);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(13);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = __webpack_require__(7);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(5);

var _path2 = _interopRequireDefault(_path);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _log = __webpack_require__(4);

var _log2 = _interopRequireDefault(_log);

var _lodash = __webpack_require__(15);

var _autoIncreaseVersion = __webpack_require__(10);

var _autoIncreaseVersion2 = _interopRequireDefault(_autoIncreaseVersion);

var _injectAsComment = __webpack_require__(11);

var _injectAsComment2 = _interopRequireDefault(_injectAsComment);

var _injectByTag = __webpack_require__(12);

var _injectByTag2 = _interopRequireDefault(_injectByTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebpackAutoInject = function () {

  /**
   * Constructor,
   * called on webpack config load
   * @param userConfig - config from the webpack config file
   */
  function WebpackAutoInject(userConfig) {
    (0, _classCallCheck3.default)(this, WebpackAutoInject);

    this.setConfig(userConfig);
    var packageFile = JSON.parse(_fs2.default.readFileSync(_path2.default.resolve(this.config.PACKAGE_JSON_PATH), 'utf8'));
    this.version = packageFile.version;
    _log2.default.call('info', 'AIS_START');
    this.executeNoneWebpackComponents();
  }

  (0, _createClass3.default)(WebpackAutoInject, [{
    key: 'setConfig',
    value: function setConfig(userConfig) {
      this.config = (0, _lodash.merge)(_config2.default, userConfig);

      // lets convert all components names to lowercase - to prevent issues
      this.config.components = (0, _lodash.transform)(this.config.components, function (result, val, key) {
        result[key.toLowerCase()] = val;
      });

      this.config = (0, _lodash.merge)(this.config, WebpackAutoInject.protectedConfig);
    }

    /**
     * Webpack apply call,
     * when webpack is initialized and
     * plugin has been called by webpack
     * @param compiler
     */

  }, {
    key: 'apply',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(compiler) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.compiler = compiler;
                _context.next = 3;
                return this.executeWebpackComponents();

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function apply(_x) {
        return _ref.apply(this, arguments);
      }

      return apply;
    }()

    /**
     * Execute none webpack components
     * - runs as soon as possible,
     *   > without waiting for webpack init
     */

  }, {
    key: 'executeNoneWebpackComponents',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.executeComponent([_autoIncreaseVersion2.default]);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function executeNoneWebpackComponents() {
        return _ref2.apply(this, arguments);
      }

      return executeNoneWebpackComponents;
    }()

    /**
     * Execute webpack components
     * - runs when webpack is initialized
     *   and plugins is called by webpack
     */

  }, {
    key: 'executeWebpackComponents',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.executeComponent([_injectAsComment2.default, _injectByTag2.default]);

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function executeWebpackComponents() {
        return _ref3.apply(this, arguments);
      }

      return executeWebpackComponents;
    }()

    /**
     * Execute components,
     * - general layer for comp execution
     * - used for both, webpack and non webpack comp
     */

  }, {
    key: 'executeComponent',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(components) {
        var ComponentClass, inst;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (components.length) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return');

              case 2:

                // take first component class
                ComponentClass = components.shift();

                // if component is disabled, call next component

                if (this.config.components[ComponentClass.componentName.toLowerCase()]) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 6;
                return this.executeComponent(components);

              case 6:
                return _context4.abrupt('return');

              case 7:

                // execute component
                inst = new ComponentClass(this);

                // await for apply to finish

                _context4.next = 10;
                return inst.apply();

              case 10:
                _context4.next = 12;
                return this.executeComponent(components);

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function executeComponent(_x2) {
        return _ref4.apply(this, arguments);
      }

      return executeComponent;
    }()
  }]);
  return WebpackAutoInject;
}();

// import sub components


WebpackAutoInject.protectedConfig = {
  NAME: 'Auto Inject Version',
  SHORT: 'AIV'
};
exports.default = WebpackAutoInject;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("optimist");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("semver");

/***/ })
/******/ ]);
});