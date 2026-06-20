// React
import React, { memo, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

// Next
import { useRouter } from "next/router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  resetStatus as resetSaveSelectedDeliveryServiceByShop,
  saveSelectedDeliveryServiceByShop,
} from "store/reducer/saveSelectedDeliveryServiceByShop/saveSelectedDeliveryServiceByShopSlice";

// Hooks
import useNotification from "@hooks/useNotification";

// Components
import DrawerPanel from "view/mobile/components/DrawerPanel";

// MUI Components
import {
  Avatar,
  Button,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

// Icons
import InfoIcon from "@public/assets/icons/info-circle.svg";

// Styles
import checkoutClasses from "../../Checkout.module.scss";
import classes from "./DeliveryOptions.module.scss";

// Constants
import { API_FETCH_STATUS } from "constant/api";

// Helpers
import {
  convertSizeValue,
  formatCurrency,
  mobileFormatCurrency,
} from "@helper/checkValue";

const DeliveryOptions = () => {
  const router = useRouter();
  const { id: checkoutId } = router?.query;
  const dispatch = useDispatch();
  const [_msg, sendNotification] = useNotification();
  const { control, setValue, watch } = useFormContext();
  const {
    data: deliveryServicesByShopIdData,
    status: statusGetDeliveryServicesByShopId,
    loading: isLoadingGetDeliveryServicesByShopId,
  } = useSelector((state) => state.getDeliveryServicesByShopId);

  const {
    status: statusSaveSelectedDeliveryServiceByShop,
    error: errorSaveSelectedDeliveryServiceByShop,
  } = useSelector((state) => state.saveSelectedDeliveryServiceByShop);

  const {
    selectedDeliveryOptionsShopId,
    selectedDeliveryServicesByShop,
    checkoutDeliveryData,
  } = watch();

  useEffect(() => {
    const successMsg =
      statusSaveSelectedDeliveryServiceByShop === API_FETCH_STATUS.IS_SUCCESS &&
      "Success update Delivery";

    if (successMsg || errorSaveSelectedDeliveryServiceByShop) {
      sendNotification({
        msg: [successMsg || errorSaveSelectedDeliveryServiceByShop],
        variant: successMsg ? "success" : "error",
      });
      dispatch(resetSaveSelectedDeliveryServiceByShop());
    }
  }, [statusSaveSelectedDeliveryServiceByShop]);

  const onSelectDeliveryServiceOption = (deliveryService, subService) => {
    const deliverySenderDataByShopId = checkoutDeliveryData?.senders?.find(
      (sender) => sender?.checkout_shop_id === selectedDeliveryOptionsShopId
    );
    selectedDeliveryServicesByShop[selectedDeliveryOptionsShopId] = {
      companyName: deliveryService?.name,
      deliveryFee: subService?.total_delivery_fee,
      serviceId: subService?.id,
      serviceName: subService?.name,
      isPackageSplit: subService?.is_split,
      totalPackagesSplit:
        deliverySenderDataByShopId?.delivery_service?.package_split_count,
    };
    setValue("selectedDeliveryServicesByShop", selectedDeliveryServicesByShop);

    const serviceId = subService.id;
    const shopFleetId = subService.shop_fleet_id;
    const deliveryServicePayload = shopFleetId
      ? { is_using_shop_fleet: true, service_id: shopFleetId }
      : { is_using_shop_fleet: false, service_id: serviceId };

    dispatch(
      saveSelectedDeliveryServiceByShop({
        checkoutId,
        checkoutShopId: selectedDeliveryOptionsShopId,
        deliveryServicePayload,
      })
    ).then(
      () => subService?.is_split && setValue("isOpenPackageDetails", true)
    );
    onCloseSelectOptionsDeliveryService();
  };

  const onCloseSelectOptionsDeliveryService = () => {
    setValue("isOpenDeliveryOptions", false);
  };

  return (
    <Controller
      name="isOpenDeliveryOptions"
      control={control}
      render={({ field: { value } }) => (
        <DrawerPanel
          open={value}
          onClose={onCloseSelectOptionsDeliveryService}
          title="Delivery Services"
        >
          {/* Delivery Options List */}
          {statusGetDeliveryServicesByShopId === API_FETCH_STATUS.IS_SUCCESS &&
            deliveryServicesByShopIdData?.map(
              (deliveryService, deliveryServiceIdx) =>
                deliveryService?.services.map((subService, subServiceIdx) => (
                  <>
                    <Button
                      className={checkoutClasses.btnOptionsList}
                      onClick={() =>
                        onSelectDeliveryServiceOption(
                          deliveryService,
                          subService
                        )
                      }
                    >
                      <Stack direction="column" gap={1}>
                        <Typography className={checkoutClasses.productItemText}>
                          {`${subService?.name} - ${formatCurrency(
                            subService?.total_delivery_fee
                          )}`}
                        </Typography>
                        <Typography className={checkoutClasses.infoDescText}>
                          {deliveryService?.name}
                        </Typography>
                        {subService?.is_split && (
                          <Stack
                            direction="row"
                            gap={1}
                            alignItems="center"
                            width="85%"
                          >
                            <Avatar
                              sx={{ width: 17, height: 17 }}
                              variant="circular"
                              src={InfoIcon.src}
                            />
                            <Typography
                              className={classes.deliveryServicesInfo}
                            >
                              Your order is more than 30kg. Parcel will divided
                              into:{" "}
                              {subService?.plans?.map(
                                (plan) =>
                                  `${plan?.packages?.length} ${convertSizeValue(
                                    plan.name
                                  )} (${mobileFormatCurrency(
                                    plan.total_package_amount
                                  )})`
                              )}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Button>
                    {deliveryServiceIdx + subServiceIdx !==
                      deliveryService?.services?.length +
                        deliveryServicesByShopIdData?.length -
                        2 && <Divider />}
                  </>
                ))
            )}
          {isLoadingGetDeliveryServicesByShopId && (
            <>
              <Skeleton variant="rounded" width="100%" height={58} />
              <Divider />
              <Skeleton variant="rounded" width="100%" height={58} />
            </>
          )}
        </DrawerPanel>
      )}
    />
  );
};

export default memo(DeliveryOptions);
