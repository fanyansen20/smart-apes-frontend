import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: false,
  isLoading: true,
  idProductWishlist: "",
};

export const getWishlistByIdProduct = createAsyncThunk(
  "wishlist/getWishlistByIdProduct",
  async ({ auth = "", idProduct = "" }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/wishlists/products/${idProduct}`,
        {
          headers: { Authorization: `Bearer ${auth}` },
        }
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const wishlistByIdProduct = createSlice({
  name: "wishlistByIdProduct",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistByIdProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishlistByIdProduct.fulfilled, (state, action) => {
        const idProduct = action.meta.arg.idProduct;

        state.isLoading = false;
        state.code = action.payload.status;
        state.idProductWishlist = idProduct;
      })
      .addCase(getWishlistByIdProduct.rejected, (state) => {
        state.code = false;
        state.idProductWishlist = "";
        state.isLoading = false;
      });
  },
});

export default wishlistByIdProduct.reducer;
