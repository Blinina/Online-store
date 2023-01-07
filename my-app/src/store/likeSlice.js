import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import routes from '../routes/routes';
/* eslint-disable no-param-reassign */

export const getDataLike = createAsyncThunk('like/getDataLike', async (payload) => {
  const res = await axios.get('/wishlist/getWishlist', {
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
    // addLikeStore: likeAdapter.addOne
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataLike.fulfilled, (state, action) => {
        // console.log(action.payload);

        const {payload} = action;
        const dataLike = {likes: payload}
        likeAdapter.setAll(state,  dataLike)
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
export const getLikeId = (state) => selectors.selectIds(state);
// export const getLoading = ((state) => state.channels.isLoading);
// export const getActiveChannel = (state) => state.channels.id;

// export const {
//     addLikeStore
// } = likeSlice.actions;
export default likeSlice.reducer;