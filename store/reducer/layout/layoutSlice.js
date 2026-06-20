import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  isNavbar: true,
  isFooter: true,
  isHiddenSearchBar: false,
  titleName: "",
  slugCategory: "",
  isGeneral: false,
  typeSearch: "product",
  websiteTitle: "",
  contentDescription: "",
  contentImage: "",
};

export const layoutSlice = createSlice({
  name: "LayoutSlice",
  initialState,
  reducers: {
    isLayout: (state, action) => {
      const {
        isNavbar,
        isFooter,
        isHiddenSearchBar,
        titleName,
        slugCategory,
        isGeneral,
        typeSearch,
        websiteTitle,
        contentDescription,
        contentImage,
      } = action.payload;

      state.isNavbar = isNavbar ?? true;
      state.isFooter = isFooter ?? true;
      state.isHiddenSearchBar = isHiddenSearchBar ?? false;
      state.titleName = titleName ?? "";
      state.slugCategory = slugCategory ?? "";
      state.isGeneral = isGeneral ?? false;
      state.typeSearch = typeSearch ?? "product";
      state.websiteTitle = websiteTitle ?? "";
      state.contentDescription = contentDescription ?? "";
      state.contentImage = contentImage ?? "";
    },
    changeTheme: (state) => {
      const optionsTheme = ["dark", "light"];
      const selectedTheme = optionsTheme.find(
        (option) => option !== state.theme
      );

      state.theme = selectedTheme;
    },
  },
});

export const { isLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
