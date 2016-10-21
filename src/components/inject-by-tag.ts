/// <reference path='../../typings/index.d.ts' />
const log = require('../core/log');

'use strict';

/**
 * Inject version number into HTML
 * - done by parsing html file,
 *   > replace: <{version}>
 */
class InjectByTag{

    constructor(private context) {}

    apply() {
        this.context.compiler.plugin('emit', (compilation, cb) => {
            // for every output file
            for ( var basename in compilation.assets ) {
                // only if match regex
                if(this.context.options.injectByTagFileRegex.test(basename)) {
                    let replaced = 0;
                    let asset = compilation.assets[basename];
                    let modFile = asset.source().replace(/(\<\{version\}\>)/g, () => {
                        replaced++;
                        return this.context.version;
                    });
                    asset.source = () => modFile;
                    log.info(`InjectByTag : match : ${basename} : replaced : ${replaced}`);
                }
            }
            cb();
        });
        return new Promise((resolve, reject) => { resolve(); })
    }
}

module.exports = InjectByTag;