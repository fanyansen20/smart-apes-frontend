// React
import React, { memo } from "react";

// Components
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";

// MUI Icons
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Styles
import classes from "./OutlinedForwardButton.module.scss";

const OutlinedForwardButton = ({ children, ...otherProps }) => {
  return (
    <SecondaryButton
      {...otherProps}
      className={`${otherProps?.className} ${classes.outlinedForwardButton}`}
    >
      {children}
      <ArrowForwardIosIcon />
    </SecondaryButton>
  );
};

export default memo(OutlinedForwardButton);
