import dateFormat from 'dateformat';
import log from 'core/log';
import config from 'config';

/**
 * Inject version number into HTML
 * - done by parsing html file,
 *   > replace: <{version}>
 */
export default class InjectByTag {

  static componentName = 'InjectByTag';

  constructor(context) {
    this.context = context;
  }

  /**
   * Apply will be called from main class
   * @protected
   * @return {Promise}
   */
  apply() {
    this.context.compiler.plugin('emit', (compilation, cb) => {
      // for every output file
      for (const basename in compilation.assets) {
        // only if match regex
        if (this.context.config.componentsOptions.InjectByTag.fileRegex.test(basename)) {
          let replaced = 0;
          const asset = compilation.assets[basename];

          const originalSource = asset.source();
          if (!originalSource || typeof originalSource.replace !== 'function') {
            continue;
          }

          const modFile = originalSource.replace(this.context.config.componentsOptions.InjectByTag.AIVTagRegexp, (tag) => {
            // handle version
            tag = tag.replace(/(\{)(version)(\})/g, () => {
              return this.context.version;
            });

            // handle date
            tag = tag.replace(/(\{)(date)(\})/g, () => {
              return dateFormat(new Date(), config.componentsOptions.InjectByTag.dateFormat);
            });

            // remove [AIV] and [/AIV]
            tag = tag.replace(/(\[AIV])|(\[\/AIV])/g, '');

            replaced++;

            return tag;
          });

          asset.source = () => modFile;
          log.info(`InjectByTag : match : ${basename} : replaced : ${replaced}`);
        }
      }
      cb();
    });
    return new Promise((resolve) => { resolve(); });
  }
}
