import webpackCompile from './helpers/webpack-compile';
import getDistFile from './helpers/get-dist-file';
import testWebpackConfigs from './webpack-configs';
import cheerio from 'cheerio';

describe('Inject by tag', () => {

  // default inject by tag tests
  describe('default', () => {
    const config = {
      SILENT: true,
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

          if (webpackConfName === 'confHtml') {
            it('HTML!?!?>!?', () => {
              const distHtml = getDistFile('index.html');
              expect(distHtml).to.not.include('[AIV]');
            });
          }

        });
      }
    });
  });


});

