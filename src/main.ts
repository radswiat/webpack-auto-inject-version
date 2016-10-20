/// <reference path='../typings/index.d.ts' />
var chalk       = require('chalk');
var fs          = require('fs');
var path        = require('path');
var config      = require('./config');

'use strict';

class WebpackAutoInject{

    private options;
    private compiler;
    private version;

    static options = {
        autoIncrease    : true,
        injectIntoHtml  : true,
    }

    constructor(options) {
        this.options = WebpackAutoInject.options;
        var packageFile = JSON.parse(fs.readFileSync(path.normalize(config.PATH_PACKAGE), 'utf8'));
        this.version = packageFile.version;
    }

    protected apply(compiler) {

        this.compiler = compiler;

        // Component: auto-inc-version
        // if: autoIncrease : true
        if(this.options.injectIntoHtml) {
            let comp = new (require('./components/auto-inc-version'))(this);
            comp.apply();
        }


        // Component: Inject-into-html
        // if: injectIntoHtml : true
        if(this.options.injectIntoHtml) {
            let comp = new (require('./components/inject-into-html'))(this);
            comp.apply();
        }

        let comp = new (require('./components/inject-into-any-file'))(this);
        comp.apply();

    }
}


module.exports = WebpackAutoInject;