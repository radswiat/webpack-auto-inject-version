/// <reference path='../../typings/index.d.ts' />
var chalk = require('chalk');
var path = require('path');
var endOfLine = require('os').EOL;
var config = require('./../config');

'use strict';

/**
 * Inject version number into HTML
 * - done by parsing html file,
 *   > replace: <{version}>
 */
class InjectIntoAnyFile{

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
                }
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

module.exports = InjectIntoAnyFile;