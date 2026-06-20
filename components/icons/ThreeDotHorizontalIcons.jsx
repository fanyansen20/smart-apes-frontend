import { IconButton } from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ThreeDotHorizontalIcons = ({ onClick, ...otherProps }) => {
  return (
    <IconButton onClick={onClick} {...otherProps} disableRipple>
      <MoreHorizIcon />
    </IconButton>
  );
};

export default ThreeDotHorizontalIcons;
