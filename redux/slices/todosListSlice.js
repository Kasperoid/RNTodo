import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {supabase} from '../store';

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

export const changeCompleteTodo = createAsyncThunk(
  'changeCompleteTodo/fetch',
  async function (params, {rejectWithValue}) {
    try {
      const {error} = await supabase
        .from('todos')
        .update({completed: params.completed})
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
      const {error} = await supabase.from('todos').insert([params]);
      if (error) throw 'Ошибка на сервере!';
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const initialState = {
  activeTodos: [],
  localChangeTodos: [],
  selectedTodo: null,
  isLoading: false,
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

    setDescTodo(state, action) {
      state.selectedTodo = {...state.selectedTodo, desc: action.payload};
      state.todosList = [
        ...state.todosList.filter(todo => todo.id !== state.selectedTodo.id),
        state.selectedTodo,
      ];
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
    builder.addCase(setTodo.fulfilled, state => {
      state.isLoading = false;
    });
  },
});
export const {setSelectedTodo, setDescTodo} = todosListSlice.actions;
export default todosListSlice.reducer;
