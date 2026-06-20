import { Button, CircularProgress } from "@mui/material";

const SecondaryButton = ({
  fullWidth,
  color,
  text,
  onClick,
  disabled,
  startIcon,
  endIcon,
  isLoading,
  children,
  className,
  disableHover,
  ...otherBtnProps
}) => {
  const colorCheck = (color) => {
    if (!color) {
      return "secondary-button";
    }

    if (color === "secondary") {
      return "secondary-button-color-secondary";
    }
  };

  return (
    <Button
      {...otherBtnProps}
      fullWidth={fullWidth}
      className={`${colorCheck(color)} ${className} ${
        disableHover && "disable-hover"
      }`}
      disableRipple
      onClick={onClick}
      disabled={disabled || isLoading}
      startIcon={startIcon}
      endIcon={endIcon}
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

export default SecondaryButton;
