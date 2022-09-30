import React, { useContext } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
// import { ParamListBase, RouteProp } from '@react-navigation/native';
import Home from '@Components/Home/Home';
import Search from '@Components/Search/Search';
import Users from '@Components/User/User';
import SettingsStack from '@Routes/SettingsStack';
import AppImages from '@Theme/AppImages';
import { AppContext } from '@AppContext/index';
import ThemeColor from '@Theme/Colors';
import { AssetImage } from '@CommonComponent/index';

const Tab = createBottomTabNavigator();

enum tabs {
  HomeTab = 'Home',
  SearchTab = 'Search',
  UsersTab = 'Users',
  SettingsTab = 'Settings',
}

const TABS = [
  {
    title: tabs.HomeTab,
    icon: AppImages.home,
    screen: Home,
    name: 'home',
  },
  {
    title: tabs.SearchTab,
    icon: AppImages.search,
    screen: Search,
    name: 'search',
  },
  {
    title: tabs.UsersTab,
    icon: AppImages.user,
    screen: Users,
    name: 'user',
  },
  {
    title: tabs.SettingsTab,
    icon: AppImages.settings,
    screen: SettingsStack,
    name: 'setting',
  },
];

const AppTab = () => {
  const { appTheme } = useContext(AppContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: ThemeColor.gray,
        tabBarStyle: {
          backgroundColor: appTheme.tab,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: appTheme.background,
      }}>
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
                  <AssetImage
                    resizeMode={'contain'}
                    source={tab.icon}
                    imageStyle={{
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
