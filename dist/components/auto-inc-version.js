var semver = require('semver');
var config = require('../config');
var path = require('path');
var fs = require('fs');
var u = require('../core/utils');
var chalk = require('chalk');
var Promise = require('bluebird');
var IncVersion = (function () {
    function IncVersion(context) {
        this.context = context;
    }
    IncVersion.prototype.apply = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
            _this.start();
        });
    };
    IncVersion.prototype.start = function () {
        this.packageFile = this.openPackageFile();
        var argv = process.argv;
        if (u.isArgv('major')) {
            this.major();
        }
        else if (u.isArgv('minor')) {
            this.minor();
        }
        else if (u.isArgv('patch')) {
            this.patch();
        }
        else {
            console.log(chalk.bgRed("[@] " + config.SHORT + " error > ") + ' --major --minor --patch missing in arguments. ');
            console.log(chalk.bgRed("[@] " + config.SHORT + " how to> ") + ' webpack -w --major');
            this.reject();
        }
    };
    IncVersion.prototype.openPackageFile = function () {
        return JSON.parse(fs.readFileSync(path.normalize(config.PATH_PACKAGE), 'utf8'));
    };
    IncVersion.prototype.closePackageFile = function (newVersion) {
        var _this = this;
        this.packageFile.version = newVersion;
        fs.writeFile(path.normalize(config.PATH_PACKAGE), JSON.stringify(this.packageFile, null, 4), function (err) {
            if (err) {
                _this.reject(err);
                return console.log(err);
            }
            console.log('');
            console.log(chalk.bgGreen("[@] " + config.SHORT + " OK > ") + ' package.json updated : ' + _this.packageFile.version);
            _this.resolve();
        });
    };
    IncVersion.prototype.major = function () {
        var newVersion = semver.inc(this.packageFile.version, 'major');
        this.closePackageFile(newVersion);
    };
    IncVersion.prototype.minor = function () {
        var newVersion = semver.inc(this.packageFile.version, 'minor');
        this.closePackageFile(newVersion);
    };
    IncVersion.prototype.patch = function () {
        var newVersion = semver.inc(this.packageFile.version, 'patch');
        this.closePackageFile(newVersion);
    };
    return IncVersion;
}());
module.exports = IncVersion;
