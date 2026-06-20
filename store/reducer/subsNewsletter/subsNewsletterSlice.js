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

export const subsNewsletter = createAsyncThunk(
  "subsNewsletter/execute",
  async ({ captchaToken, payload }, { rejectWithValue }) => {
    try {
      const response = await API.post("v1/newsletter/subscribe", payload, {
        headers: {
          "captcha-token": captchaToken,
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "subsNewsletter",
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
      .addCase(subsNewsletter.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
        state.loading = true;
      })
      .addCase(subsNewsletter.fulfilled, (state, action) => {
        state.status = API_FETCH_STATUS.IS_SUCCESS;
        // Add any fetched data to the array
        const results = action.payload;

        state.data = results;
        state.loading = false;
      })
      .addCase(subsNewsletter.rejected, (state, action) => {
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.loading = false;
      });
  },
});

export const { resetStatus } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
