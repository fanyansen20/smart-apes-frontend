// React
import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addPage, setHasMorePage } from "store/reducer/search/searchSlice";

// Next
import Image from "next/image";
import { useRouter } from "next/router";

// Icons
import FilterIcon from "@public/assets/icons/filter.svg";

// Components
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import DrawerFilterProducts from "view/mobile/components/DrawerFilterProducts/DrawerFilterProducts";
import ProductsContainerMobile from "view/mobile/components/ProductsList";

// MUI Components
import { CircularProgress, Stack } from "@mui/material";

// Hooks
import useFilterProducts from "@hooks/useFilterProducts";
import useGetProducts from "@hooks/useGetProducts";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import useToggle from "@hooks/useToggle";

// hooks
import { formatCurrency } from "@helper/checkValue";

// Styles
import NoProductFound from "@components/layout/NoProductFound";
import FilterChip from "view/mobile/components/FilterChip/FilterChip";
import catTwoClasses from "../category/CatTwo.module.scss";

const CategoryOneSearch = ({ allCategories, categorySlugId }) => {
  const dispatch = useDispatch();
  const { page, isLoadingSearch, hasMorePage } = useSelector(
    (state) => state.search
  );
  const { query } = useRouter();
  const { keyword, offers } = query;
  const { dataProducts, getProducts, isFirstLoad, isLoadingProducts } =
    useGetProducts();
  const [openCategory, toggleCategory] = useToggle();
  const filterProps = useFilterProducts({
    allCategories,
    openCategory,
  });
  const { intersectionRef } = useIntersectionObserver({
    isLoadingSearch,
    hasMorePage,
    callback: () => dispatch(addPage()),
  });

  const handleGetProducts = async () => {
    const resProductsFetch = await getProducts({
      search: keyword,
      page,
      categoryId: categorySlugId,
      isDiscount: offers === "discount",
    });

    dispatch(setHasMorePage(page < resProductsFetch?.totalPages));
  };

  useEffect(() => {
    if (keyword) {
      handleGetProducts();
    }
  }, [keyword, page]);

  return (
    <div className={catTwoClasses.categoryTwoContainer}>
      <Stack direction="column" alignItems="center">
        <Stack
          direction="column"
          alignSelf="flex-start"
          className={catTwoClasses.filterSection}
        >
          <Stack
            direction="row"
            alignItems="center"
            className={catTwoClasses.filterChipContainer}
          >
            <SecondaryButton
              onClick={toggleCategory}
              className={catTwoClasses.btnFilter}
            >
              <Image src={FilterIcon} width="12px" height="12px" alt="filter" />
              <h3>Filter</h3>
            </SecondaryButton>
            {filterProps?.selectedCat?.map(
              (catLevel, indexCat) =>
                catLevel?.slug && (
                  <FilterChip
                    key={indexCat}
                    text={catLevel?.display_string}
                    onClick={() =>
                      filterProps.handleSelectCat(indexCat, {}, true)
                    }
                  />
                )
            )}
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
          </Stack>
        </Stack>

        {/* Products List */}
        {dataProducts?.length > 0 && (
          <ProductsContainerMobile
            showHeader={false}
            dataProduct={dataProducts}
          />
        )}

        {!isLoadingProducts && !isFirstLoad && !dataProducts?.length && (
          <NoProductFound />
        )}

        {/* Circle Loading Animation */}
        {(isFirstLoad || isLoadingProducts) && (
          <CircularProgress
            sx={{ margin: isFirstLoad && "37vh auto" }}
            color="secondary"
          />
        )}
        <div ref={intersectionRef}></div>
      </Stack>
      <DrawerFilterProducts
        open={openCategory}
        onClose={toggleCategory}
        allCategories={allCategories}
        {...filterProps}
      />
    </div>
  );
};

export default CategoryOneSearch;
