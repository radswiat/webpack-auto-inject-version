const config    = require('../config');
const chalk     = require('chalk');
const endOfLine = require('os').EOL;
const u         = require('./utils');

class Log{

    private logLevel = 3; // default 1

    constructor() {
        this.getLogLevel();
    }

    private getLogLevel() {
        if(u.isArgv('aiv-log-full')){
            this.logLevel = 3;
        }else if(u.isArgv('aiv-log-none')) {
            this.logLevel = 0;
        }
    }

    /**
     * Get console log head
     * @returns {string}
     */
    private getHead() {
        return endOfLine + chalk.bgYellow.black('[AIV] : ')
    }

    /**
     * Get log text by ID from config file
     */
    private getText(id) {
        return config.LOGS_TEXT[id];
    }

    /**
     * Call any type
     * @param type
     * @param msg
     */
    call(type, msgId) {
        if(typeof this[type] === 'function') {
            this[type](this.getText(msgId));
        }
    }

    error (msg) {
        if(this.logLevel < 3) return;
        console.log(`${this.getHead()} ${chalk.red('error')} : ${msg}`);
    }


    info (msg) {
        if(!this.logLevel) return;
        console.log(`${this.getHead()} ${chalk.blue('info')} : ${msg}`);
    }

    warn (msg) {
        if(!this.logLevel) return;
        console.log(`${this.getHead()} ${chalk.yellow('warn')} : ${msg}`);
    }

}

var log = new Log();
module.exports = log;