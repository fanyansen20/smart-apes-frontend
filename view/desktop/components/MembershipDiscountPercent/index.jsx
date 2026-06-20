// React
import React, { memo } from "react";

// Redux
import { useSelector } from "react-redux";

// MUI Components
import { Avatar, Stack, Tooltip, Typography } from "@mui/material";

// Styles
import classes from "./MembershipDiscountPercent.module.scss";

// Icons
import ProfitIcon from "@public/assets/icons/dolar-profit.svg";

/**
 * @param {{
 *  hasDiscount: boolean
 *  membershipDiscountPrice: ?ProductMembershipTierPrice
 * }} props
 *
 * @returns {?JSX.Element}
 */

const MembershipDiscountPercent = ({
  hasDiscount,
  membershipDiscountPrice,
}) => {
  /**
   * @type {MembershipInitialState}
   */
  const membershipData = useSelector((store) => store.member);

  const isMembershipExist =
    membershipDiscountPrice &&
    membershipData.memberType &&
    membershipData.memberType !== "none";

  return (
    isMembershipExist && (
      <>
        {hasDiscount && (
          <Typography className={classes.plusSymbol}>+</Typography>
        )}
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          className={classes.membershipDiscountPercent}
        >
          <Typography>{membershipDiscountPrice?.discount_percent}%</Typography>
          <Tooltip
            classes={{
              tooltip: classes.membershipStatusTooltip,
            }}
            title={
              <Typography>
                This discount is from your
                <b> {membershipDiscountPrice?.tier} Membership</b>
              </Typography>
            }
            placement="right"
            arrow
          >
            <Avatar
              sx={{ width: 13.33, height: 13.33 }}
              alt="Membership Plans Benefit"
              src={ProfitIcon.src}
            />
          </Tooltip>
        </Stack>
      </>
    )
  );
};

export default memo(MembershipDiscountPercent);
