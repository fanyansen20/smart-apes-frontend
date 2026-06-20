import React, { useState } from "react";
// Next
import Image from "next/image";
import Link from "next/link";

// Mui
import { Grid, Typography } from "@mui/material";

// Style
import classes from "./_return-and-refund.module.scss";

// Image
import illustrationReturnAndRefund from "@public/assets/images/return-and-refund/illustration-banner.svg";

// Hooks
import useAnimateReturnRefund from "@hooks/return-and-refund/useAnimateReturnRefund";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";

// Constants
import dataReturnAndRefund from "./dataReturnAndRefund.js";

const ReturnAndRefund = () => {
  const returnProductData = dataReturnAndRefund?.returnProduct?.items;
  const refundProceedData = dataReturnAndRefund?.refundProceed?.items;
  const claimReplacementData = dataReturnAndRefund?.claimReplacement?.items;

  const [imageReturnProduct, setImageReturnProduct] = useState(
    returnProductData[0].image.src
  );
  const [imageRefundProceed, setImageRefundProceed] = useState(
    refundProceedData[0].image.src
  );
  const [imageReplacementData, setImageReplacementData] = useState(
    claimReplacementData[0].image.src
  );
  const [isLoadImage, setIsImageLoad] = useState(false);

  useAnimateReturnRefund({
    data: returnProductData,
    setImage: setImageReturnProduct,
    setIsImageLoad,
  });

  useAnimateReturnRefund({
    data: refundProceedData,
    setImage: setImageRefundProceed,
    setIsImageLoad,
  });

  useAnimateReturnRefund({
    data: claimReplacementData,
    setImage: setImageReplacementData,
    setIsImageLoad,
  });

  /**
   *
   * @param {{
   * image : string
   * type : 'returnProduct' | 'refundProceed' | 'replacement'
   *}} props
   */
  const handlerChangeImage = ({ image, type }) => {
    setIsImageLoad((prevState) => !prevState);
    if (type === "returnProduct") setImageReturnProduct(image);
    if (type === "refundProceed") setImageRefundProceed(image);
    if (type === "replacement") setImageReplacementData(image);
    setTimeout(() => setIsImageLoad((prevState) => !prevState), 300);
  };

  return (
    <Grid container xs={12} p={2} gap={3}>
      <Grid container className={classes.container} gap={3}>
        <Typography className={classes.pageTitle}>
          <span className={classes.highlight}>Easy Steps </span>
          for Returning Products and Claiming Replacements
        </Typography>
        <Typography>
          At SMART APES Platform, customer satisfaction is our priority.
          We&apos;ve simplified the return, refund, and replacement process,
          making it easy and quick.
        </Typography>

        <Image
          src={illustrationReturnAndRefund}
          alt="illustration return and refund"
        />
      </Grid>

      {/* How To Return Product */}
      <Grid item className={classes.container} xs={12} gap={3}>
        <Typography className={classes.pageTitle}>
          How To Return Product ?
        </Typography>

        <Grid className={classes.contentHowTo}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <div className={classes.dashedBorder} />
              <Grid
                container
                wrap="no-wrap"
                direction={"row"}
                className={classes.containerListHowTo}
              >
                {returnProductData?.map((data, key) => (
                  <Grid
                    key={key}
                    className={`${classes.containerListNumber} ${
                      imageReturnProduct == data.image.src && classes.active
                    }`}
                    onClick={() =>
                      handlerChangeImage({
                        image: data.image.src,
                        type: "returnProduct",
                      })
                    }
                  >
                    <div className={classes.circleListContainer}>
                      <div className={classes.borderCircle}>
                        <div className={classes.circleItem}>{key + 1}</div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>

              <Grid item>
                <Image
                  src={imageReturnProduct}
                  className={
                    isLoadImage ? classes.imageTutor : classes.imageTutorAnimate
                  }
                  alt="Image Return Product"
                  width={200}
                  height={200}
                />
              </Grid>

              {returnProductData.map(
                (data, key) =>
                  imageReturnProduct == data.image.src && (
                    <Typography key={key}>{data.subTitle}</Typography>
                  )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* When The Refund Proceed  */}
      <Grid item className={classes.container} xs={12} gap={3}>
        <Typography className={classes.pageTitle}>
          When The Refund Proceed
        </Typography>

        <Grid className={classes.contentHowTo}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <div className={classes.dashedBorder} />
              <Grid
                container
                wrap="no-wrap"
                direction={"row"}
                className={classes.containerListHowTo}
              >
                {refundProceedData?.map((data, key) => (
                  <Grid
                    key={key}
                    className={`${classes.containerListNumber} ${
                      imageRefundProceed == data.image.src && classes.active
                    }`}
                    onClick={() =>
                      handlerChangeImage({
                        image: data.image.src,
                        type: "refundProceed",
                      })
                    }
                  >
                    <div className={classes.circleListContainer}>
                      <div className={classes.borderCircle}>
                        <div className={classes.circleItem}>{key + 1}</div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>

              <Grid item>
                <Image
                  src={imageRefundProceed}
                  className={
                    isLoadImage ? classes.imageTutor : classes.imageTutorAnimate
                  }
                  alt="Image Refund Product"
                  width={200}
                  height={200}
                />
              </Grid>

              {refundProceedData.map(
                (data, key) =>
                  imageRefundProceed == data.image.src && (
                    <Typography key={key}>{data.subTitle}</Typography>
                  )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* How To Claim Replacement */}
      <Grid item className={classes.container} xs={12} gap={3}>
        <Typography className={classes.pageTitle}>
          How To Claim Replacement
        </Typography>

        <Grid className={classes.contentHowTo}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <div className={classes.dashedBorder} />
              <Grid
                container
                wrap="no-wrap"
                direction={"row"}
                className={classes.containerListHowTo}
              >
                {claimReplacementData?.map((data, key) => (
                  <Grid
                    key={key}
                    className={`${classes.containerListNumber} ${
                      imageReplacementData == data.image.src && classes.active
                    }`}
                    onClick={() =>
                      handlerChangeImage({
                        image: data.image.src,
                        type: "replacement",
                      })
                    }
                  >
                    <div className={classes.circleListContainer}>
                      <div className={classes.borderCircle}>
                        <div className={classes.circleItem}>{key + 1}</div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>

              <Grid item>
                <Image
                  src={imageReplacementData}
                  className={
                    isLoadImage ? classes.imageTutor : classes.imageTutorAnimate
                  }
                  alt="Image replacement Product"
                  width={200}
                  height={200}
                />
              </Grid>

              {claimReplacementData.map(
                (data, key) =>
                  imageReplacementData == data.image.src && (
                    <Typography key={key}>{data.subTitle}</Typography>
                  )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.containerNeedHelpSection}
      >
        <Typography className={classes.titleSection}>
          Need more help?
        </Typography>
        <Typography className={classes.textSection}>
          You can find more on our &nbsp;
          <Link href="/faq">
            <a>
              <span className={classes.textLink}>FAQ Page</span>
            </a>
          </Link>
        </Typography>

        <div className={classes.dividerSection}>
          <div className={classes.horizontalDivider} />
          or
          <div className={classes.horizontalDivider} />
        </div>

        <div className={classes.contactSection}>
          <Link href="/contact-us">
            <a>
              <PrimaryButton fullWidth text="Contact Us" />
            </a>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default ReturnAndRefund;
