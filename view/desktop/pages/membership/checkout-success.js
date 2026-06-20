import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

//Components
import Navbar from "@components/Navigation/Navbar";

//Next JS
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { getMembershipData } from "store/reducer/membership/membershipSlice";

//Material UI
import { Button, Container, Typography } from "@mui/material";

//Images
import leftPlanet from "@public/assets/images/planet-2.png";
import rightPlanet from "@public/assets/images/planet.png";
import successPayment from "@public/assets/images/success-payment.svg";

const PaymentMembershipSuccess = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(
      getMembershipData({
        userId: session?.user?.id,
        accessToken: session?.accessToken,
      })
    );

    dispatch(isLayout({ isFooter: false }));
  }, []);

  return (
    <div className="wrapperPaymentSuccessMember">
      <Navbar search={false} hidden={true} />
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
              Your Transaction is success. You can check your transaction
              details by clicking this button below or you can go back to
              Homepage
            </Typography>
          </div>
          <div className="buttonPayment">
            <Link href="/membership/member-details">
              <Button className="buttonDetail">
                <Typography>See Member Details</Typography>
              </Button>
            </Link>
            <Link href="/">
              <Button className="buttonBack">
                <Typography>Back to Homepage</Typography>
              </Button>
            </Link>
          </div>
        </div>

        <div className="leftPlanet">
          <Image src={leftPlanet} alt="logo" width={445} height={445} />
        </div>
      </Container>
    </div>
  );
};

export default memo(PaymentMembershipSuccess);
