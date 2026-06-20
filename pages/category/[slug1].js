import View from "view";

// API
import getCategoriesSpecifications from "pages/api/dataCategory/getCategoriesSpecifications";

const CatalogLevelOne = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="categoryOne" />;
};

export default CatalogLevelOne;

export async function getServerSideProps({ params, query }) {
  const categorySlugLevelOne = params.slug1;
  const { search } = query;

  let querySearch = null;
  if (search) {
    querySearch = search;
  }

  const getPrettyCategories = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/categories?pretty=true`
  );

  const dataCategories = await getPrettyCategories.json();

  const categoryLevel1 = dataCategories.filter(
    (category) => category.slug === categorySlugLevelOne
  );

  const idCategoryLevelOne = categoryLevel1[0].id;
  const categoryLevelTwo = categoryLevel1;

  const dataSpecificationFilters = await getCategoriesSpecifications(
    idCategoryLevelOne
  );

  const getDataProductSales = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/products/top/${idCategoryLevelOne}/sales`
  );

  const { results: dataTopProductsSales } = await getDataProductSales.json();

  const getDataProductPromotions = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/products/top/${idCategoryLevelOne}/promotions`
  );

  const { results: dataProductsPromotion } =
    await getDataProductPromotions.json();

  const getDataProductsRecommendations = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/products/top/${idCategoryLevelOne}/recommendations`
  );

  const { results: dataProductsRecommendations } =
    await getDataProductsRecommendations.json();

  return {
    props: {
      idCategoryLevelOne,
      categoryLevelTwo,
      categorySlugLevelOne,
      dataTopProductsSales,
      dataProductsPromotion,
      dataProductsRecommendations,
      dataCategories,
      dataSpecificationFilters,
      querySearch,
    },
  };
}
