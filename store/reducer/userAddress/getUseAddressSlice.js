import API from "@helper/apiHelper";

import { getSession } from "next-auth/react";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  dataAddress: [],
  error: "",
};

export const getDataAddressUser = createAsyncThunk(
  "getDataAddressUser",
  async (thunkAPI) => {
    try {
      const data = await getSession();
      const { id: userId } = data.user;

      const { data: response } = await API.get(`v1/users/${userId}/addresses`);

      return response.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response.data.message);
    }
  }
);

const dataAddressUserSlice = createSlice({
  name: "dataAddressUser",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDataAddressUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataAddressUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataAddress = action.payload;
      })
      .addCase(getDataAddressUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.dataAddress = [];
      });
  },
});

export default dataAddressUserSlice.reducer;
