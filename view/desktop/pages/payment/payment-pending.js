import React, { memo, useCallback, useEffect, useState } from "react";

// redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

//Components
import Loader from "@components/layout/Loader";

//Next JS
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

// Helper
import { formatDate } from "helper/formatDate";

//Material UI
import { Container, Typography } from "@mui/material";

// Component
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";

//Images
import pendingPayment from "@public/assets/images/pending-payment.svg";
import leftPlanet from "@public/assets/images/planet-2.png";
import rightPlanet from "@public/assets/images/planet.png";

// API
import getDataCheckoutById from "pages/api/clientSide/checkouts/getDataCheckoutById";

const PaymentPending = ({ checkoutId }) => {
  const { push: redirectTo, query } = useRouter();

  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const [cartData, setCartData] = useState(false);

  const [isTabVisible, setIsTabVisible] = useState(true);

  const handleVisibilityChange = useCallback(() => {
    setIsTabVisible(document.visibilityState === "visible");
  }, []);

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
      setCartData(dataCheckout);
    }, 3000);
  };

  const handlerPayment = async (user_payment) => {
    if (user_payment.payment_method.code === "paypal") {
      window.open(`${user_payment.paypal.payment_url}`, "_blank");
    }
    if (user_payment.payment_method.code === "hitpay") {
      window.open(`${user_payment.hitpay.hitpay_payment_url}`, "_blank");
    }
  };

  return (
    <div className="wrapper">
      <Container maxWidth="lg" className="wrapperImg">
        {!cartData ? (
          <Loader />
        ) : (
          <>
            <div className="payment">
              <Image
                src={pendingPayment}
                width={385}
                height={276}
                alt="success payment"
              />
              <div className="cardPayment">
                <Typography className="paymentTextTitle">
                  Payment Pending
                </Typography>
                <Typography className="paymentTextDescription">
                  Transaction with the Payment References
                  <span className="paymentCode"> {cartData?.ref_code} </span>
                  is still pending. To complete the transaction, just click the
                  button below.
                </Typography>
              </div>

              <div className="paymentDeadline">
                <Typography>Payment Deadline</Typography>
                <Typography>
                  {formatDate(cartData?.user_payment?.deadline_date)}
                </Typography>
              </div>

              <div className="containerButtonPayment">
                <PrimaryButton
                  onClick={() => handlerPayment(cartData?.user_payment)}
                  fullWidth
                  text="Pay Now"
                />
                <SecondaryButton
                  onClick={() => redirectTo("/")}
                  fullWidth
                  text="Back to HomePage"
                />
              </div>
            </div>
          </>
        )}

        <div className="rightPlanet">
          <Image src={rightPlanet} alt="logo" width={445} height={445} />
        </div>
        <div className="leftPlanet">
          <Image src={leftPlanet} alt="logo" width={445} height={445} />
        </div>
      </Container>
    </div>
  );
};

export default memo(PaymentPending);
