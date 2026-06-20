import API from "@helper/apiHelper";
import useErrorHandler from "@hooks/useErrorHandler";

export const usePurchaseMembership = () => {
  const { handleClientError } = useErrorHandler();

  const purchaseMembership = async ({ userId, tier, paymentMethodId }) => {
    try {
      const payload = {
        payment_method_id: paymentMethodId,
      };

      const resPurchase = await API.post(
        `v1/users/${userId}/membership/purchase/${tier}`,
        payload
      );

      return resPurchase?.data;
    } catch (error) {
      handleClientError(error);
    }
  };

  return {
    purchaseMembership,
  };
};
