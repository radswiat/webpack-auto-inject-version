# Auto inject version - Webpack plugin
Adds version from package.json into every single file as top comment block.

# Install

```console
$ npm install webpack-auto-inject-version --save-dev
```

# Table of Contents
[What it does](#user-content-what-it-does) <br>
[How to use](#user-content-how-to-use) <br>
[Available options](#user-content-available-options) <br>
[Output examples](#user-content-output-examples)
[How to use with other webpack plugins](#user-content-how-to-use-with-other-webpack-plugins)<br>
[Change log](#user-content-change-log)<br>

# What it does
Auto Inject Version (AIV) can:
- inject version from package.json into every bundle file as a comment ( at the top )
- inject version from package.json into any place in your HTML by special tag `[AIV]{version}[/AIV]`
- inject version from package.json into any place in CSS/JS file by special tag `[AIV]{version}[/AIV]`
- auto increase package.json version by --env.major, --env.minor, --env.patch passed into webpack

# How to use
It's easy to set it up, all you need is:
* use WebpackAutoInject in webpack plugins
* pass config as a parameter, or leave it blank as all options are "on" by default.

### Simple config example ( in webpack.conf.js )
```js
var WebpackAutoInject = require('webpack-auto-inject-version');
...
module.exports = {
    ...
    plugins: [
        new WebpackAutoInject({
            // options
            // example:
            components: {
                AutoIncreaseVersion: false
            }
        })
    ]
}
```

### Full config example ( in webpack.conf.js )
```
module.exports = {
    ...
    plugins: [
      new WebpackAutoInject({
        // specify the name of the tag in the outputed files eg
        // bundle.js: [SHORT]  Version: 0.13.36 ...
        SHORT: 'CUSTOM',
        SILENT: false,
        PACKAGE_JSON_PATH: './package.json',
        PACKAGE_JSON_INDENT: 4,
        components: {
          AutoIncreaseVersion: true,
          InjectAsComment: true,
          InjectByTag: true
        },
        componentsOptions: {
          AutoIncreaseVersion: {
            runInWatchMode: false // it will increase version with every single build!
          },
          InjectAsComment: {
            tag: 'Version: {version} - {date}',
            dateFormat: 'h:MM:ss TT', // change timezone: `UTC:h:MM:ss` or `GMT:h:MM:ss`
            multiLineCommentType: false, // use `/** */` instead of `//` as comment block
          },
          InjectByTag: {
            fileRegex: /\.+/,
            // regexp to find [AIV] tag inside html, if you tag contains unallowed characters you can adjust the regex
            // but also you can change [AIV] tag to anything you want
            AIVTagRegexp: /(\[AIV])(([a-zA-Z{} ,:;!()_@\-"'\\\/])+)(\[\/AIV])/g,
            dateFormat: 'h:MM:ss TT'
          }
        },
        LOGS_TEXT: {
          AIS_START: 'DEMO AIV started'
        }
      })
    ]
}
```

### Inject by tag example
```
<body>
  <span>
    [AIV]{version}[/AIV]
  </span>
  <span>
    [AIV]{date}[/AIV]
  </span>
  <span>
    [AIV]{version}_{date}[/AIV]
  </span>
  <span>
    [AIV]V:{version} Date:{date}[/AIV]
  </span>
  <span>
    [AIV]Version {version} , {date}[/AIV]
  </span>
</body>
```

# Available options

### components.AutoIncreaseVersion
Auto increase package.json number. <br>
This option requires extra argument to be sent to webpack build. <br>
It happens before anything else to make sure that your new version is injected into your files.<br>
Arguments: --env.major --env.minor --env.patch<br><br>

Example for package.json run type, npm run start => ( 1.2.10 to 2.0.0 )
```json
 "version" : "1.2.10",
 "scripts": {
    "start": "webpack --env.major"
 }
```

To enable watch mode:
```
  plugins: [
    new WebpackAutoInject({
      ...
      components: {
        AutoIncreaseVersion: true,
        ...
      },
      componentsOptions: {
        AutoIncreaseVersion: {
          runInWatchMode: false // it will increase version with every single build!
        }
      }
    })
  ]
```
Default: true

### components.InjectByTag
Inject version number into your file<br>
Version will replace the <{version}> tag.<br>
```html
<span>My awesome project | [AIV]{version}[/AIV]</span>
```
```js
var version = '[AIV]{version}[/AIV]';
```
Default: true

### components.InjectAsComment
This will inject your version as a comment into any css,js,html file.<br>
You can change what is injected into the file by changing componentsOptions.InjectAsComment.tag.
Currently only 2 tags are supported:
* {version}
* {date} ( current date )
Example:
``` javascript
  ...
  plugins: [
    ...
    new WebpackAutoInject({
      PACKAGE_JSON_PATH: './package.json',
      components: {
        ...
        InjectAsComment: true
      },
      componentsOptions: {
        ...
        InjectAsComment: {
          tag: 'Build version: {version} - {date}', // default
          dateFormat: 'dddd, mmmm dS, yyyy, h:MM:ss TT', // default
          multiLineCommentType: false, // default
        }
    })
  ]
```
Default: true



# Output-examples
AIV can inject version number for all your bundle files (css,js,html).<br><br>
```js
// [AIV] Build version: 1.0.10
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
```
<br><br>
Example html:
```html
<!-- [AIV] Build version: 1.0.10 -->
<!DOCTYPE html>
<html lang="en">
```

# How to use with other webpack plugins

Webpack plugins order matters!
Always try to put WebpackAutoInject as a first webpack plugin.

## compression-webpack-plugin

```
  plugins: [
    new WebpackAutoInject(),
    new CompressionPlugin(),
  ]
```

## uglifyjs-webpack-plugin

```
  plugins: [
    new WebpackAutoInject(),
    new UglifyJsPlugin(),
  ]
```

## webpack.optimize.UglifyJsPlugin

If the order won't be enough, you can always add ignore to the uglifyJsPlugin
to prevent stripping out AIV comments eg:

```
  new webpack.optimize.UglifyJsPlugin({
    ...
    output: {
      // prevent version info to be removed from bundle.js
      comments: /\[AIV\]/,
    },
    ...
  });
```

# Change log

## [1.2.3] - 09/06/2021
 - updates for webpack 5 comatibility
## [1.2.2] - 27/10/2018
- add PACKAGE_JSON_INDENT @trevyn
## [1.2.1] - 27/10/2018
- security updates
## [1.2.0] - 27/10/2018
- inject as comment will no more be a version behind with auto increase version
- inject as comment can now switched to multiline comment type eg /** */
- added support for npm log levels eg `npm start -s` will disable console logs
- unit tests added inside the `demo` folder, `npm run test`
## [1.1.0] - 15/03/2018
- webpack sync apply
- "name" has been removed as not used anyway, use SHORT instead
- eslint changes
- InjectByTag - AIVTagRegexp exposed in config to allow [AIV] tag modifications
- comma fix in InjectByTag regexp
- query has on filename has been fixed
## [1.0.0] - 25/08/2017
- Date format can now be specified for InjectAsComment
- Date format can now be specified for InjectByTag
- Webpack WATCH support added
- Root SILENT option added
- Minor fixes
## [0.5.14] - 12/04/2017
- Remove babel polyfills from webpack build as it was causing issues if babel was already used in project
## [0.5.13] - 12/04/2017
- Tag from InjectAsComment can now be configured by options ( componentsOptions.InjectAsComment.tag )
- Default tag template for InjectAsComment has change
## [0.5.12] - 12/04/2017
- Fix dependency missing issue
- Remove export as object with .default as a class
