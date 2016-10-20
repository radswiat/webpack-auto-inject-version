var Utils = (function () {
    function Utils() {
    }
    Utils.isArgv = function (arg) {
        return process.argv.indexOf("--" + arg) >= 0 ? true : false;
    };
    Utils.merge_options = function (obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    };
    return Utils;
}());
