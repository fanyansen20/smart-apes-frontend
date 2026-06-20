/**
 * @param {() => void} push
 * @param {string} slugCategory
 * @param {string} searchInput
 */
export const handleProductCategorySearch = (
  push,
  slugCategory,
  searchInput
) => {
  push({
    pathname: `/category/${slugCategory}`,
    query: { search: encodeURIComponent(searchInput) },
  });
};

/**
 * @param {() => void} push
 * @param {string} slugCategory
 * @param {string} searchInput
 */
export const handleShopSearch = (push, slugCategory, searchInput) => {
  push({
    pathname: `/${slugCategory}`,
    query: { search: encodeURIComponent(searchInput) },
  });
};

/**
 * @param {() => void} push
 * @param {string} searchInput
 * @param {string} otherValue
 */
export const handleGeneralSearch = (push, searchInput, otherValue = "") => {
  push(`/search?query=${encodeURIComponent(searchInput)}${otherValue}`);
};

/**
 *
 * @param {{
 * e : import("react-dom/test-utils").SyntheticEventData
 * searchInput : string
 * push : () => void
 * isGeneralSearch : boolean
 * typeSearch : "shop" | ""
 * }} props
 * @returns
 */
export const handleSearchNavigation = ({
  e,
  searchInput,
  push,
  isGeneralSearch,
  slugCategory,
  typeSearch,
}) => {
  if (searchInput !== "" && (e.key === "Enter" || e.type === "click")) {
    if (isGeneralSearch) {
      return handleGeneralSearch(push, searchInput);
    }

    if (typeSearch === "shop") {
      return handleShopSearch(push, slugCategory, searchInput);
    }

    return handleProductCategorySearch(push, slugCategory, searchInput);
  }
};
