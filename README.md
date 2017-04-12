# Auto inject version - Webpack plugin
Adds version from package.json into every single file as top comment block.

### Install

```console
$ npm install webpack-auto-inject-version --save-dev
```

# What it gives you
Auto Inject Version (AIV) can:
- inject version from package.json into every bundle file as a comment ( at the top )
- inject version from package.json into any place in your HTML by special tag `[AIV]{version}[/AIV]`
- inject version from package.json into any place in CSS/JS file by special tag `[AIV]{version}[/AIV]`
- auto increase package.json version by --env.major, --env.minor, --env.patch passed into webpack

## Example
Please take a look into `demo/` folder.

## Inject example
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


# How to configure
In webpack.conf.js ( or any name of webpack conf file )
```js
var WebpackAutoInject = require('webpack-auto-inject-version').default;

module.exports = {
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

<br>

## Options

### components.AutoIncreaseVersion
Auto increase package.json number. <br>
This option requires extra argument to be sent to webpack build. <br>
It happens before anything else to make sure that your new version is injected into your files.<br>
Arguments: --env.major --env.minor --env.patch<br><br>

<br>

Example for package.json run type, npm run start => ( 1.2.10 to 2.0.0 )
```json
 "version" : "1.2.10",
 "scripts": {
    "start": "webpack --env.major"
 }
```
Default: true

<br>

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


<br>

### components.InjectAsComment
This will inject your version as a comment into any css,js,html file.<br>
Default: true

# Development advice
Demo has been created to simplify the testing of the webpack-plugin,
if you would like to work on this webpack plugin you should:
* clone the repo
* npm install on ./ & ./demo
* npm start on ./
* and then you can test your code by demo/ npm start



