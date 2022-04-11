import InitialScreen from '@Components/Initial';
import Login from '@Components/Login/Login';
import { AppTab } from '@Routes/AppTab';

enum Route {
  Initial = 'InitialScreen',
  LoginScreen = 'Login',
  HomeScreen = 'Home',
}

const Routes = [
  {
    name: Route.Initial,
    screen: InitialScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
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
