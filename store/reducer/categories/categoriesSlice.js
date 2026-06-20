import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helper
import { get } from "helper/network";

// Auth state
const initialState = {
  isLoading: false,
  dataCategories: "",
  error: "",
};

export const getCategoriesData = createAsyncThunk(
  "categories/getCategoriesData",
  async (thunkAPI) => {
    try {
      const response = await get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/categories?pretty=true&&order_level=1`
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categoriesStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesData.pending, (state) => {
        state.isLoading = true;
        state.isData = false;
        state.error = "";
      })
      .addCase(getCategoriesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isData = true;
        state.dataCategories = action.payload;
      })
      .addCase(getCategoriesData.rejected, (state, action) => {
        state.isLoading = false;
        state.isData = true;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
