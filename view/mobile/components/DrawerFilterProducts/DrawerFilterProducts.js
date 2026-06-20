// Next
import Link from "next/link";
import { useRouter } from "next/router";

// MUI
import { StarBorder, StarRounded } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton } from "@mui/material";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import TextBox from "@components/shared/TextBox/TextBox";

// Helper
import { filterNumberOnly } from "@helper/filterNumberOnly";

// Constant
import {
  offerOptions,
  pricesOptions,
  ratingOptions,
  storesType,
} from "constant/dynamicFiltering";

// Styles
import { checkSameValueInArray } from "@helper/checkValue";
import classes from "./DrawerFilterProducts.module.scss";

/**
 *
 * @param {{
 * storeView : boolean
 * specifications : [import("@types/filtering").SpecificationsType]
 * specificationSelected : [import("@types/filtering").SpecificationSelectedType]
 * }} props
 * @returns
 */

const DrawerFilterProducts = ({
  open,
  onClose,
  allCategories,
  selectedCatOneSlug,
  selectedCatTwoSlug,
  selectedCatThreeSlug,
  getCategoryOne,
  getCategoryTwo,
  handleSelectCat,
  minPrice,
  maxPrice,
  handleChangePrice,
  selectedRating,
  handleChangeRating,
  isSelectedOffer,
  handleChangeOffer,
  handleApplyFilter,
  handleApplyStateFromSlug,
  resetDefaultCategory,
  storeView,
  specifications,
  handleChangeSpecification,
  specificationSelected,
}) => {
  const { query, route } = useRouter();

  const searchQueryParam = query?.query;

  const urlSearchParams = searchQueryParam
    ? `${route}?query=${searchQueryParam}&tab=${query.tab}`
    : "/";

  const isPriceInvalid = Number(maxPrice) < Number(minPrice);
  const handleCloseDrawer = () => {
    handleApplyStateFromSlug();
    resetDefaultCategory();
    onClose();
  };

  const ascendingSpecifications = [...(specifications || [])].sort((a, b) =>
    b.title.localeCompare(a.title)
  );

  if (storeView) {
    return (
      <Drawer anchor="bottom" open={open} onClose={handleCloseDrawer}>
        <section className={classes.containerDrawerProducts}>
          <div className={classes.drawerHeader}>
            <p>Filter</p>
            <IconButton onClick={handleCloseDrawer}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className={classes.containerFilterType}>
            <p className={classes.header}>Store Type</p>
            <div className={classes.chipsContainer}>
              {storesType?.map((offer) => (
                <SecondaryButton
                  key={offer.id}
                  onClick={() => handleChangeOffer(offer.value)}
                  className={
                    isSelectedOffer(offer.value)
                      ? classes.btnFilter__active
                      : classes.btnFilter
                  }
                >
                  {offer.display_string}
                </SecondaryButton>
              ))}
            </div>
          </div>
          <div className={classes.footer}>
            <Link href={urlSearchParams}>
              <SecondaryButton fullWidth>Reset Filter</SecondaryButton>
            </Link>
            <PrimaryButton
              disabled={isPriceInvalid}
              onClick={handleApplyFilter}
              fullWidth
            >
              Apply Filter
            </PrimaryButton>
          </div>
        </section>
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleCloseDrawer}
      disableScrollLock
    >
      <section className={classes.containerDrawerProducts}>
        <div className={classes.drawerHeader}>
          <p>Filter</p>
          <IconButton onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.containerFilterType}>
          <p className={classes.header}>Categories</p>
          <div className={classes.chipsContainer}>
            {allCategories?.map((catOne) => (
              <SecondaryButton
                key={catOne?.id}
                className={
                  catOne?.slug === selectedCatOneSlug
                    ? classes.btnFilter__active
                    : classes.btnFilter
                }
                onClick={() => handleSelectCat(0, catOne)}
              >
                {catOne?.display_string}
              </SecondaryButton>
            ))}
          </div>
        </div>

        {selectedCatOneSlug && (
          <div className={classes.containerFilterType}>
            <p className={classes.header}>
              Categories <span className={classes.level}>(Level 2)</span>
            </p>
            <div className={classes.chipsContainer}>
              {getCategoryOne()?.children?.map((catTwo) => (
                <SecondaryButton
                  key={catTwo?.id}
                  className={
                    catTwo?.slug === selectedCatTwoSlug
                      ? classes.btnFilter__active
                      : classes.btnFilter
                  }
                  onClick={() => handleSelectCat(1, catTwo)}
                >
                  {catTwo?.display_string}
                </SecondaryButton>
              ))}
            </div>
          </div>
        )}

        {selectedCatTwoSlug && (
          <div className={classes.containerFilterType}>
            <p className={classes.header}>
              Categories <span className={classes.level}>(Level 3)</span>
            </p>
            <div className={classes.chipsContainer}>
              {getCategoryTwo()?.children?.map((catThree) => (
                <SecondaryButton
                  key={catThree?.id}
                  className={
                    catThree?.slug === selectedCatThreeSlug
                      ? classes.btnFilter__active
                      : classes.btnFilter
                  }
                  onClick={() => handleSelectCat(2, catThree)}
                >
                  {catThree?.display_string}
                </SecondaryButton>
              ))}
            </div>
          </div>
        )}

        {ascendingSpecifications?.map((specification) => (
          <div key={specification.id} className={classes.containerFilterType}>
            <p className={classes.header}>{specification.title}</p>

            <div className={classes.chipsContainer}>
              {specification?.values?.map((value) => (
                <SecondaryButton
                  key={value.id}
                  className={
                    !checkSameValueInArray({
                      arr: specificationSelected,
                      key: "idSpecification",
                      comparison: value.id,
                    })
                      ? classes.btnFilter__active
                      : classes.btnFilter
                  }
                  onClick={() =>
                    handleChangeSpecification({
                      idSpecification: value.id,
                      nameSpecification: value.name,
                    })
                  }
                >
                  {value.name}
                </SecondaryButton>
              ))}
            </div>
          </div>
        ))}

        <div className={classes.containerFilterType}>
          <p className={classes.header}>Price Range</p>
          <div className={classes.priceRange}>
            <TextBox
              InputProps={{
                startAdornment: <h6>S$</h6>,
              }}
              size="small"
              placeholder="Min Price"
              onChange={(e) =>
                handleChangePrice({ min: filterNumberOnly(e.target.value) })
              }
              value={minPrice}
              isErrorText={""}
            />
            <p>-</p>
            <TextBox
              InputProps={{
                startAdornment: <h6>S$</h6>,
              }}
              size="small"
              placeholder="Max Price"
              onChange={(e) =>
                handleChangePrice({ max: filterNumberOnly(e.target.value) })
              }
              value={maxPrice}
              errorText={
                isPriceInvalid && "Max price should larger than Min price"
              }
            />
          </div>
          <div className={classes.chipsContainer}>
            {pricesOptions.map((price) => (
              <SecondaryButton
                key={price.id}
                className={
                  price.minPrice == minPrice && price.maxPrice == maxPrice
                    ? classes.btnFilter__active
                    : classes.btnFilter
                }
                onClick={() =>
                  handleChangePrice({
                    min: price.minPrice,
                    max: price.maxPrice,
                  })
                }
              >
                {price.display_string}
              </SecondaryButton>
            ))}
          </div>
        </div>

        <div className={classes.containerFilterType}>
          <p className={classes.header}>Ratings</p>
          <div className={classes.chipsContainer}>
            {ratingOptions.map((rating) => (
              <SecondaryButton
                key={rating.id}
                onClick={() => handleChangeRating(rating.value)}
                className={
                  selectedRating == rating.value
                    ? classes.btnFilter__active
                    : classes.btnFilter
                }
              >
                {rating.isEnable.map((_, key) => (
                  <StarRounded key={key} className={classes.star} />
                ))}
                {rating.isDisable.map((_, key) => (
                  <StarBorder key={key} className={classes.star} />
                ))}
              </SecondaryButton>
            ))}
          </div>
        </div>
        <div className={classes.containerFilterType}>
          <p className={classes.header}>Offers</p>
          <div className={classes.chipsContainer}>
            {offerOptions?.map((offer) => (
              <SecondaryButton
                key={offer.id}
                onClick={() => handleChangeOffer(offer.value)}
                className={
                  isSelectedOffer(offer.value)
                    ? classes.btnFilter__active
                    : classes.btnFilter
                }
              >
                {offer.display_string}
              </SecondaryButton>
            ))}
          </div>
        </div>
      </section>
      <div className={classes.footer}>
        <Link href={urlSearchParams}>
          <SecondaryButton fullWidth>Reset Filter</SecondaryButton>
        </Link>
        <PrimaryButton
          disabled={isPriceInvalid}
          onClick={handleApplyFilter}
          fullWidth
        >
          Apply Filter
        </PrimaryButton>
      </div>
    </Drawer>
  );
};

export default DrawerFilterProducts;
