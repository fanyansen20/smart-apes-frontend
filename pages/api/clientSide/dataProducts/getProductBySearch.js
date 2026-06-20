// !this function will be deprecate if function not use again

import API from "@helper/apiHelper";

export default async function getProductsBySearch({
  idCategoryTree,
  queryStringSearch,
  searchType = "products",
  page,
  idSpecifications,
  queryString,
  queryRatings,
  queryPriceString,
  shop_id,
  sortBy,
}) {
  const newIdCategoryTree = idCategoryTree
    ? `&category_tree=${idCategoryTree}`
    : "";
  const newShopId = shop_id ? `&shop_id=${shop_id}` : "";
  const newQueryStringSearch =
    queryStringSearch && `&query_string=${queryStringSearch}`;
  const specValues =
    idSpecifications && idSpecifications.length != 0
      ? `&spec_values=${idSpecifications}`
      : "";
  const newQueryString =
    queryString && queryString.length != 0 ? queryString : "";

  const newSortBy = (sortBy) => {
    if (searchType === "products") {
      if (sortBy === "product.stats.total_sales:desc") {
        return "&sort_by=stats.total_sales:desc";
      }

      if (sortBy === "product.price:desc") {
        return "&sort_by=price:desc";
      }

      if (sortBy === "product.price:asc") {
        return "&sort_by=price:asc";
      }
    }

    return "";
  };

  const ratings =
    queryRatings && queryRatings.length != 0 ? `&${queryRatings}` : "";
  const newQueryPrice =
    queryPriceString && queryPriceString != 0 ? `&${queryPriceString}` : "";

  try {
    const { data: results } = await API.get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }v1/search/${searchType}?limit=20${newIdCategoryTree}${newShopId}${newQueryStringSearch}${specValues}${newQueryString}${ratings}${newQueryPrice}${newSortBy(
        sortBy
      )}&page=${page}`
    );

    return results;
  } catch (err) {
    return err?.response?.data;
  }
}
