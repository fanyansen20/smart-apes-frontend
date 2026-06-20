import React from "react";

const ShopRatingsProduct = () => {
  return <div>ShopRatingsProduct</div>;
};

export default ShopRatingsProduct;

export function getServerSideProps() {
  return {
    notFound: true,
  };
}
