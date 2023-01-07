import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import routes from '../routes/routes';
/* eslint-disable no-param-reassign */

export const getDataBasket = createAsyncThunk('/basket/getMyBasket', async (payload) => {
  const res = await axios.get('/basket/getMyBasket', {
    params: {
        payload
    }
});
  return res.data;
});

const basketAdapter = createEntityAdapter();

const initialState = basketAdapter.getInitialState();

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProductToBasket: basketAdapter.addOne
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataBasket.fulfilled, (state, action) => {
        const {payload} = action;
        const dataBasket = {basket: payload}
        basketAdapter.setAll(state, dataBasket)
        state.isLoading = false;
        state.loadingError = null;
      })
      .addCase(getDataBasket.pending, (state) => {
        console.log(`загрузка: ${state.isLoading}`);
        state.isLoading = true;
        state.loadingError = null;
      })
      .addCase(getDataBasket.rejected, (state, action) => {
        console.log('rejected');
        state.isLoading = false;
        state.loadingError = action.error;
      });
  },
});
console.log(basketAdapter)
export const selectors = basketAdapter.getSelectors((state) => state.basket);
export const getBasket = (state) => selectors.selectAll(state);
// export const getLikeId = (state) => selectors.selectIds(state);
// export const getLoading = ((state) => state.channels.isLoading);
// export const getActiveChannel = (state) => state.channels.id;

export const {
  addProductToBasket
} = basketSlice.actions;
export default basketSlice.reducer;