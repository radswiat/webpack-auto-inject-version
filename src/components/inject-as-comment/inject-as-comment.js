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
   * @protected
   * @returns {Promise}
   */
  apply() {
    for (let basename in this.context.compilation.assets) {
      let ext = path.extname(basename);
      let asset = this.context.compilation.assets[basename];
      switch (ext) {
        case '.js' :
          this.injectIntoJs(asset);
          break;
        case '.html' :
          this.injectIntoHtml(asset);
          break;
        case '.css' :
          this.injectIntoCss(asset);
          break;
        default:
          break;
      }
      log.info(`InjectAsComment : match : ${basename} : injected : ${this.context.version}`);
    }

    return new Promise((resolve) => { resolve(); });
  }

  parseTags(baseOpen, baseClose) {
    let tagPattern = this.context.config.componentsOptions.InjectAsComment.tag;
    tagPattern = tagPattern.replace(/(\{([a-zA-Z]+)\})/g, (tag) => {
      let tagName = tag.replace(/(\{|\})/g, '');
      if (typeof tags[tagName] === 'function') {
        return tags[tagName](this.context);
      }
      log.error(`unsupported tag in componentsOptions.InjectAsComment.tag [${tagName}]`);
      return tag;
    });
    return `${baseOpen} ${tagPattern} ${baseClose}`;
  }

  injectIntoCss(asset) {
    let modAsset = this.parseTags(`/** [${config.SHORT}] `, ' **/ ');
    modAsset += `${endOfLine} ${asset.source()} `;
    asset.source = () => modAsset;
  }

  injectIntoHtml(asset) {
    let modAsset = this.parseTags(`<!-- [${config.SHORT}] `, ' --> ');
    modAsset += `${endOfLine} ${asset.source()} `;
    asset.source = () => modAsset;
  }

  injectIntoJs(asset) {
    let modAsset = this.parseTags(`// [${config.SHORT}] `, ' ');
    modAsset += `${endOfLine} ${asset.source()} `;
    asset.source = () => modAsset;
  }
}
