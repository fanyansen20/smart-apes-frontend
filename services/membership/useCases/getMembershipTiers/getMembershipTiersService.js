import { memberTiers } from "view/desktop/pages/membership/memberConstant";

export const getMembershipTiersModel = (tiersRes) => {
  if (!tiersRes?.length) return [];

  const populatedTiers = memberTiers.map((tierConstant) => {
    const tierRes = tiersRes.find((val) => val.tier === tierConstant.title);

    if (!tierRes) return tierConstant;

    return {
      ...tierConstant,
      price: tierRes?.membership_price,
      priceString: tierRes?.membership_price_string,
      totalPaid: tierRes?.total_paid,
      totalPaidString: tierRes?.total_paid_string,
    };
  });

  return populatedTiers;
};
