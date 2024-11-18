import {createSlice} from '@reduxjs/toolkit';

const logInPageSlice = createSlice({
  name: 'logInPage',
  initialState: {
    logInInput: '',
    pswdInput: '',
    isError: false,
    errorMessage: '',
  },
  reducers: {
    setLoginInput(state, action) {
      state.logInInput = action.payload;
    },
    setPswdInput(state, action) {
      state.pswdInput = action.payload;
    },
    setIsError(state, action) {
      state.isError = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const {setLoginInput, setPswdInput, setIsError, setErrorMessage} =
  logInPageSlice.actions;
export default logInPageSlice.reducer;
