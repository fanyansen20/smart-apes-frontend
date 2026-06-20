// React
import View from "view";

const SearchPage = ({ device, ...otherProps }) => {
  return <View {...otherProps} device={device} path="search-product" />;
};

export default SearchPage;

export async function getServerSideProps({ query }) {
  const { query: querySearch } = query;

  return {
    props: {
      querySearch,
    },
  };
}
