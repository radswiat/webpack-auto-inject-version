import path from 'path';
import config from 'config';
import log from 'core/log';

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
    this.context.compiler.plugin('emit', (compilation, cb) => {
      for (let basename in compilation.assets) {
        let ext = path.extname(basename);
        let asset = compilation.assets[basename];
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
      cb();
    });
    return new Promise((resolve) => { resolve(); });
  }

  injectIntoCss(asset) {
    let modAsset = `/** [${config.SHORT}] Build version: ${this.context.version} **/ `;
    modAsset += `${endOfLine} ${asset.source()} `;
    asset.source = () => modAsset;
  }

  injectIntoHtml(asset) {
    let modAsset = `<!-- [${config.SHORT}] Build version: ${this.context.version} --> `;
    modAsset += `${endOfLine} ${asset.source()} `;
    asset.source = () => modAsset;
  }

  injectIntoJs(asset) {
    let modAsset = `// [${config.SHORT}] Build version: ${this.context.version} `;
    modAsset = `${endOfLine} ${asset.source()} `;
    asset.source = () => modAsset;
  }
}
