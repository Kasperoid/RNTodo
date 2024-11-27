import {combineReducers, configureStore} from '@reduxjs/toolkit';
import todosListSlice from './slices/todosListSlice';
import userInfoSlice from './slices/userInfoSlice';
import tagsListSlice from './slices/tagsListSlice';

import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const supabaseUrl = 'https://qugilhlesriserycrgxw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1Z2lsaGxlc3Jpc2VyeWNyZ3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NTQ5NzYsImV4cCI6MjA0ODIzMDk3Nn0.NkJn2ocANew7dLUY6w0dnYsIpJkA4LUswmaO18UO9zg';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  todosList: todosListSlice,
  userInfo: userInfoSlice,
  tagsList: tagsListSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
