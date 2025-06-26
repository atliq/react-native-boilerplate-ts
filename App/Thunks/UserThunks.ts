import { createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin } from '@Services/UserService';
import { UserThunkTypes } from '@ThunkTypes';
import { UserDefault } from '@Default/UserDefault';
import { RootState } from '@Stores';

export const fetchUser = createAsyncThunk<
  UserDefault, // Return type of the thunk
  UserDefault, // Parameters type
  { state: RootState } // ThunkAPI type to access the state
>(UserThunkTypes.USER_FETCH, async (params, thunkAPI) => {
  const user = thunkAPI.getState().user.user;

  const userData = await userLogin({ ...user, ...params });
  return userData;
});
