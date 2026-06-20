// React
import React, { useEffect, useState } from "react";

// Next
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getMembershipData,
  setCheckoutTier,
} from "store/reducer/membership/membershipSlice";

// Hooks
import { usePurchaseMembership } from "services/membership/useCases/purchaseMembership/usePurchaseMembership";

// MUI Component
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

// MUI Icons
import { ArrowBackIos } from "@mui/icons-material";

// Icons
import HitPay from "@public/assets/images/hitpay.png";

// Images
import HitpayPaymentMethod from "../../assets/icons/hitpay-payment-method.svg";

// Styles
import { mobileFormatCurrency } from "@helper/checkValue";
import { interpolateString } from "@helper/interpolateString";
import useNotification from "@hooks/useNotification";
import DrawerPanel from "view/mobile/components/DrawerPanel";
import FooterPurchaseNavigation from "view/mobile/components/FooterPurchaseNavigation";
import OutlinedForwardButton from "view/mobile/components/OutlinedForwardButton";
import { pricingPlanFeatureList } from "../profiling-test";
import classes from "./Checkout.module.scss";

/**
 * @import { PaymentMethod } from "types/membership"
 */

/**
 * @param {{
 *  paymentMethods: Array<PaymentMethod>
 *  userId: string
 * }} props
 *
 */

function Checkout({ paymentMethods, userId }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { back, push } = useRouter();
  const [_msg, sendNotification] = useNotification();
  const [selectedPaymentMethod, setPaymentMethod] = useState(
    paymentMethods?.find((payment) => payment?.code === "hitpay")
  );
  const [isOpenPaymentOptions, setOpenPaymentOptions] = useState(false);
  const [isOpenPriceSummary, setOpenPriceSummary] = useState(false);
  const [isCheckedTerms, setCheckedTerms] = useState(false);
  const { purchaseMembership } = usePurchaseMembership();

  /**
   * @type {MembershipInitialState}
   */
  const membershipData = useSelector((store) => store.member);

  /**
   * @type {MembershipTier}
   */
  const memberTier = membershipData?.checkoutTier;

  const closeSelectPaymentOptionsList = () => {
    setOpenPaymentOptions(false);
  };

  const onSelectPaymentMethod = (paymentMethod) => {
    setPaymentMethod(paymentMethod);
    closeSelectPaymentOptionsList();
  };

  // Handle proceed to payment
  const handleProceed = async () => {
    // Validation if no payment method or not accept SA terms
    if (!selectedPaymentMethod?.id) {
      return sendNotification({
        variant: "error",
        msg: ["Please choose payment method"],
      });
    }

    if (!isCheckedTerms) {
      return sendNotification({
        variant: "error",
        msg: ["Please accept the SmartApes Policy"],
      });
    }

    await purchaseMembership({
      userId,
      tier: memberTier?.title,
      paymentMethodId: selectedPaymentMethod?.id,
    }).then((resPurchase) => {
      if (resPurchase?.payment_url) {
        window.open(`${resPurchase?.payment_url}`, "_blank");
        dispatch(
          setCheckoutTier({
            ...memberTier,
            isPendingPayment: true,
          })
        );
      }
    });
  };

  // Redirect to membership if no tier selected
  useEffect(() => {
    if (!memberTier) push("/membership");
  }, [memberTier]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "visible" &&
        memberTier?.isPendingPayment
      ) {
        // Tab is active
        // Perform actions or update state as needed
        dispatch(
          getMembershipData({ userId, accessToken: session?.accessToken })
        ).then((data) => {
          if (data.payload.status === "ACTIVE") {
            push(`/membership/checkout/success`).then(() =>
              dispatch(setCheckoutTier(""))
            );
          }
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <Stack
        direction="column"
        gap={2}
        className={classes.membershipCheckoutPage}
      >
        {/* Header */}
        <Stack direction="row" alignItems="center" gap={0.75} m={1.5}>
          <IconButton
            className={classes.backIconBtnHeader}
            size="small"
            onClick={() => back()}
          >
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <Typography fontWeight={600}>Checkout Transaction</Typography>
        </Stack>

        {/* Membership Plan */}
        <Stack direction="row" gap={1} alignItems="center">
          <Avatar
            sx={{ width: 80, height: 80 }}
            variant="square"
            src={memberTier?.icon?.src}
          />
          <Stack direction="column" gap={1}>
            <Typography className={classes.membershipPlanText}>
              SMART APES {memberTier?.title} Plan
            </Typography>
            <Typography className={classes.sectionTitle}>
              1 x {memberTier?.priceString}/year
            </Typography>
          </Stack>
        </Stack>

        <Divider />

        <Stack direction="column" gap={1}>
          <Typography className={classes.sectionTitle}>
            What you will get:
          </Typography>
          {memberTier?.perks?.map((perk) =>
            pricingPlanFeatureList(
              interpolateString(perk, memberTier?.perksRef)
            )
          )}
        </Stack>

        <Divider />

        <Stack direction="column" gap={2}>
          <Typography className={classes.sectionTitle}>
            Payment Method
          </Typography>
          <OutlinedForwardButton
            disableHover
            disableFocusRipple
            onClick={() => setOpenPaymentOptions(!isOpenPaymentOptions)}
          >
            <Stack direction="row" gap={1} alignItems="center">
              <Image
                src={HitPay}
                width={72}
                height={18}
                alt="Hit Pay Payment Method"
              />
              <Typography className={classes.selectOptionsText}>
                {selectedPaymentMethod?.name} Payment Method
              </Typography>
            </Stack>
          </OutlinedForwardButton>
          <FormControlLabel
            sx={{ alignItems: "flex-start" }}
            control={<Checkbox sx={{ paddingTop: 0 }} size="small" />}
            label={
              <Typography textAlign="justify" className={classes.smallText}>
                I have read and accept SMART APES{" "}
                <span className={classes.highlightText}>Privacy Policy</span>,
                including the marketing may email and SMS me about the services
                it provides. By providing a contact number, I invite SMART APES
                or its{" "}
                <span className={classes.highlightText}>Trusted Partners</span>{" "}
                to call me during the call-center opening hours to discuss about
                the potential promotion
              </Typography>
            }
            labelPlacement="end"
            checked={isCheckedTerms}
            onClick={() => setCheckedTerms(!isCheckedTerms)}
          />
        </Stack>
      </Stack>

      {/* Payment Method Options List */}
      <DrawerPanel
        open={isOpenPaymentOptions}
        onClose={() => setOpenPaymentOptions(!isOpenPaymentOptions)}
        title="Payment Method"
      >
        {paymentMethods?.map(
          (payment) =>
            payment?.code === "hitpay" && (
              <Button
                key={payment?.id}
                className={classes.btnOptionsList}
                onClick={() => onSelectPaymentMethod(payment)}
              >
                <Stack direction="row" gap={2} alignItems="center">
                  <Image
                    src={HitpayPaymentMethod}
                    alt={`${payment?.name} Payment Method`}
                  />
                  <Typography className={classes.paymentMethodText}>
                    {payment?.name} Payment Method
                  </Typography>
                </Stack>
              </Button>
            )
        )}
      </DrawerPanel>

      <DrawerPanel
        open={isOpenPriceSummary}
        onClose={() => setOpenPriceSummary(false)}
        title="Total"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography className={classes.totalLabelText}>
            Product Type
          </Typography>
          <Typography className={classes.paymentMethodText}>
            SMART APES {memberTier?.title} Plan
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography className={classes.totalLabelText}>
            Grand Total
          </Typography>
          <Typography className={classes.paymentMethodText}>
            {mobileFormatCurrency(memberTier?.price)}
          </Typography>
        </Stack>
      </DrawerPanel>

      <FooterPurchaseNavigation
        submitText="Proceed to Payment"
        totalPrice={memberTier?.totalPaid}
        handlePurchaseNow={handleProceed}
        handleTotalSummaryDrawer={() =>
          setOpenPriceSummary(!isOpenPriceSummary)
        }
      />
    </>
  );
}

export default Checkout;
