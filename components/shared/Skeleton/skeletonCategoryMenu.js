import React from "react";
// material UI
import { Skeleton, Typography } from "@mui/material";

export const SkeletonCategoryMenu = () => {
  return (
    <div className="categoryDiv">
      <Typography className="categoryText">
        <Skeleton variant="text" height={20} />
      </Typography>
    </div>
  );
};
