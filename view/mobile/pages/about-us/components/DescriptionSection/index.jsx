import React, { Fragment } from "react";

// Next JS
import Image from "next/image";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import PurpleChip from "../PurpleChip";

// Styles
import classes from "./_DescriptionSection.module.scss";

/**
 *
 * @param {{
 * chipTitle: string;
 * imageUrl: string;
 * imageAlt: string;
 * title: string;
 * description: string;
 * }} param0
 * @returns
 */

const DescriptionSection = ({
  chipTitle,
  title,
  description,
  imageUrl,
  imageAlt,
}) => {
  return (
    <Fragment>
      <PurpleChip title={chipTitle} />
      <Typography className={classes.title}>{title}</Typography>
      <Grid
        item
        xs={12}
        className={
          chipTitle === "WHY SMART APES" ? classes.officeImage : classes.image
        }
      >
        <Image src={imageUrl} objectFit="contain" alt={imageAlt} />
      </Grid>
      <Typography className={classes.subtitle}>{description}</Typography>
    </Fragment>
  );
};

export default DescriptionSection;
