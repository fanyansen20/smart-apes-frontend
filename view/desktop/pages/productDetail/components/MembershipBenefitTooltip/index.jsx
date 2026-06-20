// React
import React, { memo } from "react";

// Redux
import { useSelector } from "react-redux";

// MUI Components
import { Avatar, Stack, Tooltip } from "@mui/material";

// Icons
import ProfitIcon from "@public/assets/icons/dolar-profit.svg";

// Styles
import classes from "./MembershipBenefitTooltip.module.scss";

// Constants
import { MembershipBenefit } from "constant/membership";

function MembershipBenefitTooltip() {
  /**
   * @type {MembershipInitialState}
   */
  const membershipData = useSelector((store) => store.member);
  const isMembershipExist =
    membershipData.memberType && membershipData.memberType !== "none";
  return (
    !isMembershipExist && (
      <Tooltip
        classes={{
          tooltip: classes.membershipBenefitTooltip,
          tooltipArrow: classes.tooltipArrow,
        }}
        title={
          <Stack direction="column" gap={1}>
            {MembershipBenefit.map((benefit, benefitIdx) => (
              <Stack
                direction="row"
                key={benefitIdx}
                gap={1}
                alignItems="center"
              >
                <Avatar
                  sx={{ width: 24, height: 24 }}
                  variant="square"
                  src={benefit.image.src}
                />
                {benefit.description}
              </Stack>
            ))}
          </Stack>
        }
        placement="right"
        arrow
      >
        <Avatar
          sx={{ width: 20, height: 20 }}
          alt="Membership Plans Benefit"
          src={ProfitIcon.src}
        />
      </Tooltip>
    )
  );
}

export default memo(MembershipBenefitTooltip);
