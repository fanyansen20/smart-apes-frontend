import updateDeliveryAutoApply from "pages/api/checkouts/updateDeliveryAutoApply";

export const autoSelectDeliveryService = async (accessToken, checkoutId) => {
  const selectedDeliveryServices = {};

  const { delivery } = await updateDeliveryAutoApply(accessToken, checkoutId);

  delivery?.senders?.map((delivery) => {
    if (delivery?.delivery_service) {
      selectedDeliveryServices[delivery.checkout_shop_id] = {
        companyName: delivery.delivery_service.company_name,
        serviceId: delivery?.delivery_service?.delivery_service_id,
        serviceName: delivery.delivery_service.name,
        deliveryFee: delivery.total_delivery_fee,
        isPackageSplit: delivery.delivery_service.is_package_split,
        totalPackagesSplit: delivery.delivery_service.package_split_count,
      };
    }
  });

  return selectedDeliveryServices;
};
