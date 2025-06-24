import { combineReducers } from '@reduxjs/toolkit';
import UserReducer from '@Reducers/UserReducer';

export default combineReducers({
  user: UserReducer,
});
