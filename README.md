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
[Change log](#user-content-change-log)



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

### Example ( in webpack.conf.js )
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
          tag: 'Build version: {version} - {date}' // default
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



# Change log
## [0.5.13] - 12/04/2017
- Tag from InjectAsComment can now be configured by options ( componentsOptions.InjectAsComment.tag )
- Default tag template for InjectAsComment has change
## [0.5.12] - 12/04/2017
- Fix dependency missing issue
- Remove export as object with .default as a class
