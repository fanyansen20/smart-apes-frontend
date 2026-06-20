import { roundUpDiscountLessThanOne } from "./checkValue";

/**
 * @param {number} basePrice - price before discount
 * @param {number} discountPrice - price after discount
 * @returns {number}
 */
export const calculateDiscountPercentage = (
  basePrice = 0,
  discountPrice = 0
) => {
  const discountPercentage =
    ((basePrice - discountPrice) / basePrice) * 100 || 0;

  return roundUpDiscountLessThanOne(discountPercentage);
};
