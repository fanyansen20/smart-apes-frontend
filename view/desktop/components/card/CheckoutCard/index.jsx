// Mui Material
import { Checkbox, Stack } from "@mui/material";

// style
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import Link from "next/link";
import classes from "./_CheckoutCard.module.scss";

// helper
import { checkValue, formatCurrency } from "../../../../../helper/checkValue";

/**
 *
 * @param {{
 * packageType : string
 * paymentMethod : string
 * quantity : number
 * subTotal : number
 * grandTotal : number
 * checked : boolean
 * onChange : () => {}
 * onClick : () => {}
 * }} props
 * @returns
 */

const CheckoutCart = ({
  packageType = "",
  paymentMethod = "-",
  quantity = 0,
  subTotal = 0,
  grandTotal = 0,
  checked = false,
  onChange,
  onClick,
}) => {
  return (
    <div className={classes.containerCheckoutCart}>
      <div className={classes.headingCheckoutCart}>Your Purchase</div>

      <div className={classes.cardContainer}>
        <Stack direction="row" justifyContent="space-between">
          <h4 className={classes.titleText}>Package Type</h4>
          <h4>{checkValue(packageType)}</h4>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <h4 className={classes.titleText}>Payment Method</h4>
          <h4> {checkValue(paymentMethod)} </h4>
        </Stack>

        <div className={classes.dividerDashed} />

        <Stack direction="row" justifyContent="space-between">
          <h4 className={classes.titleText}>Quantity</h4>
          <h4>{checkValue(quantity)}</h4>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <h4 className={classes.titleText}>Sub Total</h4>
          <h4> {formatCurrency(subTotal)} </h4>
        </Stack>

        <div className={classes.dividerDashed} />

        <Stack direction="row" justifyContent="space-between">
          <h4 className={classes.titleText}>Grand Total</h4>
          <h4> {formatCurrency(grandTotal)} </h4>
        </Stack>

        <Stack
          direction="row"
          gap={0.3}
          alignItems="flex-start"
          className={classes.checkoutDisclaimer}
        >
          <Checkbox checked={checked} onChange={onChange} />
          <p>
            I have read and accept SMART APES
            <Link href="/terms-of-services"> Privacy Policy,</Link> including
            the marketing may email and SMS me about the services it provides.
            By providing a contact number, I invite SMART APES or its Trusted
            Partners to call me during the call-center opening hours to discuss
            about the potential promotion
          </p>
        </Stack>

        <PrimaryButton fullWidth onClick={onClick} disabled={!checked}>
          Proceed to Payment
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CheckoutCart;
