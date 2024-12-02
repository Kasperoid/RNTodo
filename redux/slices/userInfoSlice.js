import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {supabase} from '../store';
import {decode} from 'base64-arraybuffer';

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

export const changeUserNick = createAsyncThunk(
  'changeUserNick/fetch',
  async function (params, {rejectWithValue}) {
    try {
      const {data, error} = await supabase
        .from('users')
        .update({nickname: params.nickname})
        .eq('id', params.id)
        .select();
      if (error) throw 'Возникла ошибка на сервере!';
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const uploadAvatar = createAsyncThunk(
  'uploadAvatar/fetch',
  async function (params, {rejectWithValue}) {
    const {data, error} = await supabase.storage
      .from('users')
      .upload(`avatars/${params.userId}.${params.ext}`, decode(params.data), {
        contentType: params.mime,
        upsert: true,
      });
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  },
);

export const downloadAvatar = createAsyncThunk(
  'downloadAvatar/fetch',
  async function (params, {rejectWithValue}) {
    let {data, error} = await supabase.storage
      .from('users')
      .download(`avatars/${params.userId}.jpg`);
    if (error) {
      return null;
    } else if (data) {
      try {
        return new Promise((res, rej) => {
          const fr = new FileReader();
          fr.readAsDataURL(data);
          fr.onload = function () {
            res(fr.result);
          };
          fr.onerror = function () {
            rej('error');
          };
        });
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  },
);

const initialState = {
  activeUser: null,
  activeUserAvatar: null,
  isLoading: false,
  isError: false,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
    clearError(state) {
      state.isError = false;
    },
    setUserAvatar(state, action) {
      state.activeUserAvatar = action.payload;
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

    builder.addCase(changeUserNick.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(changeUserNick.fulfilled, state => {
      state.isLoading = false;
    });
    builder.addCase(changeUserNick.rejected, state => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(uploadAvatar.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(uploadAvatar.fulfilled, state => {
      state.isLoading = false;
    });

    builder.addCase(downloadAvatar.pending, state => {
      // state.isLoading = true;
    });

    builder.addCase(downloadAvatar.fulfilled, (state, action) => {
      // state.isLoading = false;
      state.activeUserAvatar = action.payload;
    });
  },
});

export const {clearError, setUserAvatar} = userInfoSlice.actions;
export default userInfoSlice.reducer;
