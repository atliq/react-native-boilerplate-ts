import Login from '@Components/Login/Login';
import { AppTab } from '@Routes/AppTab';

enum Route {
  LoginScreen = 'Login',
  HomeScreen = 'Home',
}

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
