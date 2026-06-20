/**
 * @param {{
 * isLogin : boolean
 * push : () => ()
 * }} props
 * @returns
 */

// hooks
import useNotification from "@hooks/useNotification";

// service
import createCheckoutProduct from "services/checkout/product/createCheckoutProduct";

const useProcessCheckout = ({ isLogin, push }) => {
  const [_msg, sendNotification] = useNotification();

  /**
   * @typedef {{
   *  item_id: string
   *  type: "physical" | 'digital'
   *  qty: number
   *  variant_id: string
   * }} PayloadCheckout
   */

  /**
   * @param {{
   * payload : PayloadCheckout
   * openModalAlert : () => {}
   * }} props
   */

  const processCheckout = async ({ payload, openModalAlert }) => {
    if (!isLogin) {
      return push("/login");
    }

    const resCheckoutProduct = await createCheckoutProduct(payload);

    if (resCheckoutProduct?.code === 400) {
      if (
        resCheckoutProduct?.message === "Product is outside of checkout limit"
      ) {
        return sendNotification({
          msg: ["Not meet minimum order requirement"],
          variant: "error",
        });
      }

      if (resCheckoutProduct?.message == "User address is missing") {
        return openModalAlert(true);
      }
    }

    window.scrollTo(0, 0);
    push(`../cart/checkout/${resCheckoutProduct.id}`);
  };

  return processCheckout;
};

export default useProcessCheckout;
