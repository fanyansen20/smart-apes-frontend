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

export const resetPassword = createAsyncThunk(
  "resetPassword/execute",
  async ({ token, payload }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `v1/user-auth/reset-password?token=${token}`,
        payload
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
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
      .addCase(resetPassword.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = API_FETCH_STATUS.IS_SUCCESS;
        // Add any fetched data to the array
        const results = action.payload;

        state.data = results;
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.loading = false;
      });
  },
});

export default resetPasswordSlice.reducer;
