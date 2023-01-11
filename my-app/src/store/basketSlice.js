import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
    addProductToBasket: basketAdapter.addOne,
    updateProductToBasket: (state, { payload }) => basketAdapter.updateOne(state, {
      id: payload.id,
      changes: { quantity: payload.quantity },
    }),
    deleteProductToBasket:  (state, { payload }) => {
      console.log(payload)
      basketAdapter.removeOne(state, payload.id)
        },
    deleteAllProductToBasket: basketAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataBasket.fulfilled, (state, action) => {
        const {payload} = action;
        basketAdapter.setAll(state, payload?.map(v=>({id: v.product._id, product: v.product, quantity: v.quantity})))
        state.isLoading = false;
        state.loadingError = null;
      })
      .addCase(getDataBasket.pending, (state) => {
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
export const selectors = basketAdapter.getSelectors((state) => state.basket);
export const getBasket = (state) => selectors.selectAll(state);

export const {
  addProductToBasket, deleteProductToBasket, updateProductToBasket, deleteAllProductToBasket
} = basketSlice.actions;
export default basketSlice.reducer;