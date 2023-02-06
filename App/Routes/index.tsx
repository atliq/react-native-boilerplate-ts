import React, { useContext } from 'react';
import { StatusBar, StatusBarStyle, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CommonStyle from '@Theme/CommonStyle';
import { Route, Routes } from '@Routes/AppRoutes';
import { AppContext } from '@AppContext/index';
import { ThemeEnums } from '@Utils/Enums';

const Stack = createStackNavigator();

const App = () => {
  const { appTheme } = useContext(AppContext);
  return (
    <View style={CommonStyle.flexContainer}>
      <StatusBar
        backgroundColor={appTheme.background}
        barStyle={appTheme.statusBar as StatusBarStyle}
      />
      <NavigationContainer
        theme={{
          dark: (appTheme.type === ThemeEnums.DARK && true) || false,
          colors: {
            ...DefaultTheme.colors,
            background: appTheme.background,
          },
        }}>
        <Stack.Navigator
          initialRouteName={Route.Initial}
          screenOptions={({}) => ({
            headerShown: true,
            cardOverlayEnabled: true,
            headerBackTitleVisible: false,
            presentation: 'card',
          })}>
          {Routes.map(route => {
            return (
              <Stack.Screen
                name={route.name}
                component={route.screen}
                key={route.name}
                options={route.navigationOptions || {}}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
