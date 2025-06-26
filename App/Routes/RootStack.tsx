import React, { useEffect } from 'react';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Route, Routes, RouteType } from '@Routes/AppRoutes';
import { isLoggedIn } from '@Services';
import { Authentication, onLogout } from '@Utils';
import { useAppNavigation } from '@Hooks';

const Stack = createStackNavigator<RouteType>();

const RootStack = () => {
  let isLogout: EmitterSubscription | null = null;
  const navigation = useAppNavigation();

  const isUserLogin = () => {
    const isUserLoggedIn = isLoggedIn();
    if (!isUserLoggedIn) {
      return Route.LoginScreen;
    }
    return Route.HomeScreen;
  };

  useEffect(() => {
    if (isLogout) {
      isLogout.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isLogout = DeviceEventEmitter.addListener(
      Authentication.REDIRECT_LOGIN,
      () => onLogout(navigation),
    );
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={isUserLogin()}
      screenOptions={() => ({
        headerShown: true,
        cardOverlayEnabled: true,
        headerBackTitleVisible: false,
        presentation: 'card',
      })}
    >
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
  );
};

export { RootStack };
