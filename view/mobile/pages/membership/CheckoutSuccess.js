// React
import React, { useEffect } from "react";

// Next
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

// Redux
import { useDispatch } from "react-redux";
import { getMembershipData } from "store/reducer/membership/membershipSlice";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";

// MUI Components
import { Stack, Typography } from "@mui/material";

// Images
import successPayment from "@public/assets/images/success-payment.svg";

// Styles
import classes from "../payment/payment-success/PaymentSuccess.module.scss";

// Helper
import handleRedirectParent from "@helper/handleRedirectParent";

function PaymentSuccess() {
  const dispatch = useDispatch();
  const { push: redirectTo } = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(
      getMembershipData({
        userId: session?.user?.id,
        accessToken: session?.accessToken,
      })
    );
  }, []);

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
          Your Transaction is success. You can check your member details or go
          back to parent dashboard
        </Typography>
      </Stack>

      <Stack direction="column" gap={1} width="100%">
        <PrimaryButton
          fullWidth
          text="Go to Member Details"
          onClick={() => redirectTo("/membership/member-details")}
        />
        <SecondaryButton
          fullWidth
          text="Back to Parent Dashboard"
          onClick={handleRedirectParent}
        />
      </Stack>
    </Stack>
  );
}

export default PaymentSuccess;
