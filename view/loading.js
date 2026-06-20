import { CircularProgress } from "@mui/material";
import React from "react";

const loadingPage = {
  loading: () => (
    <div className="loadingPage">
      <CircularProgress color="secondary" />
    </div>
  ),
};

export default loadingPage;
