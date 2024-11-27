import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {supabase} from '../store';

export const getUser = createAsyncThunk(
  'getusers/fetch',
  async function (params, {rejectWithValue}) {
    try {
      const {data, error} = await supabase
        .from('users')
        .select('*')
        .single()
        .match(params);

      if (error || !data) throw 'Неправильный логин/пароль';
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const setUser = createAsyncThunk(
  'setusers/fetch',
  async function (params, {rejectWithValue}) {
    try {
      const emailText = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.ru$/);
      if (!emailText.test(params.login)) {
        throw 'Некорректный логин';
      }

      const {data: checkedLog} = await supabase
        .from('users')
        .select('*')
        .eq('login', params.login);

      if (checkedLog.length > 0) {
        throw 'Пользователь с такой почтой уже существует!';
      }

      let {data: user, error} = await supabase
        .from('users')
        .insert([params])
        .select()
        .single();

      if (error || !user) throw 'Возникла непредвиденная ошибка!';
      return user;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const initialState = {
  activeUser: null,
  isLoading: false,
  isError: false,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
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
    clearError(state) {
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, state => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.activeUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    });

    builder.addCase(setUser.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.activeUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(setUser.rejected, (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    });
  },
});

export const {addNewUser, setUserNickname, clearError} = userInfoSlice.actions;
export default userInfoSlice.reducer;
