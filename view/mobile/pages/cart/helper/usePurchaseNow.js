import API from "@helper/apiHelper";
import useNotification from "@hooks/useNotification";
import { useRouter } from "next/router";
import { useState } from "react";

const usePurchaseNow = () => {
  const [_, sendNotification] = useNotification();
  const [isLoadingPurchase, setIsLoadingPurchase] = useState(false);
  const router = useRouter();

  const handlePurchaseNow = async ({ dataUserAddress, selectedProducts }) => {
    try {
      setIsLoadingPurchase(true);

      if (dataUserAddress.length === 0) {
        return sendNotification({
          msg: ["Please fill your delivery address in profile section"],
          variant: "error",
        });
      }

      const payload = {
        cart_ids: selectedProducts,
      };

      const response = await API.post("v1/checkouts/cart", payload);

      router.push(
        {
          pathname: "cart/checkout",
          query: { id: response?.data?.id },
        },
        `cart/checkout/${response?.data?.id}`
      );
    } catch (error) {
      sendNotification({
        msg: ["Unable to proceed purchase. Please try again later"],
        variant: "error",
      });
    } finally {
      setIsLoadingPurchase(false);
    }
  };

  return { handlePurchaseNow, isLoadingPurchase };
};

export default usePurchaseNow;
