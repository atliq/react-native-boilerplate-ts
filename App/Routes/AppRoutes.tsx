import Login from '@Components/Login/Login';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppTab, tabs } from '@Routes/AppTab';

enum Route {
  LoginScreen = 'Login',
  HomeScreen = 'Home',
}

export type RouteType = {
  [Route.LoginScreen]: undefined;
  [Route.HomeScreen]: {
    screen: tabs;
    params?: any;
  };
};

export type StackNavigation = StackNavigationProp<RouteType>;

const Routes = [
  {
    name: Route.LoginScreen,
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.HomeScreen,
    screen: AppTab,
    navigationOptions: {
      headerShown: false,
    },
  },
];

export { Routes, Route };
