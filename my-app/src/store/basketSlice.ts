import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  SerializedError,
  Dictionary,
  EmptyObject,
  EntityId,
} from "@reduxjs/toolkit";
import axios from "axios";
import { WritableDraft } from "immer/dist/internal";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { Product } from "../TSType";
import { RootState } from "./store";
/* eslint-disable no-param-reassign */

interface BasketServer {
  product: Product;
  quantity: number;
  _id: string;
}
interface interfaceGetBasket {
  like: {
    isLoading: boolean;
    loadingError: SerializedError | null;
    ids: EntityId[];
    entities: Dictionary<{ id: string; product: Product }>;
  };
  basket: WritableDraft<{
    isLoading: boolean;
    loadingError: SerializedError | null;
    ids: EntityId[];
    entities: Dictionary<BasketClient>;
  }>;
  modal: { show: boolean };
}

export interface BasketClient {
  product: Product;
  quantity: number;
  id: string;
}

export const getDataBasket = createAsyncThunk(
  "/basket/getMyBasket",
  async (payload: string) => {
    const res = await axios.get("/basket/getMyBasket", {
      params: {
        payload,
      },
    });
    return res.data;
  }
);

const basketAdapter = createEntityAdapter<BasketClient>();
const initialState = {
  ...basketAdapter.getInitialState(),
  isLoading: false as boolean,
  loadingError: null as null | SerializedError,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProductToBasket: basketAdapter.addOne,
    updateProductToBasket: (state, { payload }) =>
      basketAdapter.updateOne(state, {
        id: payload.id,
        changes: { quantity: payload.quantity },
      }),
    deleteProductToBasket: (state, { payload }) => {
      console.log(payload);
      basketAdapter.removeOne(state, payload.id);
    },
    deleteAllProductToBasket: basketAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataBasket.fulfilled, (state, { payload }) => {
        basketAdapter.setAll(
          state,
          payload?.map((v: BasketServer) => ({
            id: v.product._id,
            product: v.product,
            quantity: v.quantity,
          }))
        );
        state.isLoading = false;
        state.loadingError = null;
      })
      .addCase(getDataBasket.pending, (state) => {
        state.isLoading = true;
        state.loadingError = null;
      })
      .addCase(getDataBasket.rejected, (state, action) => {
        console.log("rejected");
        state.isLoading = false;
        state.loadingError = action.error;
      });
  },
});
export const selectors = basketAdapter.getSelectors(
  (state: RootState) => state.basket
);
export const getBasket = (
  state: EmptyObject & interfaceGetBasket & PersistPartial
) => selectors.selectAll(state);

export const {
  addProductToBasket,
  deleteProductToBasket,
  updateProductToBasket,
  deleteAllProductToBasket,
} = basketSlice.actions;
export default basketSlice.reducer;
