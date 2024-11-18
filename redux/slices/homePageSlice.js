import {createSlice} from '@reduxjs/toolkit';

const homePageSlice = createSlice({
  name: 'logInPage',
  initialState: {
    helloMsg: true,
    isOpenAddModal: false,
    newTodoInput: '',
  },
  reducers: {
    setHelloMsg(state, action) {
      state.helloMsg = action.payload;
    },
    setIsOpenAddModal(state, action) {
      state.isOpenAddModal = action.payload;
    },
    setNewTodoInput(state, action) {
      state.newTodoInput = action.payload;
    },
  },
});

export const {setHelloMsg, setIsOpenAddModal, setNewTodoInput} =
  homePageSlice.actions;
export default homePageSlice.reducer;
