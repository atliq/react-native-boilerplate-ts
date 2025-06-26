import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '@Components/Settings/Settings';
import { useAppContext } from '@AppContext';

const Stack = createStackNavigator();

const SettingsStack = () => {
  const { appTheme } = useAppContext();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: true,
        cardOverlayEnabled: true,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          color: appTheme.text,
        },
        headerTintColor: appTheme.text,
        headerStyle: {
          backgroundColor: appTheme.tab,
        },
        presentation: 'card',
      })}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
