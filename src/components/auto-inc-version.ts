var semver  = require('semver');
var config  = require('../config');
var path    = require('path');
var fs      = require('fs');
var u       = require('../core/utils');
var chalk   = require('chalk');
var Promise = require('bluebird');

class IncVersion{

    private packageFile;
    private resolve;
    private reject;

    constructor(private context) {}

    public apply() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.start();
        });
    }

    /**
     * Start version increase
     * - decide scenario: major, minor, patch
     */
    private start() {
        this.packageFile = this.openPackageFile();
        let argv = process.argv;
        if( u.isArgv('major') ) {
            this.major();
        }
        else if( u.isArgv('minor') ) {
            this.minor();
        }else if( u.isArgv('patch') ) {
            this.patch();
        }else {
            console.log(chalk.bgRed(`[@] ${config.SHORT} error > `)+' --major --minor --patch missing in arguments. ');
            console.log(chalk.bgRed(`[@] ${config.SHORT} how to> `)+' webpack -w --major');
            this.reject();
        }
    }

    /**
     * Open package file
     * @returns {any}
     */
    private openPackageFile() {
        return JSON.parse(fs.readFileSync(path.normalize(config.PATH_PACKAGE), 'utf8'));
    }

    /**
     * Close & save package file
     * @param newVersion
     */
    private closePackageFile(newVersion) {
        this.packageFile.version = newVersion;
        fs.writeFile(path.normalize(config.PATH_PACKAGE), JSON.stringify(this.packageFile, null, 4), (err) => {
            if(err) {this.reject(err); return console.log(err);}
            console.log('');
            console.log(chalk.bgGreen(`[@] ${config.SHORT} OK > `)+' package.json updated : ' + this.packageFile.version);
            this.resolve();
        });
    }

    /**
     * Increase major
     */
    private major() {
        let newVersion = semver.inc(this.packageFile.version, 'major');
        this.closePackageFile(newVersion);
    }

    /**
     * Increase minor
     */
    private minor() {
        let newVersion = semver.inc(this.packageFile.version, 'minor');
        this.closePackageFile(newVersion);
    }

    /**
     * Increase patch
     */
    private patch() {
        let newVersion = semver.inc(this.packageFile.version, 'patch');
        this.closePackageFile(newVersion);
    }
}

module.exports = IncVersion;