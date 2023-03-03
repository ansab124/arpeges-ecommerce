
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading: false,
  error: null,
  visible: false,
  message: "",
  type: "info"
}


const getRequest = (state) => {
  state.loading = true
  delete state.error
}

const getRequestSuccess = (state) => {
  state.loading = false
  delete state.error

}

const showToast = (state, { payload }) => {
  state.visible = true
  state.message = payload.message
  state.type = payload.type
  // state.loading = false
}

const hideToast = (state) => {
  state.visible = false
  state.message = ""
  state.type = ""
}

const getRequestFailure = (state, { payload }) => {
  state.loading = false
  state.error = payload
}

const commonslice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    getRequest,
    getRequestSuccess,
    getRequestFailure,
    showToast,
    hideToast
  },
});

export const commonActions = commonslice.actions

export const commonReducer = commonslice.reducer