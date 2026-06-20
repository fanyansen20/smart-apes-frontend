import API from "@helper/apiHelper";
import { convertDataBundles } from "@helper/convertProductData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_FETCH_STATUS } from "constant/api";

const initialState = {
  rawData: {},
  finalData: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  total_results: 25,
};

export const getBundleListByProductId = createAsyncThunk(
  "product/getBundleListByProductId",
  async ({ product_id }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `v1/bundles/active/products/${product_id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getBundleListByProductIdSlice = createSlice({
  name: "productBundleList",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = [];
      state.status = API_FETCH_STATUS.IS_IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBundleListByProductId.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
      })
      .addCase(getBundleListByProductId.fulfilled, (state, action) => {
        state.status = API_FETCH_STATUS.IS_SUCCESS;
        state.rawData = action.payload;
        state.finalData = convertDataBundles(action.payload);

        state.error = null;
      })
      .addCase(getBundleListByProductId.rejected, (state, action) => {
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus } = getBundleListByProductIdSlice.actions;

export default getBundleListByProductIdSlice.reducer;
