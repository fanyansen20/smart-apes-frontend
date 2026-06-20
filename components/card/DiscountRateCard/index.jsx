import React from "react";

// Next JS
import Image from "next/image";

// MUI
import { Container, Grid, Typography } from "@mui/material";

// Helper
import { mobileFormatCurrency } from "@helper/checkValue";

// Classes
import classes from "./_DiscountRateCard.module.scss";

// Assets
import DiscountIcon from "@public/assets/icons/discount-rate.svg";

/**
 *
 * @param {{
 * discountRate: import("@types/product").DiscountRate
 * }} param0
 * @returns
 */

const DiscountRateCard = ({ discountRate }) => {
  return (
    <Container className={classes.discountRateContainer}>
      <Grid container flexDirection="column" gap={1}>
        <Typography className={classes.title}>
          Membership EXTRA Discount
        </Typography>
        <Grid item xs={10} className={classes.priceContainer}>
          <Grid className={classes.discountBadge}>
            <Image
              src={DiscountIcon}
              className={classes.discountIcon}
              alt="discount icon"
            />
            <Typography
              className={classes.discountValue}
            >{`+${discountRate?.discount_percent}%`}</Typography>
          </Grid>
          <Typography className={classes.basePrice}>
            {mobileFormatCurrency(discountRate?.price)}
          </Typography>
          <Typography className={classes.price}>
            {mobileFormatCurrency(discountRate?.final_price)}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DiscountRateCard;
