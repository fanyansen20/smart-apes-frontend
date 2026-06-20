import { useState } from "react";

const useGetBestSellerProduct = ({ getTopProduct }) => {
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getDataProduct = async (idCategory, limit) => {
    setIsLoading(true);

    const resultProduct = await getTopProduct(idCategory, limit);

    setDataProduct(resultProduct);

    setIsLoading(false);
  };

  return { dataProduct, isLoading, getDataProduct };
};

export default useGetBestSellerProduct;
