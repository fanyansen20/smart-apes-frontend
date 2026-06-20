import API from "@helper/apiHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_FETCH_STATUS } from "constant/api";

// Auth state
const initialState = {
  data: null,
  status: API_FETCH_STATUS.IS_IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  loading: false,
  error: null,
};

export const checkTokenResetPassword = createAsyncThunk(
  "resetPassword/checkToken",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `v1/user-auth/reset-password-token/${token}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const checkTokenResetPasswordSlice = createSlice({
  name: "checkTokenResetPassword",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = {};
      state.status = API_FETCH_STATUS.IS_IDLE;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkTokenResetPassword.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
        state.loading = true;
      })
      .addCase(checkTokenResetPassword.fulfilled, (state, action) => {
        state.status = API_FETCH_STATUS.IS_SUCCESS;
        // Add any fetched data to the array
        const results = action.payload;

        state.data = results;
        state.loading = false;
      })
      .addCase(checkTokenResetPassword.rejected, (state, action) => {
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.loading = false;
      });
  },
});

export default checkTokenResetPasswordSlice.reducer;
