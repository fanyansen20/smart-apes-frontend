import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "@helper/apiHelper";

const initialState = {
  dataSchoolLevel: [],
  status: "idle",
  error: null,
};

export const getSchoolLevel = createAsyncThunk(
  "profilingTestProduct/getSchoolLevel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `v1/school-education-categories?pretty=true`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const getSchoolLevelSlice = createSlice({
  name: "childrenStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolLevel.pending, (state) => {
        state.dataSchoolLevel = [];
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSchoolLevel.fulfilled, (state, action) => {
        const newDataSchoolLevel = action.payload.reduce((acc, curr) => {
          acc.push(
            ...curr.children.map((child) => {
              return { ...child, label: child.name };
            })
          );
          return acc;
        }, []);

        state.dataSchoolLevel = newDataSchoolLevel;
        state.status = "succeeded";
      })
      .addCase(getSchoolLevel.rejected, (state, action) => {
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.status = "failed";
      });
  },
});

export default getSchoolLevelSlice.reducer;
