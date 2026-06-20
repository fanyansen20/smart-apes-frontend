// React
import React, { memo } from "react";

// Next
import Image from "next/image";

// MUI material
import { Grid, Typography } from "@mui/material";

// Css
import classes from "./_ProductsListMobile.module.scss";

// Components
import SkeletonCard from "view/mobile/components/skeleton/SkeletonCardMobile";
import CardMobile from "../../../../components/card";

// Image
import bannerBestSeller from "../../../../assets/images/landing-page/banner-best-seller.svg";

/**
 *
 * @param {{
 *  title: string
 *  dataProduct: Object[]
 *  isLoading: boolean
 * }} props
 */
const ProductsContainerMobile = ({ title, dataProduct, isLoading }) => {
  return (
    <Grid container className={classes.bestSellerContainer} pb={2}>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="space-between"
        className={classes.containerHeaderBestSeller}
      >
        <Typography className={classes.headerTextBestSeller}>
          Best Seller in {title}
        </Typography>
        <Typography className={classes.textLinkTo}>See All</Typography>
      </Grid>

      <div className={classes.bannerPromotion}>
        <Image
          src={bannerBestSeller}
          alt="banner top product"
          objectFit="cover"
        />
      </div>

      <div className={classes.containerCardBestSeller}>
        {isLoading
          ? [...new Array(6)].map((_, key) => <SkeletonCard key={key} />)
          : dataProduct.map((product, key) => (
              <CardMobile key={key} dataProduct={product} />
            ))}
      </div>
    </Grid>
  );
};

export default memo(ProductsContainerMobile);
