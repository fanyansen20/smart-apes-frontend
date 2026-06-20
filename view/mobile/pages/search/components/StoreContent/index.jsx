import { useRouter } from "next/router";
import React, { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// mui materials
import { Avatar, Container, Grid } from "@mui/material";

// assets
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import IllustrationPage from "@components/shared/IllustrationPage";
import { truncateString } from "@helper/truncateString";
import NoStoreFound from "@public/assets/images/no-store-found.png";
import Link from "next/link";
import { getSearchShopData } from "store/reducer/getSearchResults/getSearchShopData";
import classes from "./_StoreContent.module.scss";

const StoreContent = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();

  const { query: queryStringSearch, offers: offersSelected } = query;

  useEffect(() => {
    getDataShops();
  }, [offersSelected]);

  const { totalResults: totalShops, resultShop } = useSelector(
    (store) => store.resultSearchShopsData
  );

  const getDataShops = () => {
    const offers = offersSelected?.split("-");

    const isVerified = offers?.includes("verified");
    const isUnverified = offers?.includes("unverified");

    let params = new URLSearchParams();
    if (isVerified) params.append("is_verified", true);
    if (isUnverified) params.append("is_unverified", true);

    dispatch(
      getSearchShopData({
        queryStringSearch,
        queryParams: `&${params.toString()}`,
        limit: 20,
      })
    );
  };

  if (!totalShops) {
    return (
      <IllustrationPage
        isMobileSize
        illustrationImage={NoStoreFound}
        titleIllustration="No Store to Display"
        contentIllustration="We are sorry. There is No Store related to your keyword."
      />
    );
  }

  return (
    <Container>
      <Grid container direction="column" gap={2}>
        {resultShop.map((shop, key) => (
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            key={key}
            className={classes.storeCard}
          >
            <Grid xs={8} item container direction="row" gap={2}>
              <Avatar src={shop.logo_url} alt={shop.name} />

              <Grid item xs={8} alignSelf="start" alignItems="center">
                <h6>{truncateString(shop.name, 16)}</h6>
                <p className={classes.shopType}>{shop.shop_type}</p>
              </Grid>
            </Grid>

            <Link href={`/${shop.slug}`}>
              <SecondaryButton>Visit Store</SecondaryButton>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StoreContent;
