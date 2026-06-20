// Next
import Image from "next/image";
import { useState, useEffect } from "react";
import { get } from "../../../../../../helper/network";

// Styles
import classes from "./ShopProductMobile.module.scss";

// Assets
import FilterIcon from "@public/assets/icons/filter.svg";

// Components
import CardMobile from "view/mobile/components/card";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";

const ShopProductMobile = ({ shopId, bannerImg, querySearch }) => {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [page, setPage] = useState(1);

  const getProducts = async () => {
    try {
      setIsLoadingProducts(true);

      const resProducts = await get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/shops/${shopId}/products?page=${page}&status=ACTIVE&limit=12`
      );

      if (resProducts.ok) {
        setProducts(resProducts?.data?.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className={classes.container}>
      <div>
        <SecondaryButton
          text="Filter"
          startIcon={
            <Image src={FilterIcon} width="12px" height="12px" alt="filter" />
          }
        />
        <div className={classes.containerCard}>
          {products?.map((product, index) => (
            <CardMobile dataProduct={product} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopProductMobile;
