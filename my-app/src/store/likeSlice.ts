import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  Dictionary,
  EntityId,
  SerializedError,
  EmptyObject,
} from "@reduxjs/toolkit"
import axios from "axios"
import { WritableDraft } from "immer/dist/internal"
import { PersistPartial } from "redux-persist/es/persistReducer"
import { Product } from "../TSType"
import { RootState } from "./store"

interface LikeClient {
  id: string
  product: Product
}
interface LikeServer {
  _id: string
  product: Product
}
interface interfaceGetLike {
  like: {
    isLoading: boolean
    loadingError: SerializedError | null
    ids: EntityId[]
    entities: Dictionary<LikeClient>
  }
  basket: WritableDraft<{
    isLoading: boolean
    loadingError: SerializedError | null
    ids: EntityId[]
    entities: Dictionary<{ product: Product; quantity: number; id: string }>
  }>
  modal: { show: boolean }
}
export const getDataLike = createAsyncThunk("like/getDataLike", async (payload: string) => {
  const res = await axios.get("/like/getLike", {
    params: {
      payload,
    },
  })
  return res.data
})

const likeAdapter = createEntityAdapter<LikeClient>()
const initialState = {
  ...likeAdapter.getInitialState(),
  isLoading: false as boolean,
  loadingError: null as null | SerializedError,
}

const likeSlice = createSlice({
  name: "like",
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
        likeAdapter.setAll(
          state,
          payload?.map((v: LikeServer) => ({ id: v._id, product: v })),
        )
        state.isLoading = false
        state.loadingError = null
      })
      .addCase(getDataLike.pending, (state) => {
        state.isLoading = true
        state.loadingError = null
      })
      .addCase(getDataLike.rejected, (state, action) => {
        console.log("rejected")
        state.isLoading = false
        state.loadingError = action.error
      })
  },
})

export const selectors = likeAdapter.getSelectors((state: RootState) => state.like)
export const getLike = (state: EmptyObject & interfaceGetLike & PersistPartial) =>
  selectors.selectAll(state)

export const { addLikeStore, deleteLikeStore, deleteAllLikeStore } = likeSlice.actions
export default likeSlice.reducer
