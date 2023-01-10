import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDataLike = createAsyncThunk('like/getDataLike', async (payload) => {
  const res = await axios.get('/like/getLike', {
    params: {
      payload
    }
  });
  return res.data;
});

const likeAdapter = createEntityAdapter();

const initialState = likeAdapter.getInitialState();

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLikeStore: likeAdapter.addOne,
    deleteLikeStore: (state, { payload }) => {
      likeAdapter.removeOne(state, payload.id)
    },
    deleteAllLikeStore: likeAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataLike.fulfilled, (state, { payload }) => {
        likeAdapter.setAll(state, payload?.map(v => ({ id: v._id, product: v })))
        state.isLoading = false;
        state.loadingError = null;
      })
      .addCase(getDataLike.pending, (state) => {
        console.log(`загрузка: ${state.isLoading}`);
        state.isLoading = true;
        state.loadingError = null;
      })
      .addCase(getDataLike.rejected, (state, action) => {
        console.log('rejected');
        state.isLoading = false;
        state.loadingError = action.error;
      });
  },
});

export const selectors = likeAdapter.getSelectors((state) => state.like);
export const getLike = (state) => selectors.selectAll(state);
// export const getLoading = ((state) => state.channels.isLoading);
// export const getActiveChannel = (state) => state.channels.id;

export const {
  addLikeStore, deleteLikeStore, deleteAllLikeStore
} = likeSlice.actions;
export default likeSlice.reducer;