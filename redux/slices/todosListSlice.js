import {createSlice} from '@reduxjs/toolkit';
import {todosData} from '../../data/data';

const initialState = {
  todosList: todosData,
  activeTodos: [],
  selectedTodo: null,
};
const todosListSlice = createSlice({
  name: 'todosList',
  initialState: initialState,
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

    setActiveTodos(state, action) {
      state.activeTodos = state.todosList.filter(todo =>
        todo.tags.includes(action.payload),
      );
    },

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
});

export const {
  toggleTodoChecked,
  addNewTodo,
  setActiveTodos,
  setSelectedTodo,
  setDescTodo,
} = todosListSlice.actions;
export default todosListSlice.reducer;
