// Styles
import classes from "./FilterChip.module.scss";

// MUI
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

/**
 * @param {{
 * text: display_string
 * onClick: function
 * divProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
 * }} props
 * @returns {JSX.Element}
 */
const FilterChip = ({ text, onClick, ...divProps }) => {
  return (
    <div {...divProps} className={classes.filterChip}>
      <p>{text}</p>
      <IconButton onClick={onClick}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default FilterChip;
