import API from "@helper/apiHelper";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  dataAllProduct: [],
  page: 1,
  totalPages: 0,
  totalResults: 0,
  error: "",
};

export const getAllProductsShop = createAsyncThunk(
  "getShopProducts",
  async ({
    shopId,
    page = 1,
    sortBy = "stats.total_sales:desc",
    limit = 10,
    categoryTree = "",
    queryParams = "",
  }) => {
    if (categoryTree) {
      categoryTree = `&category_tree=${categoryTree}`;
    }

    try {
      const { data: shopProducts } = await API.get(
        `v1/shops/${shopId}/products?status=ACTIVE&sort_by=${sortBy}${categoryTree}&page=${page}&limit=${limit}${queryParams}`
      );

      return shopProducts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const dataAllProductsShopSlice = createSlice({
  name: "dataShopProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataAllProduct = action.payload.results;
        state.totalPages = action.payload.total_pages;
        state.totalResults = action.payload.total_results;
        state.page = action.payload.page;
      })
      .addCase(getAllProductsShop.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default dataAllProductsShopSlice.reducer;
