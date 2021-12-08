import React, {useContext} from 'react';
import {Image} from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Components/Home/Home';
import Search from '../Screens/Components/Search/Search';
import Users from '../Screens/Components/User/User';
import SettingsStack from './SettingsStack';
import AppImages from '../Theme/AppImages';
import {AppContext} from '../AppContext';
import {ParamListBase, RouteProp} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TABS = [
  {
    title: 'Home',
    icon: AppImages.home,
    screen: Home,
    name: 'home',
  },
  {
    title: 'Search',
    icon: AppImages.search,
    screen: Search,
    name: 'search',
  },
  {
    title: 'User',
    icon: AppImages.user,
    screen: Users,
    name: 'user',
  },
  {
    title: 'Settings',
    icon: AppImages.settings,
    screen: SettingsStack,
    name: 'setting',
  },
];

const AppTab = () => {
  const {appTheme} = useContext(AppContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: appTheme.gray1,
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
            options={(props: {
              route: RouteProp<ParamListBase, string>;
              navigation: any;
            }): BottomTabNavigationOptions => {
              return {
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => (
                  <Image
                    resizeMode={'contain'}
                    source={tab.icon}
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

export default AppTab;
