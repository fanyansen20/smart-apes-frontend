import { Fragment } from "react";

// Next
import Image from "next/image";

// MUI
import { Button, Stack, Typography } from "@mui/material";

// Components
import DrawerPanel from "../DrawerPanel";
import OutlinedForwardButton from "../OutlinedForwardButton";

// Hooks
import useToggle from "@hooks/useToggle";

// Styles
import classes from "./_PaymentMethod.module.scss";

// Assets
import HitPay from "@public/assets/images/hitpay.png";
import HitpayPaymentMethod from "../../assets/icons/hitpay-payment-method.svg";

/**
 * @typedef {{
 * id: string;
 * code: string;
 * name: string;
 * }} PaymentMethod
 */

/**
 * @param {{
 * selectedPayment: PaymentMethod;
 * paymentMethods: PaymentMethod[];
 * onSelectPayment: (payment: PaymentMethod) => void;
 * }} param0
 * @returns
 */

const PaymentMethod = ({
  selectedPayment,
  paymentMethods,
  onSelectPayment,
}) => {
  // #region hooks
  const [open, toggle] = useToggle();
  // #endregion

  // #region function
  /**
   *
   * @param {PaymentMethod} payment
   */
  const handlerSelectPayment = (payment) => {
    onSelectPayment(payment);
    toggle();
  };
  // #endregion

  return (
    <Fragment>
      <OutlinedForwardButton
        disableHover
        disableFocusRipple
        onClick={toggle}
        className={classes.btnOptions}
      >
        <Stack direction="row" gap={1} alignItems="center">
          <Image
            src={HitPay}
            width={72}
            height={18}
            alt="Hit Pay Payment Method"
          />
          <Typography className={classes.productItemText}>
            {selectedPayment} Payment Method
          </Typography>
        </Stack>
      </OutlinedForwardButton>
      <DrawerPanel open={open} onClose={toggle} title="Payment Method">
        {paymentMethods?.map(
          (payment) =>
            payment?.code === "hitpay" && (
              <Button
                key={payment?.id}
                className={classes.btnOptionsList}
                onClick={() => handlerSelectPayment(payment)}
              >
                <Stack direction="row" gap={2} alignItems="center">
                  <Image
                    src={HitpayPaymentMethod}
                    alt={`${payment?.name} Payment Method`}
                  />
                  <Typography className={classes.productItemText}>
                    {payment?.name} Payment Method
                  </Typography>
                </Stack>
              </Button>
            )
        )}
      </DrawerPanel>
    </Fragment>
  );
};

export default PaymentMethod;
