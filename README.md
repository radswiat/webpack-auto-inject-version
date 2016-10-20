# In development

## What
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
        new WebpackAutoInject({
            autoIncrease        : boolean,
            injectIntoHtml      : boolean,
            injectIntoHtmlRegex : regex,
            injectIntoAnyFile   : boolean
        })
    ]

}
```

<br>

## Options
By default you don't need to pass any options, all options from Usage section are set by default.<br><br>

<br>

### autoIncrease
Auto increase package.json number. <br>
This option requires extra argument to be sent to webpack build. <br>
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

### injectIntoHtml
Inject version number ( increased if autoIncrease is set correctly ) into HTML template<br>
For this to work you need to place <{version}> inside your html file.<br><br>
Example:
```html
<span>My awesome project | <{version}></span>
```
Default: true


<br>


### injectIntoHtmlRegex
Regex to find your html file, where injectIntoHtml should try to find your <{version}> tag.<br>
Default: /^index\.html$/


<br>


### injectIntoAnyFile
This will inject your version file as a comment into any css,js,html file.<br>
Default: true