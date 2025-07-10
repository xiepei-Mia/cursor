import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tabsReducer from '../models/tabs.jsx';
import menuReducer from '../models/menu.jsx';
import userReducer from '../models/user.jsx';
import subAccountOrgReducer from '../models/subAccountOrg.jsx';
import themeReducer from '../models/theme.jsx';
import localeReducer from '../models/locale.jsx';

// 持久化配置
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'tabs', 'menu', 'theme', 'locale'], // 只持久化这些reducer
  blacklist: ['subAccountOrg'], // 不持久化这个reducer（因为包含BigInt）
};

// 创建根reducer
const rootReducer = combineReducers({
  tabs: tabsReducer,
  menu: menuReducer,
  user: userReducer,
  subAccountOrg: subAccountOrgReducer,
  theme: themeReducer,
  locale: localeReducer,
});

// 创建持久化reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略BigInt序列化检查
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['subAccountOrg'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 