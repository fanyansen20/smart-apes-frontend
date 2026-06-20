import React from "react";

// hooks
import { useSelector } from "react-redux";

// components
import CardMobile from "view/mobile/components/card";

// mui material
import { Grid } from "@mui/material";

// Next Auth

// style
import classes from "./_WishlistMobile.module.scss";

// assets
import NoWishList from "@public/assets/images/illustration-no-wishlist.png";

// components
import IllustrationPage from "@components/shared/IllustrationPage";
import SkeletonCardMobile from "view/mobile/components/skeleton/SkeletonCardMobile";

const Wishlist = () => {
  const { status, wishListProduct: dataWishlist } = useSelector(
    (store) => store.wishlist
  );

  if (status === "idle" || status === "loading") {
    return (
      <div className={classes.containerWishlist}>
        <Grid
          container
          gap={1}
          direction="row"
          wrap="wrap"
          justifyContent="space-between"
        >
          {[...Array(10)].map((_, key) => (
            <Grid key={key} item xs={5.8}>
              <SkeletonCardMobile />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  if (dataWishlist?.length <= 0) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "80vh" }}
      >
        <IllustrationPage
          illustrationImage={NoWishList}
          titleIllustration="Your wishlist is Empty"
          contentIllustration="Explore more and  shortlist some item"
        />
      </Grid>
    );
  }

  return (
    <div className={classes.containerWishlist}>
      <Grid
        container
        gap={1}
        direction="row"
        wrap="wrap"
        justifyContent="space-between"
      >
        {dataWishlist?.map((value, key) => (
          <Grid key={key} item xs={5.8}>
            <CardMobile dataProduct={value.product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Wishlist;
