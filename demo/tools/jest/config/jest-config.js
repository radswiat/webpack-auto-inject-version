module.exports = {
  // root dir
  // this is from all paths will be calculated,
  // it also specify location of your .spec files!!
  // @default '../src/'
  rootDir: '../../../',
  // should stop after error ?
  // keep it off, or you won't see any console.logs!!
  // @default: false
  bail: false,
  // verbose output
  // @default: true
  verbose: true,
  // collect coverage
  // @default: true
  collectCoverage: false,
   // ignored paths
  modulePathIgnorePatterns: [
    // '<rootDir>/something/',
  ],
  // jest reporters
  // define reports format
  // @default: 'default' & 'json'
  reporters: [
    'default',
  ],
  // testEnvironment: 'jsdom',
  setupTestFrameworkScriptFile: '<rootDir>tools/jest/config/framework-config.js',
  transform: {
    '^.+.(js|jsx)$': 'babel-jest',
    // '^.+.(css|scss)': '<rootDir>tools/unit-tests/jest/compilers/css-transform.js',
    // '^(?!.*.(js|jsx|css|scss|json)$)': '<rootDir>tools/unit-tests/jest/compilers/file-transform.js'
  },
};
