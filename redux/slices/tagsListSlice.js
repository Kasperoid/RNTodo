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
  },
});

export const {addNewTag, setActiveTags, setSelectedTag, deleteTag} =
  tagsListSlice.actions;
export default tagsListSlice.reducer;
