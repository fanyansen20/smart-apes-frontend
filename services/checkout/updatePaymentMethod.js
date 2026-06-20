import API from "@helper/apiHelper";

/**
 * @param {{
 * checkoutId : string
 * paymentMethodId : string
 * }} props
 * @returns
 */

// TODO : not implement in checkout page

export async function updatePaymentMethod({ checkoutId, paymentMethodId }) {
  const payload = {
    payment_method_id: paymentMethodId,
  };

  try {
    const response = await API.patch(
      `/v1/checkouts/${checkoutId}/payment-method`,
      payload
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
