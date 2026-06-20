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

export const getDeliveryServicesByShopId = createAsyncThunk(
  "product/getDeliveryServicesByShopId",
  async ({ checkoutId, checkoutShopId }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `v1/checkouts/${checkoutId}/shop/${checkoutShopId}/delivery-service/rates`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getDeliveryServicesByShopIdSlice = createSlice({
  name: "getDeliveryServicesByShopId",
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
      .addCase(getDeliveryServicesByShopId.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeliveryServicesByShopId.fulfilled, (state, action) => {
        state.loading = false;
        state.status = API_FETCH_STATUS.IS_SUCCESS;
        const { shop_fleet, third_party_deliveries } = action.payload;

        const deliveryServices =
          third_party_deliveries?.map((delivery) => {
            return {
              name: delivery.name,
              services: delivery.services.filter(
                (service) => service.plans.length !== 0
              ),
            };
          }) || [];

        if (shop_fleet?.is_enabled) {
          deliveryServices.push(shop_fleet);
        }

        state.data = deliveryServices;
        state.error = null;
      })
      .addCase(getDeliveryServicesByShopId.rejected, (state, action) => {
        state.loading = false;
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.statusCode = action?.payload?.response?.status;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus } = getDeliveryServicesByShopIdSlice.actions;

export default getDeliveryServicesByShopIdSlice.reducer;
