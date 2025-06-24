import { createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin } from '@Services/UserService';
import { UserThunkTypes } from '@ThunkTypes';

export const fetchUser = createAsyncThunk(
  UserThunkTypes.USER_FETCH,
  async params => {
    const userData = await userLogin(params);
    return userData;
  },
);
