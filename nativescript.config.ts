import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.tns-angular10-ios14.nsmobile',
  appPath: 'app',
  appResourcesPath: 'app/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;
