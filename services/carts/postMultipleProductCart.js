import API from "@helper/apiHelper";

/**
 * @typedef {{
 * type: string
 * qyt: number
 * itemId: string
 * variantId: string
 * notes?: string
 * }} ProductPayload
 */

/**
 * @param {ProductPayload[]} payload
 * @returns
 */
export const postMultipleProductCart = async (payload) => {
  try {
    const response = await API.post("v1/carts/multiple", payload);
    return response;
  } catch (error) {
    throw error;
  }
};
