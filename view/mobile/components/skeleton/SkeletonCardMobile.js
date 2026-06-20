import React from "react";

// Css
import classes from "../../components/card/_CardMobile.module.scss";

// Mui material

import { Skeleton } from "@mui/material";

const SkeletonCardMobile = () => {
  return (
    <div className={classes.containerCardMobile}>
      <Skeleton variant="rectangular" height={100} />
      <div className={classes.overviewDetailProduct}>
        <Skeleton variant="text" sx={{ fontSize: "1.2em" }} />
        <Skeleton variant="rounded" height={40} />
        <Skeleton variant="text" sx={{ fontSize: "1.2em" }} />
      </div>
    </div>
  );
};

export default SkeletonCardMobile;
