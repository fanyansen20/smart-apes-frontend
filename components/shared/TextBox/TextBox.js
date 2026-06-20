import React from "react";

import { Grid, InputLabel, TextField } from "@mui/material";

/**
 * @param {{
 * labelText : string
 * errorText : string
 * placeholder : string
 * onChange : () =>()
 * value : string
 * rows : number
 * type : string
 * name : string
 * multiline : boolean
 * disabled : boolean
 * size : 'medium' | 'small'
 * }} props
 */

const TextBox = ({
  errorText,
  labelText,
  placeholder,
  onChange,
  multiline,
  rows,
  value,
  name,
  type,
  InputProps,
  disabled,
  size = "medium",
  isErrorText,
  ...otherProps
}) => {
  return (
    <Grid container sx={{ textAlign: "left" }}>
      {labelText && <InputLabel htmlFor="input-text">{labelText}</InputLabel>}
      <TextField
        fullWidth
        size={size}
        disabled={disabled}
        type={type}
        id="input-text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        multiline={multiline}
        rows={rows}
        error={isErrorText || errorText}
        helperText={errorText}
        value={value}
        InputProps={InputProps}
        {...otherProps}
      />
    </Grid>
  );
};

export default TextBox;
