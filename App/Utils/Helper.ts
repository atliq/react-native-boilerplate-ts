/* eslint-disable no-useless-escape */
import { Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { AxiosHeaders } from 'axios';
import { CommonActions } from '@react-navigation/native';
import { ApiConfig } from '@ApiConfig';
import { getItemFromStorage, removeStoreItem, Authentication } from '@Utils';
import { Route } from '@Routes/AppRoutes';
import { store } from '@Stores';
import { userLogout } from '@Actions';

export const isValidPhoneNo = (phoneNo: string) => {
  const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return phoneNumberPattern.test(phoneNo);
};

export const getVersionName = () => {
  const buildNumber = DeviceInfo.getBuildNumber();
  const versionName = DeviceInfo.getVersion();
  return `v${versionName} (${buildNumber})`;
};

export const isValidEmail = (email: string) => {
  const format =
    /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return format.test(email);
};

export const isValidUserName = (email: string) => {
  const format = /^\w{5,}$/;
  return format.test(email);
};

export const isEmpty = (text: string) => {
  return text.toString().trim().length > 0 && text.toString().trim() !== '0';
};

export const validatePhoneNumber = (phoneNumber: string) =>
  /^\d{10}$/.test(phoneNumber);

export const configureUrl = (url: string) => {
  let authUrl = url;
  if (url?.endsWith('/')) {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};

export const getErrorMessage = (error: any) => {
  if (error?.response?.data) {
    if (error.response.data.errors) {
      return error.response.data.errors.join('\n');
    }
    if (error.response.data.message) {
      return error.response.data.message;
    }
  }
  if (error?.message) {
    return error.message;
  }
  return 'Something went wrong!';
};

export const getSize = (size: number) => {
  return {
    height: size,
    width: size,
  };
};

export const getRound = (size: number) => {
  return {
    height: size,
    width: size,
    borderRadius: size,
  };
};

export const navigateToNextScreen = (
  navigation: any,
  params: { name: string; params?: any },
) => navigation.navigate(params);

export const goToNextScreen = async (navigation: any, nextScreen: string) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: nextScreen }],
    }),
  );
};

export const getHeaders = () => {
  let token: string | null = ApiConfig.token;
  if (!token) {
    token = getItemFromStorage(Authentication.TOKEN);
  }
  const headers = new AxiosHeaders();

  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  return headers;
};

export const onLogout = (navigation: any) => {
  goToNextScreen(navigation, Route.LoginScreen);
  store.dispatch(userLogout());
  removeStoreItem(Authentication.TOKEN);
};

export const compareAppVersions = ({
  version,
  minimumVersion,
}: {
  version: string;
  minimumVersion: string;
}) => {
  const currentVersion = version?.split(' ')[0].split('v')[1]; // v1.0.0
  let minRequiredVersion = minimumVersion?.split('v')[1]!; // v1.0.2
  if (!minRequiredVersion?.length) {
    return false;
  }
  const currentVersionArray = currentVersion.split('.');
  const minRequiredVersionArray = minRequiredVersion.split('.');

  let isVersionValid = false;
  for (let i = 0; i < currentVersionArray.length; i++) {
    if (Number(currentVersionArray[i]) < Number(minRequiredVersionArray[i])) {
      isVersionValid = true;
      break;
    } else if (
      Number(currentVersionArray[i]) > Number(minRequiredVersionArray[i])
    ) {
      isVersionValid = false;
      break;
    }
  }
  return isVersionValid;
};

export const openLink = async (url: string, checkUrl = true) => {
  try {
    let canOpenUrl = true;
    if (checkUrl) {
      canOpenUrl = await Linking.canOpenURL(url);
    }
    if (canOpenUrl) {
      await Linking.openURL(url);
    }
  } catch (e) {
    console.log(e);
  }
};
