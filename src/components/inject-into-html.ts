/// <reference path='../../typings/index.d.ts' />

'use strict';

/**
 * Inject version number into HTML
 * - done by parsing html file,
 *   > replace: <{version}>
 */
class InjectIntoHtml{


    constructor(private context) {}

    apply() {
        this.context.compiler.plugin('emit', (compilation, cb) => {
            for ( var basename in compilation.assets ) {
                if(/^index\.html$/.test(basename)) {
                    let asset = compilation.assets[basename];
                    let modFile = asset.source().replace(/(\<\{version\}\>)/g, this.context.version);
                    asset.source = () => modFile;
                }
            }
            cb();
        });
    }
}

module.exports = InjectIntoHtml;