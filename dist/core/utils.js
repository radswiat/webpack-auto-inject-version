var Utils = (function () {
    function Utils() {
    }
    Utils.isArgv = function (arg) {
        return Boolean(process.argv.find(function (item) {
            return item.substr(0, 2) === '--' && item.indexOf(arg) > -1;
        }));
    };
    Utils.merge = function (obj1, obj2) {
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
module.exports = Utils;
