export const getProductCategoryBySlug = async ({ categorySlug }) => {
  const getCategories = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/categories?pretty=true`
  );
  const dataCategories = await getCategories.json();

  return dataCategories?.find((category) => category?.slug === categorySlug);
};
