import { GET_USER, LOG_OUT } from '@Keys/index';

export const getUserDetail = () => ({
  type: GET_USER,
});

export const userLogout = () => ({
  type: LOG_OUT,
});
