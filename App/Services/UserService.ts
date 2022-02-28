import { ApiConfig } from '@ApiConfig/index';
import { getItemFromStorage } from '@Utils/Storage';
import axios from 'axios';

export const isLoggedIn = async () => {
  const token = await getItemFromStorage('token');
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
