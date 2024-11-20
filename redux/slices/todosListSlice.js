import {createSlice} from '@reduxjs/toolkit';
import {todosData} from '../../data/data';

const todosListSlice = createSlice({
  name: 'todosList',
  initialState: {
    todosList: todosData,
  },
  reducers: {
    toggleTodoChecked(state, action) {
      state.todosList = state.todosList.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return {...item};
      });
    },

    addNewTodo(state, action) {
      state.todosList = [...state.todosList, action.payload];
    },
  },
});

export const {toggleTodoChecked, addNewTodo} = todosListSlice.actions;
export default todosListSlice.reducer;
