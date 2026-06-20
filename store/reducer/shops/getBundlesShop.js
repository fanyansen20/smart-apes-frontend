// helper
import API from "@helper/apiHelper";

// axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBundle: false,
  isLoading: false,
  error: "",
  dataBundles: [],
};

export const getBundlesShop = createAsyncThunk(
  "getBundlesShop",
  async ({ shopId }) => {
    try {
      const { data: results } = await API.get(
        `v1/bundles/active/shops/${shopId}`
      );

      return results;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);

const dataBundlesShopSlice = createSlice({
  name: "dataBundleShop",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBundlesShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBundlesShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataBundles = action.payload.results;
        state.isBundle = action.payload.totalResults !== 0;
      })
      .addCase(getBundlesShop.rejected, (state, action) => {
        state.error = action.payload;
        state.dataBundles = [];
      });
  },
});

export default dataBundlesShopSlice.reducer;
