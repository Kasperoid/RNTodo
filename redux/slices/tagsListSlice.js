import {createSlice} from '@reduxjs/toolkit';
import {tagsData} from '../../data/data';

const tagsListSlice = createSlice({
  name: 'tagsList',
  initialState: {
    tags: tagsData,
  },
  reducers: {
    addNewTag(state, action) {
      state.tags = [...state.tags, action.payload];
    },
  },
});

export const {addNewTag} = tagsListSlice.actions;
export default tagsListSlice.reducer;
