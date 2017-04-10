/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  NAME: 'Auto Inject Version',
  SHORT: 'AIV',
  PATH_PACKAGE: './package.json',
  NON_WEBPACK_COMPONENTS: [{
    option: 'autoIncrease',
    path: './components/auto-inc-version'
  }],
  WEBPACK_COMPONENTS: [{
    option: 'injectByTag',
    path: './components/inject-by-tag'
  }, {
    option: 'injectAsComment',
    path: './components/inject-as-comment'
  }],
  LOGS_TEXT: {
    AIS_START: 'Auto inject version started'
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Utils = function () {
  function Utils() {
    (0, _classCallCheck3.default)(this, Utils);
  }

  (0, _createClass3.default)(Utils, null, [{
    key: 'isArgv',
    value: function isArgv(arg) {
      return Boolean(process.argv.find(function (item) {
        return item.substr(0, 2) === '--' && item.indexOf(arg) > -1;
      }));
    }

    /**
     * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
     * @param obj1
     * @param obj2
     * @returns obj3 a new object based on obj1 and obj2
     */

  }, {
    key: 'merge',
    value: function merge(obj1, obj2) {
      var obj3 = {};
      for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname];
      }
      for (var attrname in obj2) {
        obj3[attrname] = obj2[attrname];
      }
      return obj3;
    }
  }]);
  return Utils;
}();

module.exports = Utils;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _chalk = __webpack_require__(4);

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = __webpack_require__(8);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(10);

var _path2 = _interopRequireDefault(_path);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

var _log = __webpack_require__(6);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebpackAutoInject = function () {

  /**
   * Constructor,
   * called on webpack config load
   * @param options
   */
  function WebpackAutoInject(options) {
    (0, _classCallCheck3.default)(this, WebpackAutoInject);

    this.options = _utils2.default.merge(WebpackAutoInject.options, options);
    var packageFile = JSON.parse(_fs2.default.readFileSync(_path2.default.normalize(_config2.default.PATH_PACKAGE), 'utf8'));
    this.version = packageFile.version;
    _log2.default.call('info', 'AIS_START');
    this.executeNoneWebpackComponents();
  }

  /**
   * Webpack apply call,
   * when webpack is initialized and
   * plugin has been called by webpack
   * @param compiler
   */


  /**
   * Default options
   */


  (0, _createClass3.default)(WebpackAutoInject, [{
    key: 'apply',
    value: function apply(compiler) {
      this.compiler = compiler;
      this.executeWebpackComponents();
    }

    /**
     * Execute none webpack components
     * - runs as soon as possible,
     *   > without waiting for webpack init
     */

  }, {
    key: 'executeNoneWebpackComponents',
    value: function executeNoneWebpackComponents() {
      this.executeComponents(_config2.default.NON_WEBPACK_COMPONENTS, function () {});
    }

    /**
     * Execute webpack components
     * - runs when webpack is initialized
     *   and plugins is called by webpack
     */

  }, {
    key: 'executeWebpackComponents',
    value: function executeWebpackComponents() {
      this.executeComponents(_config2.default.WEBPACK_COMPONENTS, function () {});
    }

    /**
     * Execute components,
     * - general layer for comp execution
     * - used for both, webpack and non webpack comp
     */

  }, {
    key: 'executeComponents',
    value: function executeComponents(components, done) {
      var _this = this;

      // no more components,
      // finish
      if (!components.length) {
        done();return;
      }

      // take first component
      var comp = components.shift();

      // if component is disabled, call next component
      if (!this.options[comp.option]) {
        this.executeComponents(components, done);
        return;
      }

      // execute component
      var inst = new (!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))(this);
      inst.apply().then(function () {
        _this.executeComponents(components, done);
      }, function (err) {
        _this.executeComponents(components, done);
      });
    }
  }]);
  return WebpackAutoInject;
}();

WebpackAutoInject.options = {
  autoIncrease: true,
  injectAsComment: true,
  injectByTag: true,
  injectByTagFileRegex: /^index\.html$/
};
exports.default = WebpackAutoInject;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _chalk = __webpack_require__(4);

var _chalk2 = _interopRequireDefault(_chalk);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

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
      if (u.isArgv('aiv-log-full')) {
        this.logLevel = 3;
      } else if (u.isArgv('aiv-log-none')) {
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
/* 7 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 7;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ })
/******/ ]);