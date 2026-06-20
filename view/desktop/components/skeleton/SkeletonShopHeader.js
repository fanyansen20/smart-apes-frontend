import React from "react";

import { Grid, Skeleton } from "@mui/material";

const SkeletonShopHeader = () => {
  return (
    <div className="shopHeader">
      <Grid container alignItems="center" gap="2em" flexWrap="nowrap">
        <Grid item>
          <Skeleton variant="rounded" className="shopImage" />
        </Grid>
        <Grid item container direction="column">
          <Skeleton variant="text" width="40%" height="50px" />
          <Skeleton variant="text" width="50%" />
        </Grid>
      </Grid>
      <Skeleton width="10%" height="30px" variant="rounded" />
    </div>
  );
};

export default SkeletonShopHeader;
