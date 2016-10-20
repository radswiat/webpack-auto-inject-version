'use strict';
var InjectIntoHtml = (function () {
    function InjectIntoHtml(context) {
        this.context = context;
    }
    InjectIntoHtml.prototype.apply = function () {
        var _this = this;
        this.context.compiler.plugin('emit', function (compilation, cb) {
            var _loop_1 = function() {
                if (_this.context.options.injectIntoHtmlRegex.test(basename)) {
                    var asset = compilation.assets[basename];
                    var modFile_1 = asset.source().replace(/(\<\{version\}\>)/g, _this.context.version);
                    asset.source = function () { return modFile_1; };
                }
            };
            for (var basename in compilation.assets) {
                _loop_1();
            }
            cb();
        });
        return new Promise(function (resolve, reject) { resolve(); });
    };
    return InjectIntoHtml;
}());
module.exports = InjectIntoHtml;
