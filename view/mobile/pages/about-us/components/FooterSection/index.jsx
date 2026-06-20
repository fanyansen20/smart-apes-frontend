import React, { Fragment } from "react";

// Next JS
import Image from "next/image";
import { useRouter } from "next/router";

// MUI
import { Container, Grid, Typography } from "@mui/material";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";

// Styles
import classes from "./_FooterSection.module.scss";

// Icon
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@public/assets/icons/icon-email-light.svg";

const FooterSection = () => {
  const router = useRouter();

  // #region function
  const navigateToHomePage = () => {
    router.push("/");
    window.scrollTo(0, 0);
  };
  // #endregion

  return (
    <Fragment>
      <Container>
        <Grid container gap={2} className={classes.exploreContainer}>
          <Typography className={classes.exploreTitle}>
            Dive in to our Educational Marketplace for a world of knowledge,
            Explore now and spark curiosity!
          </Typography>
          <PrimaryButton fullWidth onClick={navigateToHomePage}>
            Explore SMART APES Now
          </PrimaryButton>
        </Grid>
      </Container>
      <Grid className={classes.socialMediaContainer}>
        <Typography className={classes.title}>Find SMART APES on</Typography>
        <Grid container gap={2} justifyContent="center" alignItems="center">
          <PrimaryButton text={<InstagramIcon color="inherit" />} />
          <PrimaryButton text={<FacebookIcon color="inherit" />} />
          <PrimaryButton
            text={
              <Image width={24} height={24} src={EmailIcon} alt="email Icon" />
            }
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default FooterSection;
