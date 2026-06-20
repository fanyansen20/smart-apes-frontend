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
import CardMobile from "../card";

/**
 * @param {string} props.title - Title for Products List
 * @param {boolean} props.showHeader - Show title and see all header
 * @param {Object} props.bannerImage - Image Object
 * @param {Object[]} props.dataProduct - Product Attributes Object
 * @param {boolean} props.isLoading - Loading Status
 * @param {Number} props.maxProductLength - Max Products Length
 */
const ProductsContainerMobile = ({
  title,
  isLoading,
  dataProduct,
  bannerImage,
  onClickSeeAll,
  showHeader = true,
  maxProductLength,
}) => {
  // Limit Products Length based on Max Product Length
  if (dataProduct && dataProduct?.length > maxProductLength) {
    dataProduct?.splice(
      maxProductLength,
      dataProduct?.length - maxProductLength
    );
  }

  return (
    <Grid container className={classes.bestSellerContainer}>
      {showHeader && (
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-between"
          className={classes.containerHeaderBestSeller}
        >
          <Typography className={classes.headerTextBestSeller}>
            {title}
          </Typography>
          {onClickSeeAll && (
            <Typography className={classes.textLinkTo} onClick={onClickSeeAll}>
              See All
            </Typography>
          )}
        </Grid>
      )}

      {bannerImage && (
        <div className={classes.bannerPromotion}>
          <Image src={bannerImage} alt="banner top product" objectFit="cover" />
        </div>
      )}

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
