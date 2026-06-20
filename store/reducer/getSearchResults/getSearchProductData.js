// Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helper
import API from "@helper/apiHelper";
import { API_FETCH_STATUS } from "constant/api";

const initialState = {
  errorResponse: {},
  isError: false,
  isLoading: true,
  statusCode: "",
  status: API_FETCH_STATUS.IS_IDLE,

  specifications: [],
  categories: [],
  resultProducts: [],
  totalPages: null,
  totalResults: null,
  page: null,

  // delete this object if implement in search page desktop
  resultProductData: {},
};

export const getSearchProductData = createAsyncThunk(
  "dataSearchProduct/getSearchProductData",
  async (
    {
      queryStringSearch,
      sortBy = "stats.total_sales:desc",
      limit = 20,
      queryParams = "",
      spec_values = "",
      page = 1,
      priceParams = "",
      ratingParam = "",
    },
    thunkApi
  ) => {
    try {
      const { data: resultDataSearch } = await API.get(
        `v1/search/products?limit=${limit}&sort_by=${sortBy}&page=${page}&query_string=${queryStringSearch}${queryParams}${spec_values}${priceParams}${ratingParam}`
      );

      return resultDataSearch;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const resultSearchProductDataSlice = createSlice({
  name: "resultsStore",
  initialState,
  reducers: {
    updateStateProduct: (state, action) => {
      state.status = API_FETCH_STATUS.IS_SUCCESS;
      state.resultProductData = action.payload.dataProducts;
      state.specifications = action.payload.specifications;
      state.categories = action.payload.categories;
      state.page = action.payload.page;
      state.totalResults = action.payload.totalResults;
      state.totalPages = action.payload.totalPages;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchProductData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = {};
        state.statusCode = "";
        state.status = API_FETCH_STATUS.IS_LOADING;
      })
      .addCase(getSearchProductData.fulfilled, (state, action) => {
        const response = action.payload.data;

        state.resultProducts = response?.products?.results;
        state.categories = response?.categories;
        state.specifications = response?.specifications;
        state.totalPages = response?.products?.total_pages;
        state.totalResults = response?.products?.total_results;
        state.page = response?.products?.page;

        state.resultProductData = action.payload.data;
        state.statusCode = action.payload.code;
        state.isLoading = false;
        state.isError = false;
        state.status = API_FETCH_STATUS.IS_SUCCESS;
      })
      .addCase(getSearchProductData.rejected, (state, action) => {
        state.resultProducts = [];
        state.categories = [];
        state.totalPages = null;
        state.totalResults = null;
        state.page = null;

        state.status = API_FETCH_STATUS.IS_FAILED;
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action?.payload?.data?.message;
        state.resultProductData = {};
        state.statusCode = action?.payload?.code;
      });
  },
});

export const { updateStateProduct } = resultSearchProductDataSlice.actions;

export default resultSearchProductDataSlice.reducer;
