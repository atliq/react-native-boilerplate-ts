import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDefault } from '@Reducers/Default/UserDefault';
import userDefault from '@Reducers/Default/UserDefault';
import { fetchUser } from '@Actions';

const initialState: UserDefault = userDefault;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    resetUser() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, state => {
      state.loading = false; // Optionally handle rejected state
    });
    builder.addCase(fetchUser.pending, state => {
      // Optionally handle pending state if needed
      state.loading = true;
    });
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
