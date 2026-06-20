import React, { useEffect } from "react";

// styles
import classes from "./_ProductContent.module.scss";

// hooks
import useIntersectionObserver from "@hooks/useIntersectionObserver";

// dispatch
import { useDispatch, useSelector } from "react-redux";
import { updateStateProduct } from "store/reducer/getSearchResults/getSearchProductData";
import {
  addPage,
  setHasMorePage,
  setPage,
} from "store/reducer/search/searchSlice";

// assets
import SearchNotFound from "@public/assets/images/SearchNotFound.svg";

// component
import IllustrationPage from "@components/shared/IllustrationPage";
import useGetProducts from "@hooks/useGetProducts";
import { useRouter } from "next/router";
import SkeletonCardMobile from "view/mobile/components/skeleton/SkeletonCardMobile";
import CardMobile from "../../../../components/card";

/**
 * @param {{
 * openCategory : boolean
 * }} props
 * @returns */
const ProductContent = ({ openCategory }) => {
  const { query } = useRouter();
  const dispatch = useDispatch();

  const {
    query: queryStringSearch,
    id_spec: specificationSelected,
    minprice: minPrice,
    maxprice: maxPrice,
    rating,
    offers: selectedOffers,
  } = query;

  const specificationsId =
    specificationSelected &&
    JSON.parse(decodeURIComponent(specificationSelected));

  const { page, isLoadingSearch, isReset, hasMorePage } = useSelector(
    (store) => store.search
  );

  const { intersectionRef } = useIntersectionObserver({
    isLoadingSearch,
    hasMorePage,
    callback: () => dispatch(addPage()),
  });

  const { dataProducts, getProducts, isLoadingProducts, isFirstLoad } =
    useGetProducts();

  useEffect(() => {
    dispatch(setPage(1));
  }, []);

  useEffect(() => {
    if (!openCategory) handleGetProducts();
  }, [
    isLoadingSearch,
    openCategory,
    queryStringSearch,
    specificationSelected,
    minPrice,
    maxPrice,
    rating,
    page,
  ]);

  const handleGetProducts = async () => {
    const isDiscount = selectedOffers?.includes("discount");
    const limit = 12;

    const resProducts = await getProducts({
      search: queryStringSearch,
      specificationsId,
      minPrice,
      maxPrice,
      rating,
      isDiscount,
      limit,
      page,
      isReset,
    });

    dispatch(setPage(resProducts?.lastPage));
    dispatch(setHasMorePage(resProducts?.lastPage < resProducts?.totalPages));
    dispatch(
      updateStateProduct({
        dataProducts,
        totalResults: resProducts?.totalResults,
        specifications: resProducts?.specifications,
        categories: resProducts?.categories,
        page: resProducts?.lastPage,
        totalPages: resProducts?.totalPages,
      })
    );
  };

  if (isFirstLoad) {
    return (
      <div className={classes.containerProductContent}>
        {[...new Array(10)].map((_, key) => (
          <div key={key} className={classes.containerCard}>
            <SkeletonCardMobile />
          </div>
        ))}
      </div>
    );
  }

  if (dataProducts.length <= 0)
    return (
      <IllustrationPage
        isMobileSize
        illustrationImage={SearchNotFound}
        titleIllustration="Product Not Found"
        contentIllustration="Your Search did not match any product
        Please try again"
      />
    );

  return (
    <div>
      <div className={classes.containerProductContent}>
        {dataProducts?.map((value, key) => (
          <CardMobile key={key} dataProduct={value} />
        ))}

        {isLoadingProducts &&
          [...new Array(20)].map((_, key) => (
            <div key={key} className={classes.containerCard}>
              <SkeletonCardMobile />
            </div>
          ))}

        <div ref={intersectionRef}></div>
      </div>
    </div>
  );
};

export default ProductContent;
