import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', // 'light' | 'dark'
  primaryColor: '#1890ff',
  borderRadius: 6,
  compact: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    },
    
    setCompact: (state, action) => {
      state.compact = action.payload;
    },
    
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const {
  setTheme,
  setPrimaryColor,
  setBorderRadius,
  setCompact,
  toggleTheme,
} = themeSlice.actions;

export default themeSlice.reducer; 