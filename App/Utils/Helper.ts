import { CommonActions } from '@react-navigation/native';
import { ApiConfig } from '@ApiConfig/index';
import { AxiosHeaders } from 'axios';
import { getItemFromStorage } from '@Utils/Storage';
import { STORAGE } from '@Utils/Enums';

export const isValidPhoneNo = (phoneNo: string) => {
  const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return phoneNumberPattern.test(phoneNo);
};

export const isValidEmail = (email: string) => {
  const format =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return format.test(email);
};

export const isValidUserName = (email: string) => {
  const format = /^[0-9a-zA-Z_]{5,}$/;
  return format.test(email);
};

export const isEmpty = (text: string) => {
  return text.toString().trim().length > 0 && text.toString().trim() !== '0';
};

export const validatePhoneNumber = (phoneNumber: string) =>
  /^\d{10}$/.test(phoneNumber);

export const configureUrl = (url: string) => {
  let authUrl = url;
  if (url && url[url.length - 1] === '/') {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};

export const getErrorMessage = (error: any) => {
  if (error && error.response && error.response.data && error.response.data) {
    if (error.response.data.errors) {
      return error.response.data.errors.join('\n');
    }
    if (error.response.data.message) {
      return error.response.data.message;
    }
  }
  if (error && error.message) {
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

export const getHeaders = async () => {
  let token: string | null = ApiConfig.token;
  if (!token) {
    token = await getItemFromStorage(STORAGE.TOKEN);
  }
  const headers = new AxiosHeaders();

  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  return headers;
};
