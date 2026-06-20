//React or Next
import { useRouter } from "next/router";
import { Fragment } from "react";

//Material UI
import { Box } from "@mui/material";

//Components
import { needLogoOnly } from "helper/checkUrlPage";
import LowerNavigation from "./NavigationParts/LowerNavigation/LowerNavigation";
import UpperNavigation from "./NavigationParts/UpperNavigation/UpperNavigation";

const Navbar = () => {
  const { pathname } = useRouter();

  const renderUpperNavigation = () => {
    if (needLogoOnly(pathname)) {
      return "";
    }

    return (
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <UpperNavigation />
      </Box>
    );
  };

  return (
    <Fragment>
      <div className="navigationWrapper">
        <div className="navigationBar">
          {renderUpperNavigation()}
          <LowerNavigation />
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
