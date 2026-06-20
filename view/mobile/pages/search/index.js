import React, { useEffect } from "react";

// next
import { useRouter } from "next/router";

// styles
import classes from "./_SearchMobile.module.scss";

// hooks
import useChangeTabNavigation from "@hooks/search-page/useChangeTabNavigation";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getSearchProductData } from "store/reducer/getSearchResults/getSearchProductData";
import { getSearchShopData } from "store/reducer/getSearchResults/getSearchShopData";

// Assets
import FilterIcon from "@public/assets/icons/filter.svg";

// helper
import { truncateString } from "@helper/truncateString";

// components
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import { formatCurrency } from "@helper/checkValue";
import useFilterProducts from "@hooks/useFilterProducts";
import useToggle from "@hooks/useToggle";
import { Grid } from "@mui/material";
import { API_FETCH_STATUS } from "constant/api";
import Image from "next/image";
import DrawerFilterProducts from "view/mobile/components/DrawerFilterProducts/DrawerFilterProducts";
import FilterChip from "view/mobile/components/FilterChip/FilterChip";
import ProductContent from "./components/ProductContent";
import StoreContent from "./components/StoreContent";

function Search() {
  const dispatch = useDispatch();

  const { isActiveTab, changeTab } = useChangeTabNavigation();
  const params = useRouter().query;

  const { totalResults: totalShops, status: statusShop } = useSelector(
    (store) => store.resultSearchShopsData
  );

  const {
    totalResults: totalResultsProduct,
    categories,
    specifications,
    status: statusProduct,
  } = useSelector((store) => store.resultSearchProductData);

  useEffect(() => {
    if (statusShop === API_FETCH_STATUS.IS_IDLE || params?.tab === "product") {
      dispatch(getSearchShopData({ queryStringSearch: params.query }));
    }

    if (statusProduct === API_FETCH_STATUS.IS_IDLE || params?.tab === "store") {
      dispatch(getSearchProductData({ queryStringSearch: params.query }));
    }
  }, []);

  const [openCategory, toggleCategory] = useToggle();

  const filterProps = useFilterProducts({
    specifications: specifications?.map((value) => value.values).flat(),
    allCategories: categories,
    openCategory,
  });

  const productContent = <ProductContent openCategory={openCategory} />;

  const tabNavigationComponent = {
    product: productContent,
    store: <StoreContent />,
  };

  return (
    <div className={classes.containerSearch}>
      <div className={classes.tabNavigationSearch}>
        <div
          onClick={() => changeTab("product")}
          className={`${classes.tabs} ${isActiveTab(
            "product",
            classes.isActiveTab
          )}`}
        >
          Product
        </div>
        <div
          onClick={() => changeTab("store")}
          className={`${classes.tabs} ${isActiveTab(
            "store",
            classes.isActiveTab
          )}`}
        >
          Store
        </div>
      </div>

      <div className={classes.summaryResult}>
        <Grid container>
          <Grid container alignItems="center" gap={1}>
            <SecondaryButton
              onClick={toggleCategory}
              className={classes.btnFilter}
            >
              <Image src={FilterIcon} width="12px" height="12px" alt="filter" />
              <h3>Filter</h3>
            </SecondaryButton>
            {filterProps?.specificationSelected?.map((value) => (
              <FilterChip
                key={value?.idSpecification}
                text={value?.nameSpecification}
                onClick={() =>
                  filterProps.handleChangeSpecification({
                    idSpecification: value.idSpecification,
                    nameSpecification: value.nameSpecification,
                    applyFilter: true,
                  })
                }
              />
            ))}
            {(filterProps.minPrice > 0 || filterProps.maxPrice > 0) && (
              <FilterChip
                text={
                  formatCurrency(filterProps.minPrice) +
                  " - " +
                  formatCurrency(filterProps.maxPrice)
                }
                onClick={() =>
                  filterProps.handleChangePrice({
                    min: 0,
                    max: 0,
                    applyFilter: true,
                  })
                }
              />
            )}
            {filterProps?.selectedRating && (
              <FilterChip
                text={`Rating ${
                  filterProps?.selectedRating == 5
                    ? filterProps?.selectedRating
                    : filterProps?.selectedRating + "+"
                }`}
                onClick={() => filterProps.handleChangeRating("", true)}
              />
            )}
            {filterProps?.selectedOffers?.map((offer, offerIdx) => (
              <FilterChip
                key={offerIdx}
                text={offer}
                onClick={() => filterProps.handleChangeOffer(offer, true)}
              />
            ))}
          </Grid>
        </Grid>

        <DrawerFilterProducts
          storeView={params?.tab === "store"}
          open={openCategory}
          onClose={toggleCategory}
          allCategories={categories}
          specifications={specifications}
          {...filterProps}
        />

        <div>
          <p>
            Showing
            <b> {totalResultsProduct ?? 0} </b>
            Products for
            <b> {truncateString(params.query, 50)}</b>
          </p>
          <p>
            Showing
            <b> {totalShops ?? 0} </b>
            Store for
            <b> {truncateString(params.query, 50)}</b>
          </p>
        </div>
      </div>

      {tabNavigationComponent[params?.tab] || productContent}
    </div>
  );
}

export default Search;
