// redux
import { useDispatch, useSelector } from "react-redux";

// react
import { memo, useEffect, useState } from "react";

// Mui Material
import {
  Container,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";

// Components
import IllustrationPage from "@components/shared/IllustrationPage";
import ProductCard from "view/desktop/components/card/ProductCart";
import SkeletonProductCard from "view/desktop/components/skeleton/SkeletonProductCard";

// API
import { getWishlistData } from "store/reducer/wishlist/wishlistSlice";

// Images
import NoWishList from "@public/assets/images/illustration-no-wishlist.png";

const Wishlist = () => {
  const dispatch = useDispatch();
  const {
    wishListProduct: dataWishList,
    status,
    totalPages: totalPagesProduct,
  } = useSelector((store) => store.wishlist);

  const loadProduct = status === "idle" || status === "loading";

  const [sortBy, setSortBy] = useState("product.stats.total_sales:desc");
  const [numberPage, setNumberPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getWishlistData({ sortBy, page: numberPage }));
  }, [sortBy, numberPage]);

  const sortChangeHandler = (event) => {
    window.scrollTo(0, 0);
    setNumberPage(1);
    setSortBy(event.target.value);
  };

  const handleChangePage = (_event, newPage) => {
    setNumberPage(newPage);
  };

  return (
    <Container maxWidth="lg" className="container-wishlist">
      <Grid container justifyContent="space-between">
        <Typography className="header-content">Your Wishlist</Typography>
        {dataWishList?.length !== 0 && (
          <Grid className="containerSortBy">
            <Typography>Sort by</Typography>
            <Select
              displayEmpty={true}
              value={sortBy}
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

      {dataWishList?.length === 0 ? (
        <div className="container-image-no-wishlist">
          <IllustrationPage
            illustrationImage={NoWishList}
            titleIllustration="Your wishlist is Empty"
            contentIllustration="Explore more and  shortlist some item"
          />
        </div>
      ) : (
        <Grid className="card-wishlist-container">
          {dataWishList && !loadProduct
            ? dataWishList.map((item, key) => (
                <div key={key} className="card-item">
                  <ProductCard size="large" product={item.product} />
                </div>
              ))
            : [...Array(20)].map((_, key) => (
                <div key={key} className="card-item">
                  <SkeletonProductCard size="large" />
                </div>
              ))}
        </Grid>
      )}

      {dataWishList && dataWishList.length !== 0 && (
        <Grid className="container-pagination">
          <Pagination
            count={totalPagesProduct}
            page={numberPage}
            onChange={handleChangePage}
          />
        </Grid>
      )}
    </Container>
  );
};

export default memo(Wishlist);
