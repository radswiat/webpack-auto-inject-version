var chalk = require('chalk');
var path = require('path');
var endOfLine = require('os').EOL;
var config = require('../config');
var log = require('../core/log');
'use strict';
var InjectAsComment = (function () {
    function InjectAsComment(context) {
        this.context = context;
    }
    InjectAsComment.prototype.apply = function () {
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
                    case 'default': break;
                }
                log.info("InjectAsComment : match : " + basename + " : injected : " + _this.context.version);
            }
            cb();
        });
        return new Promise(function (resolve, reject) { resolve(); });
    };
    InjectAsComment.prototype.injectIntoCss = function (asset) {
        var modAsset = "/** [" + config.SHORT + "] Build version: " + this.context.version + " **/ " + endOfLine + " " + asset.source() + " ";
        asset.source = function () { return modAsset; };
    };
    InjectAsComment.prototype.injectIntoHtml = function (asset) {
        var modAsset = "<!-- [" + config.SHORT + "] Build version: " + this.context.version + " --> " + endOfLine + " " + asset.source() + " ";
        asset.source = function () { return modAsset; };
    };
    InjectAsComment.prototype.injectIntoJs = function (asset) {
        var modAsset = "// [" + config.SHORT + "] Build version: " + this.context.version + " " + endOfLine + " " + asset.source() + " ";
        asset.source = function () { return modAsset; };
    };
    return InjectAsComment;
}());
module.exports = InjectAsComment;
