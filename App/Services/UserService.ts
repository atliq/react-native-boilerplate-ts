import axios from 'axios';
import { ApiConfig } from '@ApiConfig';
import { getItemFromStorage, Authentication } from '@Utils';

export const isLoggedIn = () => {
  const token = getItemFromStorage(Authentication.TOKEN);
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
