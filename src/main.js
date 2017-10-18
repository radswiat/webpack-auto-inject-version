/* global define */
import fs from 'fs';
import path from 'path';
import config from 'config';
import log from 'core/log';
import { merge, transform } from 'lodash';

// import sub components
import AutoIncreaseVersion from 'components/auto-increase-version/auto-increase-version';
import InjectAsComment from 'components/inject-as-comment/inject-as-comment';
import InjectByTag from 'components/inject-by-tag/inject-by-tag';

export default class WebpackAutoInject {

  /**
   * Constructor,
   * called on webpack config load
   * @param userConfig - config from the webpack config file
   */
  constructor(userConfig) {
    this.setConfig(userConfig);
    let packageFile = JSON.parse(
      fs.readFileSync(path.resolve(this.config.PACKAGE_JSON_PATH), 'utf8')
    );
    this.version = packageFile.version;
    log.call('info', 'AIS_START');
    this.executeNoneWebpackComponents();
  }

  /**
   * Set config
   * - merge userConfig with default config
   * - merge above with a protected config
   * @param userConfig
   */
  setConfig(userConfig) {
    this.config = merge(config, userConfig);

    // lets convert all components names to lowercase - to prevent issues
    this.config.components = transform(this.config.components, (result, val, key) => {
      result[key.toLowerCase()] = val;
    });
  }

  /**
   * Webpack apply call,
   * when webpack is initialized and
   * plugin has been called by webpack
   * @param compiler
   * @protected
   */
  apply(compiler) {
    this.compiler = compiler;
    this.executeWebpackComponents();
  }

  /**
   * Execute none webpack components
   * - runs as soon as possible,
   *   > without waiting for webpack init
   */
  executeNoneWebpackComponents() {
    this.executeComponent([AutoIncreaseVersion]);
  }

  /**
   * Execute webpack components
   * - runs when webpack is initialized
   *   and plugins is called by webpack
   */
  executeWebpackComponents() {
    if (config.componentsOptions.AutoIncreaseVersion.runInWatchMode) {
      this.executeComponent([AutoIncreaseVersion]);
    }
    this.executeComponent([InjectAsComment, InjectByTag]);
  }

  /**
   * Execute components,
   * - general layer for comp execution
   * - used for both, webpack and non webpack comp
   */
  executeComponent(components) {
    // no more components,
    // finish
    if (!components.length) {
      return;
    }

    // take first component class
    let ComponentClass = components.shift();

    // if component is disabled, call next component
    if (!this.config.components[ComponentClass.componentName.toLowerCase()]) {
      this.executeComponent(components);
      return;
    }

    // execute component
    let inst = new ComponentClass(this);

    // await for apply to finish
    inst.apply();

    // call next tick
    this.executeComponent(components);
  }
}

// webpack hack to export class directly,
// - instead of using 'new WebpackAutoInject.default()',
// - with this you can just use WebpackAutoInject();
define(() => {
  return WebpackAutoInject;
});
