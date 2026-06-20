import API from "@helper/apiHelper";

/**
 * @param {{
 * type : string
 * notes : string
 * qty : number
 * itemId : string
 * variantId : string
 * }} props
 * @returns
 */

export const postProductCart = async ({
  type,
  notes = "",
  qty,
  itemId,
  variantId,
}) => {
  try {
    const payload = {
      type,
      notes,
      qty,
      item_id: itemId,
      variant_id: variantId,
    };

    const response = await API.post("v1/carts", payload);
    return response;
  } catch (error) {
    throw error;
  }
};
