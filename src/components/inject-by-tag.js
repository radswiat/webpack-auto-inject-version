import log from 'core/log';
import chalk from 'chalk';
/**
 * Inject version number into HTML
 * - done by parsing html file,
 *   > replace: <{version}>
 */
export default class InjectByTag{

  static componentName = 'InjectByTag';

  constructor(context) {
    this.context = context;
  }

  apply() {
    this.context.compiler.plugin('emit', (compilation, cb) => {
      // for every output file
      for ( let basename in compilation.assets ) {
        // only if match regex
        if(this.context.config.componentsOptions.InjectByTag.fileRegex.test(basename)) {
          let replaced = 0;
          let asset = compilation.assets[basename];
          let modFile = asset.source().replace(/(\[AIV\]{version}\[\/AIV\])/g, () => {
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