import API from "@helper/apiHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_FETCH_STATUS } from "constant/api";

const initialState = {
  data: [],
  status: API_FETCH_STATUS.IS_IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  loading: false,
  statusCode: null,
  error: null,
};

export const saveSelectedDeliveryServiceByShop = createAsyncThunk(
  "product/saveSelectedDeliveryServiceByShop",
  async (
    { checkoutId, checkoutShopId, deliveryServicePayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await API.patch(
        `v1/checkouts/${checkoutId}/shop/${checkoutShopId}/delivery-service`,
        deliveryServicePayload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const saveSelectedDeliveryServiceByShopSlice = createSlice({
  name: "saveSelectedDeliveryServiceByShop",
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
      .addCase(saveSelectedDeliveryServiceByShop.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
        state.loading = true;
        state.error = null;
      })
      .addCase(saveSelectedDeliveryServiceByShop.fulfilled, (state, action) => {
        state.loading = false;
        state.status = API_FETCH_STATUS.IS_SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(saveSelectedDeliveryServiceByShop.rejected, (state, action) => {
        state.loading = false;
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.statusCode = action?.payload?.response?.status;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus } = saveSelectedDeliveryServiceByShopSlice.actions;

export default saveSelectedDeliveryServiceByShopSlice.reducer;
