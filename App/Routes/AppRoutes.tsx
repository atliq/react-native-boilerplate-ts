import InitialScreen from '@Components/Initial';
import Login from '@Components/Login/Login';
import AppTab from '@Routes/AppTab';

const Routes = [
  {
    name: 'InitialScreen',
    screen: InitialScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: 'Login',
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: 'Home',
    screen: AppTab,
    navigationOptions: {
      headerShown: false,
    },
  },
];

export default Routes;
