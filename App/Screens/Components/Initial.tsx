import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { isLoggedIn } from '@Services/UserService';
import { Route } from '@Routes/AppRoutes';

const Initial = () => {
  const navigation = useNavigation();

  useEffect(() => {
    isUserLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isUserLogin = async () => {
    const isUserLoggedIn = await isLoggedIn();
    if (!isUserLoggedIn) {
      goToNextScreen(Route.LoginScreen);
      return;
    }
    goToNextScreen(Route.HomeScreen);
  };

  const goToNextScreen = async (nextScreen: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: nextScreen }],
      }),
    );
  };
  return <View />;
};

export default Initial;
