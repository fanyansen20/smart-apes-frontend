// material UI
import { Container, Grid, Typography } from "@mui/material";

// next JS
import Link from "next/link";
import Image from "next/image";

// image
import singapore from "public/assets/images/singapore.png";
import iconInstagram from "public/assets/logo/navbarIcon/instagram-logo.svg";
import iconFacebook from "public/assets/logo/navbarIcon/facebook-logo.svg";

const UpperNavigation = () => {
  return (
    <nav className="navigationUpper">
      <Container>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item container md={6} alignItems="center">
            <Link href={process.env.NEXT_PUBLIC_SELLER_URL}>
              <a>
                <Typography>Be a Seller</Typography>
              </a>
            </Link>

            <Typography className="follow-us">Follow Us on </Typography>
            <div className="follow-us-icon">
              <Image src={iconInstagram} alt="logo instagram" />
              <Image src={iconFacebook} alt="logo facebook" />
            </div>
          </Grid>
          <Grid item className="countryDiv">
            <Typography className="upperNavTitle">Country:</Typography>
            <Image src={singapore} alt="singapore" />
            <Typography className="upperNavTitle">Singapore</Typography>
          </Grid>
        </Grid>
      </Container>
    </nav>
  );
};

export default UpperNavigation;
