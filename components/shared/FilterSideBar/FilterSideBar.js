// !this component will deprecate
// TODO pages still use this component
// - page search product catalog level 1
// - page search and product catalog level 2
// - page search and product catalog level 3
// - store page and search product in shop

//React
import { useEffect, useState } from "react";

//Next js
import Link from "next/link";

//Material UI
import {
  Button,
  Checkbox,
  Collapse,
  FormHelperText,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";

// icon
import {
  ExpandLess,
  ExpandMore,
  StarBorder,
  StarRounded,
} from "@mui/icons-material";

// constant
import {
  offerOptions,
  pricesOptions,
  ratingOptions,
  storesType,
} from "constant/dynamicFiltering";

// Components
import PrimaryButton from "../Button/PrimaryButton/PrimaryButton";
import TextButton from "../Button/TextButton/TextButton";
import TextBox from "../TextBox/TextBox";

const FilterSideBar = ({
  dataSpecificationFilters,
  dataCategoryLevelOne = [],
  slugLevelOne,
  slugLevelTwo,
  slugCategoryThree,
  handlerSpecificationCategoriesFilters,
  handlerDynamicFilters,
  idSpecifications,
  isShopPage = false,
  setQueryRatingsString,
  setQueryPriceString,
  setPage,
  typeProduct = "products",
  loadProduct = false,
  querySearch,
  queryString,
  handlerFilteringCategories,
}) => {
  // TODO : disabled because feature not use yet
  // const [openLocationOptions, setOpenLocationOptions] = useState(true);

  const [openPricesOptions, setOpenPricesOptions] = useState(true);
  const [openRatingOptions, setOpenRatingOptions] = useState(true);
  const [openOfferOptions, setOpenOfferOptions] = useState(true);
  const [openStoreType, setOpenStoreType] = useState(true);

  const [buttonShowMore, setButtonShowMore] = useState(true);
  const [checkedRatings, setCheckedRating] = useState(false);

  const [showCategoriesOneOptions, setShowCategoriesOneOptions] = useState({});
  const [showCategoriesTwoOptions, setShowCategoriesTwoOptions] = useState({});
  const [showCategoriesThree, setShowCategoriesThree] = useState({});

  const [dataSpecificationsFilters, setDataSpecificationsFilters] =
    useState(false);
  const [dataValues, setDataValues] = useState(false);

  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [errorPriceInput, setErrorPriceInput] = useState(false);

  useEffect(() => {
    if (isShopPage) {
      setShowCategoriesTwoOptions({});
      setShowCategoriesThree({});
    }
  }, [showCategoriesOneOptions]);

  useEffect(() => {
    setShowCategoriesOneOptions({});
    setShowCategoriesTwoOptions({});
  }, [querySearch]);

  useEffect(() => {
    if (dataCategoryLevelOne) {
      dataCategoryLevelOne.map((categoryOne) => {
        if (categoryOne.slug === slugLevelOne) {
          setShowCategoriesOneOptions({
            [categoryOne.id]: true,
          });
        }

        categoryOne.children.map((categoryTwo) => {
          if (categoryTwo.slug === slugLevelTwo) {
            setShowCategoriesTwoOptions({
              [categoryTwo.id]: true,
            });
          }
        });
      });
    }
  }, [dataCategoryLevelOne, slugLevelOne]);

  useEffect(() => {
    getDataSpecificationFilter();
    getDataValues();
  }, [dataSpecificationFilters]);

  const getDataSpecificationFilter = async () => {
    if (dataSpecificationFilters) {
      let dataSpecificationsFilters = await dataSpecificationFilters.map(
        (dataSpecificationFilter) => {
          return { ...dataSpecificationFilter, isEnable: true };
        }
      );
      setDataSpecificationsFilters(dataSpecificationsFilters);
    }
  };

  const getDataValues = async () => {
    if (dataSpecificationFilters) {
      const getValues = await dataSpecificationFilters?.map(
        (dataSpecificationFilter) => {
          return dataSpecificationFilter.values.slice(0, 5);
        }
      );
      setDataValues(getValues);
    }
  };

  const showMore = (data) => {
    setButtonShowMore(false);
    setDataValues(data);
  };

  const handlerOpenPriceOptions = () => {
    setOpenPricesOptions(!openPricesOptions);
  };

  const handlerOpenRatingOptions = () => {
    setOpenRatingOptions(!openRatingOptions);
  };

  const ratingHandler = (rating) => {
    setPage(1);
    setQueryRatingsString(rating.query_string);
    setCheckedRating(rating.id);
  };

  const handlerOfferOptions = () => {
    setOpenOfferOptions(!openOfferOptions);
  };

  // TODO : disabled because feature not use yet
  // const handlerLocationOptions = () => {
  //   setOpenLocationOptions(!openLocationOptions);
  // };

  const handlerStoreType = () => {
    setOpenStoreType(!openStoreType);
  };

  const handlerCategoryOneOptions = (categoryLevelOne) => {
    const idCategoryLevelOne = categoryLevelOne.id;

    setShowCategoriesOneOptions({
      [idCategoryLevelOne]: !showCategoriesOneOptions[idCategoryLevelOne],
    });
  };
  const handlerCategoryTwoOptions = (categoryLevelTwo) => {
    const idCategoryLevelOne = categoryLevelTwo.id;

    setShowCategoriesTwoOptions({
      [idCategoryLevelOne]: !showCategoriesTwoOptions[idCategoryLevelOne],
    });
  };

  const handlerDynamicCategoriesOptions = (key) => {
    let _dataSpecificationsFilters = [...dataSpecificationsFilters];
    _dataSpecificationsFilters[key].isEnable =
      !_dataSpecificationsFilters[key].isEnable;

    setDataSpecificationsFilters(_dataSpecificationsFilters);
  };

  const minPriceChangeHandler = (e) => {
    const validatePrice = /^[0-9]*\.?[0-9]+$/;

    if (e.target.value >= 0 || validatePrice.test(e.target.value)) {
      setMinPrice(e.target.value);
      setErrorPriceInput(false);
    }
  };

  const maxPriceChangeHandler = (e) => {
    const validatePrice = /^[0-9]*\.?[0-9]+$/;

    if (e.target.value >= 0 || validatePrice.test(e.target.value)) {
      setMaxPrice(e.target.value);
      setErrorPriceInput(false);
    }
  };

  const handlerApplyPrice = () => {
    const newMinPrice = minPrice != "" ? `price[gte]=${minPrice}` : "";
    const newMaxPrice = maxPrice != "" ? `&price[lte]=${maxPrice}` : "";

    if (!newMinPrice && !newMaxPrice) {
      setPage(1);
      setQueryPriceString(`${newMinPrice}${newMaxPrice}`);
    }

    if (newMinPrice || newMaxPrice) {
      if (newMinPrice && newMaxPrice) {
        if (parseInt(minPrice) > parseInt(maxPrice)) {
          return setErrorPriceInput("Price Range is not valid");
        }
      }
      setPage(1);
      setQueryPriceString(`${newMinPrice}${newMaxPrice}`);
    }
  };

  const handlerChoosePrice = (price) => {
    setMaxPrice(price.maxPrice);
    setMinPrice(price.minPrice);
    setPage(1);
  };

  return (
    <Grid className="filter">
      {typeProduct == "products" && (
        <>
          <Grid className="filterHeader">
            <Typography className="filterHeaderText">Category</Typography>
          </Grid>

          {loadProduct &&
            [...Array(4)].map((_, key) => <Skeleton key={key} height={30} />)}

          {isShopPage &&
            dataCategoryLevelOne &&
            !loadProduct &&
            dataCategoryLevelOne.map((categoryLevelOne, key) => (
              <List
                key={key}
                className={
                  showCategoriesOneOptions[categoryLevelOne.id]
                    ? "containerFilterCategory__active"
                    : "containerFilterCategory"
                }
              >
                <ListItemButton disabled={loadProduct}>
                  <Button
                    onClick={() => handlerCategoryOneOptions(categoryLevelOne)}
                  >
                    {showCategoriesOneOptions[categoryLevelOne.id] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </Button>
                  <ListItemText
                    className={
                      showCategoriesOneOptions[categoryLevelOne.id]
                        ? "filterHeaderTextActive"
                        : "filterHeaderText"
                    }
                    onClick={() =>
                      handlerFilteringCategories(
                        categoryLevelOne,
                        setShowCategoriesOneOptions
                      )
                    }
                    primary={categoryLevelOne.display_string}
                  />
                </ListItemButton>

                {/* category level two */}
                <Collapse
                  in={showCategoriesOneOptions[categoryLevelOne.id]}
                  unmountOnExit
                >
                  {categoryLevelOne?.children?.map((categoryLevelTwo, key) => (
                    <>
                      <ListItemButton
                        disabled={loadProduct}
                        key={key}
                        onClick={() =>
                          handlerFilteringCategories(
                            categoryLevelTwo,
                            setShowCategoriesTwoOptions
                          )
                        }
                        className={
                          showCategoriesTwoOptions[categoryLevelTwo.id]
                            ? "containerCategoriesTwoFilter__active"
                            : "containerCategoriesTwoFilter"
                        }
                      >
                        <Button
                          onClick={() =>
                            handlerCategoryTwoOptions(categoryLevelTwo)
                          }
                        >
                          {showCategoriesTwoOptions[categoryLevelTwo.id] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </Button>
                        <ListItemText
                          primary={categoryLevelTwo.display_string}
                        />
                      </ListItemButton>

                      {/* category level three */}
                      <Collapse
                        in={showCategoriesTwoOptions[categoryLevelTwo.id]}
                        unmountOnExit
                      >
                        {categoryLevelTwo?.children?.map(
                          (categoryLevelThree, key) => (
                            <ListItemButton
                              key={key}
                              disabled={loadProduct}
                              onClick={() =>
                                handlerFilteringCategories(
                                  categoryLevelThree,
                                  setShowCategoriesThree
                                )
                              }
                              className={
                                showCategoriesThree[categoryLevelThree.id]
                                  ? "containerCategoriesThreeFilter__active"
                                  : "containerCategoriesThreeFilter"
                              }
                            >
                              <ListItemText
                                primary={categoryLevelThree.display_string}
                              />
                            </ListItemButton>
                          )
                        )}
                      </Collapse>
                    </>
                  ))}
                </Collapse>
              </List>
            ))}

          {/* drop down filter category */}
          {!isShopPage &&
            dataCategoryLevelOne &&
            dataCategoryLevelOne.map((categoryLevelOne, key) => (
              <List
                key={key}
                className={
                  showCategoriesOneOptions[categoryLevelOne.id]
                    ? "containerFilterCategory__active"
                    : "containerFilterCategory"
                }
              >
                <Grid container alignItems="center">
                  <Button
                    onClick={() => handlerCategoryOneOptions(categoryLevelOne)}
                  >
                    {showCategoriesOneOptions[categoryLevelOne.id] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </Button>
                  <Link href={`/category/${categoryLevelOne.slug}`}>
                    <a>
                      <ListItemText
                        className={
                          showCategoriesOneOptions[categoryLevelOne.id]
                            ? "filterHeaderTextActive"
                            : "filterHeaderText"
                        }
                        primary={categoryLevelOne.display_string}
                      />
                    </a>
                  </Link>
                </Grid>

                {/* category level two */}
                <Collapse
                  in={showCategoriesOneOptions[categoryLevelOne.id]}
                  unmountOnExit
                >
                  {categoryLevelOne?.children?.map((categoryLevelTwo, key) => (
                    <>
                      <ListItemButton
                        key={key}
                        className={
                          showCategoriesTwoOptions[categoryLevelTwo.id]
                            ? "containerCategoriesTwoFilter__active"
                            : "containerCategoriesTwoFilter"
                        }
                      >
                        <Button
                          onClick={() =>
                            handlerCategoryTwoOptions(categoryLevelTwo)
                          }
                        >
                          {showCategoriesTwoOptions[categoryLevelTwo.id] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </Button>
                        <Link
                          href={`/category/${categoryLevelOne.slug}/${categoryLevelTwo.slug}`}
                        >
                          <a>
                            <ListItemText
                              primary={categoryLevelTwo.display_string}
                            />
                          </a>
                        </Link>
                      </ListItemButton>

                      {/* category level three */}
                      <Collapse
                        in={showCategoriesTwoOptions[categoryLevelTwo.id]}
                        unmountOnExit
                      >
                        {categoryLevelTwo?.children?.map(
                          (categoryLevelThree, key) => (
                            <ListItemButton
                              key={key}
                              disabled={
                                slugCategoryThree == categoryLevelThree.slug
                              }
                              className={
                                slugCategoryThree == categoryLevelThree.slug
                                  ? "containerCategoriesThreeFilter__active"
                                  : "containerCategoriesThreeFilter"
                              }
                            >
                              <Link
                                href={`/category/${categoryLevelOne.slug}/${categoryLevelTwo.slug}/${categoryLevelThree.slug}`}
                              >
                                <a>
                                  <ListItemText
                                    primary={categoryLevelThree.display_string}
                                  />
                                </a>
                              </Link>
                            </ListItemButton>
                          )
                        )}
                      </Collapse>
                    </>
                  ))}
                </Collapse>
              </List>
            ))}

          {/* drop down filter dynamic filters */}

          {!isShopPage &&
            dataSpecificationsFilters &&
            dataSpecificationsFilters.map(
              (dataSpecificationFilter, key) =>
                dataSpecificationFilter.values.length != 0 && (
                  <List key={key} className="filterContainer">
                    <ListItemButton
                      onClick={() => handlerDynamicCategoriesOptions(key)}
                    >
                      <ListItemText
                        className="filterHeaderText"
                        primary={dataSpecificationFilter.title}
                      />
                      {dataSpecificationFilter.isEnable ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={dataSpecificationFilter.isEnable}
                      unmountOnExit
                    >
                      <List disablePadding>
                        <Grid className="containerFilter" sx={{ pl: 2 }}>
                          {dataValues && dataValues.length >= 5
                            ? dataValues[key].map((value, key) => (
                                <Grid key={key}>
                                  <Checkbox
                                    size="small"
                                    color="secondary"
                                    checked={idSpecifications.includes(
                                      value.id
                                    )}
                                    onChange={() => {
                                      handlerSpecificationCategoriesFilters(
                                        value
                                      ),
                                        setPage(1);
                                    }}
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                  <Typography>{value.name}</Typography>
                                </Grid>
                              ))
                            : dataSpecificationFilter.values.map(
                                (value, key) => (
                                  <Grid key={key}>
                                    <Checkbox
                                      size="small"
                                      color="secondary"
                                      checked={idSpecifications.includes(
                                        value.id
                                      )}
                                      onChange={() =>
                                        handlerSpecificationCategoriesFilters(
                                          value
                                        )
                                      }
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                    <Typography>{value.name}</Typography>
                                  </Grid>
                                )
                              )}
                        </Grid>
                      </List>
                    </Collapse>
                    {dataSpecificationFilter.values.length > 5 &&
                      buttonShowMore && (
                        <TextButton
                          onClick={() => showMore(dataSpecificationFilter)}
                          fullWidth
                          text="See more"
                        />
                      )}
                  </List>
                )
            )}

          {/* drop down filter prices */}
          <List className="filterContainer">
            <ListItemButton onClick={handlerOpenPriceOptions}>
              <ListItemText
                className="filterHeaderText"
                primary="Price Range"
              />
              {openPricesOptions ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPricesOptions} unmountOnExit>
              <List disablePadding>
                <Grid className="containerFilter" container alignItems="center">
                  <div className="inputFilter">
                    S$
                    <TextBox
                      size="small"
                      placeholder="Min Price"
                      onChange={minPriceChangeHandler}
                      value={minPrice}
                      isErrorText={errorPriceInput}
                    />
                  </div>
                </Grid>
                <Grid className="containerFilter" container alignItems="center">
                  <div className="inputFilter">
                    S$
                    <TextBox
                      size="small"
                      placeholder="Max Price"
                      onChange={maxPriceChangeHandler}
                      value={maxPrice}
                      isErrorText={errorPriceInput}
                    />
                  </div>
                  <FormHelperText
                    error
                    sx={{ marginRight: 2, alignSelf: "end" }}
                  >
                    {errorPriceInput}
                  </FormHelperText>
                </Grid>
                <Grid>
                  <PrimaryButton
                    onClick={handlerApplyPrice}
                    fullWidth
                    text="Apply Price"
                  />
                </Grid>
                <Grid className="containerFilter" sx={{ pl: 2 }}>
                  <Grid container gap="5px">
                    {pricesOptions.map((price, key) => (
                      <Button
                        onClick={() => {
                          handlerChoosePrice(price),
                            setQueryPriceString(price.query_string);
                        }}
                        key={key}
                      >
                        {price.display_string}
                      </Button>
                    ))}
                  </Grid>
                </Grid>
              </List>
            </Collapse>
          </List>

          {/* drop down filter ratings */}
          {!isShopPage && (
            <List className="filterContainer">
              <ListItemButton onClick={handlerOpenRatingOptions}>
                <ListItemText className="filterHeaderText" primary="Ratings" />
                {openRatingOptions ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openRatingOptions} unmountOnExit>
                <List disablePadding>
                  <Grid className="containerFilter" sx={{ pl: 2 }}>
                    {ratingOptions.map((rating, key) => (
                      <Grid
                        key={key}
                        container
                        alignItems="center"
                        className="ratingContainer"
                      >
                        <Button
                          disabled={checkedRatings == rating.id}
                          onClick={() => ratingHandler(rating)}
                        >
                          {rating.isEnable.map((_, key) => (
                            <StarRounded key={key} className="star" />
                          ))}
                          {rating.isDisable.map((_, key) => (
                            <StarBorder key={key} className="star" />
                          ))}
                          {rating.isEnable.length <= 4 && (
                            <Typography> & up</Typography>
                          )}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>

                  {checkedRatings && (
                    <TextButton
                      fullWidth
                      text="Clear Ratings"
                      onClick={() => {
                        setCheckedRating(false),
                          setPage(1),
                          setQueryRatingsString([]);
                      }}
                    />
                  )}
                </List>
              </Collapse>
            </List>
          )}

          {/* drop down filter offers */}
          {!isShopPage && (
            <List className="filterContainer">
              <ListItemButton onClick={handlerOfferOptions}>
                <ListItemText className="filterHeaderText" primary="Offers" />
                {openOfferOptions ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openOfferOptions} unmountOnExit>
                <List disablePadding>
                  <Grid className="containerFilter" sx={{ pl: 2 }}>
                    {offerOptions.map((offer, key) => (
                      <Grid
                        key={key}
                        container
                        alignItems="center"
                        onClick={() => {
                          handlerDynamicFilters(offer), setPage(1);
                        }}
                      >
                        <Checkbox
                          size="small"
                          checked={queryString.includes(
                            `&${offer.query_string}`
                          )}
                          inputProps={{ "aria-label": "controlled" }}
                          color="secondary"
                        />
                        <Typography>{offer.display_string}</Typography>
                      </Grid>
                    ))}
                  </Grid>
                </List>
              </Collapse>
            </List>
          )}
        </>
      )}

      {/* filtering for shop */}
      {typeProduct == "shops" && (
        <List className="filterContainer">
          <ListItemButton onClick={handlerStoreType}>
            <ListItemText className="filterHeaderText" primary="Store Type" />
            {openStoreType ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openStoreType} unmountOnExit>
            <List disablePadding>
              <Grid className="containerFilter" sx={{ pl: 2 }}>
                {storesType.map((store, key) => (
                  <Grid
                    key={key}
                    onClick={() => {
                      handlerDynamicFilters(store), setPage(1);
                    }}
                    container
                    alignItems="center"
                  >
                    <Checkbox
                      checked={queryString.includes(`&${store.query_string}`)}
                      color="secondary"
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <Typography>{store.display_string}</Typography>
                  </Grid>
                ))}
              </Grid>
            </List>
          </Collapse>
        </List>
      )}

      {/* <List className="filterContainer">
        <ListItemButton onClick={handlerLocationOptions}>
          <ListItemText className="filterHeaderText" primary="Locations" />
          {openLocationOptions ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openLocationOptions} unmountOnExit>
          <List disablePadding>
            <Grid className="containerFilter" sx={{ pl: 2 }}>
              {locationOptions.map((location, key) => (
                <Grid
                  key={key}
                  onClick={() => {
                    handlerDynamicFilters(location.query_string), setPage(1);
                  }}
                  container
                  alignItems="center"
                >
                  <Checkbox color="secondary" name={key} />
                  <Typography>{location.display_string}</Typography>
                </Grid>
              ))}
            </Grid>
          </List>
        </Collapse>
      </List> */}
    </Grid>
  );
};

export default FilterSideBar;
