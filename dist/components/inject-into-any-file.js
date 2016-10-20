var chalk = require('chalk');
var path = require('path');
var endOfLine = require('os').EOL;
var config = require('./../config');
'use strict';
var InjectIntoAnyFile = (function () {
    function InjectIntoAnyFile(context) {
        this.context = context;
    }
    InjectIntoAnyFile.prototype.apply = function () {
        var _this = this;
        this.context.compiler.plugin('emit', function (compilation, cb) {
            for (var basename in compilation.assets) {
                var ext = path.extname(basename);
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
                }
            }
            cb();
        });
        return new Promise(function (resolve, reject) { resolve(); });
    };
    InjectIntoAnyFile.prototype.injectIntoCss = function (asset) {
        var modAsset = "/** [" + config.SHORT + "] Build version: " + this.context.version + " **/ " + endOfLine + " " + asset.source() + " ";
        asset.source = function () { return modAsset; };
    };
    InjectIntoAnyFile.prototype.injectIntoHtml = function (asset) {
        var modAsset = "<!-- [" + config.SHORT + "] Build version: " + this.context.version + " --> " + endOfLine + " " + asset.source() + " ";
        asset.source = function () { return modAsset; };
    };
    InjectIntoAnyFile.prototype.injectIntoJs = function (asset) {
        var modAsset = "// [" + config.SHORT + "] Build version: " + this.context.version + " " + endOfLine + " " + asset.source() + " ";
        asset.source = function () { return modAsset; };
    };
    return InjectIntoAnyFile;
}());
module.exports = InjectIntoAnyFile;
