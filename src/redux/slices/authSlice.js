import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isLoggedIn: !!Cookies.get('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      console.log('Login action dispatched, state updated:', state);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      console.log('Logout action dispatched, state updated:', state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;