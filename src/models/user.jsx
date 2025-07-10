import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  permissions: [],
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    
    setToken: (state, action) => {
      state.token = action.payload;
    },
    
    login: (state, action) => {
      const { userInfo, token, permissions } = action.payload;
      state.isLoggedIn = true;
      state.userInfo = userInfo;
      state.token = token;
      state.permissions = permissions || [];
    },
    
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.permissions = [];
      state.token = null;
    },
  },
});

export const {
  setLoginStatus,
  setUserInfo,
  setPermissions,
  setToken,
  login,
  logout,
} = userSlice.actions;

export default userSlice.reducer; 