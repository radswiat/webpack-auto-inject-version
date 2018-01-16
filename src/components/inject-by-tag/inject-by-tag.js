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
  static AIVTagRegexp = /(\[AIV])(([a-zA-Z{} :;!()_@\-"'\\\/])+)(\[\/AIV])/g;

  constructor(context) {
    this.context = context;
  }

  /**
   * Apply will be called from main class
   * @protected
   * @returns {Promise}
   */
  apply() {
    // for every output file
    for (let basename in this.context.compilation.assets) {
      // only if match regex
      if (this.context.config.componentsOptions.InjectByTag.fileRegex.test(basename)) {
        let replaced = 0;
        let asset = this.context.compilation.assets[basename];

        const originalSource = asset.source();
        if (!originalSource || typeof originalSource.replace !== 'function') {
          continue;
        }

        let modFile = originalSource.replace(InjectByTag.AIVTagRegexp, (tag) => {
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

        // let modFile = originalSource.replace(/(\[AIV\]{version}\[\/AIV\])/g, () => {
        //   replaced++;
        //   return this.context.version;
        // });

        asset.source = () => modFile;
        log.info(`InjectByTag : match : ${basename} : replaced : ${replaced}`);
      }
    }
    return new Promise((resolve) => { resolve(); });
  }
}
