# Auto inject version - Webpack plugin
## Add version to bundle automatically

## What
Auto Inject Version (AIV) can:
- inject version from package.json into every bundle file as a comment ( at the top )
- inject version from package.json into any place in your HTML by special tag <{version}>
- inject version from package.json into any place in CSS/JS file by special tag <{version}>
- auto increase version by --major, --minor, --patch and then inject as chosen

## Desc
AIV can inject version number for all your bundle files (css,js,html).<br><br>
Example js:
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

AIV can also auto inject your version number into html by using special code ( <{version}> ).<br><br>
Example:
```html
<span>My awesome project | <{version}></span>
```

<br>

## Install

```console
$ npm install webpack-auto-inject-version --save-dev
```
<br>

## Usage

```js
var WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = {
    plugins: [
        new WebpackAutoInject(options)
    ]
}
```

<br>

## Options

### autoIncrease
Auto increase package.json number. <br>
This option requires extra argument to be sent to webpack build. <br>
It happens before anything else to make sure that your new version is injected into your files.<br>
Arguments: --major --minor --patch<br><br>

<br>

Example for package.json run type, npm run start => ( 1.2.10 to 2.0.0 )
```json
 "version" : "1.2.10",
 "scripts": {
    "start": "webpack --major"
 }
```
Default: true

<br>

### injectByTag
Inject version number into your file<br>
Version will replace the <{version}> tag.<br>
```html
<span>My awesome project | <{version}></span>
```
```js
var version = '<{version}>';
```
Default: true


<br>


### injectByTagFileRegex
Regex against file name. If match, injectByTag will try to find version tag and replace it.
Only html files: /^(.){1,}\.html$/ <br>
Only js files: ^(.){1,}\.js$ <br>
Any file: (.){1,} <br>
Default: /^index\.html$/


<br>


### injectAsComment
This will inject your version as a comment into any css,js,html file.<br>
Default: true