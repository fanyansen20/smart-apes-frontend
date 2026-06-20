import View from "view";

// SSR
import getCategoriesPretty from "pages/api/dataCategory/getCategoriesPretty";
import getCategoriesSpecifications from "pages/api/dataCategory/getCategoriesSpecifications";
import getCategoryBySlug from "pages/api/dataCategory/getCategoryBySlug";
import getProductsBySlug from "pages/api/dataProducts/getProductsBySlug";

const CatalogLevelTwo = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="categoryTwo" />;
};

export default CatalogLevelTwo;

export async function getServerSideProps({ params, query }) {
  const slugCategoryOne = params.slug1;
  const slugCategoryTwo = params.slug2;

  const querySearch = query?.search ?? false;

  const dataCategoryPretty = await getCategoriesPretty();

  const categoryLevelOne = dataCategoryPretty?.filter(
    (category) => category.slug === slugCategoryOne
  );

  const { slug: slugLevelOne, display_string: nameCategoryOne } =
    categoryLevelOne[0];

  const { results: dataCategory } = await getCategoryBySlug(slugCategoryTwo);

  const {
    id: idCategoryLevelTwo,
    display_string: categoryNameLevelTwo,
    slug: categoryLevelTwo,
  } = await dataCategory[0];

  const {
    results: dataProducts,
    total_results,
    total_pages,
  } = await getProductsBySlug(idCategoryLevelTwo);

  const dataSpecificationFilters = await getCategoriesSpecifications(
    idCategoryLevelTwo
  );

  return {
    props: {
      querySearch,
      categoryLevelOne,
      dataSpecificationFilters,
      allCategories: dataCategoryPretty,
      slugLevelOne,
      slugLevelTwo: slugCategoryTwo,
      nameCategoryOne,
      idCategoryLevelTwo,
      categoryNameLevelTwo,
      dataProducts,
      categoryLevelTwo,
      total_results,
      total_pages,
    },
  };
}
