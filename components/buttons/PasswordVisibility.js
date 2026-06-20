import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Fragment } from "react";

const PasswordVisibilityIcon = (props) => {
  const visibility = props.visible;
  return (
    <Fragment>
      {visibility && <VisibilityIcon sx={{cursor:"pointer"}}/>}
      {!visibility && <VisibilityOffIcon sx={{cursor:"pointer"}}/>}
    </Fragment>
  );
};

export default PasswordVisibilityIcon;
