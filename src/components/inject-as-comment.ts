/// <reference path='../../typings/index.d.ts' />
const chalk     = require('chalk');
const path      = require('path');
const endOfLine = require('os').EOL;
const config    = require('../config');
const log       = require('../core/log');

'use strict';

/**
 * Inject version number into HTML
 * - done by parsing html file,
 *   > replace: <{version}>
 */
class InjectAsComment{

    constructor(private context) {}

    apply() {
        this.context.compiler.plugin('emit', (compilation, cb) => {
            for ( var basename in compilation.assets ) {
                let ext = path.extname(basename);
                let asset = compilation.assets[basename];
                switch(ext) {
                    case '.js' :
                        this.injectIntoJs(asset);
                        break;
                    case '.html' :
                        this.injectIntoHtml(asset);
                        break;
                    case '.css' :
                        this.injectIntoCss(asset);
                        break;
                    case 'default': break;
                }
                log.info(`InjectAsComment : match : ${basename} : injected : ${this.context.version}`);
            }
            cb();
        });
        return new Promise((resolve, reject) => { resolve(); })
    }

    injectIntoCss(asset) {
        let modAsset = `/** [${config.SHORT}] Build version: ${this.context.version} **/ ${endOfLine} ${asset.source()} `;
        asset.source = () => modAsset;
    }

    injectIntoHtml(asset) {
        let modAsset = `<!-- [${config.SHORT}] Build version: ${this.context.version} --> ${endOfLine} ${asset.source()} `;
        asset.source = () => modAsset;
    }

    injectIntoJs(asset) {
        let modAsset = `// [${config.SHORT}] Build version: ${this.context.version} ${endOfLine} ${asset.source()} `;
        asset.source = () => modAsset;
    }
}

module.exports = InjectAsComment;