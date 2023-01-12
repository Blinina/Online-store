import { createSlice } from '@reduxjs/toolkit'

const initialState = { show: false }

const sliceModal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.show = true
      console.log(state.show)
    },
    closeModal: (state) => {
      state.show = false
    }
  }
})

export const {
  showModal, closeModal
} = sliceModal.actions

export default sliceModal.reducer
