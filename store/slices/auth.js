import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
  token: null
};

if (typeof window != "undefined") {
  initialState.token = localStorage.getItem("token")
}

const getUserInfo = (state, { payload }) => {
  state.info = payload;

};

const getUserToken = (state, { payload }) => {
  state.token = payload
};
const clearUserData = (state) => {
  state.info = null;
  state.token = null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserInfo,
    getUserToken,
    clearUserData
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;