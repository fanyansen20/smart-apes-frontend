// React
import { memo } from "react";

// Helper
import { formatCurrency } from "@helper/checkValue";

// MUI Components
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

// MUI Icons
import { KeyboardArrowUp } from "@mui/icons-material";

// Styles
import classes from "./FooterPurchaseNavigation.module.scss";

/**
 * Footer Purchase Navigation Component Types
 *
 * @param {{
 *  totalPrice: number
 *  submitText: ?string
 *  disablePurchaseBtn: boolean
 *  handlePurchaseNow: () => void
 *  handleTotalSummaryDrawer: () => void
 * }} props
 * @returns {JSX.Element}
 */

const FooterPurchaseNavigation = ({
  totalPrice,
  submitText,
  disablePurchaseBtn,
  handlePurchaseNow,
  handleTotalSummaryDrawer,
  label,
}) => {
  return (
    <Paper className={classes.footerNavigation} elevation={3}>
      <BottomNavigation sx={{ justifyContent: "space-between" }}>
        <Stack
          direction="column"
          justifyContent="center"
          className={classes.priceContainer}
        >
          <Typography className={classes.totalLabel}>Total</Typography>
          <Stack direction="row" gap={0.5} alignItems="center">
            <Typography className={classes.price}>
              {formatCurrency(totalPrice)}
            </Typography>
            {handleTotalSummaryDrawer && (
              <IconButton
                className={classes.priceIconBtn}
                onClick={handleTotalSummaryDrawer}
              >
                <KeyboardArrowUp />
              </IconButton>
            )}
          </Stack>
        </Stack>

        <BottomNavigationAction
          showLabel
          onClick={handlePurchaseNow}
          disabled={disablePurchaseBtn}
          className={classes.purchaseBtn}
          label={submitText || "Purchase Now"}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default memo(FooterPurchaseNavigation);
