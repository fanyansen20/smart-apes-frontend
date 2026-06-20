// Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helper
import API from "@helper/apiHelper";
import { API_FETCH_STATUS } from "constant/api";

// con

const initialState = {
  errorResponse: {},
  isError: false,
  isLoading: true,
  statusCode: "",
  status: API_FETCH_STATUS.IS_IDLE,

  resultShop: [],
  totalPages: null,
  totalResults: null,
  page: null,

  // delete this object if implement in search page desktop
  resultShopData: {},
};

export const getSearchShopData = createAsyncThunk(
  "dataSearchShop/getSearchShopData",
  async (
    { queryStringSearch, queryParams = "", page = 1, limit = 12 },
    thunkApi
  ) => {
    try {
      const { data: resultDataSearch } = await API.get(
        `v1/search/shops?limit=${limit}&page=${page}&query_string=${queryStringSearch}${queryParams}`
      );

      return resultDataSearch;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const resultSearchShopsDataSlice = createSlice({
  name: "resultsStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSearchShopData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = {};
        state.statusCode = "";
        state.status = API_FETCH_STATUS.IS_LOADING;
      })
      .addCase(getSearchShopData.fulfilled, (state, action) => {
        const response = action.payload.data;

        state.resultShop = response?.shops?.results;
        state.totalPages = response?.shops?.total_pages;
        state.totalResults = response?.shops?.total_results;
        state.page = response?.shops?.page;

        state.resultShopData = action.payload.data;
        state.statusCode = action.payload.code;
        state.isLoading = false;
        state.isError = false;

        state.status = API_FETCH_STATUS.IS_SUCCESS;
      })
      .addCase(getSearchShopData.rejected, (state, action) => {
        state.resultShop = [];
        state.totalPages = null;
        state.totalResults = null;
        state.page = null;

        state.status = API_FETCH_STATUS.IS_FAILED;
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action?.payload?.data?.message;
        state.resultShopData = {};
        state.statusCode = action?.payload?.code;
      });
  },
});

export default resultSearchShopsDataSlice.reducer;
