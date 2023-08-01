import React,{ useEffect } from 'react';  
import "react-native-url-polyfill/auto"      
import RootNavigation from './navigation';
import { AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { COLORS } from './constants/theme';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen'; // Import the splash screen package

const IColors = {
  label: COLORS.white,
  card: COLORS.primary,
  overlay: 'rgba(0, 0, 0, 0.5)',
  success: COLORS.green,
  danger: COLORS.rose,
  warning: COLORS.gold,
};
const defaultProps = {
  dialogConfig: {},
  toastConfig: {},
  theme: 'dark',
  colors: [IColors, IColors],
};

const App = ({ dialogConfig, toastConfig, theme, colors }) => {
  useEffect(() => {
    // Hide the splash screen when the component mounts
    SplashScreen.hideAsync();
  }, []);
  return (
    <AlertNotificationRoot dialogConfig={dialogConfig ?? defaultProps.dialogConfig} toastConfig={toastConfig ?? defaultProps.toastConfig} theme={theme ?? defaultProps.theme} colors={colors ?? defaultProps.colors}>
     <StatusBar style="auto" />
      <RootNavigation />
    </AlertNotificationRoot>
  );
};

App.defaultProps = defaultProps;

export default App;