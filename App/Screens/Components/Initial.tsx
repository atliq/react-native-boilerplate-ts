/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { DeviceEventEmitter, EmitterSubscription, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isLoggedIn } from '@Services/UserService';
import { Route } from '@Routes/AppRoutes';
import { goToNextScreen, onLogout } from '@Utils/Helper';
import { Authentication } from '@Utils/Enums';

const Initial = () => {
  const navigation = useNavigation();

  let isLogout: EmitterSubscription | null = null;

  useEffect(() => {
    isUserLogin();
  }, []);

  useEffect(() => {
    if (isLogout) {
      isLogout.remove();
    }
    isLogout = DeviceEventEmitter.addListener(
      Authentication.REDIRECT_LOGIN,
      () => onLogout(navigation),
    );
  }, []);

  const isUserLogin = async () => {
    const isUserLoggedIn = await isLoggedIn();
    if (!isUserLoggedIn) {
      goToNextScreen(navigation, Route.LoginScreen);
      return;
    }
    goToNextScreen(navigation, Route.HomeScreen);
  };

  return <View />;
};

export default Initial;
