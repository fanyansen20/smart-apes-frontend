import API from "@helper/apiHelper";
import useNotification from "@hooks/useNotification";

const useManageCarts = () => {
  const [_, sendNotification] = useNotification();

  /**
   * @param {{
   * cartId: string
   * qty: number
   * notes: string
   * callback: cb
   * }} props
   */
  const updateCart = async ({ cartId, qty, notes, callback = () => null }) => {
    try {
      const payload = {};

      if (qty) payload.qty = qty;
      if (notes) payload.notes = notes;

      await API.patch(`v1/carts/${cartId}`, payload);

      callback();
    } catch (error) {
      sendNotification({
        msg: ["Unable to update cart item. Please try again later"],
        variant: "error",
      });
    }
  };

  /**
   * @param {{
   * selectedProducts: Array.<Object>
   * callback: cb
   * }} props
   */
  const deleteCarts = async ({ selectedProducts, callback = () => null }) => {
    try {
      const payload = {
        ids: selectedProducts,
      };

      await API.delete("v1/carts", {
        data: payload,
      });

      sendNotification({
        msg: ["Successful remove from cart"],
      });

      callback();
    } catch (error) {
      sendNotification({
        msg: ["Unable to remove item from cart. Please try again later"],
        variant: "error",
      });
    }
  };

  return { updateCart, deleteCarts };
};

export default useManageCarts;
