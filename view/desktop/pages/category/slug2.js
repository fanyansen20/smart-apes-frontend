//React
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

//Next JS
import Image from "next/image";
import Link from "next/link";

//Material UI
import { Breadcrumbs, Container, Grid, Typography } from "@mui/material";

// Icon
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

//Components
import FilterSideBar from "@components/shared/FilterSideBar/FilterSideBar";

//Images
import SampleBanner from "@public/assets/images/banner-ads.svg";

// Layout
import ContainerProductsCard from "@components/layout/ContainerProductsCard";

// API
import getProductsBySearch from "pages/api/clientSide/dataProducts/getProductBySearch";
import getProductsByFilters from "pages/api/clientSide/dataProducts/getProductsByFilters";

const CatalogLevelTwo = ({
  slugLevelOne,
  slugLevelTwo,
  idCategoryLevelTwo,
  categoryLevelOne,
  categoryLevelTwo,
  dataSpecificationFilters,
  nameCategoryOne,
  dataProducts,
  total_results,
  total_pages,
  categoryNameLevelTwo,
  querySearch,
}) => {
  const dispatch = useDispatch();

  const [totalProducts, setTotalProducts] = useState(total_results);
  const [totalPages, setTotalPages] = useState(total_pages);
  const [sortBy, setSortBy] = useState("product.stats.total_sales:desc");
  const [displayedProducts, setDisplayedProducts] = useState(dataProducts);

  const [keywordSearch, setKeywordSearch] = useState(
    querySearch || categoryNameLevelTwo
  );

  const [page, setPage] = useState(1);
  const [cartLoad, setCartLoad] = useState(false);

  const [chips, setChips] = useState([]);
  const [idSpecifications, setIdSpecifications] = useState([]);
  const [queryString, setQueryString] = useState([]);
  const [queryRatings, setQueryRatingsString] = useState([]);
  const [queryPriceString, setQueryPriceString] = useState([]);

  useEffect(() => {
    dispatch(
      isLayout({
        titleName: `${categoryNameLevelTwo} ${nameCategoryOne}`,
        slugCategory: `${slugLevelOne}/${categoryLevelTwo}`,
        isGeneral: true,
      })
    );
  }, []);

  useEffect(() => {
    handlerResetState();
  }, [slugLevelTwo]);

  useEffect(() => {
    setTotalProducts(total_results);
  }, [total_results]);

  useEffect(() => {
    if (querySearch) {
      setKeywordSearch(querySearch);
    }
    if (!querySearch) {
      setKeywordSearch(categoryNameLevelTwo);
    }
  }, [querySearch, slugLevelTwo]);

  useEffect(() => {
    if (querySearch) {
      getDataSearch();
    }
    if (!querySearch) {
      getDataFilterSpecifications();
    }
  }, [
    keywordSearch,
    idCategoryLevelTwo,
    idSpecifications,
    queryString,
    queryRatings,
    queryPriceString,
    sortBy,
    page,
  ]);

  const handlerSpecificationCategoriesFilters = (value) => {
    const id = value.id;

    const newChips = [...chips];
    const indexChips = chips.indexOf(value);
    const newIdSpecification = [...idSpecifications];
    const index = idSpecifications.indexOf(id);

    // set value chips
    if (chips.includes(value)) {
      newChips.splice(indexChips, 1);
      setChips(newChips);
    } else {
      setChips((prevState) => [...prevState, value]);
    }

    // set id specification
    if (idSpecifications.includes(id)) {
      newIdSpecification.splice(index, 1);
      setIdSpecifications(newIdSpecification);
    } else {
      setIdSpecifications((idSpecification) => [id, ...idSpecification]);
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

  const getDataFilterSpecifications = async () => {
    window.scrollTo(0, 0);
    setCartLoad(true);

    const newQueryString = queryString.join("");

    const dataProductSpecificationFilter = await getProductsByFilters({
      idCategory: idCategoryLevelTwo,
      values: idSpecifications,
      queryString: newQueryString,
      queryRatings: queryRatings,
      queryPrice: queryPriceString,
      sortBy,
      page,
    });

    if (dataProductSpecificationFilter) {
      const {
        results,
        total_pages: totalPage,
        total_results,
      } = dataProductSpecificationFilter.data;
      setDisplayedProducts(results);
      setTotalPages(totalPage);
      setTotalProducts(total_results);
    } else {
      setDisplayedProducts(dataProducts);
      setTotalProducts(total_results);
      setTotalPages(total_pages);
    }
    setCartLoad(false);
  };

  const getDataSearch = async () => {
    window.scrollTo(0, 0);
    setCartLoad(true);

    const newQueryString = queryString.join("");
    const { code, data } = await getProductsBySearch({
      idCategoryTree: idCategoryLevelTwo,
      idSpecifications: idSpecifications,
      queryStringSearch: keywordSearch,
      queryString: newQueryString,
      queryRatings: queryRatings,
      queryPriceString: queryPriceString,
      sortBy,
      page: page,
    });

    if (code === 200) {
      const {
        results: dataProduct,
        total_results,
        total_pages,
      } = data.products;

      setDisplayedProducts(dataProduct);
      setTotalPages(total_pages);
      setTotalProducts(total_results);
    } else {
      setDisplayedProducts(false);
    }

    setCartLoad(false);
  };

  const deleteChips = (chipsData) => {
    if (chipsData.name) {
      return handlerSpecificationCategoriesFilters(chipsData);
    }
    handlerDynamicFilters(chipsData);
  };

  const handlerResetState = () => {
    setIdSpecifications([]);
    setQueryString([]);
    setQueryRatingsString([]);
    setQueryPriceString([]);
    setChips([]);
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Homepage
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href={`/category/${slugLevelOne}`}
    >
      <a>{nameCategoryOne}</a>
    </Link>,
    <Typography key="3" color="text.primary">
      {categoryNameLevelTwo}
    </Typography>,
  ];

  return (
    <Container>
      <Grid className="headerTitle">
        <Typography className="headerText">{categoryNameLevelTwo}</Typography>
      </Grid>

      <Grid className="breadcrumbsContainer">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Grid>

      <Grid className="container">
        <FilterSideBar
          idSpecifications={idSpecifications}
          dataSpecificationFilters={dataSpecificationFilters}
          dataCategoryLevelOne={categoryLevelOne}
          slugLevelOne={slugLevelOne}
          slugLevelTwo={slugLevelTwo}
          handlerSpecificationCategoriesFilters={
            handlerSpecificationCategoriesFilters
          }
          handlerDynamicFilters={handlerDynamicFilters}
          setQueryRatingsString={setQueryRatingsString}
          setQueryPriceString={setQueryPriceString}
          setPage={setPage}
          queryString={queryString}
        />
        <div className="productsDiv">
          <div className="advertisement">
            <Image src={SampleBanner} alt="ads" />
          </div>

          <ContainerProductsCard
            cartLoad={cartLoad}
            dataProducts={displayedProducts}
            deleteChips={deleteChips}
            handlerResetState={handlerResetState}
            productDisplay={true}
            keyword={keywordSearch}
            titleName={categoryNameLevelTwo}
            totalProduct={totalProducts}
            totalPages={totalPages}
            page={page}
            chips={chips}
            searchProduct={false}
            setPage={setPage}
            setSortBy={setSortBy}
            searchType="product"
          />
        </div>
      </Grid>
    </Container>
  );
};

export default memo(CatalogLevelTwo);
