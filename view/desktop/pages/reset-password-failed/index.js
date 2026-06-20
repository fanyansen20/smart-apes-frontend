//React
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

//Material UI
import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

//Next JS
import Image from "next/image";
import { useRouter } from "next/router";

//Image
import notFound from "public/assets/images/not-found-404.png";

const FailedResetPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { error: errorTokenMsg } = useSelector(
    (state) => state.checkTokenResetPassword
  );

  useEffect(() => {
    dispatch(isLayout({ isNavbar: false, isFooter: false }));
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxWidth="2xl" className="containerNotfoundPage">
      <Grid className="imageNotFound">
        <Image src={notFound} alt="image not found" />
      </Grid>
      <Stack direction="column" alignItems="center" spacing={7}>
        <Typography className="titlePageNotFound">
          {errorTokenMsg || "Token Not Found"}
        </Typography>
        <Typography className="textPageNotFound">
          You will be redirected into login page...
        </Typography>
        <CircularProgress color="secondary" />
      </Stack>
    </Container>
  );
};

export default memo(FailedResetPassword);
