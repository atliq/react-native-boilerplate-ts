import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '@Slices/UserSlice';

export default combineReducers({
  user: userReducer,
});
