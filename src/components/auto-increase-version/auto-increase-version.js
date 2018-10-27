import path from 'path';
import fs from 'fs';

import semver from 'semver';
import { isArgv } from 'core/utils';
import log from 'core/log';
import config from 'config';

export default class AutoIncreaseVersion {

  static componentName = 'AutoIncreaseVersion';

  constructor(context) {
    this.context = context;
  }

  /**
   * Apply will be called from main class
   *
   * @protected
   * @return {Promise}
   */
  apply() {

    // setup promise
    const promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    // when runInWatchMode
    // we have to register AutoIncreaseVersion instead of firing it straight away
    if (config.componentsOptions.AutoIncreaseVersion.runInWatchMode) {
      if (this.context.compiler) {
        this.context.compiler.plugin('emit', (compilation, cb) => {
          this.start();
          cb();
        });
      }
      return null;
    }

    // when runInWatchMode is off
    this.start();
    return promise;
  }

  /**
   * Start version increase
   * - decide scenario: major, minor, patch
   */
  start() {
    this.packageFile = this.openPackageFile();
    if (!this.packageFile) {
      return;
    }

    // handle force mode - major, minor or patch can be applied trough config
    // ONLY TO BE USED FOR TESTING PURPOSES,
    if (config.componentsOptions.AutoIncreaseVersion.forceMode) {
      if (typeof this[config.componentsOptions.AutoIncreaseVersion.forceMode] === 'function') {
        return this[config.componentsOptions.AutoIncreaseVersion.forceMode]();
      }
    }

    if (isArgv('major')) {
      this.major();
    } else if (isArgv('minor')) {
      this.minor();
    } else if (isArgv('patch')) {
      this.patch();
    } else {
      this.resolve();
    }
  }

  /**
   * Open package file
   * @return {any}
   */
  openPackageFile() {
    try {
      return JSON.parse(
        fs.readFileSync(
          path.resolve(this.context.config.PACKAGE_JSON_PATH),
          'utf8'
        )
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  updateContextVersion(newVersion) {
    this.context.version = newVersion;
  }

  /**
   * Close & save package file
   * @param newVersion
   */
  closePackageFile(newVersion) {
    this.packageFile.version = newVersion;

    // prevent saving package.json file in simulate mode
    if (config.componentsOptions.AutoIncreaseVersion.simulate) {
      log.info(`autoIncVersion : new version : ${newVersion}`);
      log.info('package.json updated!');
      return;
    }

    // write new package.json file
    fs.writeFile(
      path.resolve(this.context.config.PACKAGE_JSON_PATH),
      JSON.stringify(this.packageFile, null, this.context.config.PACKAGE_JSON_INDENT), (err) => {
        if (err) {
          this.reject(err);
          console.log(err);
          return false;
        }
        log.info(`autoIncVersion : new version : ${newVersion}`);
        log.info('package.json updated!');
        this.context.version = newVersion;
        this.resolve();
        return true;
      });
  }

  /**
   * Increase major
   */
  major() {
    const newVersion = semver.inc(this.packageFile.version, 'major');
    this.updateContextVersion(newVersion);
    this.closePackageFile(newVersion);
  }

  /**
   * Increase minor
   */
  minor() {
    const newVersion = semver.inc(this.packageFile.version, 'minor');
    this.updateContextVersion(newVersion);
    this.closePackageFile(newVersion);
  }

  /**
   * Increase patch
   */
  patch() {
    const newVersion = semver.inc(this.packageFile.version, 'patch');
    this.updateContextVersion(newVersion);
    this.closePackageFile(newVersion);
  }
}
