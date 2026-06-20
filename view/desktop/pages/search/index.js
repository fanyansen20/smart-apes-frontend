// React
import { memo, useEffect, useState } from "react";

// Layout
import ContainerProductsCard from "@components/layout/ContainerProductsCard";

// redux
import FilteringLayout from "@layout/FilteringLayout";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProductData } from "store/reducer/getSearchResults/getSearchProductData";
import { getSearchShopData } from "store/reducer/getSearchResults/getSearchShopData";
import { isLayout } from "store/reducer/layout/layoutSlice";

const SearchPage = ({ querySearch }) => {
  const dispatch = useDispatch();

  const dataSearchProduct = useSelector(
    (store) => store.resultSearchProductData
  );
  const dataSearchShops = useSelector((store) => store.resultSearchShopsData);

  const [displayedDataProducts, setDisplayedDataProduct] = useState({
    dataProduct: [],
    totalPages: 0,
    totalProducts: 0,
  });

  const [displayedDataShops, setDisplayedDataShops] = useState({
    dataProduct: [],
    totalPages: 0,
    totalShops: 0,
  });

  const [categories, setCategories] = useState([]);
  const [specifications, setSpecifications] = useState([]);

  const [searchType, setSearchType] = useState("products");

  const [page, setPage] = useState(1);
  const [cartLoad, setCartLoad] = useState(true);

  const [chips, setChips] = useState([]);

  const [sortBy, setSortBy] = useState("product.stats.total_sales:desc");

  const [idSpecifications, setIdSpecifications] = useState([]);
  const [queryString, setQueryString] = useState([]);
  const [queryRatings, setQueryRatings] = useState("");
  const [queryPrice, setQueryPrice] = useState("");

  useEffect(() => {
    dispatch(getSearchProductData({ queryStringSearch: querySearch }));

    dispatch(getSearchShopData({ queryStringSearch: querySearch }));

    dispatch(isLayout({ isNavbar: true }));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (searchType === "products") {
      const queryParams =
        queryString.length > 0 ? `&${queryString.join("")}` : "";
      const spec_values =
        idSpecifications.length > 0 ? `&spec_values=${idSpecifications}` : "";
      const priceParams = queryPrice ? `&${queryPrice}` : "";
      const ratingParam = queryRatings ? `&${queryRatings}` : "";

      dispatch(
        getSearchProductData({
          queryStringSearch: querySearch,
          page,
          sortBy: sortBy.replace("product.", ""),
          queryParams,
          priceParams,
          spec_values,
          ratingParam,
        })
      );
    }

    if (searchType === "shops") {
      const queryParams =
        queryString.length > 0 ? `&${queryString.join("")}` : "";

      dispatch(
        getSearchShopData({ queryStringSearch: querySearch, queryParams, page })
      );
    }

    setCartLoad(false);
  }, [page, queryString, sortBy, idSpecifications, queryPrice, queryRatings]);

  useEffect(() => {
    setPage(1);
  }, [searchType, querySearch, idSpecifications]);

  useEffect(() => {
    mutationSearchProduct();
    mutationSearchShops();
  }, [dataSearchProduct, dataSearchShops]);

  const handlerSpecificationCategoriesFilters = (value) => {
    setCartLoad(true);
    const id = value.id;

    const newChips = [...chips];
    const indexChips = chips.indexOf(value);

    const newIdSpecification = [...idSpecifications];
    const index = idSpecifications.indexOf(id);

    // set id specification and chips
    if (idSpecifications.includes(id)) {
      newIdSpecification.splice(index, 1);
      setIdSpecifications(newIdSpecification);

      newChips.splice(indexChips, 1);
      setChips(newChips);
    } else {
      setIdSpecifications((idSpecification) => [id, ...idSpecification]);
      setChips((prevState) => [...prevState, value]);
    }
  };

  const handlerDynamicFilters = (data) => {
    const query = data.query_string;

    const newNameChips = [...chips];
    const indexChips = chips.indexOf(data);
    const newQueryString = [...queryString];
    const index = queryString.indexOf(`&${query}`);

    // set value chips
    if (chips.includes(data)) {
      newNameChips.splice(indexChips, 1);
      setChips(newNameChips);
    } else {
      setChips((prevState) => [...prevState, data]);
    }

    // set query dynamic filter
    if (queryString.includes(`&${query}`)) {
      newQueryString.splice(index, 1);
      setQueryString(newQueryString);
    } else {
      setQueryString((queryString) => [`&${query}`, ...queryString]);
    }
  };

  const mutationSearchShops = async () => {
    setCartLoad(true);
    if (!dataSearchShops.isLoading && dataSearchShops.statusCode === 200) {
      const { results, total_pages, total_results } =
        dataSearchShops?.resultShopData?.shops || {};

      setDisplayedDataShops({
        dataProduct: results,
        totalPages: total_pages,
        totalShops: total_results,
      });
    } else {
      setDisplayedDataShops({
        dataProduct: [],
        totalPages: 0,
        totalShops: 0,
        page: 0,
      });
    }

    setCartLoad(false);
  };

  const mutationSearchProduct = async () => {
    setCartLoad(true);

    // const newQueryString = queryString.join("");
    if (!dataSearchProduct.isLoading && dataSearchProduct.statusCode === 200) {
      const { results, total_pages, total_results, page } =
        dataSearchProduct?.resultProductData?.products;
      const {
        resultProductData: { categories, specifications },
      } = dataSearchProduct || {};

      setDisplayedDataProduct({
        dataProduct: results,
        totalPages: total_pages,
        totalProducts: total_results,
        page: page,
      });
      setCategories(categories);
      setSpecifications(specifications);
    } else {
      setDisplayedDataProduct({
        dataProduct: [],
        totalPages: 0,
        totalProducts: 0,
        page: 0,
      });
    }

    setCartLoad(false);
  };

  const deleteChips = (chipsData) => {
    if (chipsData.name) {
      return handlerSpecificationCategoriesFilters(chipsData);
    }
    if (!chipsData.name) {
      return handlerDynamicFilters(chipsData);
    }
  };

  const handlerResetState = () => {
    if (
      idSpecifications.length > 0 ||
      queryPrice ||
      queryRatings ||
      queryString.length > 0
    ) {
      dispatch(getSearchProductData({ queryStringSearch: querySearch }));
      dispatch(getSearchShopData({ queryStringSearch: querySearch }));

      setIdSpecifications([]);
      setQueryString([]);
      setQueryRatings("");
      setQueryPrice("");
    }

    setChips([]);
  };

  return (
    <FilteringLayout
      idSpecifications={idSpecifications}
      querySearch={querySearch}
      dataSpecificationFilters={specifications}
      dataCategoryLevelOne={categories}
      handlerSpecificationCategoriesFilters={
        handlerSpecificationCategoriesFilters
      }
      handlerDynamicFilters={handlerDynamicFilters}
      setQueryRatingsString={setQueryRatings}
      setQueryPriceString={setQueryPrice}
      setPage={setPage}
      typeProduct={searchType}
      queryString={queryString}
    >
      <ContainerProductsCard
        chips={chips}
        dataProducts={
          searchType === "products"
            ? displayedDataProducts.dataProduct
            : displayedDataShops.dataProduct
        }
        deleteChips={deleteChips}
        // totalPages={totalPages}
        totalPages={
          searchType === "products"
            ? displayedDataProducts.totalPages
            : displayedDataShops.totalPages
        }
        totalProduct={displayedDataProducts.totalProducts}
        totalShops={displayedDataShops.totalShops}
        keyword={querySearch}
        cartLoad={
          searchType === "products"
            ? dataSearchProduct.isLoading
            : dataSearchShops.isLoading
        }
        searchProduct
        productDisplay={false}
        page={page}
        setCartLoad={setCartLoad}
        setPage={setPage}
        setSortBy={setSortBy}
        setSearchType={setSearchType}
        searchType={searchType}
        handlerResetState={handlerResetState}
      />
    </FilteringLayout>
  );
};

export default memo(SearchPage);
