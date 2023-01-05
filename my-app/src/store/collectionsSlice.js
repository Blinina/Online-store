import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import routes from '../routes/routes';
/* eslint-disable no-param-reassign */

export const getData = createAsyncThunk('collections/getData', async (payload) => {
  console.log(payload)
  const res = await axios.get('/category', {
    params: {
        payload
    }
});
  return res.data;
});

const collectionAdapter = createEntityAdapter();

const initialState = {
  ...collectionAdapter.getInitialState({
    // women: [],
    // men: []
  }),
};

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
       console.log(action.payload)
       console.log(collectionAdapter)
        const { payload } = action;
        console.log(payload)
        collectionAdapter.setAll(state, payload);
        // state.women.setMany(action.payload);
        state.isLoading = false;
        state.loadingError = null;
      })
      .addCase(getData.pending, (state) => {
        console.log(`загрузка: ${state.isLoading}`);
        state.isLoading = true;
        state.loadingError = null;
      })
      .addCase(getData.rejected, (state, action) => {
        console.log('rejected');
        state.isLoading = false;
        state.loadingError = action.error;
      });
  },
});

// export const selectors = collectionsSlice.getSelectors((state) => state.collections);
// export const getCollection = (state) => selectors.selectAll(state);
// export const getLoading = ((state) => state.channels.isLoading);
// export const getActiveChannel = (state) => state.channels.id;

// export const {
//   addChannel, removeChannel, renameChannel, changeChannelID,
// } = sliceChannels.actions;
export default collectionsSlice.reducer;