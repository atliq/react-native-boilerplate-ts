import React from 'react';
import { StatusBar, StatusBarStyle, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { CommonStyle } from '@Theme';
import { useAppContext } from '@AppContext';
import { ThemeEnums } from '@Utils';
import { RootStack } from '@Routes/RootStack';

const App = () => {
  const { appTheme } = useAppContext();
  return (
    <View style={CommonStyle.flexContainer}>
      <StatusBar
        backgroundColor={appTheme.background}
        barStyle={appTheme.statusBar as StatusBarStyle}
      />
      <NavigationContainer
        theme={{
          dark: appTheme.type === ThemeEnums.DARK,
          colors: {
            ...DefaultTheme.colors,
            background: appTheme.background,
          },
        }}>
        <RootStack />
      </NavigationContainer>
    </View>
  );
};

export default App;
