import View from "view";

// SSR
import getCategoriesPretty from "pages/api/dataCategory/getCategoriesPretty";
import getCategoriesPrettyBySlug from "pages/api/dataCategory/getCategoriesPrettyBySlug";
import getCategoriesSpecifications from "pages/api/dataCategory/getCategoriesSpecifications";
import getCategoryBySlug from "pages/api/dataCategory/getCategoryBySlug";
import getProductsBySlug from "pages/api/dataProducts/getProductsBySlug";

const CatalogLevelThree = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="categoryThree" />;
};

export default CatalogLevelThree;

export async function getServerSideProps({ params, query }) {
  const slugCategoryOne = params.slug1;
  const slugCategoryTwo = params.slug2;
  const slugCategoryThree = params.slug3;

  const querySearch = query?.search ?? false;

  const dataCategoryPretty = await getCategoriesPretty();

  const dataCategoryLevelOne = await getCategoriesPrettyBySlug(slugCategoryOne);

  const {
    slug: slugLevelOne,
    display_string: nameCategoryOne,
    children: subCategoryLevel,
  } = await dataCategoryLevelOne[0];

  const categoryLevelTwo = await subCategoryLevel.filter(
    (categories) => categories.slug === slugCategoryTwo
  );

  const { slug: slugLevelTwo, display_string: nameCategoryTwo } =
    await categoryLevelTwo[0];

  const { results: dataCategory } = await getCategoryBySlug(slugCategoryThree);

  const { id: idCategoryLevelThree, display_string: categoryNameLevelThree } =
    await dataCategory[0];

  const {
    results: dataProducts,
    total_results,
    total_pages,
  } = await getProductsBySlug(idCategoryLevelThree);

  const dataSpecificationFilters = await getCategoriesSpecifications(
    idCategoryLevelThree
  );

  return {
    props: {
      categoryNameLevelThree,
      dataSpecificationFilters,
      allCategories: dataCategoryPretty,
      dataCategoryLevelOne,
      slugLevelOne,
      nameCategoryOne,
      slugLevelTwo,
      nameCategoryTwo,
      idCategoryLevelThree,
      slugCategoryThree,
      dataProducts,
      total_results,
      total_pages,
      querySearch,
    },
  };
}
