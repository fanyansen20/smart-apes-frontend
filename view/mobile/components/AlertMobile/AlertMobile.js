// MUI
import ErrorIcon from "@mui/icons-material/Error";

// Styles
import classes from "./AlertMobile.module.scss";

/**
 * @param {{
 *  type: "error" | "warning"
 *  message: string
 * }} props
 * @returns {HTMLElement}
 */
const AlertMobile = ({ type = "error", message = "" }) => {
  return (
    <section
      className={`${classes.alertMobileContainer} ${classes[`${type}`]}`}
    >
      <ErrorIcon />
      <p>{message}</p>
    </section>
  );
};

export default AlertMobile;
