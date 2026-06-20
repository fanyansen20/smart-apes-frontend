// next || react
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// hooks
import useChangeQuantity from "@hooks/profiling-test-checkout/useChangeQuantity";
import useChoosePaymentMethod from "@hooks/profiling-test-checkout/useChoosePaymentMethod";

// Mui Material
import { Breadcrumbs, Container, Grid, Stack } from "@mui/material";

// icons
import CheckIcon from "@mui/icons-material/Check";

// components
import QuantityButton from "@components/buttons/QuantityButton/QuantityButton";
import CheckoutCart from "view/desktop/components/card/CheckoutCard";
import PaymentMethodSection from "../../../components/PaymentMethodSection";

// style
import classes from "./_CheckoutProfilingPage.module.scss";

// assets
import HomeIcon from "@public/assets/icons/home.svg";

// helper || service
import { formatCurrency, roundUpDiscountLessThanOne } from "@helper/checkValue";
import { postCheckoutProfilingTest } from "services/checkout/postCheckoutProfilingTest";

const CheckoutProfilingTest = ({ dataCheckout, paymentMethods, itemId }) => {
  const mainVariant = dataCheckout?.main_variant;
  const benefitList = dataCheckout && JSON.parse(dataCheckout?.desc);

  const router = useRouter();

  const [checked, setChecked] = useState(false);

  const { paymentMethod, paymentMethodId, updatePaymentMethodName } =
    useChoosePaymentMethod({
      paymentMethods,
    });

  const isIndexPaymentMethod = Boolean(
    paymentMethods.find((item) => item.name === paymentMethod)
  );

  useEffect(() => {
    if (!isIndexPaymentMethod) {
      updatePayment();
    }
  }, [paymentMethodId]);

  const {
    quantity,
    subTotal,
    changeQuantity,
    incrementHandler,
    decrementHandler,
  } = useChangeQuantity({
    basePrice: mainVariant?.price,
  });

  const handlerChecked = (e) => {
    setChecked(e.target.checked);
  };

  const updatePayment = async () => {
    updatePaymentMethodName("Hitpay");
  };

  const stockProduct = !quantity ? 9 : quantity * 99;

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

  return (
    <div className={classes.containerCheckout}>
      <section className={classes.breadcrumbContainer}>
        <Container maxWidth="lg" disableGutters>
          <Breadcrumbs separator="/" aria-label="breadcrumb">
            <Link href="/">
              <Image src={HomeIcon} alt="home" />
            </Link>
            <Link href="/profiling-test">
              <a>
                <p>Profiling Test</p>
              </a>
            </Link>
            <div>...</div>
            <p className={classes.active}>Checkout</p>
          </Breadcrumbs>
        </Container>
      </section>

      <Container>
        <Grid
          container
          justifyContent="center"
          gap={1}
          className={classes.sectionCheckout}
        >
          <Grid container item md={6.5} direction="column" gap={1}>
            <section className={classes.productDetailContainer}>
              <h2>Product Details</h2>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" gap={3}>
                  <Image
                    src={dataCheckout?.cover_image_url_500}
                    alt={`image ${dataCheckout?.cover_image_url_500}`}
                    objectFit="contain"
                    width="77px"
                    height="100px"
                  />
                  <Stack direction="column" justifyContent="center" gap={1}>
                    <h3>{dataCheckout?.title}</h3>
                    <Stack direction="row" gap={1} alignItems="center">
                      <p className={classes.discountPercentage}>
                        <b>
                          {roundUpDiscountLessThanOne(
                            mainVariant?.discount?.percent
                          )}
                          %
                        </b>
                      </p>
                      <p className={classes.discountPrice}>
                        <b>{formatCurrency(mainVariant?.base_price)}</b>
                      </p>
                      <p className={classes.realPrice}>
                        <b>{formatCurrency(mainVariant?.price)}</b>
                      </p>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack direction="column" gap={1}>
                  <p>
                    <b>Quantity</b>
                  </p>
                  <QuantityButton
                    incrementHandler={incrementHandler}
                    decrementHandler={decrementHandler}
                    onChange={(e) => changeQuantity(e)}
                    value={quantity}
                    stock={stockProduct}
                  />
                </Stack>
              </Stack>

              <div className={classes.divider} />

              <Grid direction="column">
                {benefitList?.benefit?.map((item, key) => (
                  <Stack direction="row" alignItems="center" key={key} gap={1}>
                    <CheckIcon sx={{ color: "#7e54f1" }} />
                    <p>{item.text}</p>
                  </Stack>
                ))}
              </Grid>
            </section>

            <PaymentMethodSection
              paymentChooseMethod={paymentMethod}
              paymentMethods={paymentMethods}
            />
          </Grid>
          <Grid item md={4.9}>
            <CheckoutCart
              checked={checked}
              paymentMethod={paymentMethod}
              packageType={dataCheckout?.title}
              quantity={quantity}
              grandTotal={subTotal}
              subTotal={mainVariant?.price}
              onChange={handlerChecked}
              onClick={handlerPurchase}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CheckoutProfilingTest;
