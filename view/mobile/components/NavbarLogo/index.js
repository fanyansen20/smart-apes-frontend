import React from "react";

// Next
import Image from "next/image";
import Link from "next/link";

// MUI
import { Grid } from "@mui/material";

// Assets
import LogoBrand from "@public/assets/logo/navbarIcon/smart-apes-logo.svg";

const NavbarLogo = () => {
  return (
    <Grid py={3} mb={2} borderBottom={"1px solid #D4D4D4"}>
      <Link href={"/"}>
        <Image src={LogoBrand} alt="Logo Brand" width="105px" height="30px" />
      </Link>
    </Grid>
  );
};

export default NavbarLogo;
