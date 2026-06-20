import API from "@helper/apiHelper";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCheckout: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed
  error: null,
};

export const getCheckoutById = createAsyncThunk(
  "checkout/postCheckoutProfilingTest",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await API.get(`v1/checkouts/${checkoutId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getCheckoutByIdSlice = createSlice({
  name: "getCheckoutById",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCheckoutById.pending, (state) => {
        state.dataCheckout = {};
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCheckoutById.fulfilled, (state, action) => {
        state.dataCheckout = action.payload.data;
        state.status = "succeeded";
      })
      .addCase(getCheckoutById.rejected, (state, action) => {
        state.dataCheckout = action.payload.data;
        state.status = "failed";
      });
  },
});

export default getCheckoutByIdSlice.reducer;
