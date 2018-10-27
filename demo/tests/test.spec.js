import webpackCompile from './helpers/webpack-compile';
import getDistFile from './helpers/get-dist-file';
import testWebpackConfigs from './webpack-configs';
import cheerio from 'cheerio';

describe('Inject by tag', () => {

  // default inject by tag tests
  describe('default', () => {
    const config = {
      SILENT: true,
      components: {
        AutoIncreaseVersion: false,
        InjectAsComment: false,
        InjectByTag: true,
      },
      componentsOptions: {
        InjectByTag: {
          dateFormat: '_HH:mm:ss_',
        },
      },
    };

    // container for webpack iterations
    describe('Iterate webpack configs', async () => {
      for (const [webpackConfName, webpackConfig] of testWebpackConfigs) {
        describe(`webpack: ${webpackConfName}`, () => {

          it('prepare', async () => {
            await webpackCompile(webpackConfig, config);
          });

          it('Should not include any not parsed tags', async () => {
            const distMainJS = getDistFile('js/main.js');
            expect(distMainJS).to.not.include('[AIV]');
            expect(distMainJS).to.not.include('[/AIV]');
          });

          it('Should properly parse date', () => {
            const distMainJS = getDistFile('js/main.js');
            const $ = cheerio.load(distMainJS);
            const date = $('#date').text().trim();
            expect(/^(_\d\d:\d\d:\d\d_)$/.test(date)).to.be.true;
          });
        });
      }
    });
  });
});


describe('Inject as comment', () => {

  // default inject by tag tests
  describe('default', () => {
    const config = {
      SILENT: true,
      components: {
        AutoIncreaseVersion: false,
        InjectAsComment: true,
        InjectByTag: false,
      },
      componentsOptions: {
        InjectAsComment: {
          tag: '_Version: {version} - {date}',
          dateFormat: '_HH:mm:ss_',
          // multiLineCommentType: true
        },
      },
    };

    // container for webpack iterations
    describe('Iterate webpack configs', async () => {
      for (const [webpackConfName, webpackConfig] of testWebpackConfigs) {
        describe(`webpack: ${webpackConfName}`, () => {

          it('prepare', async () => {
            await webpackCompile(webpackConfig, config);
          });

          it('Should include AIV_SHORT comment block', async () => {
            const distMainJS = getDistFile('js/main.js');
            expect(distMainJS).to.include('[AIV_SHORT]  _Version:');
          });

          it('Should use single line comment block', () => {
            const distMainJS = getDistFile('js/main.js');
            expect(distMainJS).to.match(/^(\/\/)/);
          });
        });
      }
    });
  });

  // default inject by tag tests
  describe('multiline', () => {
    const config = {
      SILENT: true,
      components: {
        AutoIncreaseVersion: false,
        InjectAsComment: true,
        InjectByTag: false,
      },
      componentsOptions: {
        InjectAsComment: {
          tag: '_Version: {version} - {date}',
          dateFormat: '_HH:mm:ss_',
          multiLineCommentType: true
        },
      },
    };

    // container for webpack iterations
    describe('Iterate webpack configs', async () => {
      for (const [webpackConfName, webpackConfig] of testWebpackConfigs) {
        describe(`webpack: ${webpackConfName}`, () => {

          it('prepare', async () => {
            await webpackCompile(webpackConfig, config);
          });

          it('Should use multiline comment block', () => {
            const distMainJS = getDistFile('js/main.js');
            expect(distMainJS).to.match(/^(\/\*\*)/);
          });
        });
      }
    });
  });
});

describe('Auto increase version', () => {

  // default inject by tag tests
  describe('default', () => {
    const config = {
      SILENT: true,
      components: {
        AutoIncreaseVersion: true,
        InjectAsComment: true,
        InjectByTag: false,
      },
      componentsOptions: {
        AutoIncreaseVersion: {
          runInWatchMode: true,
          simulate: true, // testing purpose only
          forceMode: 'patch',  // testing purpose only
        },
      },
    };

    // container for webpack iterations
    describe('Iterate webpack configs', async () => {
      for (const [webpackConfName, webpackConfig] of testWebpackConfigs) {
        describe(`webpack: ${webpackConfName}`, () => {

          it('prepare', async () => {
            await webpackCompile(webpackConfig, config);
          });

          it('InjectAsComment should include correct AIV version', async () => {
            const distMainJS = getDistFile('js/main.js');
            expect(distMainJS).to.include('0.14.1');
          });
        });
      }
    });
  });
});
