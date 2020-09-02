import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.tns-angular10-ios14.nsmobile',
  main: 'main.ts',
  appPath: 'app',
  appResourcesPath: 'app/App_Resources',
  webpackConfigPath: 'webpack.config.js',
  ios: {
    discardUncaughtJsExceptions: false
  },
  android: {
    discardUncaughtJsExceptions: true,
    v8Flags: '--nolazy --expose_gc',
    markingMode: "none",
    suppressCallJSMethodExceptions: false
  }
} as NativeScriptConfig;
