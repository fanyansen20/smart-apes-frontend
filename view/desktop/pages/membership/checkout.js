// Next
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckIcon from "@mui/icons-material/Check";
import { Breadcrumbs, Button, Checkbox, Container, Grid } from "@mui/material";

// Utils
import { interpolateString } from "@helper/interpolateString";
import useNotification from "@hooks/useNotification";
import { reloadSession } from "helper/reloadSession";
import { usePurchaseMembership } from "services/membership/useCases/purchaseMembership/usePurchaseMembership";
import {
  getMembershipData,
  setCheckoutTier,
} from "store/reducer/membership/membershipSlice";

// Comp
import ModalPaymentMethod from "@components/shared/Modal/ModalPaymentMethod";

// Assets
import HomeIcon from "public/assets/icons/home.svg";
import HitpayLogo from "public/assets/images/hitpay.png";
// import PaypalLogo from "public/assets/images/paypal.png";
import PaymentDetailMask from "public/assets/images/mask-member-checkout.svg";

const MemberCheckoutPage = ({ paymentMethods, userId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { purchaseMembership } = usePurchaseMembership();
  const membershipData = useSelector((store) => store.member);
  const memberTier = membershipData?.checkoutTier;

  // Payment state
  const [paymentChooseMethod, setChoosePaymentMethod] = useState(null);
  const [payment_method_id, setPaymentMethod_id] = useState(null);
  const [active, setActive] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);

  // Notification state
  const [_msg, sendNotification] = useNotification();

  // Handle choose payment method
  const handleChoosePaymentMethod = (key, id) => {
    setActive(key);
    setPaymentMethod_id(id);
  };

  // Handle check SA terms
  const handleCheck = (event) => {
    setTermsChecked(event.target.checked);
  };

  // Modal state
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  // Update payment
  const updatePayment = async (id = active) => {
    const paymentName = paymentMethods[id]?.name ?? "";
    setChoosePaymentMethod(paymentName);
    handleCloseModal();
  };

  // Handle proceed to payment
  const handleProceed = async () => {
    // Validation if no payment method or not accept SA terms
    if (!payment_method_id) {
      return sendNotification({
        variant: "error",
        msg: ["Please choose payment method"],
      });
    }

    if (!termsChecked) {
      return sendNotification({
        variant: "error",
        msg: ["Please accept the SmartApes Policy"],
      });
    }

    await purchaseMembership({
      userId,
      tier: memberTier?.title,
      paymentMethodId: payment_method_id,
    }).then((resPurchase) => {
      if (resPurchase?.payment_url) {
        setIsPaymentPending(true);
        window.open(`${resPurchase?.payment_url}`, "_blank");
      }
    });
  };

  // Pre select hitpay payment method after render
  const handleSelectHitpay = () => {
    const hitpayIndex = paymentMethods.findIndex(
      (item) => item.code === "hitpay"
    );

    handleChoosePaymentMethod(hitpayIndex, paymentMethods[hitpayIndex].id);
    updatePayment(hitpayIndex);
  };

  useEffect(() => {
    handleSelectHitpay();
  }, []);

  // Check payment status
  useEffect(() => {
    const pendingInterval = setInterval(async () => {
      if (isPaymentPending) {
        dispatch(
          getMembershipData({ userId, accessToken: session?.accessToken })
        )
          .unwrap()
          .then((data) => {
            if (data.status === "ACTIVE") {
              setIsPaymentPending(false);
              reloadSession();
              router
                .push(`/membership/checkout/success`)
                .then(() => dispatch(setCheckoutTier("")));
            }
          });
      }
    }, 5000);

    return () => clearInterval(pendingInterval);
  }, [isPaymentPending]);

  // Redirect to membership if no tier selected
  useEffect(() => {
    if (!memberTier) router.push("/membership");
  }, []);

  return (
    <div className="containerMemberCheckout">
      <section className="breadcrumb">
        <Container maxWidth="lg" disableGutters>
          <Breadcrumbs separator="/" aria-label="breadcrumb">
            <Link href="/">
              <Image src={HomeIcon} alt="home" />
            </Link>
            <Link href="/membership">
              <p>Membership</p>
            </Link>
            <p className="active">Checkout</p>
          </Breadcrumbs>
        </Container>
      </section>
      <Container maxWidth="lg" disableGutters>
        <Grid container spacing={3}>
          <Grid item md={7} xs={12} className="leftMemberCheckout">
            <section className="selectedPlan">
              <h4>Product Details</h4>
              <div className="productTitle">
                <Image src={memberTier.icon} alt="member icon" />
                <div>
                  <h4>SMART APES {memberTier?.title} Plan</h4>
                  <h4>{memberTier.priceString}/year</h4>
                </div>
              </div>
              <p>What you will get in this plan:</p>
              {memberTier?.perks?.map((perk, index) => (
                <div key={index} className="perk">
                  <CheckIcon />
                  <p>{interpolateString(perk, memberTier?.perksRef)}</p>
                </div>
              ))}
            </section>
            <section className="paymentSelection">
              <h3>Payment Method</h3>
              <Button
                onClick={handleOpenModal}
                fullWidth
                className="paymentBtn"
              >
                <Grid
                  container
                  spacing={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item md={5}>
                    <div className="paymentMethod">
                      <Image
                        src={HitpayLogo}
                        alt="hitpay logo"
                        width={120}
                        height={30}
                      />
                    </div>
                  </Grid>
                  <Grid item md={5}>
                    <p>{paymentChooseMethod ?? "Choose"} Payment Method</p>
                  </Grid>
                  <Grid item md={2}>
                    <div className="proceedArrow">
                      <ArrowForwardIosIcon />
                    </div>
                  </Grid>
                </Grid>
              </Button>
            </section>
          </Grid>
          <Grid item md={5} xs={12}>
            <section className="memberPaymentDetail">
              <div
                className="memberPaymentHeader"
                style={{ backgroundImage: `url(${PaymentDetailMask.src})` }}
              >
                Your Purchase Plan
              </div>
              <div className="memberPaymentContent">
                <div className="paymentItem">
                  <p className="paymentLabel">Plan Type</p>
                  <p className="paymentContent">
                    SMART APES {memberTier.title} Plan
                  </p>
                </div>
                <div className="paymentItem">
                  <p className="paymentLabel">Payment Method</p>
                  <p className="paymentContent">{paymentChooseMethod ?? "-"}</p>
                </div>
                <hr />
                <div className="paymentItem">
                  <p className="paymentLabel">Grand Total</p>
                  <p className="paymentContent">{memberTier.totalPaidString}</p>
                </div>
                <div className="memberDisclaimer">
                  <Checkbox checked={termsChecked} onChange={handleCheck} />
                  <p>
                    I have read and accept{" "}
                    <Link href="/terms-of-services">SMART APES Policy</Link>,
                    including the marketing may email and SMS me about the
                    services it provides. By providing a contact number, I
                    invite SMART APES or its Trusted Partners to call me during
                    the call-center opening hours to discuss about the potential
                    promotion
                  </p>
                </div>
                {!isPaymentPending ? (
                  <Button
                    onClick={handleProceed}
                    fullWidth
                    className="btnProceed"
                  >
                    Proceed to Payment
                  </Button>
                ) : (
                  <Button fullWidth className="btnPending" disabled>
                    Waiting Payment...
                  </Button>
                )}
              </div>
            </section>
          </Grid>
        </Grid>
      </Container>
      <ModalPaymentMethod
        paymentMethods={paymentMethods}
        updatePayment={updatePayment}
        active={active}
        handleChoosePaymentMethod={handleChoosePaymentMethod}
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default memo(MemberCheckoutPage);
