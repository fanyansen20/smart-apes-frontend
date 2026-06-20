import API from "@helper/apiHelper";

/**
 * @param {{cart_ids : [string]}} payload
 * @returns
 */

export async function createCheckoutsFromCart(payload) {
  try {
    const res = await API.post("v1/checkouts/cart", payload);

    return res?.data;
  } catch (error) {
    return {
      message: error?.response?.data?.message,
      code: error?.response?.data?.code || error?.response?.status,
    };
  }
}
