import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "@helper/apiHelper";

const initialState = {
  dataProduct: [],
  status: "idle",
  error: null,
};

export const getTestProduct = createAsyncThunk(
  "profilingTestProduct/getTestProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("v1/products/profiling-tests");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const getTestProductSlice = createSlice({
  name: "testProductStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTestProduct.pending, (state) => {
        state.dataProduct = [];
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTestProduct.fulfilled, (state, action) => {
        state.dataProduct = action.payload;
        state.status = "succeeded";
      })
      .addCase(getTestProduct.rejected, (state, action) => {
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.status = "failed";
      });
  },
});

export default getTestProductSlice.reducer;
