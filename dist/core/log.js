var config = require('../config');
var chalk = require('chalk');
var endOfLine = require('os').EOL;
var u = require('./utils');
var Log = (function () {
    function Log() {
        this.logLevel = 3;
        this.getLogLevel();
    }
    Log.prototype.getLogLevel = function () {
        if (u.isArgv('aiv-log-full')) {
            this.logLevel = 3;
        }
        else if (u.isArgv('aiv-log-none')) {
            this.logLevel = 0;
        }
    };
    Log.prototype.getHead = function () {
        return endOfLine + chalk.bgYellow.black('[AIV] : ');
    };
    Log.prototype.getText = function (id) {
        return config.LOGS_TEXT[id];
    };
    Log.prototype.call = function (type, msgId) {
        if (typeof this[type] === 'function') {
            this[type](this.getText(msgId));
        }
    };
    Log.prototype.error = function (msg) {
        if (this.logLevel < 3)
            return;
        console.log(this.getHead() + " " + chalk.red('error') + " : " + msg);
    };
    Log.prototype.info = function (msg) {
        if (!this.logLevel)
            return;
        console.log(this.getHead() + " " + chalk.blue('info') + " : " + msg);
    };
    Log.prototype.warn = function (msg) {
        if (!this.logLevel)
            return;
        console.log(this.getHead() + " " + chalk.yellow('warn') + " : " + msg);
    };
    return Log;
}());
var log = new Log();
module.exports = log;
