// Material UI
import { Breadcrumbs, Container, Grid, Typography } from "@mui/material";

// Next JS
import Image from "next/image";
import Link from "next/link";

// Images
import SampleBanner from "@public/assets/images/bannerAd.png";

// Icon
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Component
import ContainerProductsCard from "@components/layout/ContainerProductsCard";
import FilterSideBar from "@components/shared/FilterSideBar/FilterSideBar";

const SearchPageCategoryLevelOne = ({
  cartLoad,
  categorySlugLevelOne,
  categoryLevelTwo,
  dataSearch,
  dataSpecificationFilters,
  titleName,
  querySearch,
  page,
  idSpecifications,
  setPage,
  handlerSpecificationCategoriesFilters,
  handlerDynamicFilters,
  queryString,
  setQueryRatingsString,
  setQueryPriceString,
  setSortBy,
  chips,
  handlerResetState,
  deleteChips,
}) => {
  const dataProducts = dataSearch?.results ?? false;
  const totalPages = dataSearch?.total_pages;
  const totalProduct = dataSearch?.total_results;

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Homepage
    </Link>,
    <Typography key="3" color="text.primary">
      {titleName}
    </Typography>,
  ];

  return (
    <>
      <Container>
        <Grid className="headerTitle">
          <Typography className="headerText">{titleName}</Typography>
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
            slugLevelOne={categorySlugLevelOne}
            dataCategoryLevelOne={categoryLevelTwo}
            dataSpecificationFilters={dataSpecificationFilters}
            handlerSpecificationCategoriesFilters={
              handlerSpecificationCategoriesFilters
            }
            idSpecifications={idSpecifications}
            queryString={queryString}
            handlerDynamicFilters={handlerDynamicFilters}
            setQueryRatingsString={setQueryRatingsString}
            setQueryPriceString={setQueryPriceString}
            setPage={setPage}
          />

          <div className="productsDiv">
            <div className="advertisement">
              <Image src={SampleBanner} alt="banner" />
            </div>
            <ContainerProductsCard
              cartLoad={cartLoad}
              dataProducts={dataProducts}
              searchProduct={false}
              productDisplay={true}
              searchType="product"
              keyword={querySearch}
              titleName={titleName}
              page={page}
              setPage={setPage}
              setSortBy={setSortBy}
              totalPages={totalPages}
              totalProduct={totalProduct}
              chips={chips}
              deleteChips={deleteChips}
              handlerResetState={handlerResetState}
            />
          </div>
        </Grid>
      </Container>
    </>
  );
};

export default SearchPageCategoryLevelOne;
