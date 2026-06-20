// Redux Toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Helper
import API from "@helper/apiHelper";

// Constants
import { API_FETCH_STATUS } from "constant/api";

/**
 * @type {{
 *  data: MembershipActivitiesResData[]
 *  status: keyof typeof API_FETCH_STATUS
 *  error: ?string
 *  totalPages: number
 * }}
 */

const initialState = {
  data: [],
  status: API_FETCH_STATUS.IS_IDLE, //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  totalPages: 0,
};

export const getMembershipActivities = createAsyncThunk(
  "product/getMembershipActivities",
  /**
   * @param {{
   *  query: ?MembershipActivitiesQuery
   *  params: MembershipActivitiesParam
   * }} requestOptions
   *
   */
  async (requestOptions, { rejectWithValue }) => {
    const { query, params } = requestOptions;
    const { userId } = params;

    try {
      const response = await API.get(
        `/v1/users/${userId}/membership/activities?${new URLSearchParams(
          query
        )}`
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getMembershipActivitiesSlice = createSlice({
  name: "membershipActivities",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembershipActivities.pending, (state, action) => {
        state.currentOrderId = action.meta.arg?.order_id;
        state.status = API_FETCH_STATUS.IS_LOADING;
      })
      .addCase(getMembershipActivities.fulfilled, (state, action) => {
        const { results, total_pages } = action.payload;

        state.status = API_FETCH_STATUS.IS_SUCCESS;
        state.data = results;
        state.totalPages = total_pages;

        state.error = null;
      })
      .addCase(getMembershipActivities.rejected, (state, action) => {
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus } = getMembershipActivitiesSlice.actions;

export default getMembershipActivitiesSlice.reducer;
