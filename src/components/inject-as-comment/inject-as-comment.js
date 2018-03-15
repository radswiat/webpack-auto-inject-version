import path from 'path';

import config from 'config';
import log from 'core/log';

import tags from './tags';

const endOfLine = require('os').EOL;

/**
 * Inject version number into HTML
 * - done by parsing html file,
 *   > replace: <{version}>
 */
export default class InjectAsComment {

  static componentName = 'InjectAsComment';

  constructor(context) {
    this.context = context;
  }

  /**
   * Apply will be called from main class
   * - hook into webpack emit
   * - iterate complication.assets files
   * - handle each file
   * @protected
   * @return {Promise}
   */
  apply() {
    // bind into emit hook
    this.context.compiler.plugin('emit', (compilation, cb) => {
      // iterate over all assets file in compilation
      for (const basename in compilation.assets) {
        // bug fix, extname is not able to handle chunk file params index.js?random123
        const ext = path.extname(basename).replace(/(\?)(.){0,}/, '');
        const asset = compilation.assets[basename];
        this._handleAssetFile(ext, asset);
        log.info(`InjectAsComment : match : ${basename} : injected : ${this.context.version}`);
      }
      cb();
    });
  }

  /**
   * Handle asset file
   * - call suitable inject based on file extension
   * @param ext
   * @param asset
   * @private
   */
  _handleAssetFile(ext, asset) {
    switch (ext) {
      case '.js': {
        this.injectIntoJs(asset);
        break;
      }
      case '.html': {
        this.injectIntoHtml(asset);
        break;
      }
      case '.css': {
        this.injectIntoCss(asset);
        break;
      }
      default:
        break;
    }
  }

  /**
   * Parse tags
   * - parse inject tags eg {version}, {date}
   * @private
   *
   * @param baseOpen
   * @param baseClose
   *
   * @return {string}
   */
  parseTags(baseOpen, baseClose) {
    let tagPattern = this.context.config.componentsOptions.InjectAsComment.tag;
    tagPattern = tagPattern.replace(/(\{([a-zA-Z]+)\})/g, (tag) => {
      const tagName = tag.replace(/(\{|\})/g, '');
      if (typeof tags[tagName] === 'function') {
        return tags[tagName](this.context);
      }
      log.error(`unsupported tag in componentsOptions.InjectAsComment.tag [${tagName}]`);
      return tag;
    });
    return `${baseOpen} ${tagPattern} ${baseClose}`;
  }

  /**
   * Inject into css
   * - inject tag comment into css asset file
   * - format: / ** .... ** /
   * @private
   *
   * @param asset
   */
  injectIntoCss(asset) {
    let modAsset = this.parseTags(`/** [${config.SHORT}] `, ' **/ ');
    modAsset += `${endOfLine} ${asset.source()} `;
    asset.source = () => modAsset;
  }

  /**
   * Inject into html
   * - inject tag comment into html asset file
   * - format: <!-- ... -->
   * @private
   *
   * @param asset
   */
  injectIntoHtml(asset) {
    let modAsset = this.parseTags(`<!-- [${config.SHORT}] `, ' --> ');
    modAsset += `${endOfLine} ${asset.source()} `;
    asset.source = () => modAsset;
  }

  /**
   * Inject into JS
   * - inject tag comment into JS asset file
   * - format: // ...
   * @private
   *
   * @param asset
   */
  injectIntoJs(asset) {
    let modAsset = this.parseTags(`// [${config.SHORT}] `, ' ');
    modAsset += `${endOfLine} ${asset.source()} `;
    asset.source = () => modAsset;
  }
}
