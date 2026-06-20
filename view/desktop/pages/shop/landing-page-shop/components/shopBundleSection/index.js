import React from "react";

// Mui material
import { Grid, Typography } from "@mui/material";

// Style
import classes from "./_ShopBundleSection.module.scss";

// Component
import BundleCardShop from "../bundleCardShop";

const ShopBundleContainer = ({ dataBundles }) => {
  return (
    <div className={classes.containerBundleShop}>
      <Typography className={classes.titleBundle}>Bundling Promo</Typography>
      <Grid className={classes.containerCardBundle}>
        {dataBundles.map((bundle, key) => (
          <Grid key={key}>
            <BundleCardShop bundle={bundle} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShopBundleContainer;
