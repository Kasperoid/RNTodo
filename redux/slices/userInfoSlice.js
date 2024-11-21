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
    setUserNickname(state, action) {
      state.activeUser = {...state.activeUser, nickName: action.payload};
      state.users = [
        ...state.users.filter(user => user.id !== state.activeUser.id),
        state.activeUser,
      ];
    },
  },
});

export const {setActiveUser, addNewUser, setUserNickname} =
  userInfoSlice.actions;
export default userInfoSlice.reducer;
