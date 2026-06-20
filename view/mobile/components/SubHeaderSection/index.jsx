import { Grid, Typography } from "@mui/material";
import React, { memo } from "react";
import classes from "./SubHeaderSection.module.scss";

const SubHeaderSection = ({ children }) => {
  return (
    <Grid className={classes.headerTitle}>
      <Typography className={classes.headerText}>{children}</Typography>
    </Grid>
  );
};

export default memo(SubHeaderSection);
