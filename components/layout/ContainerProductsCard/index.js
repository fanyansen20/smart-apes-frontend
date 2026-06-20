// !this component will deprecate
// TODO pages still use this component
// - page search product catalog level 1
// - page search and product catalog level 2
// - page search and product catalog level 3
// - store page and search product in shop

//  React
import { useState } from "react";

// Material UI
import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

// Icon
import CloseIcon from "@mui/icons-material/Close";

// Components
import NoProductFound from "@components/layout/NoProductFound";
import NoStoreFound from "@components/layout/NoStoreFound";
import CardStore from "view/desktop/components/card/CardStore";
import ProductCard from "view/desktop/components/card/ProductCart";
import SkeletonProductCard from "../../../view/desktop/components/skeleton/SkeletonProductCard";
import SkeletonStoreCard from "../../../view/desktop/components/skeleton/SkeletonStoreCard";

// helper
import { truncateString } from "@helper/truncateString";

function TabPanel({ children, value, index, name }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...name}
    >
      {value === index && <Box sx={{ marginTop: "34px" }}>{children}</Box>}
    </div>
  );
}

const ContainerProductsCard = ({
  deleteChips,
  titleName,
  totalProduct,
  totalShops,
  keyword,
  dataProducts,
  cartLoad,
  totalPages,
  searchProduct,
  productDisplay,
  page,
  setPage,
  setSearchType,
  searchType,
  setSortBy,
  isQuerySearch,
  isProductInShop,
  handlerResetState,
  chips,
}) => {
  const [sort, setSort] = useState("product.stats.total_sales:desc");
  const [value, setValue] = useState(0);

  const decodeQuerySearch = truncateString(decodeURIComponent(keyword), 100);

  const handleChangeTabs = (event, newValue) => {
    window.scrollTo(0, 0);
    setSortBy("product.stats.total_sales:desc");
    setSort("product.stats.total_sales:desc");
    setSearchType(event.target.name);
    setValue(newValue);
    handlerResetState();
  };

  const sortChangeHandler = (event) => {
    window.scrollTo(0, 0);
    setSortBy(event.target.value);
    setSort(event.target.value);
  };

  const pageChangeHandler = (_event, value) => {
    window.scrollTo(0, 0);
    setPage(value);
  };

  return (
    <>
      {/* header content */}
      {dataProducts < 0 ? (
        <Grid container justifyContent="space-between" alignItems="center">
          <Skeleton variant="rounded" width="30%" height={20} />
          <Skeleton variant="rounded" width="10%" height={20} />
        </Grid>
      ) : (
        <>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid
              item
              md={dataProducts?.length != 0 && 8}
              sx={{ textAlign: "left" }}
              container
              gap={1}
              direction="column"
            >
              {isProductInShop && !isQuerySearch ? (
                <Typography>
                  Showing all product in <b>{titleName}</b>
                </Typography>
              ) : (
                <>
                  {dataProducts && (
                    <Typography>
                      Showing <b>{totalProduct}</b> products &nbsp;for&nbsp;
                      <b>{decodeQuerySearch}&nbsp;</b>
                      {!searchProduct &&
                        productDisplay &&
                        titleName != keyword && (
                          <>
                            in <b>{titleName}</b>
                          </>
                        )}
                    </Typography>
                  )}

                  {searchProduct && !productDisplay && (
                    <Typography>
                      Showing <b>{totalShops}</b> Store for{" "}
                      <b>{decodeQuerySearch}</b>
                    </Typography>
                  )}
                </>
              )}
            </Grid>

            {dataProducts?.length > 0 && searchType !== "shops" && (
              <Grid className="containerSortBy">
                <Typography>Sort by</Typography>
                <Select
                  displayEmpty={true}
                  value={sort}
                  onChange={sortChangeHandler}
                >
                  <MenuItem value="product.stats.total_sales:desc">
                    <Typography>Top Sales</Typography>
                  </MenuItem>
                  <MenuItem value="product.price:desc">
                    <Typography>Highest Price</Typography>
                  </MenuItem>
                  <MenuItem value="product.price:asc">
                    <Typography>Lowest Price</Typography>
                  </MenuItem>
                </Select>
              </Grid>
            )}
          </Grid>

          {chips && (
            <Grid
              className="containerChips"
              container
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
            >
              {chips.map((chip, key) => (
                <Chip
                  key={key}
                  label={chip.name ? chip.name : chip.display_string}
                  deleteIcon={<CloseIcon />}
                  onDelete={() => deleteChips(chip)}
                />
              ))}
              {chips != 0 && (
                <Button onClick={() => handlerResetState()} variant="text">
                  Clear All
                </Button>
              )}
            </Grid>
          )}
        </>
      )}

      {/* tabs content */}
      {searchProduct && !productDisplay ? (
        <>
          <Tabs
            name="test"
            value={value}
            onChange={handleChangeTabs}
            className="tabProductSearch"
          >
            <Tab label="Physical Product" name="products" />
            <Tab label="Store" name="shops" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Grid container>
              {cartLoad
                ? [...Array(20)].map((_, key) => (
                    <Grid
                      item
                      xs={5}
                      md={2.4}
                      key={key}
                      sx={{ padding: "1rem 0" }}
                    >
                      <SkeletonProductCard />
                    </Grid>
                  ))
                : dataProducts?.length > 0
                ? dataProducts?.map((product, key) => (
                    <Grid
                      item
                      xs={5}
                      md={2.4}
                      key={key}
                      sx={{ padding: "1rem 0" }}
                    >
                      <ProductCard product={product} />
                    </Grid>
                  ))
                : searchProduct && (
                    <Grid sx={{ width: "100%" }}>
                      <NoProductFound />
                    </Grid>
                  )}
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Grid container>
              {cartLoad
                ? [...Array(6)].map((_, key) => (
                    <Grid key={key} item xs={5} md={4} sx={{ padding: "10px" }}>
                      <SkeletonStoreCard />
                    </Grid>
                  ))
                : dataProducts?.length > 0
                ? dataProducts?.map((shop, key) => (
                    <Grid item xs={5} md={4} key={key} sx={{ padding: "10px" }}>
                      <CardStore
                        shopName={shop.name}
                        logoShop={shop.logo_url}
                        statusShop={shop.shop_type}
                        shopSlug={shop.slug}
                      />
                    </Grid>
                  ))
                : searchProduct && (
                    <Grid sx={{ width: "100%" }}>
                      <NoStoreFound />
                    </Grid>
                  )}
            </Grid>
          </TabPanel>

          {dataProducts?.length > 0 && !cartLoad && (
            <Pagination
              sx={{ mx: "auto", width: "fit-content" }}
              count={totalPages}
              page={page}
              onChange={pageChangeHandler}
            />
          )}
        </>
      ) : (
        <>
          <Grid container>
            {cartLoad ? (
              [...Array(20)].map((_, key) => (
                <Grid item md={2.4} key={key} sx={{ padding: "1rem 0" }}>
                  <SkeletonProductCard />
                </Grid>
              ))
            ) : dataProducts?.length > 0 ? (
              dataProducts?.map((product, key) => (
                <Grid item md={2.4} key={key} sx={{ padding: "1rem 0" }}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid sx={{ width: "100%" }}>
                <NoProductFound />
              </Grid>
            )}
          </Grid>

          {dataProducts?.length > 0 && !cartLoad && (
            <Pagination
              sx={{ mx: "auto" }}
              count={totalPages}
              page={page}
              onChange={pageChangeHandler}
            />
          )}
        </>
      )}
    </>
  );
};

export default ContainerProductsCard;
