// next js
import Image from "next/image";

// Mui material
import { Grid, Typography } from "@mui/material";

// Image
import discount from "@public/assets/icons/discount.svg";

// style
import classes from "./_BundleCardShop.module.scss";

// helper
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import { convertDataBundles } from "@helper/convertProductData";
import Link from "next/link";

const BundleCardShop = ({ bundle }) => {
  const {
    totalItems,
    itemsBundles,
    titleBundle,
    productId,
    defaultSavingPrice,
    defaultTotalBasePrice,
    defaultTotalFinalPrice,
    defaultDiscountTotalPercent,
  } = convertDataBundles(bundle);

  return (
    <div className={classes.containerCardBundleShop}>
      <Grid container>
        <div className={classes.labelSaveCost}>
          <Image
            width={20}
            height={20}
            src={discount}
            alt="discount"
            objectFit="contain"
          />
          <Typography>You save {defaultSavingPrice}</Typography>
        </div>
        <Typography className={classes.titleBundle}>{titleBundle}</Typography>
      </Grid>

      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item md={5} className={classes.cardBundleContainer}>
          <Grid className={classes.imageBundle}>
            <Image
              src={itemsBundles[0].imageProduct}
              layout="fill"
              objectFit="contain"
              alt="image product"
            />
          </Grid>
          <Typography>{itemsBundles[0].nameProduct}</Typography>
        </Grid>

        <div className={classes.plusIcon}></div>

        <Grid item md={5} className={classes.cardBundleContainer}>
          {totalItems > 2 && (
            <div className={classes.moreProductTitle}>
              <>
                <Typography>
                  +{totalItems - 1} More
                  <br />
                  product
                </Typography>
              </>
            </div>
          )}
          <Grid className={classes.imageBundle}>
            <Image
              src={itemsBundles[1].imageProduct}
              layout="fill"
              objectFit="contain"
              alt="image product"
            />
          </Grid>
          <Typography>{itemsBundles[1].nameProduct}</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="center"
        gap="16px"
        className={classes.priceOverview}
      >
        <div className={classes.discountPercentage}>
          <Typography>{parseInt(defaultDiscountTotalPercent)}%</Typography>
        </div>
        <Typography className={classes.discountPriceBundle}>
          {defaultTotalBasePrice}
        </Typography>
        <Typography className={classes.priceBundle}>
          {defaultTotalFinalPrice}
        </Typography>
      </Grid>

      <Link href={`../bundles/${productId}`}>
        <a>
          <SecondaryButton text="See Details" />
        </a>
      </Link>
    </div>
  );
};

export default BundleCardShop;
