import API from "@helper/apiHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_FETCH_STATUS } from "constant/api";

const initialState = {
  data: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  statusCode: null,
  error: null,
  currentOrderId: null,
  total_results: 25,
};

export const checkoutBundle = createAsyncThunk(
  "product/checkoutBundle",
  async (payloadData, { rejectWithValue }) => {
    try {
      const response = await API.post(`v1/checkouts/bundle`, payloadData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const checkoutBundleSlice = createSlice({
  name: "checkoutBundle",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = {};
      state.status = API_FETCH_STATUS.IS_IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutBundle.pending, (state, action) => {
        state.currentOrderId = action.meta.arg?.order_id;
        state.status = API_FETCH_STATUS.IS_LOADING;
      })
      .addCase(checkoutBundle.fulfilled, (state, action) => {
        state.status = API_FETCH_STATUS.IS_SUCCESS;
        state.data = action.payload;

        state.error = null;
      })
      .addCase(checkoutBundle.rejected, (state, action) => {
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.statusCode = action?.payload?.response?.status;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus } = checkoutBundleSlice.actions;

export default checkoutBundleSlice.reducer;
