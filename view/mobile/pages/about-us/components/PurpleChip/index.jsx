import React from "react";

// MUI
import { Chip } from "@mui/material";

// Styles
import classes from "./_PurpleChip.module.scss";

/**
 *
 * @param {{
 * title :string;
 * }} param0
 * @returns
 */

const PurpleChip = ({ title }) => {
  return <Chip className={classes.container} label={title} />;
};

export default PurpleChip;
