/// <reference path='../typings/index.d.ts' />
var chalk       = require('chalk');
var fs          = require('fs');
var path        = require('path');
var config      = require('./config');
var Promise     = require('bluebird');
var u           = require('./core/utils');

'use strict';

class WebpackAutoInject{

    private options;
    private compiler;
    private version;
    private components;

    static options = {
        autoIncrease            : true,
        injectIntoHtml          : true,
        injectIntoHtmlRegex     : /^index\.html$/,
        injectIntoAnyFile       : true
    }

    constructor(options) {
        this.options = u.merge(WebpackAutoInject.options, options);
        var packageFile = JSON.parse(fs.readFileSync(path.normalize(config.PATH_PACKAGE), 'utf8'));
        this.version = packageFile.version;
    }

    protected apply(compiler) {

        this.compiler = compiler;

        this.components = config.COMPONENTS;

        this.executeComponents();

    }

    private executeComponents() {

        if(!this.components.length) { console.log(chalk.bgRed('AIS: DONE!')); return;}

        let comp = this.components.shift();

        if(this.options[comp.option]) {
            let inst = new (require(comp.path))(this);
            inst.apply().then(() => {
                this.executeComponents();
            }, (err) => {console.log(err);})
        }else{
            this.executeComponents();
        }
    }
}


module.exports = WebpackAutoInject;