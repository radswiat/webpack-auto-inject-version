var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var config = require('./config');
var Promise = require('bluebird');
var u = require('./core/utils');
'use strict';
var WebpackAutoInject = (function () {
    function WebpackAutoInject(options) {
        this.options = u.merge(WebpackAutoInject.options, options);
        var packageFile = JSON.parse(fs.readFileSync(path.normalize(config.PATH_PACKAGE), 'utf8'));
        this.version = packageFile.version;
    }
    WebpackAutoInject.prototype.apply = function (compiler) {
        this.compiler = compiler;
        this.components = config.COMPONENTS;
        this.executeComponents();
    };
    WebpackAutoInject.prototype.executeComponents = function () {
        var _this = this;
        if (!this.components.length) {
            console.log(chalk.bgRed('AIS: DONE!'));
            return;
        }
        var comp = this.components.shift();
        if (this.options[comp.option]) {
            var inst = new (require(comp.path))(this);
            inst.apply().then(function () {
                _this.executeComponents();
            }, function (err) { console.log(err); });
        }
        else {
            this.executeComponents();
        }
    };
    WebpackAutoInject.options = {
        autoIncrease: true,
        injectIntoHtml: true,
        injectIntoHtmlRegex: /^index\.html$/,
        injectIntoAnyFile: true
    };
    return WebpackAutoInject;
}());
module.exports = WebpackAutoInject;
