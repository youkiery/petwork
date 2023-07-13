import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'petwork',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      FadeSplashScreen: 'true',
      AutoHideSplashScreen: 'true',
      ShowSplashScreen: 'false',
      SplashScreen: 'none',
      SplashShowOnlyFirstTime: 'false',
      SplashScreenDelay: '0'
    }
  }
};

export default config;
