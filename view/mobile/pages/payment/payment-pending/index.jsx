// React
import React, { useCallback, useEffect, useState } from "react";

// Next
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

// Redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

// Hooks
import useCheckoutDataById from "@hooks/checkouts/useCheckoutDataById";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";

// API
import getDataCheckoutById from "pages/api/clientSide/checkouts/getDataCheckoutById";

// MUI Components
import { CircularProgress, Stack, Typography } from "@mui/material";

// Images
import pendingPayment from "@public/assets/images/pending-payment.svg";

// Styles
import classes from "./PaymentPending.module.scss";

function PaymentPending({ checkoutId }) {
  const dispatch = useDispatch();
  const { push: redirectTo, query } = useRouter();
  const { data: session, status } = useSession();

  // #region useState
  const [isTabVisible, setIsTabVisible] = useState(true);
  // #endregion

  // #region hooks
  const { getCheckoutData, payCheckoutById } = useCheckoutDataById({
    checkoutId,
  });
  const { checkoutData } = getCheckoutData();
  // #endregion

  // #region function
  const getDataCheckout = async () => {
    const redirectSuccessPage = query.type
      ? `../success/${checkoutId}?type=${query.type}`
      : `../success/${checkoutId}`;

    setTimeout(async () => {
      const dataCheckout = await getDataCheckoutById(checkoutId);

      if (dataCheckout) {
        switch (dataCheckout.status) {
          case "CANCELLED":
            redirectTo("../../cart");
            break;
          case "PAID":
            redirectTo(redirectSuccessPage);
            break;
        }
      }
    }, 3000);
  };

  const handleVisibilityChange = useCallback(() => {
    setIsTabVisible(document.visibilityState === "visible");
  }, []);
  // #endregion

  // #region useEffect
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    dispatch(isLayout({ isFooter: false }));

    if (session?.accessToken && status === "authenticated") {
      getDataCheckout();
    }
  }, [isTabVisible, session]);
  // #endregion

  if (!checkoutData) {
    return (
      <div className="loadingPage">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <Stack
      gap="37px"
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.paymentPendingContainter}
    >
      <Image
        src={pendingPayment}
        width="260vw"
        height="260vw"
        alt="Payment Success"
      />

      <Stack
        direction="column"
        spacing={1}
        alignItems="center"
        justifyContent="center"
      >
        <Typography className={classes.titleHeader}>Payment Pending</Typography>
        <Typography className={classes.descriptionText}>
          Transaction with the Payment References{" "}
          <strong>{checkoutData?.ref_code}</strong> is still pending. To
          complete the transaction, just click the button below.
        </Typography>
      </Stack>

      <Stack direction="column" gap={1} width="100%">
        <PrimaryButton fullWidth text="Pay Now" onClick={payCheckoutById} />
        <SecondaryButton
          fullWidth
          text="Back to Homepage"
          onClick={() => redirectTo("/")}
        />
      </Stack>
    </Stack>
  );
}

export default PaymentPending;
