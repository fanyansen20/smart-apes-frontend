import API from "@helper/apiHelper";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isLoading: true,
  dataProduct: {},
  error: "",
};

export const getShopProducts = createAsyncThunk(
  "getShopProducts",
  async ({ shopId }) => {
    try {
      const { data: shopProducts } = await API.get(
        `v1/shops/${shopId}/products?status=ACTIVE&sort_by=stats.total_sales:desc`
      );

      const { data: featuredProducts } = await API.get(
        `v1/shops/${shopId}/products/featured?status=ACTIVE`
      );

      const products = {
        allProducts: shopProducts,
        featuredProducts: featuredProducts,
      };
      return products;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const dataShopProductsSlice = createSlice({
  name: "dataShopProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.dataProduct = {
          ...state,
          ...action?.payload?.dataShopProducts?.dataProduct,
        };
      })
      .addCase(getShopProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataProduct = action.payload;
      })
      .addCase(getShopProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.dataProduct = [];
      });
  },
});

export default dataShopProductsSlice.reducer;
