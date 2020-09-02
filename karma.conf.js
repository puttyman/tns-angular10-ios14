//https://github.com/NativeScript/nativescript-cli/issues/2772
module.exports = function (config) {
  const options = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-spies', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'app/tests/setup.ts',
      'app/tests/**/*.ts'
    ],


    // list of files to exclude
    exclude: [
      'app/App_Resources/iOS/build.xcconfig'
    ],


    // Configure the Mocha Client options
    client: {
      mocha: {
        opts: "app/tests/mocha.opts"
      }
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/**/*.ts': ['typescript'],
        'app/**/!(*spec).ts': ['typescript', 'coverage-istanbul']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage-istanbul'],

    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],

    customLaunchers: {
      android: {
        base: 'NS',
        platform: 'android'
      },
      ios: {
        base: 'NS',
        platform: 'ios'
      },
      ios_simulator: {
        base: 'NS',
        platform: 'ios',
        arguments: ['--emulator']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // to avoid DISCONNECTED messages
    browserDisconnectTimeout: 300000, // default 2000
    browserDisconnectTolerance: 0, // default 0
    browserNoActivityTimeout: 600000, //default 10000
  };
  setWebpackPreprocessor(config, options);
  setWebpack(config, options);

  config.set(options);
}

function setWebpackPreprocessor(config, options) {
  if (config && config.bundle) {
    if (!options.preprocessors) {
      options.preprocessors = {};
    }

    options.files.forEach(file => {
      if (!options.preprocessors[file]) {
        options.preprocessors[file] = [];
      }
      options.preprocessors[file].push('webpack');
      options.preprocessors[file].push('coverage');
    });
  }
}

function setWebpack(config, options) {
  if (config && config.bundle) {
    const env = {};
    env[config.platform] = true;
    env.sourceMap = config.debugBrk;
    options.webpack = require('./webpack.config')(env);
    options.webpack.module.rules.push(
      {
        test: /\.ts$/,
        exclude: [
          /\.spec\.ts$/,
          /app\/tests/
        ],
        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
        enforce: 'post'
      }
    );
    delete options.webpack.entry;
    delete options.webpack.output.libraryTarget;
    const invalidPluginsForUnitTesting = ["GenerateBundleStarterPlugin", "GenerateNativeScriptEntryPointsPlugin"];
    options.webpack.plugins = options.webpack.plugins.filter(p => !invalidPluginsForUnitTesting.includes(p.constructor.name));
  }
}
