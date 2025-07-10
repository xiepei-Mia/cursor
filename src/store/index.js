import { configureStore } from '@reduxjs/toolkit';
import tabsReducer from '../models/tabs';
import menuReducer from '../models/menu';
import userReducer from '../models/user';
import subAccountOrgReducer from '../models/subAccountOrg';

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    menu: menuReducer,
    user: userReducer,
    subAccountOrg: subAccountOrgReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略BigInt序列化检查
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['subAccountOrg'],
      },
    }),
});

export default store; 