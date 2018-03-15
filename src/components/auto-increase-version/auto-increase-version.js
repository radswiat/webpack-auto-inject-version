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

  /**
   * Close & save package file
   * @param newVersion
   */
  closePackageFile(newVersion) {
    this.packageFile.version = newVersion;
    fs.writeFile(
      path.resolve(this.context.config.PACKAGE_JSON_PATH),
      JSON.stringify(this.packageFile, null, 4), (err) => {
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
    this.closePackageFile(newVersion);
  }

  /**
   * Increase minor
   */
  minor() {
    const newVersion = semver.inc(this.packageFile.version, 'minor');
    this.closePackageFile(newVersion);
  }

  /**
   * Increase patch
   */
  patch() {
    const newVersion = semver.inc(this.packageFile.version, 'patch');
    this.closePackageFile(newVersion);
  }
}
