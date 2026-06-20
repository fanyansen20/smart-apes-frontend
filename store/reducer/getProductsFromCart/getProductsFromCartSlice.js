import API from "@helper/apiHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_FETCH_STATUS } from "constant/api";

const initialState = {
  data: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getProductsFromCart = createAsyncThunk(
  "product/getProductsFromCart",
  async ({ axiosConfig }, { rejectWithValue }) => {
    try {
      const response = await API.get(`v1/carts`, axiosConfig);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getProductsFromCartSlice = createSlice({
  name: "getProductsFromCart",
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
      .addCase(getProductsFromCart.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
      })
      .addCase(getProductsFromCart.fulfilled, (state, action) => {
        state.status = API_FETCH_STATUS.IS_SUCCESS;
        state.data = action.payload?.data;

        state.error = null;
      })
      .addCase(getProductsFromCart.rejected, (state, action) => {
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus } = getProductsFromCartSlice.actions;

export default getProductsFromCartSlice.reducer;
