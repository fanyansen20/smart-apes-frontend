/**
 * @param {string} value
 */

export const getProductVariantByName = (value) => {
  let variantName = undefined;

  if (!value) return variantName;

  const values = value?.split(" - ");

  // to make sure there's a variant
  if (values.length < 2) return variantName;

  variantName = values[values?.length - 1];

  return variantName;
};
