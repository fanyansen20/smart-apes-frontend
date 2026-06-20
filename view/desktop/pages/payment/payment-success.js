// react
import { memo, useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

//Next JS
import Image from "next/image";
import { useRouter } from "next/router";

//Material UI
import { Container, Typography } from "@mui/material";

//Images
import leftPlanet from "@public/assets/images/planet-2.png";
import rightPlanet from "@public/assets/images/planet.png";
import successPayment from "@public/assets/images/success-payment.svg";

// Component
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";

// API
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import handleRedirectParent from "helper/handleRedirectParent";

const PaymentSuccess = () => {
  const { push: redirectTo, query } = useRouter();

  const isProfilingTestCheckout = query?.type === "profiling-test-checkout";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLayout({ isNavbar: true, isFooter: false }));
  }, []);

  return (
    <div className="wrapper">
      <Container maxWidth="lg" className="wrapperImg">
        <div className="rightPlanet">
          <Image src={rightPlanet} alt="logo" width={445} height={445} />
        </div>

        <div className="payment">
          <Image
            src={successPayment}
            width={385}
            height={276}
            alt="success payment"
          />
          <div className="cardPayment">
            <Typography className="paymentTextTitle">
              Payment Success!
            </Typography>
            <Typography className="paymentTextDescription">
              {isProfilingTestCheckout ? (
                <>
                  Your Transaction is success. You can redeem now by <br />
                  clicking this button below
                </>
              ) : (
                <>
                  Your Transaction is success. You can check your transaction
                  details by clicking this button below or you can go back to
                  Homepage
                </>
              )}
            </Typography>
          </div>
          <div className="containerButtonPayment">
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
                  onClick={() =>
                    handleRedirectParent({
                      additionalPathRedirect: "order-list",
                    })
                  }
                  text="See Transaction Details"
                />

                <SecondaryButton
                  onClick={() => redirectTo("/")}
                  fullWidth
                  text="Back to Homepage"
                />
              </>
            )}
          </div>
        </div>

        <div className="leftPlanet">
          <Image src={leftPlanet} alt="logo" width={445} height={445} />
        </div>
      </Container>
    </div>
  );
};

export default memo(PaymentSuccess);
