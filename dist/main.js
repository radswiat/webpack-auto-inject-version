var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var config = require('./config');
var Promise = require('bluebird');
var u = require('./core/utils');
var log = require('./core/log');
'use strict';
var WebpackAutoInject = (function () {
    function WebpackAutoInject(options) {
        this.options = u.merge(WebpackAutoInject.options, options);
        var packageFile = JSON.parse(fs.readFileSync(path.normalize(config.PATH_PACKAGE), 'utf8'));
        this.version = packageFile.version;
        log.call('info', 'AIS_START');
        this.executeNoneWebpackComponents();
    }
    WebpackAutoInject.prototype.apply = function (compiler) {
        this.compiler = compiler;
        this.executeWebpackComponents();
    };
    WebpackAutoInject.prototype.executeNoneWebpackComponents = function () {
        this.executeComponents(config.NON_WEBPACK_COMPONENTS, function () {
        });
    };
    WebpackAutoInject.prototype.executeWebpackComponents = function () {
        this.executeComponents(config.WEBPACK_COMPONENTS, function () {
        });
    };
    WebpackAutoInject.prototype.executeComponents = function (components, done) {
        var _this = this;
        if (!components.length) {
            done();
            return;
        }
        var comp = components.shift();
        if (!this.options[comp.option]) {
            this.executeComponents(components, done);
            return;
        }
        var inst = new (require(comp.path))(this);
        inst.apply().then(function () {
            _this.executeComponents(components, done);
        }, function (err) { _this.executeComponents(components, done); });
    };
    WebpackAutoInject.options = {
        autoIncrease: true,
        injectAsComment: true,
        injectByTag: true,
        injectByTagFileRegex: /^index\.html$/
    };
    return WebpackAutoInject;
}());
module.exports = WebpackAutoInject;
