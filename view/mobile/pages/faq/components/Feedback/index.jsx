import React, { useState } from "react";

// MUI
import { Close } from "@mui/icons-material";
import { Grid, TextField, Typography } from "@mui/material";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";

// Styles
import classes from "./_Feedback.module.scss";

/**
 * @param {{
 * toggle: () => void;
 * }} param0
 */

const Feedback = ({ toggle }) => {
  // #region useState
  const [value, setValue] = useState("");
  // #endregion

  // #region function
  const submit = () => [toggle()];
  // #endregion

  // #region variable
  const maxInputCharacter = 100;
  // #endregion

  return (
    <Grid className={classes.container} mb={1}>
      <Grid container justifyContent="space-between">
        <Typography className={classes.title}>
          Tell us more about your issue
        </Typography>
        <Close onClick={toggle} />
      </Grid>
      <Typography className={classes.subtitle}>
        Feel free to provide feedback on our platform. <br />
        Your input will greatly assist us in improving.
      </Typography>
      <TextField
        fullWidth
        placeholder="Type your feedback here"
        inputProps={{ maxLength: maxInputCharacter }}
        className={classes.inputText}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        multiline
        minRows={3}
        helperText={`${value.length}/${maxInputCharacter}`}
        FormHelperTextProps={{
          classes: {
            root: classes.characterIndicator,
          },
        }}
      />
      <PrimaryButton fullWidth text="Submit" disableHover onClick={submit} />
    </Grid>
  );
};

export default Feedback;
