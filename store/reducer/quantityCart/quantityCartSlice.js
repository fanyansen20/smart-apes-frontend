// redux
import API from "@helper/apiHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// constant
import { API_FETCH_STATUS } from "constant/api";

// Auth state
const initialState = {
  isLoading: false,
  isData: false,
  totalQuantity: 0,
  totalItem: 0,
  maxItem: 0,
  error: "",
  status: API_FETCH_STATUS.IS_IDLE,
};

export const getQuantityCartData = createAsyncThunk(
  "quantityCart/getQuantityCart",
  async (_, thunkApi) => {
    try {
      const response = await API.get("v1/carts/total-qty");

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const quantitySlice = createSlice({
  name: "quantityStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getQuantityCartData.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
        state.isLoading = true;
        state.isData = false;
        state.error = "";
      })
      .addCase(getQuantityCartData.fulfilled, (state, action) => {
        const { total_qty, total_item, max_item } = action.payload;
        state.isLoading = false;
        state.isData = true;
        state.totalQuantity = total_qty;
        state.totalItem = total_item;
        state.maxItem = max_item;
        state.status = API_FETCH_STATUS.IS_SUCCESS;
      })
      .addCase(getQuantityCartData.rejected, (state, action) => {
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.isLoading = false;
        state.isData = true;
        state.error = action.payload;
      });
  },
});

export default quantitySlice.reducer;
