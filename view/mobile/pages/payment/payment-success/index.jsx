// React
import React from "react";

// Next
import Image from "next/image";
import { useRouter } from "next/router";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";

// MUI Components
import { Stack, Typography } from "@mui/material";

// Images
import successPayment from "@public/assets/images/success-payment.svg";

// Styles
import classes from "./PaymentSuccess.module.scss";

// Helpers
import handleRedirectParent from "@helper/handleRedirectParent";

function PaymentSuccess() {
  const { push: redirectTo, query } = useRouter();

  const isProfilingTestCheckout = query?.type === "profiling-test-checkout";

  return (
    <Stack
      gap="37px"
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.paymentSuccessContainter}
    >
      <Image
        src={successPayment}
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
        <Typography className={classes.titleHeader}>Payment Success</Typography>
        <Typography className={classes.descriptionText}>
          {isProfilingTestCheckout ? (
            <>
              Your Transaction is success. You can redeem now by clicking this
              button below
            </>
          ) : (
            <>
              Your transaction is success. You can check your transaction
              details by clicking this button below or you can go back to
              Homepage
            </>
          )}
        </Typography>
      </Stack>

      <Stack direction="column" gap={1} width="100%">
        {isProfilingTestCheckout && (
          <PrimaryButton
            fullWidth
            onClick={() => handleRedirectParent()}
            text="Redeem Now"
          />
        )}
        {!isProfilingTestCheckout && (
          <>
            <PrimaryButton
              fullWidth
              text="See Transaction Details"
              onClick={() =>
                handleRedirectParent({ additionalPathRedirect: "order-list" })
              }
            />
            <SecondaryButton
              fullWidth
              text="Back to Homepage"
              onClick={() => redirectTo("/")}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default PaymentSuccess;
