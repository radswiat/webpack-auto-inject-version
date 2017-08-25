import semver from 'semver';
import path from 'path';
import fs from 'fs';
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
   * @protected
   * @returns {Promise}
   */
  apply() {
    // when runInWatchMode
    // we have to register AutoIncreaseVersion instead of firing it straight away
    if (config.componentsOptions.AutoIncreaseVersion.runInWatchMode) {
      if (this.context.compiler) {
        this.context.compiler.plugin('emit', async (compilation, cb) => {
          await new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.start();
          });
          cb();
        });
      }
      return null;
    }

    // when runInWatchMode is off
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.start();
    });
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
   * @returns {any}
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
    let newVersion = semver.inc(this.packageFile.version, 'major');
    this.closePackageFile(newVersion);
  }

  /**
   * Increase minor
   */
  minor() {
    let newVersion = semver.inc(this.packageFile.version, 'minor');
    this.closePackageFile(newVersion);
  }

  /**
   * Increase patch
   */
  patch() {
    let newVersion = semver.inc(this.packageFile.version, 'patch');
    this.closePackageFile(newVersion);
  }
}
