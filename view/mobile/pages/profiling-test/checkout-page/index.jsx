// Next || React
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

// MUI
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  Checkbox,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// Hooks
import useChangeQuantity from "@hooks/profiling-test-checkout/useChangeQuantity";
import useChoosePaymentMethod from "@hooks/profiling-test-checkout/useChoosePaymentMethod";

// Component
import DrawerPanel from "view/mobile/components/DrawerPanel";
import FooterPurchaseNavigation from "view/mobile/components/FooterPurchaseNavigation";
import HeaderNavigation from "view/mobile/components/HeaderNavigation";
import PaymentMethod from "view/mobile/components/PaymentMethod";

// Styles
import classes from "./_CheckoutPage.module.scss";

// Helper || Service
import { formatCurrency, roundUpDiscountLessThanOne } from "@helper/checkValue";
import { postCheckoutProfilingTest } from "services/checkout/postCheckoutProfilingTest";

const MobileCheckoutProfilingTest = ({
  dataCheckout,
  paymentMethods,
  itemId,
}) => {
  const router = useRouter();

  // #region initialize data
  const mainVariant = dataCheckout?.main_variant;
  const benefitList = dataCheckout && JSON.parse(dataCheckout?.desc);
  // #endregion

  // #region useState
  const [checked, setChecked] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  // #endregion

  // #region hooks
  const { paymentMethod, paymentMethodId, updatePaymentMethodName } =
    useChoosePaymentMethod({
      paymentMethods,
    });

  const {
    quantity,
    subTotal,
    changeQuantity,
    incrementHandler,
    decrementHandler,
  } = useChangeQuantity({
    basePrice: mainVariant?.price,
  });
  // #endregion

  // #region function
  const handlerChecked = (e) => {
    setChecked(e.target.checked);
  };

  const updatePayment = async (payment) => {
    updatePaymentMethodName(payment?.name ?? "Hitpay");
  };

  const handlerShowDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleChangeOnBlur = (e) => {
    const value = Number(e.target.value);

    if (value <= stockProduct && value >= 0) {
      changeQuantity(e);
    }
  };

  const handlerPurchase = async () => {
    const responseCheckout = await postCheckoutProfilingTest({
      itemId,
      qty: quantity,
      payment_method_id: paymentMethodId,
    });

    if (!responseCheckout?.message) {
      if (responseCheckout.user_payment.payment_method.code === "hitpay") {
        window.open(
          responseCheckout.user_payment.hitpay.hitpay_payment_url,
          "_blank"
        );

        router.push(
          `/payment/pending/${responseCheckout?.id}?type=profiling-test-checkout`
        );
      }
    }
  };
  // #endregion

  // #region data
  const isIndexPaymentMethod = Boolean(
    paymentMethods.find((item) => item.name === paymentMethod)
  );
  const stockProduct = !quantity ? 9 : quantity * 99;
  // #endregion

  // #region useEffect
  useEffect(() => {
    if (!isIndexPaymentMethod) {
      updatePayment();
    }
  }, [paymentMethodId]);
  // #endregion

  return (
    <Fragment>
      <Container className={classes.container}>
        <HeaderNavigation pageTitle="Checkout Transaction" />
        <Grid container alignItems="center" gap={1} mt={2}>
          <Grid
            container
            className={classes.imageContainer}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={dataCheckout?.cover_image_url_500}
              alt={`image ${dataCheckout?.cover_image_url_500}`}
              objectFit="contain"
              width="54px"
              height="70px"
            />
          </Grid>
          <Grid>
            <Typography className={classes.productTitle}>
              {dataCheckout?.title}
            </Typography>
            <Grid container gap={1} className={classes.priceContainer} mb={1}>
              <Typography className={classes.discount}>
                {roundUpDiscountLessThanOne(mainVariant?.discount?.percent)}%
              </Typography>
              <Typography className={classes.originalPrice}>
                {formatCurrency(mainVariant?.base_price)}
              </Typography>
              <Typography>{formatCurrency(mainVariant?.price)}</Typography>
            </Grid>
            <Grid>
              <div className={[classes.quantityInputBtn]}>
                <Button
                  disabled={quantity <= 1}
                  className={
                    quantity <= 1 ? classes.buttonDisabled : classes.buttonQty
                  }
                  onClick={decrementHandler}
                >
                  -
                </Button>
                <TextField
                  className={classes.numberInput}
                  value={quantity}
                  onChange={(e) =>
                    Number(e.target.value) <= stockProduct && changeQuantity(e)
                  }
                  onBlur={handleChangeOnBlur}
                />
                <Button
                  disabled={quantity >= stockProduct}
                  className={
                    quantity >= stockProduct
                      ? classes.buttonDisabled
                      : classes.buttonQty
                  }
                  onClick={incrementHandler}
                >
                  +
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Grid container className={classes.benefitContainer}>
        {benefitList?.benefit?.map((item, key) => (
          <Stack direction="row" alignItems="center" key={key} gap={1}>
            <CheckIcon className={classes.checkIcon} />
            <Typography className={classes.benefitText}>{item.text}</Typography>
          </Stack>
        ))}
      </Grid>
      <Container className={classes.paymentMethodContainer}>
        <Stack direction="column" spacing={2}>
          <Typography className={classes.paymentMethodTitle}>
            Payment Method
          </Typography>
          <PaymentMethod
            selectedPayment={paymentMethod}
            paymentMethods={paymentMethods}
            onSelectPayment={updatePayment}
          />
          <Stack direction="row" className={classes.checkoutDisclaimer}>
            <Checkbox checked={checked} onChange={handlerChecked} />
            <Typography className={classes.disclaimerText}>
              I have read and accept SMART APES
              <Link href="/terms-of-services"> Privacy Policy,</Link> including
              the marketing may email and SMS me about the services it provides.
              By providing a contact number, I invite SMART APES or its Trusted
              Partners to call me during the call-center opening hours to
              discuss about the potential promotion
            </Typography>
          </Stack>
        </Stack>
      </Container>

      <FooterPurchaseNavigation
        totalPrice={subTotal}
        handlePurchaseNow={handlerPurchase}
        handleTotalSummaryDrawer={handlerShowDrawer}
        label="Proceed to Payment"
        disablePurchaseBtn={!checked}
      />

      <DrawerPanel open={showDrawer} onClose={handlerShowDrawer} title="Total">
        <Stack direction="row" justifyContent="space-between">
          <Typography className={classes.summaryTitle}>Quantity</Typography>
          <Typography className={classes.summaryValue}>{quantity}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography className={classes.summaryTitle}>Sub Total</Typography>
          <Typography className={classes.summaryValue}>
            {formatCurrency(mainVariant?.price)}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography className={classes.summaryTitle}>Grand Total</Typography>
          <Typography className={classes.summaryValue}>
            {formatCurrency(subTotal)}
          </Typography>
        </Stack>
      </DrawerPanel>
    </Fragment>
  );
};

export default MobileCheckoutProfilingTest;
