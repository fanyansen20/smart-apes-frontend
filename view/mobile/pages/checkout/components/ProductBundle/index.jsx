// React
import React from "react";

// Next
import Image from "next/image";

// MUI Components
import { Avatar, Paper, Stack, Typography } from "@mui/material";

// Icons
import BundleCart from "@public/assets/icons/bundle-cart.svg";
import Discount from "@public/assets/icons/discount.svg";

// Styles
import classes from "../../Checkout.module.scss";

/**
 * @import ProductItem from "../ProductItem"
 */

/**
 * @typedef {typeof ProductItem} ProductItemComponent
 */

/**
 * @param {{
 *  qty: number
 *  title: string
 *  discountPercent: number
 *  totalBasePrice: string
 *  totalSavingPrice: string
 *  isBundleDisabled: boolean
 *  totalDiscountPrice: string
 *  productItems: Array<ProductItemComponent>
 * }} productBundleParam
 *
 * @returns {JSX.Element}
 */

const ProductBundle = ({
  qty,
  title,
  productItems,
  totalBasePrice,
  totalSavingPrice,
  discountPercent,
  isBundleDisabled,
  totalDiscountPrice,
}) => {
  return (
    <Paper
      variant="outlined"
      component={Stack}
      direction="column"
      className={`${classes.productBundleCard} ${
        isBundleDisabled ? "disabled-content" : ""
      }`}
      spacing={1}
    >
      <Stack direction="row" gap={1} alignItems="center">
        <Image
          src={BundleCart}
          width={24}
          height={24}
          alt={`Bundle ${title}`}
        />
        <Typography className={classes.productBundleTitle}>
          {title}
          {` (${qty} set)`}
        </Typography>
      </Stack>
      <Stack direction="row" gap={1} alignItems="center">
        <Typography className={classes.productBundleDiscountPercent}>
          {discountPercent}%
        </Typography>
        <Typography className={classes.productBundleBasePrice}>
          {totalBasePrice}
        </Typography>
        <Typography className={classes.productBundleFinalPrice}>
          {totalDiscountPrice}
        </Typography>
      </Stack>
      <Typography className={classes.productBundleSavingPrice}>
        <Avatar
          sx={{ width: 16, height: 16 }}
          src={Discount.src}
          variant="square"
        />
        <span>You Save {totalSavingPrice}</span>
      </Typography>

      {/* Product Items List in Bundles */}
      {productItems}
    </Paper>
  );
};

export default ProductBundle;
