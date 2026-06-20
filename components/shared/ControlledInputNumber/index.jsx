import React from "react";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import classes from "./InputNumber.module.scss";

function ControlledInputNumber({
  sx,
  name,
  control,
  onBlur,
  onChange,
  disabled,
  isAllowed,
  allowNegative,
  error,
}) {
  const { field } = useController({ name, control });
  const { onChange: fieldOnChange, value, ...otherField } = field;

  return (
    <NumericFormat
      {...otherField}
      sx={sx}
      type="number"
      defaultValue={value}
      className={classes.controlledInputNumber}
      InputProps={{
        className: classes.outlinedInput,
      }}
      inputProps={{
        min: 0,
        className: classes.baseInput,
      }}
      onBlur={(e) => {
        if (onBlur) {
          onBlur(e);
        }
        field.onBlur(e);
      }}
      onValueChange={(value, sourceInfo) => {
        const { event } = sourceInfo;
        fieldOnChange(value.floatValue);

        if (onChange) {
          onChange(event, value.floatValue);
        }
      }}
      isAllowed={isAllowed}
      disabled={disabled}
      customInput={TextField}
      allowNegative={allowNegative}
      error={error}
      onWheel={(e) => {
        e.target.blur();
      }}
    />
  );
}

export default ControlledInputNumber;
