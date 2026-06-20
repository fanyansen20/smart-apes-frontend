import React, { Fragment } from "react";

// Next JS
import Image from "next/image";

// MUI
import { Grid, Typography } from "@mui/material";

// Styles
import classes from "./_HeaderSection.module.scss";

// Assets
import AboutUsIllustration from "@public/assets/about-us/illustration-about-us.svg";

const HeaderSection = () => {
  return (
    <Fragment>
      <Typography className={classes.title}>
        Empowering <strong>Mind</strong>, to Create{" "}
        <strong>Better Future!</strong>
      </Typography>
      <Typography className={classes.subtitle}>
        Welcome to SMART APES, an innovative educational marketplace fostering
        seamless connections between learners and mentors.
      </Typography>
      <Grid item xs={12} className={classes.aboutUsImage}>
        <Image
          src={AboutUsIllustration}
          objectFit="contain"
          alt="About Us Illustration"
        />
      </Grid>
    </Fragment>
  );
};

export default HeaderSection;
