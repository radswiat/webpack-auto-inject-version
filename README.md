# In development

# Installation
npm i webpack-auto-inject-version --save-dev

# Usage
Add plugin to your webpack configuration.

Require it by:
    var WebpackAutoInject = require('webpack-auto-inject-version');

And add to plugins array as one of the last items ( further = better ).
    plugins: [
        new WebpackAutoInject(options)
    ]

# Options
NOT SUPPORTED YET!
    autoIncrease    : boolean,
    injectIntoHtml  : boolean,

# Auto Increase Version
Option: autoIncrease : true
- run webpack with --release major|minor|patch
DO NOT RUN IT WITH WATCH!