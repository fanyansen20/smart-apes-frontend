// React
import React, { memo, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

// Next
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  cartBundle,
  resetStatus as resetStatusCartBundle,
} from "store/reducer/cartBundle/cartBundleSlice";
import {
  checkoutBundle,
  resetStatus as resetStatusCheckoutBundle,
} from "store/reducer/checkoutBundle/checkoutBundleSlice";
import { getQuantityCartData } from "store/reducer/quantityCart/quantityCartSlice";

// Helper
import API from "@helper/apiHelper";
import { formatCurrency, roundUpDiscountLessThanOne } from "@helper/checkValue";
import numeral from "numeral";

// Hooks
import useNotification from "@hooks/useNotification";

// Mui material
import { Container, Grid, Stack, Typography } from "@mui/material";

// CSS
import classes from "./_BundlesDetails.module.scss";

// Images
import BundleCart from "@public/assets/icons/bundle-cart.svg";
import cart from "@public/assets/icons/buy-cart.svg";
import discount from "@public/assets/icons/discount.svg";
import Image from "next/image";

// Constants
import { API_FETCH_STATUS } from "constant/api";

// Components
import QuantityButton from "@components/buttons/QuantityButton/QuantityButton";
import ModalAddAddress from "@components/modal/ModalAddAddress/ModalAddAddress";
import ModalAlertAddress from "@components/modal/ModalAlertAddress/ModalAlertAddress";
import ModalShareProduct from "@components/modal/ModalShareProduct/ModalShareProduct";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import NotFoundPage from "pages/404";
import ManageProductButtons from "view/desktop/components/ManageProductButtons";
import ManageVariantDetails from "./ManageVariantDetails";

const BundlesDetails = ({ getBundleListState, dataUserAddress, user }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { finalData, error: errorGetBundleList } = getBundleListState;
  const {
    status: postCartBundleStatus,
    statusCode: postCartBundleStatusCode,
    error: errorCartBundle,
  } = useSelector((state) => state.cartBundle);
  const {
    data: checkoutBundleResult,
    status: postCheckoutBundleStatus,
    statusCode: postCheckoutBundleStatusCode,
    error: errorCheckoutBundle,
  } = useSelector((state) => state.checkoutBundle);
  const [qty, setQty] = useState(1);
  const manageBundleData = useForm({
    mode: "all",
    defaultValues: {
      variantsData: {},
      defaultVariantsData: {},
      payloadBundle: {
        bundle_id: finalData?.bundleId,
        bundle_qty: qty,
        items: finalData?.itemsPayload,
      },
      selectedProductId: null,
      quotaRemaining: {},
      bundleListData: finalData,
    },
  });
  const [_msg, sendNotification] = useNotification();
  const isVariantActive = true;
  const {
    payloadBundle,
    variantsData,
    quotaRemaining,
    bundleListData,
    selectedProductId,
    defaultVariantsData,
  } = manageBundleData.watch();
  const loginRedirect = (statusCode) =>
    statusCode === 401 && router.push("/login");
  const [locations, setLocations] = useState([]);
  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalAddAddress, setIsModalAddress] = useState(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [isOpenManageVariant, setOpenManageVariant] = useState(false);

  const getAllSumTotalPriceProduct = (productId, bundleIdx) => {
    const basePriceList = variantsData[productId]
      .map((variant) =>
        variant?.details.map(
          (detail) =>
            detail.qty &&
            numeral(detail.basePrice.substring(2)).value() * detail.qty
        )
      )
      .flat()
      .filter((price) => price);
    const totalBasePrice =
      basePriceList.length > 0
        ? basePriceList.reduce((total, num) => num && total + num)
        : 0;

    const finalPriceList = variantsData[productId]
      .map((variant) =>
        variant?.details.map(
          (detail) =>
            detail.qty &&
            numeral(detail.finalPrice.substring(2)).value() * detail.qty
        )
      )
      .flat()
      .filter((price) => price);
    const totalFinalPrice =
      finalPriceList.length > 0
        ? finalPriceList.reduce((total, num) => total + num)
        : 0;
    const totalDiscountPercent =
      ((totalBasePrice - totalFinalPrice) / totalBasePrice) * 100;

    bundleListData.itemsBundles[bundleIdx].totalBasePrice =
      formatCurrency(totalBasePrice);
    bundleListData.itemsBundles[bundleIdx].totalFinalPrice =
      formatCurrency(totalFinalPrice);
    bundleListData.itemsBundles[bundleIdx].discountPercentItem =
      roundUpDiscountLessThanOne(totalDiscountPercent);

    return { totalBasePrice, totalFinalPrice, totalDiscountPercent };
  };

  const setPayloadBundleValue = () => {
    const allVariantsDetailsList = Object.values(variantsData)
      .map((variant) => variant?.map((variantData) => variantData?.details))
      ?.flat(2);

    if (allVariantsDetailsList.length > 0) {
      manageBundleData.setValue("payloadBundle", {
        ...payloadBundle,
        items: payloadBundle.items.map((item) => {
          const changedVariant = allVariantsDetailsList?.find(
            (variant) => variant?.variantId === item.variant_id
          );

          if (changedVariant) {
            return {
              ...item,
              qty: changedVariant?.qty,
            };
          }

          return item;
        }),
      });
    }
  };

  useEffect(() => {
    bundleListData?.itemsBundles?.forEach((bundle) => {
      if (bundle?.hasVariants) {
        setVariantsData(bundle);
      }
    });
    getLocation();
  }, []);

  useEffect(() => {
    const isVariantsExist = Object.keys(variantsData).length > 0;
    if (isVariantsExist) {
      bundleListData.totalBasePriceBundle = 0;
      bundleListData.totalDiscountPriceBundle = 0;

      bundleListData?.itemsBundles?.forEach((bundle, bundleIdx) => {
        const sumTotalBasePriceBundle = (basePriceBundle) => {
          bundleListData.totalBasePriceBundle += basePriceBundle;
        };

        const sumTotalDiscountPriceBundle = (discountPriceBundle) => {
          bundleListData.totalDiscountPriceBundle += discountPriceBundle;
        };

        if (bundle?.hasVariants) {
          const { totalBasePrice, totalFinalPrice } =
            getAllSumTotalPriceProduct(bundle.productId, bundleIdx);

          sumTotalBasePriceBundle(totalBasePrice);
          sumTotalDiscountPriceBundle(totalFinalPrice);
        } else {
          sumTotalBasePriceBundle(
            numeral(bundle.totalBasePrice.substring(2)).value()
          );
          sumTotalDiscountPriceBundle(
            numeral(bundle.totalFinalPrice.substring(2)).value()
          );
        }
      });
      const savingCostResult =
        bundleListData.totalBasePriceBundle -
        bundleListData.totalDiscountPriceBundle;

      bundleListData.savingCostResult = formatCurrency(savingCostResult);
      bundleListData.discountPercent =
        (savingCostResult / bundleListData.totalBasePriceBundle) * 100;
      manageBundleData.setValue("bundleListData", bundleListData);
      setPayloadBundleValue();
    }
  }, [variantsData]);

  useEffect(() => {
    if (postCheckoutBundleStatus === API_FETCH_STATUS.IS_SUCCESS) {
      router
        .push(`../cart/checkout/${checkoutBundleResult?.id}`)
        .then(() => dispatch(resetStatusCheckoutBundle()));
    }

    if (postCheckoutBundleStatus === API_FETCH_STATUS.IS_FAILED) {
      sendNotification({
        msg: [errorCheckoutBundle],
        variant: "error",
      });
      loginRedirect(postCheckoutBundleStatusCode);
      dispatch(resetStatusCheckoutBundle());
    }
  }, [postCheckoutBundleStatus]);

  useEffect(() => {
    if (postCartBundleStatus === API_FETCH_STATUS.IS_SUCCESS) {
      dispatch(getQuantityCartData());
      sendNotification({
        msg: ["Success add product bundle to cart"],
      });
      dispatch(resetStatusCartBundle());
    }

    if (postCartBundleStatus === API_FETCH_STATUS.IS_FAILED) {
      sendNotification({
        msg: [errorCartBundle],
        variant: "error",
      });
      loginRedirect(postCartBundleStatusCode);
      dispatch(resetStatusCartBundle());
    }
  }, [postCartBundleStatus]);

  const submitBundle = (submitType) => {
    const isVariantsExist = bundleListData.itemsBundles
      .map((item) => item.hasVariants)
      .includes(true);
    const allVariantsQtyList = Object.values(variantsData)
      .map((variant) =>
        variant.map((variantData) =>
          variantData.details.map((detail) => detail.qty)
        )
      )
      .flat(2)
      .filter((qty) => qty);
    const totalQuotaRemaining =
      Object.values(quotaRemaining)?.length > 0 &&
      Object.values(quotaRemaining).reduce((total, num) => total + num);
    const totalAllVariantsQty =
      allVariantsQtyList.length > 0 &&
      allVariantsQtyList.reduce((total, num) => total + num);
    const isAllVariantsChosen =
      totalAllVariantsQty && totalAllVariantsQty === totalQuotaRemaining;
    const executeSubmit = () => {
      const currentPayloadBundle = {
        ...payloadBundle,
        bundle_qty: qty,
        items: payloadBundle.items
          .filter((item) => item.qty)
          .map((item) => ({
            ...item,
            qty: item.qty * qty,
          })),
      };
      if (submitType === "checkout") {
        dispatch(checkoutBundle(currentPayloadBundle));
      }

      if (submitType === "cart") {
        dispatch(cartBundle(currentPayloadBundle));
      }
    };

    if (isVariantsExist && !isAllVariantsChosen) {
      sendNotification({
        msg: ["Please Choose All Variants First!"],
        variant: "error",
      });
    } else {
      executeSubmit();
    }
  };

  const handlerModalShare = () => setIsOpenShareModal(!isOpenShareModal);

  const handlerManageVariants = () => {
    if (selectedProductId) {
      const bundleIdx = bundleListData.itemsBundles.indexOf(
        bundleListData?.itemsBundles?.find(
          (item) => item?.productId === selectedProductId
        )
      );

      const selectedBundleVariant = bundleListData?.itemsBundles?.[bundleIdx];

      bundleListData.totalBasePriceBundle -= numeral(
        selectedBundleVariant?.totalBasePrice.substring(2)
      ).value();
      bundleListData.totalDiscountPriceBundle -= numeral(
        selectedBundleVariant?.totalFinalPrice.substring(2)
      ).value();

      const { totalBasePrice, totalFinalPrice } = getAllSumTotalPriceProduct(
        selectedProductId,
        bundleIdx
      );

      bundleListData.totalBasePriceBundle += totalBasePrice;
      bundleListData.totalDiscountPriceBundle += totalFinalPrice;

      const savingCostResult =
        bundleListData.totalBasePriceBundle -
        bundleListData.totalDiscountPriceBundle;

      bundleListData.savingCostResult = formatCurrency(savingCostResult);
      bundleListData.discountPercent =
        (savingCostResult / bundleListData.totalBasePriceBundle) * 100;

      manageBundleData.setValue("bundleListData", bundleListData);
      setPayloadBundleValue();
    }
    setOpenManageVariant(!isOpenManageVariant);
  };

  const generateRowsVariantsData = (variantDetails, productId) => {
    const rowsVariant = [];
    const currentBundleItem = bundleListData?.itemsBundles?.find(
      (bundle) => bundle.productId === productId
    );

    const getLowestPriceVariant = variantDetails.find(
      (detail) => detail.variantId === currentBundleItem.lowestPriceVariantId
    );
    const maxQuantity = currentBundleItem.qty;

    variantDetails?.forEach((detail) => {
      const {
        stock,
        variantId,
        variantCombo,
        imageProduct,
        basePrice,
        finalPrice,
      } = detail;
      const variantComboValues = detail.variantCombo.map(
        (combo) => combo.value
      );
      const getRowByFirstVariant = rowsVariant.find(
        (row) => row?.firstVariant === variantComboValues[0]
      );
      const rowByFirstVariantIdx = rowsVariant.indexOf(getRowByFirstVariant);
      const variantDetail = {
        secondVariant: variantComboValues[1],
        qty:
          getLowestPriceVariant?.variantId === detail?.variantId
            ? maxQuantity
            : null,
        stock,
        variantId,
        basePrice,
        finalPrice,
      };

      if (getRowByFirstVariant) {
        rowsVariant[rowByFirstVariantIdx]?.details?.push(variantDetail);
      } else {
        rowsVariant.push({
          firstVariant: variantComboValues[0],
          variantComboName: variantCombo.map((combo) => combo.name),
          details: [variantDetail],
          imageProduct,
          productId,
        });
      }
    });

    return rowsVariant;
  };

  const setVariantsData = (bundleItem) => {
    const variantsData = manageBundleData.watch("variantsData");
    const quotaRemaining = manageBundleData.watch("quotaRemaining");
    const selectedProductVariants = variantsData?.[bundleItem?.productId];
    const isQuotaDataExist = Object.keys(quotaRemaining).includes(
      bundleItem?.productId
    );

    if (!isQuotaDataExist) {
      manageBundleData.setValue("quotaRemaining", {
        ...quotaRemaining,
        [bundleItem?.productId]: bundleItem?.qty,
      });
    }

    if (!selectedProductVariants) {
      const currentVariantData = {
        [bundleItem?.productId]: generateRowsVariantsData(
          bundleItem?.variantDetails,
          bundleItem?.productId
        ),
      };

      manageBundleData.setValue("variantsData", {
        ...variantsData,
        ...currentVariantData,
      });

      manageBundleData.setValue("defaultVariantsData", {
        ...variantsData,
        ...currentVariantData,
      });
    }
  };

  const showManageVariantsForm = (bundleItem) => {
    manageBundleData.setValue("selectedProductId", bundleItem?.productId);
    setVariantsData(bundleItem);

    setOpenManageVariant(!isOpenManageVariant);
  };

  const displayImage = bundleListData?.itemsBundles?.[0]?.imageProduct;
  const productBundleName = bundleListData?.titleBundle;

  const handlerPurchase = () =>
    dataUserAddress?.length === 0
      ? setIsModalAlert(true)
      : submitBundle("checkout");
  const handlerModalAlert = () => setIsModalAlert(!isModalAlert);
  const handlerModalAddAddress = () => {
    setIsModalAddress(!isModalAddAddress);
    setIsModalAlert(false);
  };

  const getLocation = async () => {
    const response = await API.get("v1/locations/countries");
    const data = response?.data;
    if (data) {
      setLocations(data.results);
    }
  };

  const handleCloseVariants = () => {
    const selectedVariantsAmount = variantsData[selectedProductId]
      .map((variant) => variant.details.map((detail) => detail.qty || 0))
      .flat()
      .reduce((total, num) => total + num);

    if (!selectedVariantsAmount) {
      manageBundleData.setValue("variantsData", defaultVariantsData);
    } else {
      manageBundleData.setValue("defaultVariantsData", variantsData);
    }
    handlerManageVariants();
  };

  if (errorGetBundleList) {
    return <NotFoundPage />;
  }

  return (
    <FormProvider {...manageBundleData}>
      <Head>
        <meta
          property="og:title"
          content={`${productBundleName} | Smart Apes`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXTAUTH_URL}${router.asPath}`}
        />
        <meta property="og:image:url" content={displayImage} />
      </Head>
      <Container maxWidth="lg">
        <Grid container className={classes.container}>
          <Grid className={classes.overviewLeftContent} item md={8}>
            <div className={classes.contentHeaderBundle}>
              <div>
                <Image
                  src={BundleCart}
                  alt="icon bundle cart"
                  objectFit="contain"
                />
              </div>
              <Typography>{bundleListData?.titleBundle}</Typography>
              <Stack
                spacing={0.8}
                direction="row"
                className={classes.savePriceLabel}
              >
                <Image
                  width={20}
                  height={20}
                  src={discount}
                  alt="discount"
                  objectFit="contain"
                />
                <Typography
                  className={classes.textLabel}
                  variant="subtitle2"
                  fontWeight="700"
                >
                  You Save {bundleListData?.savingCostResult} (
                  {parseInt(bundleListData?.discountPercent)}%)
                </Typography>
              </Stack>
            </div>

            <Grid container width="94%" gap="24px">
              {bundleListData?.itemsBundles?.map((item, key) => {
                const chosenVariants = variantsData?.[item?.productId]
                  ?.map((variant) =>
                    variant?.details?.map(
                      (detail) =>
                        detail?.qty &&
                        `${detail?.qty}x ${variant?.firstVariant} ${
                          detail?.secondVariant || ""
                        } (${detail?.finalPrice})`
                    )
                  )
                  ?.flat()
                  ?.filter((variant) => variant)
                  ?.join(", ");
                return (
                  <Grid key={key} className={classes.containerDetailsProduct}>
                    <Grid className={classes.containerImageProduct}>
                      <Image
                        src={item?.imageProduct}
                        layout="fill"
                        objectFit="contain"
                        alt="image product"
                      />
                    </Grid>
                    <Grid className={classes.containerDetailsProduct}>
                      <Typography className={classes.titleProduct}>
                        {item?.qty} x{" "}
                        {item?.fullNameProduct?.length >= 96
                          ? `${item?.fullNameProduct?.substring(0, 96)} ...`
                          : item?.fullNameProduct}
                      </Typography>
                      <Grid
                        container
                        alignItems="center"
                        gap="16px"
                        className={classes.priceOverview}
                      >
                        {item?.discountPercentItem ? (
                          <>
                            <div className={classes.discountPercentage}>
                              <Typography>
                                {parseInt(item?.discountPercentItem)}%
                              </Typography>
                            </div>
                            <Typography className={classes.discountPriceBundle}>
                              {item?.totalBasePrice}
                            </Typography>
                          </>
                        ) : (
                          ""
                        )}
                        <Typography className={classes.priceBundle}>
                          {item?.totalFinalPrice}
                        </Typography>
                      </Grid>

                      {item?.stock <= 10 && (
                        <Typography className={classes.stockBundle}>
                          Stock left: {item?.stock}
                        </Typography>
                      )}

                      {!item?.hasVariants && (
                        <Typography
                          className={classes.pricePerQty}
                          variant="subtitle2"
                        >
                          Price per Qty: {item?.basePrice}
                        </Typography>
                      )}

                      {item?.hasVariants && (
                        <SecondaryButton
                          disableHover
                          disableFocusRipple
                          color="secondary"
                          className={classes.manageVariantsButton}
                          onClick={() => showManageVariantsForm(item)}
                        >
                          {chosenVariants || "No Variant Selected"}
                        </SecondaryButton>
                      )}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          <Grid className={classes.itemContent} item md={4}>
            <div className={classes.menuDiv}>
              <div className={classes.purchaseQuantity}>
                <Stack direction="row" gap="1.4rem">
                  <Stack direction="column" gap="0.75rem">
                    <Typography className={classes.quantityHeader}>
                      Quantity
                    </Typography>
                    <QuantityButton
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      stock={bundleListData?.currentStock}
                      incrementHandler={() => setQty(qty + 1)}
                      decrementHandler={() => setQty(qty - 1)}
                    />
                  </Stack>
                  <Stack direction="column" gap="0.75rem">
                    <Typography className={classes.quantityHeader}>
                      Stock
                    </Typography>
                    <Typography
                      className={
                        ((bundleListData?.currentStock == 0 ||
                          !isVariantActive) &&
                          classes.outOfStockProduct) ||
                        (bundleListData?.currentStock <= 20 &&
                          classes.lowStockProduct) ||
                        (bundleListData?.currentStock >= 20 &&
                          classes.stockProduct)
                      }
                    >
                      {bundleListData?.currentStock || "Out-of-Stock"}
                    </Typography>
                  </Stack>
                </Stack>
              </div>

              <div className={classes.subTotalPrice}>
                <Typography className={classes.subTotalHeader}>
                  Subtotal
                </Typography>
                <Typography className={classes.price}>
                  {isVariantActive
                    ? formatCurrency(
                        bundleListData?.totalDiscountPriceBundle * qty
                      )
                    : "-"}
                </Typography>
              </div>

              <div className={classes.menuButtons}>
                <SecondaryButton
                  fullWidth={true}
                  disabled={bundleListData?.currentStock === 0}
                  onClick={() => submitBundle("cart")}
                  text="Add to Cart"
                  startIcon={<Image src={cart} alt="cart" />}
                  isLoading={
                    postCartBundleStatus === API_FETCH_STATUS.IS_LOADING
                  }
                />

                <PrimaryButton
                  fullWidth={true}
                  disabled={bundleListData?.currentStock === 0}
                  onClick={handlerPurchase}
                  text="Purchase Now"
                  isLoading={
                    postCheckoutBundleStatus === API_FETCH_STATUS.IS_LOADING
                  }
                />
                <ManageProductButtons
                  disableWishlist
                  handlerModalShare={handlerModalShare}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <ModalShareProduct
        isBundle
        isOpen={isOpenShareModal}
        closeModal={handlerModalShare}
        shareImage={displayImage}
        shareName={productBundleName}
        linkShare={router.asPath}
      />
      <ManageVariantDetails
        open={isOpenManageVariant}
        handleSubmit={handlerManageVariants}
        handleClose={handleCloseVariants}
      />

      <ModalAlertAddress
        isOpen={isModalAlert}
        closeModal={handlerModalAlert}
        openModalAddress={handlerModalAddAddress}
      />

      <ModalAddAddress
        accessToken={session?.accessToken}
        userId={user?.id}
        isOpen={isModalAddAddress}
        closeModal={handlerModalAddAddress}
        locations={locations}
        handlerCheckout={() => submitBundle("checkout")}
      />
    </FormProvider>
  );
};

export default memo(BundlesDetails);
