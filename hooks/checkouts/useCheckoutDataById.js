// React
import { useCallback, useEffect, useState } from "react";

// Hooks
import useNotification from "@hooks/useNotification";

// API
import getDataCheckoutById from "pages/api/clientSide/checkouts/getDataCheckoutById";

const useCheckoutDataById = ({ checkoutId }) => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [_msg, sendNotification] = useNotification();

  const fetchCheckoutData = () => {
    setCheckoutData(null);
    return getDataCheckoutById(checkoutId).then((networkRes) => {
      const failMsg =
        networkRes?.response?.data?.message || networkRes?.message;

      if (failMsg) {
        sendNotification({
          msg: [failMsg],
          variant: "error",
        });
      } else {
        setCheckoutData(networkRes);
      }
    });
  };

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const getCheckoutData = useCallback(() => ({ checkoutData }), [checkoutData]);

  const payCheckoutById = () => {
    if (checkoutData?.user_payment?.payment_method?.code === "paypal") {
      window.open(
        `${checkoutData?.user_payment?.paypal?.payment_url}`,
        "_blank"
      );
    }
    if (checkoutData?.user_payment?.payment_method?.code === "hitpay") {
      window.open(
        `${checkoutData?.user_payment?.hitpay?.hitpay_payment_url}`,
        "_blank"
      );
    }
  };

  return {
    fetchCheckoutData,
    getCheckoutData,
    payCheckoutById,
  };
};

export default useCheckoutDataById;
