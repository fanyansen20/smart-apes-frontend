// Next
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Helper
import { formatCurrency } from "@helper/checkValue";
import useFilterProducts from "@hooks/useFilterProducts";
import useGetProducts from "@hooks/useGetProducts";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import useToggle from "@hooks/useToggle";
import {
  addPage,
  setHasMorePage,
  setPage,
  setSearch,
} from "store/reducer/search/searchSlice";

// MUI
import { Stack } from "@mui/material";

// Styles
import classes from "./CatTwo.module.scss";

// Components
import NoProductFound from "@components/layout/NoProductFound";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import DrawerFilterProducts from "view/mobile/components/DrawerFilterProducts/DrawerFilterProducts";
import FilterChip from "view/mobile/components/FilterChip/FilterChip";
import SkeletonCardMobileGroup from "view/mobile/components/skeleton/SkeletonCardMobileGroup";
import ProductsContainerMobile from "../../components/ProductsList";

// Assets
import FilterIcon from "@public/assets/icons/filter.svg";

function CategorySlug({ allCategories = [] }) {
  const dispatch = useDispatch();
  const { search, page, isLoadingSearch, isReset, hasMorePage } = useSelector(
    (store) => store.search
  );
  const { dataProducts, getProducts, isLoadingProducts, isFirstLoad } =
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
    const categoryId =
      filterProps.selectedCat[2]?.id ||
      filterProps.selectedCat[1]?.id ||
      filterProps.selectedCat[0]?.id;
    const minPrice = filterProps.minPrice > 0 && filterProps.minPrice;
    const maxPrice = filterProps.maxPrice > 0 && filterProps.maxPrice;
    const rating = filterProps.selectedRating;
    const isDiscount = filterProps.selectedOffers.includes("discount");
    const limit = 12;

    const resProducts = await getProducts({
      search,
      categoryId,
      minPrice,
      maxPrice,
      rating,
      isDiscount,
      limit,
      page,
      isReset,
    });

    dispatch(setPage(resProducts?.lastPage));
    dispatch(
      setHasMorePage(
        resProducts?.lastPage < resProducts?.totalPages ? true : false
      )
    );
  };

  useEffect(() => {
    if (!openCategory) handleGetProducts();
  }, [
    isLoadingSearch,
    openCategory,
    filterProps.selectedCat,
    filterProps.minPrice,
    filterProps.maxPrice,
    filterProps.selectedRating,
    filterProps.selectedOffers.length,
    page,
  ]);

  useEffect(() => {
    dispatch(setSearch(""));
    dispatch(setPage(1));

    return () => {
      dispatch(setSearch(""));
    };
  }, []);

  return (
    <div className={classes.categoryTwoContainer}>
      <Stack>
        <section className={classes.filterSection}>
          <div className={classes.filterBtnContainer}>
            <SecondaryButton
              onClick={toggleCategory}
              className={classes.btnFilter}
            >
              <Image src={FilterIcon} width="12px" height="12px" alt="filter" />
              <h3>Filter</h3>
            </SecondaryButton>
          </div>
          <div className={classes.filterChipContainer}>
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
          </div>
        </section>
      </Stack>
      {isFirstLoad ? (
        <Stack>
          <SkeletonCardMobileGroup />
        </Stack>
      ) : (
        <Stack>
          {dataProducts?.length > 0 ? (
            <>
              <ProductsContainerMobile
                showHeader={false}
                dataProduct={dataProducts}
                isLoading={false}
              />
              {isLoadingProducts && <SkeletonCardMobileGroup />}
              <div ref={intersectionRef}></div>
            </>
          ) : (
            <NoProductFound />
          )}
        </Stack>
      )}
      <DrawerFilterProducts
        open={openCategory}
        onClose={toggleCategory}
        allCategories={allCategories}
        {...filterProps}
      />
    </div>
  );
}

export default CategorySlug;
