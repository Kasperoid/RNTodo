import {configureStore} from '@reduxjs/toolkit';
import todosListSlice from './slices/todosListSlice';
import userInfoSlice from './slices/userInfoSlice';

export const store = configureStore({
  reducer: {
    todosList: todosListSlice,
    userInfo: userInfoSlice,
  },
});
