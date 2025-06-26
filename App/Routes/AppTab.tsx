/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Image } from 'react-native';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '@Components/Home/Home';
import Search from '@Components/Search/Search';
import Users from '@Components/User/User';
import SettingsStack from '@Routes/SettingsStack';
import { AppImages } from '@Theme';
import { useAppContext } from '@AppContext';

const Tab = createBottomTabNavigator<TabRouteType>();

enum tabs {
  HomeTab = 'HomeTab',
  SearchTab = 'SearchTab',
  UsersTab = 'UsersTab',
  SettingsTab = 'SettingsTab',
}

const TABS = [
  {
    title: tabs.HomeTab,
    icon: AppImages.home,
    screen: Home,
    name: tabs.HomeTab,
  },
  {
    title: tabs.SearchTab,
    icon: AppImages.search,
    screen: Search,
    name: tabs.SearchTab,
  },
  {
    title: tabs.UsersTab,
    icon: AppImages.user,
    screen: Users,
    name: tabs.UsersTab,
  },
  {
    title: tabs.SettingsTab,
    icon: AppImages.settings,
    screen: SettingsStack,
    name: tabs.SettingsTab,
  },
];

type TabRouteType = {
  [tabs.HomeTab]: undefined;
  [tabs.SearchTab]: undefined;
  [tabs.UsersTab]: undefined;
  [tabs.SettingsTab]: undefined;
};

export type BottomTabNavigation = BottomTabNavigationProp<TabRouteType>;

const AppTab = () => {
  const { appTheme } = useAppContext();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: appTheme.gray,
        tabBarStyle: {
          backgroundColor: appTheme.tab,
        },
      }}
    >
      {TABS.map(tab => {
        return (
          <Tab.Screen
            key={tab.title}
            name={tab.name}
            component={tab.screen}
            options={(): BottomTabNavigationOptions => {
              return {
                headerShown: false,
                tabBarIcon: ({ focused, size }) => (
                  <Image
                    resizeMode="contain"
                    source={{ uri: tab.icon }}
                    style={{
                      height: size,
                      width: size,
                      tintColor:
                        (focused && appTheme.themeColor) || appTheme.lightText,
                    }}
                  />
                ),
              };
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export { AppTab, tabs };
