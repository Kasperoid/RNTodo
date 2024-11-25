import {createSlice} from '@reduxjs/toolkit';
import {tagsData} from '../../data/data';

const initialState = {
  tags: tagsData,
  activeTags: [],
  selectedTag: null,
};

const tagsListSlice = createSlice({
  name: 'tagsList',
  initialState: initialState,
  reducers: {
    addNewTag(state, action) {
      state.tags = [...state.tags, action.payload];
    },

    setActiveTags(state, action) {
      state.activeTags = state.tags.filter(
        tag => tag.userId === action.payload,
      );
    },

    setSelectedTag(state, action) {
      state.selectedTag = action.payload;
    },

    deleteTag(state, action) {
      state.tags = state.tags.filter(item => item.id !== action.payload);
    },

    addCountTodo(state) {
      state.tags = [
        ...state.tags.map(tag => {
          if (tag.id === state.selectedTag) {
            return {
              ...tag,
              todosCount: tag.todosCount + 1,
            };
          }
          return {...tag};
        }),
      ];
    },

    removeCountTodo(state) {
      state.tags = [
        ...state.tags.map(tag => {
          if (tag.id === state.selectedTag) {
            return {
              ...tag,
              todosCount: tag.todosCount - 1,
            };
          }
          return {...tag};
        }),
      ];
    },
  },
});

export const {
  addNewTag,
  setActiveTags,
  setSelectedTag,
  deleteTag,
  addCountTodo,
  removeCountTodo,
} = tagsListSlice.actions;
export default tagsListSlice.reducer;
