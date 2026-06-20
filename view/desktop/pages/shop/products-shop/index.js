// Next
import Image from "next/image";
import { useEffect, useState } from "react";

// MUI
import { Container } from "@mui/material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "store/reducer/shops/getAllProductsShop";

// Components
import ContainerProductsCard from "@components/layout/ContainerProductsCard";
import FilterSideBar from "@components/shared/FilterSideBar/FilterSideBar";
import IllustrationPage from "@components/shared/IllustrationPage";

// Assets
import planetOrange from "@public/assets/images/planet-jup-orange.svg";
import bigPlanet from "@public/assets/images/planet.png";
import ufoOrange from "@public/assets/images/ufo-orange.svg";
import NoProductIllustration from "public/assets/images/illustration-no-product.svg";

// CSS
import classes from "./_ShopProduct.module.scss";

// API
import API from "@helper/apiHelper";
import getProductsBySearch from "pages/api/clientSide/dataProducts/getProductBySearch";

const ShopProduct = ({ querySearch }) => {
  const dispatch = useDispatch();

  const [resultFor, setResultFor] = useState(querySearch);

  const [sortBy, setSortBy] = useState("product.stats.total_sales:desc");
  const [page, setPage] = useState(1);
  const [queryPriceString, setQueryPriceString] = useState(false);

  const [categoryId, setCategoryId] = useState("");
  const { dataShop, isLoading: loadShop } = useSelector(
    (store) => store.shopData
  );

  const resultAllProductShop = useSelector(
    (store) => store.dataAllProductsShop
  );

  const initialState = {
    dataAllProduct: [],
    totalPages: 0,
    totalResults: 0,
    isLoading: true,
    dataCategories: [],
  };

  const [
    { dataAllProduct, totalPages, totalResults, isLoading, dataCategories },
    setDataShopProduct,
  ] = useState(initialState);

  const shopId = dataShop?.id;
  const shopName = dataShop?.name;
  const bannerImg = dataShop?.banner_url;

  const queryParams = queryPriceString ? `&${queryPriceString}` : "";

  const newSort = (sortBy) => {
    if (sortBy === "product.stats.total_sales:desc") {
      return "stats.total_sales:desc";
    }

    if (sortBy === "product.price:desc") {
      return "price:desc";
    }

    if (sortBy === "product.price:asc") {
      return "price:asc";
    }

    return sortBy;
  };

  const filteringCategory = (category, handler) => {
    const categoryId = category.id;
    const categoryName = category.display_string;

    handler({ [category.id]: true });

    setResultFor(categoryName);
    setCategoryId(categoryId);
  };

  useEffect(() => {
    if (!querySearch && !loadShop && totalResults !== 0) {
      getCategoriesShop();
    }
  }, [querySearch, loadShop, isLoading]);

  useEffect(() => {
    if (!querySearch) {
      dispatch(
        getAllProductsShop({
          categoryTree: categoryId,
          shopId,
          page,
          sortBy: newSort(sortBy),
          limit: 20,
          queryParams,
        })
      );
    } else {
      getDataSearchProduct();
    }
  }, [page, sortBy, dataShop, queryPriceString, categoryId]);

  useEffect(() => {
    if (!querySearch) {
      Object.keys(initialState).map(
        (value) =>
          value !== "dataCategories" &&
          setDataShopProduct((prev) => ({
            ...prev,
            [value]: resultAllProductShop[value],
          }))
      );
    }
  }, [resultAllProductShop]);

  const getDataSearchProduct = async () => {
    setDataShopProduct((prev) => ({
      ...prev,
      ["isLoading"]: true,
    }));

    const { code, data } = await getProductsBySearch({
      idCategoryTree: categoryId,
      queryStringSearch: querySearch,
      shop_id: dataShop?.id,
      sortBy,
      queryPriceString,
      page,
    });

    if (code === 200) {
      const {
        results: dataResults,
        total_pages,
        total_results,
      } = data.products;

      const dataSearchProduct = {
        dataAllProduct: dataResults,
        totalPages: total_pages,
        totalResults: total_results,
        isLoading: false,
        dataCategories: data?.categories,
      };

      Object.keys(initialState).map((value) =>
        setDataShopProduct((prev) => ({
          ...prev,
          [value]: dataSearchProduct[value],
        }))
      );
    } else {
      setDataShopProduct((prev) => ({
        ...prev,
        ["dataAllProduct"]: false,
      }));
    }

    setDataShopProduct((prev) => ({
      ...prev,
      ["isLoading"]: false,
    }));
  };

  const getCategoriesShop = async () => {
    const { data: response } = await API.get(
      `v1/shops/${shopId}/products/categories`
    );

    const { categories } = response.data || false;

    setDataShopProduct((prev) => ({
      ...prev,
      ["dataCategories"]: categories,
    }));
  };

  return (
    <div className={classes.containerShopProduct}>
      <Container>
        {!querySearch &&
        dataAllProduct?.length === 0 &&
        dataCategories.length === 0 ? (
          <IllustrationPage
            illustrationImage={NoProductIllustration}
            titleIllustration={`No Product in ${dataShop.name ?? ""}`}
            contentIllustration="Currently no products available. please come back another time"
          />
        ) : (
          <div className={classes.container}>
            <FilterSideBar
              loadProduct={isLoading}
              handlerFilteringCategories={filteringCategory}
              dataCategoryLevelOne={dataCategories}
              isShopPage
              setPage={setPage}
              setQueryPriceString={setQueryPriceString}
            />

            <div className={classes.productDiv}>
              <ContainerProductsCard
                slugCategoryThree={categoryId}
                cartLoad={isLoading && !loadShop}
                searchType="product"
                keyword={resultFor}
                titleName={shopName}
                productDisplay
                isProductInShop
                isQuerySearch={resultFor}
                dataProducts={dataAllProduct}
                page={page}
                setPage={setPage}
                setSortBy={setSortBy}
                totalProduct={totalResults}
                totalPages={totalPages}
              />
            </div>
          </div>
        )}
      </Container>

      <Container maxWidth="lg">
        {bannerImg && (
          <div className={classes.bannerContainer}>
            <Image
              src={bannerImg}
              height="200px"
              width="1000px"
              layout="responsive"
              objectFit="contain"
              alt="shop banner"
              style={{ borderRadius: "5px" }}
            />
          </div>
        )}
      </Container>

      {dataAllProduct?.length > 5 && (
        <>
          <div className={classes.bigPlanet}>
            <Image
              src={bigPlanet}
              width="400px"
              height="400px"
              alt="big planet"
            />
          </div>
          <div className={classes.orangePlanet}>
            <Image
              src={planetOrange}
              width="162px"
              height="95px"
              alt="orange planet"
            />
          </div>
          <div className={classes.ufoOrange}>
            <Image
              src={ufoOrange}
              width="128px"
              height="80px"
              alt="orange ufo"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShopProduct;
