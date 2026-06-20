// Next
import Image from "next/image";
import Link from "next/link";

// MUI material
import { Grid, Typography } from "@mui/material";

// CSS
import classes from "./_BundleProductContainer.module.scss";

// Image
import discount from "@public/assets/icons/discount.svg";

// components
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import SkeletonBundleContent from "view/desktop/components/skeleton/SkeletonBundleContent";

// helper
import { convertDataBundles } from "@helper/convertProductData";

const BundleContent = ({ data, idProduct }) => {
  const dataBundle = data && convertDataBundles(data);

  return (
    <Grid
      container
      gap="16px"
      width="92%"
      className={classes.containerBundlerProduct}
    >
      {dataBundle ? (
        <>
          <Grid>
            <div className={classes.labelSaveCost}>
              <Image
                width={20}
                height={20}
                src={discount}
                alt="discount"
                objectFit="contain"
              />
              <Typography>You save {dataBundle.defaultSavingPrice}</Typography>
            </div>

            <Typography className={classes.titleBundle}>
              {dataBundle.titleBundle}
            </Typography>
          </Grid>

          <Grid container>
            {dataBundle.itemsBundles.map((itemBundle, key) => (
              <Grid key={key} md={2.4} className={classes.cardBundleContainer}>
                <Grid className={classes.imageBundle}>
                  <Image
                    src={itemBundle.imageProduct}
                    layout="fill"
                    objectFit="contain"
                    alt="image product"
                  />
                </Grid>
                <Typography>{itemBundle.nameProduct}</Typography>
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            alignItems="center"
            gap="16px"
            className={classes.priceOverview}
          >
            <div className={classes.discountPercentage}>
              <Typography>
                {parseInt(dataBundle.defaultDiscountTotalPercent)}%
              </Typography>
            </div>
            <Typography className={classes.discountPriceBundle}>
              {dataBundle.defaultTotalBasePrice}
            </Typography>
            <Typography className={classes.priceBundle}>
              {dataBundle.defaultTotalFinalPrice}
            </Typography>
          </Grid>

          <Link href={`../bundles/${idProduct}`}>
            <a>
              <SecondaryButton text="See Details" />
            </a>
          </Link>
        </>
      ) : (
        <SkeletonBundleContent />
      )}
    </Grid>
  );
};

export default BundleContent;
