// React
import React, { memo } from "react";

// Redux
import { useSelector } from "react-redux";

// MUI Components
import { Avatar, Stack, Tooltip, Typography } from "@mui/material";

// Icons
import MemberDiscountIcon from "@public/assets/icons/member-discount.svg";

// Styles
import { formatCurrency } from "@helper/checkValue";
import tooltipClasses from "../MembershipBenefitTooltip/MembershipBenefitTooltip.module.scss";
import classes from "./MembershipDiscountRate.module.scss";

/**
 * @param {{
 *  productMembershipTiersPrice: ProductMembershipTierPrice[]
 * }}
 *
 * @returns {JSX.Element}
 */

const MembershipDiscountRate = ({ productMembershipTiersPrice }) => {
  /**
   * @type {MembershipInitialState}
   */
  const membershipData = useSelector((store) => store.member);
  const productMembershipTierPrice = productMembershipTiersPrice?.find(
    (membershipTier) => membershipTier?.tier === membershipData?.memberType
  );
  const isMembershipExist =
    membershipData.memberType && membershipData.memberType !== "none";

  return (
    isMembershipExist &&
    productMembershipTierPrice && (
      <Stack direction="column" gap={1} mb="-10px">
        <Stack
          direction="column"
          gap={1}
          className={classes.membershipDiscountRate}
        >
          <Typography className={classes.sectionTitle}>
            Membership EXTRA Discount
          </Typography>
          <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
            <Stack
              direction="row"
              className={classes.discountLabel}
              alignItems="center"
              gap={0.5}
            >
              <Tooltip
                classes={{
                  tooltip: `${tooltipClasses.membershipBenefitTooltip} ${classes.membershipStatusTooltip}`,
                }}
                title={
                  <Typography>
                    This discount is from your
                    <b> {productMembershipTierPrice?.tier} Membership</b>
                  </Typography>
                }
                placement="right"
                arrow
              >
                <Avatar
                  sx={{ width: 28, height: 28 }}
                  variant="square"
                  alt="Membership Discount Rate"
                  src={MemberDiscountIcon.src}
                />
              </Tooltip>
              <Typography className={classes.discountPercentText}>
                +{parseInt(productMembershipTierPrice?.discount_percent)}%
              </Typography>
            </Stack>
            <Typography className={classes.basePriceText}>
              {formatCurrency(productMembershipTierPrice?.price)}
            </Typography>
            <Typography className={classes.finalPriceText}>
              {formatCurrency(productMembershipTierPrice?.final_price)}
            </Typography>
          </Stack>
        </Stack>
        <Typography textAlign="left">Without membership:</Typography>
      </Stack>
    )
  );
};

export default memo(MembershipDiscountRate);
