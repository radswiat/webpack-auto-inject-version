/// <reference path='../typings/index.d.ts' />
const chalk     = require('chalk');
const fs        = require('fs');
const path      = require('path');
const config    = require('./config');
const Promise   = require('bluebird');
const u         = require('./core/utils');
const log       = require('./core/log');

'use strict';

class WebpackAutoInject{

    private options;
    private compiler;
    private version;

    /**
     * Default options
     */
    static options = {
        autoIncrease            : true,
        injectAsComment         : true,
        injectByTag             : true,
        injectByTagFileRegex    : /^index\.html$/
    }

    /**
     * Constructor,
     * called on webpack config load
     * @param options
     */
    constructor(options) {
        this.options = u.merge(WebpackAutoInject.options, options);
        var packageFile = JSON.parse(fs.readFileSync(path.normalize(config.PATH_PACKAGE), 'utf8'));
        this.version = packageFile.version;
        log.call('info', 'AIS_START');
        this.executeNoneWebpackComponents();
    }

    /**
     * Webpack apply call,
     * when webpack is initialized and
     * plugin has been called by webpack
     * @param compiler
     */
    protected apply(compiler) {
        this.compiler = compiler;
        this.executeWebpackComponents();
    }

    /**
     * Execute none webpack components
     * - runs as soon as possible,
     *   > without waiting for webpack init
     */
    private executeNoneWebpackComponents() {
        this.executeComponents(config.NON_WEBPACK_COMPONENTS, () => {
        });
    }

    /**
     * Execute webpack components
     * - runs when webpack is initialized
     *   and plugins is called by webpack
     */
    private executeWebpackComponents() {
        this.executeComponents(config.WEBPACK_COMPONENTS, () => {
        });
    }

    /**
     * Execute components,
     * - general layer for comp execution
     * - used for both, webpack and non webpack comp
     */
    private executeComponents(components, done) {

        // no more components,
        // finish
        if(!components.length) { done(); return;}

        // take first component
        let comp = components.shift();

        // if component is disabled, call next component
        if(!this.options[comp.option]) {
            this.executeComponents(components, done);
            return;
        }

        // execute component
        let inst = new (require(comp.path))(this);
        inst.apply().then(() => {
            this.executeComponents(components, done);
        }, (err) => {this.executeComponents(components, done);})
    }
}


module.exports = WebpackAutoInject;