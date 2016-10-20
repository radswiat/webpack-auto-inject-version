module.exports = {
    NAME: 'Auto Inject Version',
    SHORT: 'AIV',
    PATH_PACKAGE: './package.json',
    COMPONENTS: [
        {
            option: 'autoIncrease',
            path: './components/auto-inc-version'
        },
        {
            option: 'injectIntoHtml',
            path: './components/inject-into-html'
        },
        {
            option: 'injectIntoAnyFile',
            path: './components/inject-into-any-file'
        }
    ]
};
