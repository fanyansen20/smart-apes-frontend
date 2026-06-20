import React, { Fragment } from "react";

// Next JS
import Image from "next/image";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import PurpleChip from "../PurpleChip";

// Styles
import classes from "./_PartnerSection.module.scss";

// Assets
import GramediaIcon from "@public/assets/about-us/gremedia-logo.svg";

const PartnerSection = () => {
  return (
    <Fragment>
      <PurpleChip title="PARTNERS" />
      <Typography className={classes.title}>Our Partners</Typography>
      <Typography className={classes.sectionSubtitle}>
        Our collaborative partners are willing to help shape your futures.
      </Typography>
      <Grid className={classes.partnerList}>
        {[...Array(4)].map((_, key) => (
          <Grid key={key} className={classes.partner}>
            <Image
              src={GramediaIcon}
              alt="Gramedia icon"
              width={215}
              height={48}
              objectFit="contain"
            />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default PartnerSection;
