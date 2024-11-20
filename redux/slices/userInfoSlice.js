import {createSlice} from '@reduxjs/toolkit';
import {usersData} from '../../data/data';

const initialState = {
  activeUser: null,
  users: usersData,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
    setActiveUser(state, action) {
      state.activeUser = action.payload;
    },
    addNewUser(state, action) {
      state.users = [...state.users, action.payload];
    },
  },
});

export const {setActiveUser, addNewUser} = userInfoSlice.actions;
export default userInfoSlice.reducer;
