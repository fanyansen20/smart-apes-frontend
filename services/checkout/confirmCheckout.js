import API from "@helper/apiHelper";

/**
 * @param {{
 * checkoutId : string
 * checkout_type : "GENERAL"|"PROFILING_TEST"
 * }} props
 * @returns
 */

// TODO : not implement in checkout page

export async function confirmCheckout({
  checkoutId,
  checkout_type = "GENERAL",
}) {
  try {
    const payload = {
      checkout_id: checkoutId,
    };

    payload.checkout_type = checkout_type;

    const response = await API.post("v1/checkouts/confirm", payload);

    return response.data;
  } catch (error) {
    return error;
  }
}
