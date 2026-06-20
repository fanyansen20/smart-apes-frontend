import { Button, CircularProgress } from "@mui/material";

/**
 * @param {{
 * text: string
 * type: string
 * isLoading : boolean
 * disabled : boolean
 * fullWidth : boolean
 * onClick : () => ()
 * size: 'small' |'large'
 * className: string
 * disableHover?: boolean;
 * }} props
 * @returns
 */

const PrimaryButton = ({
  type,
  fullWidth,
  text,
  onClick,
  disabled,
  startIcon,
  endIcon,
  isLoading,
  size,
  children,
  className,
  disableHover,
  ...otherProps
}) => {
  function checkSizeButton(size) {
    if (size === "large") {
      return "size-large";
    }

    return "";
  }

  return (
    <Button
      type={type}
      disableRipple
      className={`primary-button ${checkSizeButton(size)} ${className || ""} ${
        disableHover && "disable-hover"
      }`}
      onClick={onClick}
      disabled={disabled || isLoading}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        width: !fullWidth ? "fit-content" : "100%",
      }}
      {...otherProps}
    >
      {isLoading ? (
        <CircularProgress
          color="inherit"
          style={{ height: "15px", width: "15px" }}
        />
      ) : (
        text || children
      )}
    </Button>
  );
};

export default PrimaryButton;
