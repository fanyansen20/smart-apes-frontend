import { get } from "helper/network";

export default async function getProductsByFilters({
  idCategory,
  values,
  queryString,
  queryRatings,
  queryPrice,
  page,
  sortBy = "product.stats.total_sales:desc",
}) {
  const newSort = (sortBy) => {
    if (sortBy === "product.stats.total_sales:desc") {
      return "stats.total_sales:desc";
    }

    if (sortBy === "product.price:desc") {
      return "price:desc";
    }

    if (sortBy === "product.price:asc") {
      return "price:asc";
    }

    return sortBy;
  };

  const idCategoryTree =
    idCategory.length != 0 ? `&category_tree=${idCategory}` : "";
  const specValues = values.length != 0 ? `&spec_values=${values}` : "";
  const newQueryString = queryString.length != 0 ? queryString : "";
  const ratings = queryRatings.length != 0 ? `&${queryRatings}` : "";
  const newQueryPrice = queryPrice != 0 ? `&${queryPrice}` : "";

  try {
    const dataProductSpecificationsFilters = await get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }v1/products?limit=20&sort_by=${newSort(
        sortBy
      )}${idCategoryTree}${specValues}${newQueryString}${ratings}${newQueryPrice}&page=${page}`
    );
    if (dataProductSpecificationsFilters.ok) {
      return dataProductSpecificationsFilters;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
