// React
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getDeliveryServicesByShopId } from "store/reducer/getDeliveryServicesByShopId/getDeliveryServicesByShopIdSlice";
import { payCheckout } from "store/reducer/payCheckout/payCheckoutSlice";
import {
  resetStatus as resetPatchCheckoutPaymentMethodStatus,
  setCheckoutPaymentMethod,
} from "store/reducer/setCheckoutPaymentMethod/setCheckoutPaymentMethodSlice";

// Next
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

// Components
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import DrawerPanel from "view/mobile/components/DrawerPanel";
import FooterPurchaseNavigation from "view/mobile/components/FooterPurchaseNavigation";
import OutlinedForwardButton from "view/mobile/components/OutlinedForwardButton";
import DeliveryOptions from "./components/DeliveryOptions";
import ProductItem from "./components/ProductItem";

// MUI Components
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

// MUI Icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// Icons
import NinjaVan from "@public/assets/icons/ninja-van.svg";
import HitPay from "@public/assets/images/hitpay.png";
import HitpayPaymentMethod from "../../assets/icons/hitpay-payment-method.svg";

// Styles
import SubHeaderSection from "view/mobile/components/SubHeaderSection";
import classes from "./Checkout.module.scss";

// Hooks
import useNotification from "@hooks/useNotification";

// APIs
import UpdateAddressCheckout from "pages/api/clientSide/checkouts/updateAddressCheckout";

// Libs
import { mobileFormatCurrency } from "@helper/checkValue";
import { capitalCase } from "change-case";

// Services
import { autoSelectDeliveryService } from "services/checkout/autoSelectDeliveryService";

// Constants
import { API_FETCH_STATUS } from "constant/api";
import PackageDetails from "./components/PackageDetails";
import ProductBundle from "./components/ProductBundle";

const mapProductItemsProps = ({
  id,
  productItemId,
  title,
  fullNameProduct,
  qty,
  baseQty,
  stock,
  status,
  image_url_500,
  imageProduct,
  basePriceItemBundle,
  total_price,
  total_base_price,
  finalPriceItemBundle,
  isBundleItem,
  discountPercentItem,
  active_discount,
  membership_discount,
}) => ({
  productId: id || productItemId,
  productName: fullNameProduct ? `${baseQty}x ${fullNameProduct}` : title,
  productQty: qty,
  productStock: stock,
  productStatus: status,
  imageUrl: image_url_500 || imageProduct,
  basePrice: isBundleItem
    ? basePriceItemBundle
    : mobileFormatCurrency(total_base_price),
  finalPrice: isBundleItem
    ? finalPriceItemBundle
    : mobileFormatCurrency(total_price),
  discountPercent: discountPercentItem || active_discount?.percent,
  isBundleItem,
  membershipDiscount: membership_discount,
  hasActiveDiscount: active_discount?.status === "ACTIVE",
});

const generateTotalDeliveryFee = (allSelectedDeliveryServices) => {
  const allDeliveryFees = Object.values(allSelectedDeliveryServices).map(
    (deliveryService) => deliveryService.deliveryFee
  );
  const totalDeliveryFee = allDeliveryFees.reduce((total, num) => total + num);

  return totalDeliveryFee;
};

const Checkout = ({
  dataCheckout,
  paymentMethods,
  dataUserAddress,
  selectedDeliveryServices,
}) => {
  const dispatch = useDispatch();
  const [firstLoadPayment, setFirstLoadPayment] = useState(false);
  const { back, push: routerPush } = useRouter();
  const [_msg, sendNotification] = useNotification();
  const {
    status: patchCheckoutPaymentMethodStatus,
    error: patchCheckoutPaymentMethodError,
  } = useSelector((state) => state.setCheckoutPaymentMethod);
  const {
    data: checkoutPaymentData,
    status: payCheckoutStatus,
    error: payCheckoutError,
  } = useSelector((state) => state.payCheckout);
  const { data: session } = useSession();
  const checkoutForm = useForm({
    defaultValues: {
      checkoutDeliveryData: dataCheckout?.delivery,
      selectedInputItemNoteId: null,
      productItemsNotes: {},
      isOpenDeliveryOptions: false,
      isOpenAddressOptions: false,
      isOpenPaymentOptions: false,
      isOpenPriceSummary: false,
      isOpenPackageDetails: false,
      selectedDeliveryOptionsShopId: null,
      selectedDeliveryServicesByShop: selectedDeliveryServices,
      selectedUserAddress: dataUserAddress?.find(
        (address) => address?.is_default
      ),
      selectedPaymentMethod: paymentMethods?.find(
        (payment) => payment?.code === "hitpay"
      ),
      totalCheckoutPrice: 0,
      totalDeliveryFee: generateTotalDeliveryFee(selectedDeliveryServices),
      qtyAllItems: 0,
    },
  });
  const { setValue, control, watch } = checkoutForm;
  const {
    selectedDeliveryServicesByShop,
    selectedUserAddress,
    selectedPaymentMethod,
    totalCheckoutPrice,
    totalDeliveryFee,
    isOpenPriceSummary,
    qtyAllItems,
  } = watch();

  useEffect(() => {
    // Redirect to Home If Checkout doesn't exist
    if (!dataCheckout) return routerPush("/");

    const productsPriceList = [];
    const itemsListQty = [];

    // Set Exist Products Notes Value
    dataCheckout?.types?.forEach((productsType) => {
      productsType?.shops?.forEach((productsByShop) => {
        // Set Notes From Product Items List in Bundles
        productsByShop?.bundles?.forEach((productBundle) => {
          productBundle?.items?.forEach((item) => {
            setValue(`productItemsNotes.${item?.id}`, item?.notes);
          });
          productBundle?.mappedProductBundleData?.itemsBundles?.map((item) => {
            productsPriceList.push(
              parseFloat(item?.finalPriceItemBundle?.slice(2)) *
                productBundle?.bundle_qty
            );
          });
          itemsListQty.push(productBundle?.bundle_qty);
        });

        // Set Notes From Product Items List Non Bundles
        productsByShop?.items?.forEach((item) => {
          itemsListQty.push(item.qty);
          productsPriceList.push(item?.total_price);
          setValue(`productItemsNotes.${item?.id}`, item?.notes);
        });
      });
    });

    // Set Default Payment Method
    const hitpayData = paymentMethods?.find(
      (payment) => payment?.code === "hitpay"
    );
    if (hitpayData) {
      onClickPaymentMethod(hitpayData);
    }

    // Set Total Products List Price
    setValue(
      "totalCheckoutPrice",
      productsPriceList.reduce((total, price) => total + price)
    );

    // Set Total Items Quantity
    setValue(
      "qtyAllItems",
      itemsListQty.reduce((total, itemQty) => total + itemQty)
    );
  }, []);

  useEffect(() => {
    const successVariant =
      patchCheckoutPaymentMethodStatus === API_FETCH_STATUS.IS_SUCCESS &&
      "success";
    const failedVariant =
      patchCheckoutPaymentMethodStatus === API_FETCH_STATUS.IS_FAILED &&
      "error";

    if ((successVariant && firstLoadPayment) || failedVariant) {
      sendNotification({
        msg: [
          failedVariant
            ? patchCheckoutPaymentMethodError
            : "Success Update Payment Method",
        ],
        variant: successVariant || failedVariant,
      });
      dispatch(resetPatchCheckoutPaymentMethodStatus());
    }
  }, [patchCheckoutPaymentMethodStatus]);

  useEffect(() => {
    const payCheckoutSuccess =
      payCheckoutStatus === API_FETCH_STATUS.IS_SUCCESS && "success";

    const payCheckoutFailed =
      payCheckoutStatus === API_FETCH_STATUS.IS_FAILED && "error";

    if (payCheckoutSuccess) {
      const paymentUrl = {
        hitpay:
          checkoutPaymentData?.data?.user_payment?.hitpay?.hitpay_payment_url,
        paypal: checkoutPaymentData?.data?.user_payment?.paypal?.payment_url,
      };

      window.open(
        paymentUrl?.[
          checkoutPaymentData?.data?.user_payment?.payment_method?.code
        ] || "",
        "_blank"
      );
      routerPush(
        {
          pathname: "payment/pending",
          query: { id: checkoutPaymentData?.data?.id },
        },
        `../../payment/pending/${checkoutPaymentData?.data?.id}`
      );
    }

    if (payCheckoutSuccess || payCheckoutFailed) {
      sendNotification({
        msg: [
          payCheckoutFailed ? payCheckoutError : "Success Purchase Checkout",
        ],
        variant: payCheckoutSuccess || payCheckoutFailed,
      });
    }
  }, [payCheckoutStatus]);

  const onClickUserAddress = (selectedAddress) => {
    setValue("selectedUserAddress", selectedAddress);
    setValue("isOpenAddressOptions", false);
    UpdateAddressCheckout(
      session?.accessToken,
      dataCheckout.id,
      selectedAddress?.id
    ).then(async ({ data: { code, message } }) => {
      sendNotification({
        msg: [code >= 400 ? message : "Success Update Address"],
        variant: code >= 400 ? "error" : "success",
      });
      const reselectDeliveryServices = await autoSelectDeliveryService(
        session?.accessToken,
        dataCheckout.id
      );
      setValue("selectedDeliveryServicesByShop", reselectDeliveryServices);
      setValue(
        "totalDeliveryFee",
        generateTotalDeliveryFee(reselectDeliveryServices)
      );
    });
  };

  const onClickPaymentMethod = (selectedPayment) => {
    setValue("selectedPaymentMethod", selectedPayment);
    setValue("isOpenPaymentOptions", false);
    const patchValues = {
      payload: {
        payment_method_id: selectedPayment?.id,
      },
      param: {
        checkoutId: dataCheckout?.id,
      },
    };
    dispatch(setCheckoutPaymentMethod(patchValues)).then(() => {
      if (!firstLoadPayment) {
        dispatch(resetPatchCheckoutPaymentMethodStatus());
        setFirstLoadPayment(true);
      }
    });
  };

  const handlePurchaseNow = () => {
    dispatch(payCheckout({ payload: { checkout_id: dataCheckout?.id } }));
  };

  const openDeliveryServiceOptions = (shop) => {
    dispatch(
      getDeliveryServicesByShopId({
        checkoutId: dataCheckout?.id,
        checkoutShopId: shop?.id,
      })
    );
    setValue("isOpenDeliveryOptions", true);
    setValue("selectedDeliveryOptionsShopId", shop?.id);
  };

  const openSplittedPackageDetails = (shop) => {
    dispatch(
      getDeliveryServicesByShopId({
        checkoutId: dataCheckout?.id,
        checkoutShopId: shop?.id,
      })
    );
    setValue("isOpenPackageDetails", true);
    setValue("selectedDeliveryOptionsShopId", shop?.id);
  };

  return (
    <FormProvider {...checkoutForm}>
      <Stack gap={2} direction="column" className={classes.checkoutContainer}>
        {/* Header */}
        <Stack direction="row" alignItems="center" gap={1}>
          <IconButton
            className={classes.backIconBtnHeader}
            size="small"
            onClick={() => back()}
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <Typography className={classes.pageHeaderText}>
            Checkout Transaction
          </Typography>
        </Stack>

        {/* Products List Section*/}
        {dataCheckout?.types?.map((productsType, productsTypeIdx) => {
          const itemsQty = productsType?.shops
            ?.map((productsByShop) => {
              const productItemsQtyList = productsByShop?.items?.map(
                (productItem) => productItem?.qty || 0
              );

              const productBundlesQtyList = productsByShop?.bundles?.map(
                (productBundle) => productBundle?.bundle_qty || 0
              );

              const getProductItemsQty =
                productItemsQtyList?.length > 0
                  ? productItemsQtyList.reduce((total, num) => total + num)
                  : 0;

              const getProductBundlesQty =
                productBundlesQtyList?.length > 0
                  ? productBundlesQtyList?.reduce((total, num) => total + num)
                  : 0;

              return getProductItemsQty + getProductBundlesQty;
            })
            .reduce((total, num) => total + num);

          return (
            <Stack key={productsTypeIdx} direction="column" gap={1.5}>
              <SubHeaderSection>
                {capitalCase(productsType?.name)} Product ({itemsQty} item
                {itemsQty > 1 ? "s" : ""})
              </SubHeaderSection>
              <Stack direction="column" spacing={4}>
                {productsType?.shops?.map((productsByShop) => {
                  const selectedDeliveryService =
                    selectedDeliveryServicesByShop?.[productsByShop?.id];
                  return (
                    <Stack direction="column" key={productsByShop?.id} gap={2}>
                      {/* Store Info */}
                      <Stack direction="row" gap={1.4} alignItems="center">
                        {/* Store Pic */}
                        <Avatar
                          alt={productsByShop?.name}
                          src={productsByShop?.profile_pic}
                          className={classes.storePic}
                        />

                        {/* Store Name and Country */}
                        <Stack direction="column" gap={0.8}>
                          <Typography className={classes.storeName}>
                            {productsByShop?.name}
                          </Typography>
                          <Typography className={classes.countryName}>
                            {productsByShop?.shop_address_country_name}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Stack direction="column" spacing={2}>
                        {/* List Bundles by Shop */}
                        {productsByShop?.bundles?.map((productBundle) => {
                          const bundleData =
                            productBundle.mappedProductBundleData;
                          const isOutOfStock = productBundle?.items
                            ?.map((item) => item?.stock || 0)
                            ?.includes(0);
                          const isOutOfQuota =
                            productBundle?.current_quota === 0;
                          const isInactiveProduct = productBundle?.items
                            ?.map((item) => item?.status)
                            .includes("INACTIVE");

                          const isBundleDisabled =
                            isOutOfStock || isOutOfQuota || isInactiveProduct;

                          return (
                            <ProductBundle
                              key={bundleData?.id}
                              title={bundleData?.titleBundle}
                              qty={productBundle?.bundle_qty}
                              isBundleDisabled={isBundleDisabled}
                              discountPercent={bundleData?.discountPercent}
                              totalSavingPrice={bundleData?.savingCostResult}
                              totalBasePrice={
                                bundleData?.formattedTotalBasePriceBundle
                              }
                              totalDiscountPrice={
                                bundleData?.formattedTotalDiscountPriceBundle
                              }
                              productItems={productBundle?.items?.map(
                                (item, itemIdx) => (
                                  <ProductItem
                                    {...mapProductItemsProps({
                                      ...item,
                                      ...productBundle.mappedProductBundleData
                                        .itemsBundles[itemIdx],
                                      isBundleItem: true,
                                    })}
                                    key={itemIdx}
                                    disabledProductItem={isBundleDisabled}
                                  />
                                )
                              )}
                            />
                          );
                        })}

                        {/* List Products by Shop */}
                        {productsByShop?.items?.map((productItem) => (
                          <Stack
                            direction="column"
                            key={productItem?.id}
                            spacing={1}
                          >
                            <ProductItem
                              {...mapProductItemsProps(productItem)}
                            />
                          </Stack>
                        ))}
                      </Stack>
                      <Stack direction="column" gap={1}>
                        {/* Delivery Service Options Button */}
                        <OutlinedForwardButton
                          disableHover
                          disableFocusRipple
                          className={`${classes.btnOptions} ${
                            selectedDeliveryService?.companyName ===
                              "Ninja Van" && classes.ninjavanDeliveryBtn
                          }`}
                          onClick={() =>
                            openDeliveryServiceOptions(productsByShop)
                          }
                        >
                          <Stack
                            direction="row"
                            gap={
                              selectedDeliveryService?.companyName !==
                                "Ninja Van" && 1
                            }
                            alignItems="center"
                          >
                            {selectedDeliveryService?.companyName ===
                              "Ninja Van" && (
                              <Image
                                width="90%"
                                height={20}
                                src={NinjaVan}
                                alt="Ninja Van Delivery"
                              />
                            )}
                            <Typography className={classes.productItemText}>
                              {`${mobileFormatCurrency(
                                selectedDeliveryService?.deliveryFee
                              )} (${selectedDeliveryService?.companyName} ${
                                selectedDeliveryService?.serviceName
                              })`}
                            </Typography>
                          </Stack>
                        </OutlinedForwardButton>

                        {selectedDeliveryService?.isPackageSplit && (
                          <Typography className={classes.infoText}>
                            Your package will be split.{" "}
                            <span
                              className={classes.primaryText}
                              onClick={() =>
                                openSplittedPackageDetails(productsByShop)
                              }
                            >
                              View Split Details
                            </span>
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}

        <Divider className={classes.checkoutSectionDivider} />

        {/* Delivery and Address Section */}
        <Stack direction="column" spacing={2}>
          {/* Header Text */}
          <Typography className={classes.pageHeaderText}>
            Delivery Address
          </Typography>

          {/* Buyer Address Options Button */}
          <OutlinedForwardButton
            disableHover
            disableFocusRipple
            onClick={() => setValue("isOpenAddressOptions", true)}
          >
            <Stack direction="column" spacing={1}>
              <Typography className={classes.productItemText}>
                {selectedUserAddress?.name}
              </Typography>
              <Typography className={classes.addressText}>
                {`${selectedUserAddress?.address_detail} ${selectedUserAddress?.postal_code}`}
              </Typography>
            </Stack>
          </OutlinedForwardButton>
        </Stack>

        <Divider className={classes.checkoutSectionDivider} />

        {/* Payment Method Section */}
        <Stack direction="column" spacing={2}>
          {/* Header Text */}
          <Typography className={classes.pageHeaderText}>
            Payment Method
          </Typography>

          <OutlinedForwardButton
            disableHover
            disableFocusRipple
            className={classes.btnOptions}
            onClick={() => setValue("isOpenPaymentOptions", true)}
          >
            <Stack direction="row" gap={1} alignItems="center">
              <Image
                src={HitPay}
                width={72}
                height={18}
                alt="Hit Pay Payment Method"
              />
              <Typography className={classes.productItemText}>
                {selectedPaymentMethod?.name} Payment Method
              </Typography>
            </Stack>
          </OutlinedForwardButton>
        </Stack>
        <Divider className={classes.checkoutSectionDivider} />
        <Divider className={classes.checkoutSectionDivider} />
      </Stack>

      <DeliveryOptions />

      <Controller
        name="isOpenAddressOptions"
        control={control}
        render={({ field: { value } }) => (
          <DrawerPanel
            open={value}
            onClose={() => setValue("isOpenAddressOptions", false)}
            title="Delivery Address"
          >
            {dataUserAddress?.map((address) => (
              <SecondaryButton
                disableHover
                disableFocusRipple
                key={address?.id}
                className={`${classes.addressCard} ${
                  address?.id === selectedUserAddress?.id &&
                  classes.addressCardActive
                }`}
                onClick={() => onClickUserAddress(address)}
              >
                <Stack direction="column" gap={1.5}>
                  <Stack direction="row" gap={1}>
                    <Typography className={classes.typeLabel}>
                      {address?.name}
                    </Typography>
                    {address?.is_default && (
                      <Typography className={classes.primaryLabel}>
                        Primary
                      </Typography>
                    )}
                  </Stack>
                  <Typography className={classes.productItemText}>
                    {address?.receiver_name}
                  </Typography>
                  <Typography className={classes.infoDescText}>
                    {address?.receiver_phone}
                  </Typography>
                  <Typography className={classes.infoDescText}>
                    {`${address?.address_detail}, ${address?.postal_code}`}
                  </Typography>
                </Stack>
              </SecondaryButton>
            ))}
          </DrawerPanel>
        )}
      />

      <Controller
        name="isOpenPaymentOptions"
        control={control}
        render={({ field: { value } }) => (
          <DrawerPanel
            open={value}
            onClose={() => setValue("isOpenPaymentOptions", false)}
            title="Payment Method"
          >
            {paymentMethods?.map(
              (payment) =>
                payment?.code === "hitpay" && (
                  <Button
                    key={payment?.id}
                    className={classes.btnOptionsList}
                    onClick={() => onClickPaymentMethod(payment)}
                  >
                    <Stack direction="row" gap={2} alignItems="center">
                      <Image
                        src={HitpayPaymentMethod}
                        alt={`${payment?.name} Payment Method`}
                      />
                      <Typography className={classes.productItemText}>
                        {payment?.name} Payment Method
                      </Typography>
                    </Stack>
                  </Button>
                )
            )}
          </DrawerPanel>
        )}
      />

      <Controller
        name="isOpenPriceSummary"
        control={control}
        render={({ field: { value } }) => (
          <DrawerPanel
            open={value}
            onClose={() => setValue("isOpenPriceSummary", false)}
            title="Total"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography className={classes.totalLabelText}>
                Total Price ({qtyAllItems} item{qtyAllItems > 1 ? "s" : ""})
              </Typography>
              <Typography className={classes.productItemText}>
                {mobileFormatCurrency(totalCheckoutPrice)}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography className={classes.totalLabelText}>
                Delivery Fee
              </Typography>
              <Typography className={classes.productItemText}>
                {mobileFormatCurrency(totalDeliveryFee)}
              </Typography>
            </Stack>
          </DrawerPanel>
        )}
      />

      <PackageDetails />

      {/* Footer Navigation */}
      <FooterPurchaseNavigation
        totalPrice={totalCheckoutPrice}
        handlePurchaseNow={handlePurchaseNow}
        handleTotalSummaryDrawer={() =>
          setValue("isOpenPriceSummary", !isOpenPriceSummary)
        }
      />
    </FormProvider>
  );
};

export default Checkout;
