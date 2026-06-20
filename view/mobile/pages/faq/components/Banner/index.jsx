import React from "react";

// MUI
import { Close, DoneAll } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

// Styles
import classes from "./_Banner.module.scss";

/**
 * @param {{
 * toggle: () => void;
 * }} param0
 */

const Banner = ({ toggle }) => {
  return (
    <Grid container className={classes.container}>
      <DoneAll />
      <Grid xs={10} p={1} pl={2}>
        <Typography className={classes.title}>Thank You</Typography>
        <Typography className={classes.subtitle}>
          Your feedback is essential for enhancing our platform
        </Typography>
      </Grid>
      <Close onClick={toggle} />
    </Grid>
  );
};

export default Banner;
