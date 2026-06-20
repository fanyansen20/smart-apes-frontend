//Next.js
import Image from "next/image";
import Link from "next/link";

//Image
import signInIcon from "public/assets/logo/navbarIcon/sign-in-icon.svg";
import signUpIcon from "public/assets/logo/navbarIcon/sign-up-icon.svg";

//Material UI
import { Button, Grid, Typography } from "@mui/material";

const LoginRegisterButton = () => {
  return (
    <Grid container className="loginRegisterDiv">
      <Link href="/login">
        <a>
          <Button className="signButton">
            <div className="imgAuthNavBarIcon">
              <Image
                src={signInIcon}
                layout="fill"
                objectFit="contain"
                alt="sign-in"
              />
            </div>
            <Typography className="titleButton">Sign in</Typography>
          </Button>
        </a>
      </Link>

      <Link href="/register">
        <a>
          <Button className="singUpButton">
            <div className="imgAuthNavBarIcon">
              <Image
                src={signUpIcon}
                layout="fill"
                objectFit="contain"
                alt="sign in"
              />
            </div>
            <Grid container direction="column" alignItems="flex-start">
              <Typography className="titleButton">Sign Up</Typography>
            </Grid>
          </Button>
        </a>
      </Link>
    </Grid>
  );
};

export default LoginRegisterButton;
