var log = require('../core/log');
'use strict';
var InjectByTag = (function () {
    function InjectByTag(context) {
        this.context = context;
    }
    InjectByTag.prototype.apply = function () {
        var _this = this;
        this.context.compiler.plugin('emit', function (compilation, cb) {
            var _loop_1 = function() {
                if (_this.context.options.injectByTagFileRegex.test(basename)) {
                    var replaced_1 = 0;
                    var asset = compilation.assets[basename];
                    var modFile_1 = asset.source().replace(/(\<\{version\}\>)/g, function () {
                        replaced_1++;
                        return _this.context.version;
                    });
                    asset.source = function () { return modFile_1; };
                    log.info("InjectByTag : match : " + basename + " : replaced : " + replaced_1);
                }
            };
            for (var basename in compilation.assets) {
                _loop_1();
            }
            cb();
        });
        return new Promise(function (resolve, reject) { resolve(); });
    };
    return InjectByTag;
}());
module.exports = InjectByTag;
