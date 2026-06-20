// React
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

//Next JS
import Image from "next/image";
import Link from "next/link";

//Material UI
import { Button, Container, Divider, Grid, Typography } from "@mui/material";

//Components
import TenProductSection from "@components/layout/TenProductSection/TenProductSection";

//Images
import BannerCatalogLevelOne from "@public/assets/images/banner-catalog-level-one.svg";
import noProduct from "@public/assets/images/NoProduct.svg";
import BigPlanetLeft from "@public/assets/images/planet-2.png";
import UfoOrange from "@public/assets/images/ufo-orange.svg";

// Layout
import SearchPageCategoryLevelOne from "@components/layout/SearchPageCategoryLevelOne";

// API
import IllustrationPage from "@components/shared/IllustrationPage";
import getProductsBySearch from "pages/api/clientSide/dataProducts/getProductBySearch";

const CatalogLevelOne = ({
  categorySlugLevelOne,
  categoryLevelTwo,
  dataCategories,
  dataProductsPromotion,
  dataTopProductsSales,
  dataProductsRecommendations,
  dataSpecificationFilters,
  idCategoryLevelOne,
  querySearch,
}) => {
  const dispatch = useDispatch();

  const [dataSearch, setDataSearch] = useState([]);

  const [page, setPage] = useState(1);
  const [cartLoad, setCartLoad] = useState(false);

  const [chips, setChips] = useState([]);
  const [idSpecifications, setIdSpecifications] = useState([]);
  const [queryString, setQueryString] = useState([]);
  const [queryRatings, setQueryRatingsString] = useState([]);
  const [queryPriceString, setQueryPriceString] = useState([]);
  const [sortBy, setSortBy] = useState("product.stats.total_sales:desc");

  useEffect(() => {
    dispatch(
      isLayout({
        titleName: categoriesLevel2[0].display_string,
        slugCategory: categorySlugLevelOne,
      })
    );
  }, []);

  useEffect(() => {
    setPage(1);
    if (querySearch) {
      getDataBySearch();
    }
  }, [
    querySearch,
    sortBy,
    page,
    idSpecifications,
    queryString,
    queryRatings,
    queryPriceString,
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

  const handlerDynamicFilters = (query) => {
    const newQueryString = [...queryString];

    const index = queryString.indexOf(query);

    if (queryString.includes(`&${query}`)) {
      newQueryString.splice(index, 1);
      setQueryString(newQueryString);
    } else {
      setQueryString((queryString) => [`&${query}`, ...queryString]);
    }
  };

  const getDataBySearch = async () => {
    window.scroll(0, 0);
    setCartLoad(true);

    const newQueryString = queryString.join("");

    const { code, data } = await getProductsBySearch({
      idCategoryTree: idCategoryLevelOne,
      idSpecifications: idSpecifications,
      queryStringSearch: querySearch,
      queryString: newQueryString,
      queryRatings: queryRatings,
      queryPriceString: queryPriceString,
      sortBy,
      page: page,
    });

    if (code === 200) {
      setDataSearch(data.products);
    } else {
      setDataSearch(false);
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

  const categoriesLevel2 = dataCategories.filter(
    (category) => category.slug === categorySlugLevelOne
  );
  const lengthCategory = categoriesLevel2[0].children.length;

  return querySearch ? (
    <>
      <SearchPageCategoryLevelOne
        categoryLevelTwo={categoryLevelTwo}
        titleName={categoriesLevel2[0].display_string}
        querySearch={querySearch}
        dataSearch={dataSearch}
        cartLoad={cartLoad}
        handlerSpecificationCategoriesFilters={
          handlerSpecificationCategoriesFilters
        }
        idSpecifications={idSpecifications}
        categorySlugLevelOne={categorySlugLevelOne}
        dataSpecificationFilters={dataSpecificationFilters}
        handlerDynamicFilters={handlerDynamicFilters}
        queryString={queryString}
        setQueryRatingsString={setQueryRatingsString}
        setQueryPriceString={setQueryPriceString}
        setSortBy={setSortBy}
        setPage={setPage}
        page={page}
        chips={chips}
        deleteChips={deleteChips}
        handlerResetState={handlerResetState}
      />
    </>
  ) : (
    <Container className="containerCatalogLevelOne">
      <div className="imageLeftCatalogOne">
        <Image src={BigPlanetLeft} alt="bigPlanet" layout="fill" />
      </div>

      <Grid className="bannerCatalogLevelOne">
        <Image src={BannerCatalogLevelOne} alt="banner catalog" />
      </Grid>

      <Grid className="headerTitle">
        <Typography className="headerText">
          {categoriesLevel2[0].display_string} Category
        </Typography>
      </Grid>

      <Grid container wrap="wrap" gap="6px">
        {categoriesLevel2[0].children.map((category, key) => (
          <Link href={`${categorySlugLevelOne}/${category.slug}`} key={key}>
            <a>
              <Button
                className={
                  (lengthCategory === 1 && "oneRowsCategory") ||
                  (lengthCategory === 6 && "threeRowsCategory") ||
                  (lengthCategory === 7 && "fourRowsCategory") ||
                  (lengthCategory === 4 && "fourRowsCategory") ||
                  (lengthCategory === 8 && "fourRowsCategory") ||
                  (lengthCategory === 10 && "fiveRowsCategory") ||
                  (lengthCategory === 5 && "fiveRowsCategory")
                }
              >
                <Image
                  src={category.icon_button_url}
                  width="35px"
                  height="30px"
                  alt={`Image ${category.display_string}`}
                />
                <Typography>{category.display_string}</Typography>
              </Button>
            </a>
          </Link>
        ))}
      </Grid>

      {dataTopProductsSales.length !== 0 && (
        <>
          <Grid className="dividerCatalogOne">
            <Divider />
          </Grid>
          <TenProductSection
            dataProduct={dataTopProductsSales}
            loading={false}
            normalTitle="Best Seller"
            imageUfoOrange={UfoOrange}
            imagePlanetLeft={BigPlanetLeft}
          />
        </>
      )}

      {dataProductsPromotion.length !== 0 && (
        <>
          <Grid className="dividerCatalogOne">
            <Divider />
          </Grid>
          <TenProductSection
            dataProduct={dataProductsPromotion}
            loading={false}
            normalTitle="Monthly Promotion"
          />
        </>
      )}

      {dataProductsRecommendations.length !== 0 && (
        <>
          <Grid className="dividerCatalogOne">
            <Divider />
          </Grid>

          <TenProductSection
            dataProduct={dataProductsRecommendations}
            loading={false}
            normalTitle="Recommendation for you"
            imageUfoOrange={UfoOrange}
          />
        </>
      )}

      {dataTopProductsSales.length === 0 &&
        dataProductsPromotion.length === 0 &&
        dataProductsRecommendations.length === 0 && (
          <Grid>
            <IllustrationPage
              illustrationImage={noProduct}
              titleIllustration="There is no Product to display yet"
              contentIllustration="for now there are no product that will be displayed"
            />
          </Grid>
        )}
    </Container>
  );
};

export default memo(CatalogLevelOne);
