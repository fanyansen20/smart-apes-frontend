// redux
import API from "@helper/apiHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API

// state
const initialState = {
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed
  wishListProduct: [],
  page: 1,
  totalPages: 0,
  error: "",
};

export const getWishlistData = createAsyncThunk(
  "wishlist/getDataWishlist",
  async ({ sortBy = "product.stats.total_sales:desc", page = 1 }, thunkApi) => {
    try {
      const { data: dataWishlist } = await API.get(
        `v1/wishlists/products?sort_by=${sortBy}&page=${page}&limit=20`
      );

      return dataWishlist;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlistStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistData.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getWishlistData.fulfilled, (state, action) => {
        const { results, totalPages, page } = action.payload;

        state.status = "succeeded";
        state.wishListProduct = results;
        state.page = page;
        state.totalPages = totalPages;
      })
      .addCase(getWishlistData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
