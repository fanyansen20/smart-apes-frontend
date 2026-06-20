import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

const Orders = () => {
  const { push } = useRouter();

  useEffect(() => {
    push("/");
  }, []);

  return (
    <div className="loadingPage">
      <CircularProgress color="secondary" />
    </div>
  );
};

export default Orders;
