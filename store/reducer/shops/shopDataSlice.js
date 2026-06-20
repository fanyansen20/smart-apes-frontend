// Axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Helper
import API from "@helper/apiHelper";
import moment from "moment";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isLoading: true,
  dataShop: {},
  error: "",
};

export const getDataShop = createAsyncThunk(
  "dataShop",
  async ({ shopSlug }) => {
    try {
      const { data: shopData } = await API.get(
        `v1/shops/slug/${shopSlug}/total-ratings`
      );
      return {
        ...shopData,
        memberSince: moment(shopData.shop_created_date).format("MMM YYYY"),
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const dataShopSlice = createSlice({
  name: "dataShop",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.dataShop = { ...action?.payload?.shopData?.dataShop };
      })
      .addCase(getDataShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataShop.fulfilled, (state, action) => {
        state.dataShop = action.payload;
        state.isLoading = false;
      })
      .addCase(getDataShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? true;
      });
  },
});

export default dataShopSlice.reducer;
