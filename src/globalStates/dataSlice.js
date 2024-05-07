// globalState/dataSlice.js

import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    isLogin: false,
    formData: {},
    userDetails: {},
    offerList: [],
    screenName: "Home"
  },

  reducers: {

    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },

    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },

    setFormData: (state, action) => {
      state.formData = action.payload;
    },

    setOfferList: (state, action) => {
      state.offerList = action.payload;
    },

    setScreenName: (state, action) => {
      state.screenName = action.payload;
    },

  },
});

export const { setIsLogin, setUserDetails, setFormData, setOfferList, setScreenName } = dataSlice.actions;

export default dataSlice.reducer;
