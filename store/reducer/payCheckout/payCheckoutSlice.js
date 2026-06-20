// Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Helpers
import API from "@helper/apiHelper";

// Constants
import { API_FETCH_STATUS } from "constant/api";

// Auth state
const initialState = {
  data: null,
  status: API_FETCH_STATUS.IS_IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  loading: false,
  error: null,
};

export const payCheckout = createAsyncThunk(
  "checkout/pay",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await API.post("v1/checkouts/confirm", payload);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const payCheckoutSlice = createSlice({
  name: "payCheckout",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = {};
      state.status = API_FETCH_STATUS.IS_IDLE;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(payCheckout.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
        state.loading = true;
      })
      .addCase(payCheckout.fulfilled, (state, action) => {
        state.status = API_FETCH_STATUS.IS_SUCCESS;
        // Add any fetched data to the array
        const results = action.payload;

        state.data = results;
        state.loading = false;
      })
      .addCase(payCheckout.rejected, (state, action) => {
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.loading = false;
      });
  },
});

export default payCheckoutSlice.reducer;
