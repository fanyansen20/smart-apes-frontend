// React
import { useState } from "react";

const useSelectProduct = (productsCart) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedProducts([]);
    } else {
      setSelectAll(true);

      const newSelectedProduct = [];
      productsCart.forEach((productCart) => {
        const isProductStockAvailable = productCart?.product?.stock;
        const isBundleStockAvailable =
          productCart?.bundle?.current_quota &&
          productCart?.bundle?.items?.every((item) => item?.stock > 0);

        if (isProductStockAvailable || isBundleStockAvailable)
          newSelectedProduct.push(productCart.id);
      });

      setSelectedProducts(newSelectedProduct);
    }
  };

  const handleSelect = (cartId) => {
    if (selectedProducts.includes(cartId)) {
      const newSelectedProduct = selectedProducts.filter((product) => {
        return product !== cartId;
      });
      setSelectedProducts(newSelectedProduct);
    } else {
      setSelectedProducts([...selectedProducts, cartId]);
    }
  };

  const checkIsSelected = (id) => {
    return selectedProducts.includes(id);
  };

  const isCheckedAll = productsCart?.length === selectedProducts?.length;

  return {
    selectedProducts,
    setSelectedProducts,
    handleSelect,
    handleSelectAll,
    checkIsSelected,
    isCheckedAll,
  };
};

export default useSelectProduct;
