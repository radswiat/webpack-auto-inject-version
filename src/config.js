export default {
  SHORT: '[AIV_SHORT]',
  SILENT: false,
  PACKAGE_JSON_PATH: './package.json',
  PACKAGE_JSON_INDENT: 4,
  components: {
    AutoIncreaseVersion: true,
    InjectAsComment: true,
    InjectByTag: true,
  },
  componentsOptions: {
    AutoIncreaseVersion: {
      runInWatchMode: false,
    },
    InjectAsComment: {
      tag: 'Build version: {version} - {date}',
      dateFormat: 'dddd, mmmm dS, yyyy, h:MM:ss TT',
      multiLineCommentType: false,
    },
    InjectByTag: {
      fileRegex: /\.+/,
      AIVTagRegexp: /(\[AIV])(([a-zA-Z{} ,:;!()_@\-"'\\\/])+)(\[\/AIV])/g,
      dateFormat: 'dddd, mmmm dS, yyyy, h:MM:ss TT',
    },
  },
  LOGS_TEXT: {
    AIS_START: 'Auto inject version started',
  },
};
