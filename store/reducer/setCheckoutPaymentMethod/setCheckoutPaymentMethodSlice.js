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

export const setCheckoutPaymentMethod = createAsyncThunk(
  "setCheckoutPaymentMethod/execute",
  async ({ payload, param: { checkoutId } }, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `v1/checkouts/${checkoutId}/payment-method`,
        payload
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const setCheckoutPaymentMethodSlice = createSlice({
  name: "setCheckoutPaymentMethod",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = null;
      state.status = API_FETCH_STATUS.IS_IDLE;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setCheckoutPaymentMethod.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
        state.loading = true;
      })
      .addCase(setCheckoutPaymentMethod.fulfilled, (state, action) => {
        state.status = API_FETCH_STATUS.IS_SUCCESS;
        // Add any fetched data to the array
        const results = action.payload;

        state.data = results;
        state.loading = false;
      })
      .addCase(setCheckoutPaymentMethod.rejected, (state, action) => {
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.loading = false;
      });
  },
});

export const { resetStatus } = setCheckoutPaymentMethodSlice.actions;

export default setCheckoutPaymentMethodSlice.reducer;
