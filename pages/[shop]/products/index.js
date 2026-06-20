import View from "view";

const ProductsShop = ({ device, querySearch }) => {
  return (
    <View device={device} path="products-shop" querySearch={querySearch} />
  );
};

export default ProductsShop;

export function getServerSideProps({ query }) {
  const querySearch = query.search ?? false;

  return {
    props: {
      querySearch,
    },
  };
}
