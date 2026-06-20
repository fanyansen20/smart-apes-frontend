import API from "@helper/apiHelper";

/**
 * @typedef {{
 * variantId: string
 * qty: number
 * }} ProductVariant
 */

/**
 * @typedef {{
 * type: string
 * notes?:string
 * variants: ProductVariant[]
 * }} ProductPayload
 */

/**
 * @param {string} productId
 * @param {ProductPayload} payload
 * @returns {Promise}
 */
export const createCheckoutMultipleVariant = async (productId, payload) => {
  try {
    const response = await API.post(
      `v1/checkouts/items/${productId}/variants`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
};
