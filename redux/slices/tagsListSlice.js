import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {supabase} from '../store';

export const getTags = createAsyncThunk(
  'gettags/fetch',
  async function (params, {rejectWithValue}) {
    try {
      let {data: tags, error} = await supabase
        .from('users')
        .select(
          `
    tags (
      *
    )
  `,
        )
        .single()
        .eq('id', params);

      if (error) throw 'Возникла ошибка!';
      return tags.tags;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const setTag = createAsyncThunk(
  'settag/fetch',
  async function (params, {rejectWithValue}) {
    try {
      const {data, error} = await supabase
        .from('tags')
        .insert([params])
        .select();
      if (error) throw 'Возникла непредвиденная ошибка!';
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const delTag = createAsyncThunk(
  'deltag/fetch',
  async function (params, {rejectWithValue}) {
    try {
      const {error} = await supabase.from('tags').delete().eq('id', params);

      if (error) throw 'Возникла ошибка на сервере';
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const changeTag = createAsyncThunk(
  'changeTag/fetch',
  async function (params, {rejectWithValue}) {
    try {
      const {error} = await supabase
        .from('tags')
        .update(params.update)
        .eq('id', params.id);

      if (error) throw 'Возникла ошибка на сервере!';
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const initialState = {
  activeTags: [],
  selectedTag: null,
  isLoading: false,
};

const tagsListSlice = createSlice({
  name: 'tagsList',
  initialState: initialState,
  reducers: {
    setSelectedTag(state, action) {
      state.selectedTag = action.payload;
    },

    clearSelectedTag(state) {
      state.selectedTag = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getTags.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.activeTags = action.payload;
      state.isLoading = false;
    });

    builder.addCase(setTag.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(setTag.fulfilled, state => {
      state.isLoading = false;
    });

    builder.addCase(delTag.pending, state => {
      state.isLoading = true;
    }),
      builder.addCase(delTag.fulfilled, state => {
        state.isLoading = false;
      });
  },
});

export const {setSelectedTag, clearSelectedTag} = tagsListSlice.actions;
export default tagsListSlice.reducer;
