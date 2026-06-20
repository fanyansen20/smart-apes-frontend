import React from "react";

import Image from "next/image";

import { Container, Grid, Typography } from "@mui/material";

import errorPage from "@public/assets/images/illustration-error.png";

const ErrorPage = () => {
  return (
    <>
      <Container maxWidth="2xl" className="containerNotfoundPage">
        <Grid className="imageNotFound">
          <Image src={errorPage} alt="image not found" />
        </Grid>
        <Grid>
          <Typography className="titlePageNotFound">
            Sorry, we couldn’t find that page
          </Typography>
          <Typography className="textPageNotFound">
            We think you’re lost. Please refresh the page
          </Typography>
        </Grid>
      </Container>
    </>
  );
};

export default ErrorPage;
