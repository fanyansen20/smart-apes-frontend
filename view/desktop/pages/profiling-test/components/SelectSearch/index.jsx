import React from "react";

// mui material
import { Autocomplete, TextField } from "@mui/material";

/**
 *
 * @param {{
 * value : string
 * placeholder : string
 * helperText : string
 * options : []
 * setValue : () => ()
 * }} props
 * @returns
 */

const SelectSearch = ({
  value,
  placeholder,
  helperText,
  options,
  setValue,
}) => {
  return (
    <Autocomplete
      size="small"
      value={value}
      options={options}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={helperText}
          helperText={helperText}
        />
      )}
    />
  );
};

export default SelectSearch;
