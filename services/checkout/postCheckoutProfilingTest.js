import API from "@helper/apiHelper";

/**
 * @param {{
 *  itemId : string
 *  qty : number
 *  payment_method_id : string
 * }} props
 * @returns
 */

// TODO not implement in checkout profiling page

export async function postCheckoutProfilingTest({
  itemId,
  qty,
  payment_method_id,
}) {
  try {
    const payload = {
      item_id: itemId,
      qty,
      payment_method_id,
    };

    const response = await API.post("v1/checkouts/profiling-test", payload);

    return response.data;
  } catch (error) {
    return error;
  }
}
