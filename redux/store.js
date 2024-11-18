import {configureStore} from '@reduxjs/toolkit';
import logInPageSlice from './slices/logInPageSlice';
import homePageSlice from './slices/homePageSlice';
import todosListSlice from './slices/todosListSlice';
import userInfoSlice from './slices/userInfoSlice';

export const store = configureStore({
  reducer: {
    logInPage: logInPageSlice,
    homePage: homePageSlice,
    todosList: todosListSlice,
    userInfo: userInfoSlice,
  },
});
