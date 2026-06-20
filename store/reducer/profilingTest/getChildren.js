import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "@helper/apiHelper";

const initialState = {
  dataChildren: [],
  totalResult: 0,
  status: "idle",
  error: null,
};

export const getChildren = createAsyncThunk(
  "profilingTestProduct/getChildren",

  /**
   *
   * @param {{
   * showPendingBasicTest : boolean
   * limit : number
   * }} param0
   * @returns
   */
  async ({ limit = "5", showPendingBasicTest } = {}, { rejectWithValue }) => {
    const params = new URLSearchParams();
    params.append("limit", limit);
    if (showPendingBasicTest)
      params.append("show_pending_basic_profiling_test", showPendingBasicTest);

    try {
      const response = await API.get(`v1/children?${params.toString()}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const getChildrenSlice = createSlice({
  name: "childrenStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChildren.pending, (state) => {
        state.dataChildren = [];
        state.status = "loading";
        state.error = null;
      })
      .addCase(getChildren.fulfilled, (state, action) => {
        const { results, total_results } = action.payload;

        const dataChild = results.map((value) => {
          return {
            profileImage: value.profile_pic || profile_pic_500,
            childrenName: value.full_name,
            educationType: value.school_education_category,
            childId: value.id,
            ...value,
          };
        });

        state.dataChildren = dataChild;
        state.totalResult = total_results;
        state.status = "succeeded";
      })
      .addCase(getChildren.rejected, (state, action) => {
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.status = "failed";
      });
  },
});

export default getChildrenSlice.reducer;
