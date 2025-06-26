import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import userDefault, { UserDefault } from '@Default/UserDefault';
import { fetchUser } from '@Thunks';

const initialState: UserDefault = userDefault;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Logout action to reset. Handled in the store index file
    logout() {},
    setUser: (state, action: PayloadAction<{ abc: string }>) => {
      state.user = action.payload.abc; // Assuming 'abc' is a property in UserDefault
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

export const { logout, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
