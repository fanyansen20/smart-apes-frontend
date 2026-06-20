import { Box, Typography, Stack } from "@mui/material";
import { Fragment } from "react";
import { useCountdown } from "../../hooks/Timer/useCountDown";

const RedBox = (props) => {
  return (
    <Box
      sx={{
        p: "0.5rem 0.75rem",
        mx: 0.5,
        backgroundColor: "#FF1B1B",
        borderRadius: "10px",
        color: "#FFFFFF",
      }}
    >
      <Typography variant="body1">{props.children}</Typography>
    </Box>
  );
};

const BestSellerTimer = () => {
  const [days, hours, minutes, seconds] = useCountdown(10000000000000);

  // Fetch timer from backend
  // useEffect({
  //   fetch("",{

  //   });
  // },[]);

  return (
    <Stack direction="row" justifyContent="space-evenly" alignItems="center">
      <Typography variant="body1" sx={{ fontWeight: 400 }}>
        Promo will end in
      </Typography>
      <RedBox>{hours}</RedBox> : <RedBox>{minutes}</RedBox> :{" "}
      <RedBox>{seconds}</RedBox>
    </Stack>
  );
};

export default BestSellerTimer;
