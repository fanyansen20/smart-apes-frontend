//Material UI
import { Button, Container, Typography, Grid } from "@mui/material";

//Next JS
import Image from "next/image";
import Link from "next/link";

//Image
import notFound from "../public/assets/images/not-found-404.png";

const NotFoundPage = () => {
  return (
    <>
      <Container maxWidth="2xl" className="containerNotfoundPage">
        <Grid className="imageNotFound">
          <Image src={notFound} alt="image not found" />
        </Grid>
        <Grid>
          <Typography className="titlePageNotFound">
            Page Not Found :(
          </Typography>
          <Typography className="textPageNotFound">
            We think you’re lost. Please refresh the page
          </Typography>
        </Grid>
        <Link href={process.env.NEXT_PUBLIC_BACKEND_URL}>
          <a>
            <Button className="buttonBack">Back to home page</Button>
          </a>
        </Link>
      </Container>
    </>
  );
};

export default NotFoundPage;
