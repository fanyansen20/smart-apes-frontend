import { Button, CircularProgress } from "@mui/material";

const TextButton = ({
  fullWidth,
  text,
  onClick,
  disabled,
  startIcon,
  endIcon,
  isLoading,
  color,
  children,
}) => {
  const colorCheck = (color) => {
    if (!color) {
      return "text-button";
    }

    if (color === "secondary") {
      return "text-button-color-secondary";
    }
  };

  return (
    <Button
      disableRipple
      fullWidth={fullWidth}
      className={colorCheck(color)}
      onClick={onClick}
      disabled={disabled || isLoading}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={
        !fullWidth && {
          width: "fit-content",
          height: "fit-content",
        }
      }
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

export default TextButton;
