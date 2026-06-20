import React from "react";

// MUI
import { Grid } from "@mui/material";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";

// style
import classes from "./_AssignButton.module.scss";

/**
 *
 * @param {{
 * onClick: () => void;
 * disabled?: boolean;
 * isSubmitting?: boolean;
 * }} param0
 * @returns
 */

const AssignButton = ({ onClick, disabled, isSubmitting }) => {
  return (
    <Grid className={classes.buttonContainer}>
      <PrimaryButton
        fullWidth
        disableHover
        onClick={onClick}
        disabled={disabled || isSubmitting}
      >
        {isSubmitting ? "Submitting" : "Take test"}
      </PrimaryButton>
    </Grid>
  );
};

export default AssignButton;
