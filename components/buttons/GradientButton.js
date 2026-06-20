import { Button } from "@mui/material";

const GradientButton = (props) => {
  return (
    <Button
      sx={{
        background: `linear-gradient(95.47deg, #9F93EF 18.94%, #B74CEA 78.12%)`,
        color:"#787878",
        p:"0.7rem",
        my:1
      }}
    >
      {props.children}
    </Button>
  );
};

export default GradientButton;
