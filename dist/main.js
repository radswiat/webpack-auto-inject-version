var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var config = require('./config');
'use strict';
var WebpackAutoInject = (function () {
    function WebpackAutoInject(options) {
        this.options = WebpackAutoInject.options;
        var packageFile = JSON.parse(fs.readFileSync(path.normalize(config.PATH_PACKAGE), 'utf8'));
        this.version = packageFile.version;
    }
    WebpackAutoInject.prototype.apply = function (compiler) {
        this.compiler = compiler;
        if (this.options.injectIntoHtml) {
            var comp_1 = new (require('./components/auto-inc-version'))(this);
            comp_1.apply();
        }
        if (this.options.injectIntoHtml) {
            var comp_2 = new (require('./components/inject-into-html'))(this);
            comp_2.apply();
        }
        var comp = new (require('./components/inject-into-any-file'))(this);
        comp.apply();
    };
    WebpackAutoInject.options = {
        autoIncrease: true,
        injectIntoHtml: true,
    };
    return WebpackAutoInject;
}());
module.exports = WebpackAutoInject;
