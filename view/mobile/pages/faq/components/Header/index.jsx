import React from "react";

// MUI
import { Grid, Typography } from "@mui/material";

// Components
import SearchInput from "@components/input/SearchInput";

// Styles
import classes from "./_Header.module.scss";

const Header = () => {
  return (
    <Grid container gap={2} className={classes.headerContainer}>
      <Typography className={classes.headerTitle}>
        Frequently Asked Question
      </Typography>
      <SearchInput placeholder="Search FAQ here" />
    </Grid>
  );
};

export default Header;
