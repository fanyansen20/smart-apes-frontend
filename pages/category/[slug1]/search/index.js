// React
import View from "view";

// API Services
import getCategoriesPretty from "pages/api/dataCategory/getCategoriesPretty";
import { getProductCategoryBySlug } from "services/productsCategory/getProductCategoryBySlug";

const SearchPage = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="cat-one-search" />;
};

export default SearchPage;

export async function getServerSideProps({
  params: pathParams,
  query: queryParams,
}) {
  const { slug1 } = pathParams;
  const categorySlug = await getProductCategoryBySlug({ categorySlug: slug1 });
  const dataCategoryPretty = await getCategoriesPretty();

  if (!queryParams?.keyword) {
    return {
      redirect: {
        destination: `/category/${slug1}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      allCategories: dataCategoryPretty,
      categorySlugId: categorySlug?.id,
    },
  };
}
