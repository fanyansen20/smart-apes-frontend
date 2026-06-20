import React, { Fragment } from "react";

// Next JS
import Image from "next/image";

// MUI
import { Grid, Typography } from "@mui/material";

// Component
import PurpleChip from "../PurpleChip";

// Styles
import classes from "./_BenefitSection.module.scss";

// Constant
import { ServiceList } from "../../../../../../constant/aboutUsConstant";

const ServiceSection = () => {
  return (
    <Fragment>
      <PurpleChip title="BENEFITS" />
      <Typography className={classes.title}>Our Services</Typography>
      {ServiceList.map(({ imageUrl, imageAlt, title, subtitle }, index) => {
        return (
          <Grid key={index} className={classes.servicesContainer}>
            <Image src={imageUrl} objectFit="contain" alt={imageAlt} />
            <Typography className={classes.servicesTitle}>{title}</Typography>
            <Typography className={classes.servicesSubtitle}>
              {subtitle}
            </Typography>
          </Grid>
        );
      })}
    </Fragment>
  );
};

export default ServiceSection;
