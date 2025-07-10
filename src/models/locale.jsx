import { createSlice } from '@reduxjs/toolkit';
import { locales } from '../locales';

const initialState = {
  locale: 'zh_CN', // 'zh_CN' | 'en_US'
  messages: locales,
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    
    addMessage: (state, action) => {
      const { locale, key, value } = action.payload;
      if (!state.messages[locale]) {
        state.messages[locale] = {};
      }
      state.messages[locale][key] = value;
    },
  },
});

export const {
  setLocale,
  addMessage,
} = localeSlice.actions;

export default localeSlice.reducer; 