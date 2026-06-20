// Next
import Image from "next/image";

// Mui
import { Container, Grid, Typography } from "@mui/material";

// style
import classes from "./_returnAndRefund.module.scss";

// constant data
import dataReturnAndRefund from "./dataReturnAndRefund";

// components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";

// images
import planetYupPlanet from "@public/assets/images/planet-jup-orange.svg";
import illustrationReturnAndRefund from "@public/assets/images/return-and-refund/illustration-banner.svg";
import illustrationSteps from "@public/assets/images/return-and-refund/illustration-steps.svg";

import Link from "next/link";

const ReturnAndRefund = () => {
  return (
    <>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.containerHeroBanner}
        >
          <Grid className={classes.yupPlanetBg}>
            <Image
              src={planetYupPlanet}
              alt="icon planet yup"
              objectFit="contain"
            />
          </Grid>
          <Grid item container direction="column" md={6}>
            <Typography className={classes.titleText} align="left">
              <span className={classes.primaryText}>Easy Steps </span>
              for Returning Products and Claiming Replacements
            </Typography>
            <Typography className={classes.textBody} align="left">
              At SMART APES Platform, customer satisfaction is our priority.
              We've simplified the return, refund, and replacement process,
              making it easy and quick.
            </Typography>
          </Grid>
          <Grid item md={5}>
            <Image
              src={illustrationReturnAndRefund}
              alt="illustration return and refund"
            />
          </Grid>
        </Grid>

        <Grid container gap="40px">
          {dataReturnAndRefund.map((subItem, key) => (
            <Grid key={key} item>
              <Typography className={classes.titleText}>
                {subItem.title}
              </Typography>

              <Grid container justifyContent="space-around" gap="16px">
                {subItem.items.map((item, key) => (
                  <Grid item md={2.4} key={key}>
                    <div className={classes.imageLayout}>
                      <Image
                        src={item.imgUrl}
                        alt="illustrationBuyer return product"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <Typography className={classes.textBodyBold}>
                      {item.subTitle}
                    </Typography>
                  </Grid>
                ))}

                <Image src={illustrationSteps} alt="illustration steps" />
              </Grid>
            </Grid>
          ))}
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
            <Link href="/faq/1">
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

          <Link href="/contact-us">
            <a>
              <PrimaryButton text="Contact Us" />
            </a>
          </Link>
        </Grid>
      </Container>
    </>
  );
};

export default ReturnAndRefund;
