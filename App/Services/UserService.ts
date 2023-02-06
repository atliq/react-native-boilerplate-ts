import axios from 'axios';
import { ApiConfig } from '@ApiConfig/index';
import { getItemFromStorage } from '@Utils/Storage';
import { Authentication } from '@Utils/Enums';

export const isLoggedIn = async () => {
  const token = await getItemFromStorage(Authentication.TOKEN);
  if (!token) {
    return false;
  }
  ApiConfig.token = token;
  return true;
};

export const userLogin = async (params: any) => {
  const response = await axios.post(ApiConfig.login, params);
  return response.data;
};
