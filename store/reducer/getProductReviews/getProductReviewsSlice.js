import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentOrderId: null,
  total_results: 25,
};

export const getProductReviews = createAsyncThunk(
  "product/getProductReviews",
  async ({ product_id, queries_param }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }v1/products/${product_id}/reviews?${new URLSearchParams(
          queries_param
        )}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getProductReviewsSlice = createSlice({
  name: "productReviews",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state, action) => {
        state.currentOrderId = action.meta.arg?.order_id;
        state.status = "loading";
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        const { results, total_results } = action.payload;

        state.status = "succeeded";
        state.data = results;
        state.total_results = total_results;

        state.error = null;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus } = getProductReviewsSlice.actions;

export default getProductReviewsSlice.reducer;
