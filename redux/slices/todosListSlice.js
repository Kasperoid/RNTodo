import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {supabase} from '../store';
import {decode} from 'base64-arraybuffer';

export const getTodos = createAsyncThunk(
  'gettodos/fetch',
  async function (params, {rejectWithValue}) {
    try {
      let {data: todos, error} = await supabase
        .from('todos')
        .select('*')
        .eq('tagid', params);
      if (error) throw 'Возникла ошибка на сервере!';
      return todos;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const getTodo = createAsyncThunk(
  'gettodo/fetch',
  async function (params, {rejectWithValue}) {
    try {
      let {data: todo, error} = await supabase
        .from('todos')
        .select('*')
        .eq('id', params)
        .single();
      if (error) throw 'Возникла ошибка на сервере!';
      return todo;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const changeTodo = createAsyncThunk(
  'changeCompleteTodo/fetch',
  async function (params, {rejectWithValue}) {
    try {
      const {error} = await supabase
        .from('todos')
        .update(params.update)
        .eq('id', params.id);
      if (error) throw 'Возникла ошибка на сервере!';
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const delTodo = createAsyncThunk(
  'delTodo/fetch',
  async function (param, {rejectWithValue}) {
    try {
      const {error} = await supabase.from('todos').delete().eq('id', param);
      if (error) throw 'Ошибка на сервере!';
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const setTodo = createAsyncThunk(
  'setTodo/fetch',
  async function (params, {rejectWithValue}) {
    try {
      const {data, error} = await supabase
        .from('todos')
        .insert([params])
        .select()
        .single();
      if (error) throw 'Ошибка на сервере!';
      return data.id;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const uploadTodoImg = createAsyncThunk(
  'uploadTodoImg/fetch',
  async function (params, {rejectWithValue}) {
    try {
      const {error} = await supabase.storage
        .from('todos')
        .upload(
          `pictures/${params.todoId}.${params.ext}`,
          decode(params.data),
          {
            contentType: params.mime,
            upsert: true,
          },
        );
      if (error) {
        throw 'Произошла ошибка!';
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const downloadTodoImg = createAsyncThunk(
  'downloadTodoImg/fetch',
  async function (params, {rejectWithValue}) {
    const {data, error} = await supabase.storage
      .from('todos')
      .download(`pictures/${params.todoId}.jpg`);
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
  activeTodos: [],
  localChangeTodos: [],
  selectedTodo: null,
  isLoading: false,
  newTodoId: null,
  newTodoImgSettings: null,
};

const todosListSlice = createSlice({
  name: 'todosList',
  initialState: initialState,
  reducers: {
    setSelectedTodo(state, action) {
      state.selectedTodo = state.activeTodos.filter(
        todo => todo.id === action.payload,
      )[0];
    },

    setNewTodoImgSettings(state, action) {
      state.newTodoImgSettings = action.payload;
    },

    clearNewTodoId(state) {
      state.newTodoId = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(getTodos.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.activeTodos = action.payload;
      state.isLoading = false;
    });

    builder.addCase(setTodo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(setTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newTodoId = action.payload;
    });

    builder.addCase(getTodo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedTodo = action.payload;
    });

    builder.addCase(uploadTodoImg.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(uploadTodoImg.fulfilled, state => {
      state.isLoading = false;
    });
  },
});
export const {setSelectedTodo, setNewTodoImgSettings, clearNewTodoId} =
  todosListSlice.actions;
export default todosListSlice.reducer;
