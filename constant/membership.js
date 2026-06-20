import BasicBadge from "../public/assets/images/membership/medal-basic.svg";
import EliteBadge from "../public/assets/images/membership/medal-elite.svg";
import PremiumBadge from "../public/assets/images/membership/medal-premium.svg";

export const MEMBERSHIP_ACTIVITY_TYPES = {
  MEMBERSHIP_PURCHASE: "Membership Purchase",
  DISCOUNT_MEMBERSHIP: "Discount Membership",
};

export const MEMBERSHIP_TIERS = {
  BASIC: "Basic",
  PREMIUM: "Premium",
  ELITE: "Elite",
};

export const MembershipBenefit = [
  {
    image: BasicBadge,
    description: (
      <p>
        Be a <b>Basic Member</b> to get more <b>5% off Discount</b>
      </p>
    ),
  },
  {
    image: PremiumBadge,
    description: (
      <p>
        Be a <b>Premium Member</b> to get more <b>20% + 5% off discount</b>
      </p>
    ),
  },
  {
    image: EliteBadge,
    description: (
      <p>
        Be a <b>Elite Member</b> to get more <b>30% off Discount</b>
      </p>
    ),
  },
];
