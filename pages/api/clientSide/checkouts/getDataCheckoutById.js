import API from "@helper/apiHelper";

/**
 * @param {string} checkoutId
 * @returns
 */

export default async function getDataCheckoutById(checkoutId) {
  try {
    const { data } = await API.get(`v1/checkouts/${checkoutId}`);

    return data.data;
  } catch (error) {
    return error;
  }
}
