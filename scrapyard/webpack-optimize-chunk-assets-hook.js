// this.context.compiler.plugin('compilation', (compilation) => {
//   console.log(chalk.red('COOOMPILE!'));
//   console.log(compilation.assets)
//
//   compilation.plugin('optimize-chunk-assets', (chunks, cb) => {
//     //unless you specified multiple entries in your config
//     //there's only one chunk at this point
//     chunks.forEach((chunk) => {
//       //chunks have circular references to their modules
//       console.log(chalk.green('----- module -----'));
//       // console.log(JSON.stringify(chunk));
//
//       chunk.files.forEach((file) => {
//         console.log('--------------------------');
//         console.log(file);
//         // console.log(compilation.assets[file]);
//         // compilation.assets[file] = 'asdasdadas';
//
//         // const asset = `VERSION! ${endOfLine} ${compilation.assets[file].source()} `;
//         // compilation.assets[file].source = () => asset;
//         // console.log('--------- end -----------------');
//
//         const assetFile = compilation.assets[file];
//         const assetFilename = file;
//         const ext = path.extname(assetFilename).replace(/(\?)(.){0,}/, '');
//         console.log('ext', ext);
//         const newContent = this.handleAssetFile(ext, assetFile);
//         console.log(newContent);
//       });
//     });
//     cb();
//   });
//
// });
