import { createSlice } from "@reduxjs/toolkit";

// Search state
const initialState = {
  search: "",
  page: 1,
  isLoadingSearch: false,
  hasMorePage: false,
  isReset: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setIsLoadingSearch: (state, action) => {
      state.isLoadingSearch = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    addPage: (state) => {
      state.page++;
    },
    setHasMorePage: (state, action) => {
      state.hasMorePage = action.payload;
    },
    setIsReset: (state, action) => {
      state.isReset = action.payload;
    },
  },
});

export const {
  setSearch,
  setIsLoadingSearch,
  setPage,
  addPage,
  setHasMorePage,
  setIsReset,
} = searchSlice.actions;

export default searchSlice.reducer;
