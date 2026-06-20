/**
 *
 * @param {{
 * membershipDiscount: import("@types/product").DiscountRate[]
 * membership: import("@types/membership").MembershipInitialState
 * }} param0
 * @returns import("@types/product").DiscountRate
 */

export const getMembershipDiscountPrice = ({
  membership,
  membershipDiscount,
}) => {
  const memberDiscountRate = membershipDiscount?.find(
    (el) =>
      membership?.status === "ACTIVE" &&
      el?.tier &&
      membership?.memberType &&
      el?.tier === membership?.memberType
  );

  return memberDiscountRate;
};
