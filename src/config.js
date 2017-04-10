export default {
  PACKAGE_JSON_PATH: './package.json',
  components: {
    AutoIncreaseVersion: true,
    InjectAsComment: true,
    InjectByTag: true
  },
  componentsOptions: {
    InjectByTag: {
      fileRegex: /\.+/
    }
  },
  LOGS_TEXT: {
    AIS_START: 'Auto inject version started'
  }
};
