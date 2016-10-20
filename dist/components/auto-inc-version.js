var semver = require('semver');
var config = require('../config');
var IncVersion = (function () {
    function IncVersion() {
    }
    IncVersion.prototype.openPackageFile = function () {
        return JSON.parse(fs.readFileSync(path.normalize(config.PATH_PACKAGE), 'utf8'));
    };
    IncVersion.prototype.closePackageFile = function (content) {
        fs.writeFile("/tmp/test", content, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    };
    IncVersion.prototype.major = function () {
        this.openPackageFile();
        this.closePackageFile();
    };
    IncVersion.prototype.minor = function () {
    };
    IncVersion.prototype.patch = function () {
    };
    return IncVersion;
}());
