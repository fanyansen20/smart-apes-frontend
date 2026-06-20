//React
import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";

//Next JS
import Image from "next/image";
import { useRouter } from "next/router";

//Material UI
import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// Icon
import { ArrowForwardIos } from "@mui/icons-material";

//Components
import MenuDeliveryService from "@components/menu/MenuDeliveryService";
import ModalPaymentMethod from "@components/shared/Modal/ModalPaymentMethod";
import MembershipDiscountPercent from "view/desktop/components/MembershipDiscountPercent";

// Modal
import ModalChangeAddress from "@components/modal/ModalChangeAddress/ModalChangeAddress";
import ModalSplitPackages from "@components/modal/ModalSplitPackages/ModalSplitPackages";

// Helper
import {
  convertDataBundles,
  convertDataProductCheckout,
} from "@helper/convertProductData";
import { parsePhoneNumber } from "awesome-phonenumber";

import backToPrevLink from "helper/backToPrevLink";
import { checkValue, formatCurrency } from "helper/checkValue";

// API
import updateDeliveryAutoApply from "pages/api/checkouts/updateDeliveryAutoApply";
import UpdateAddressCheckout from "pages/api/clientSide/checkouts/updateAddressCheckout";
import updateDetailCheckout from "pages/api/clientSide/checkouts/updateDetailCheckout";
import getDeliveryByShopIdAndUserAddress from "pages/api/clientSide/deliveryService/getDeliveryByShopIdAndUserAddress";

// hooks
import useNotification from "@hooks/useNotification";

//Images
import WriteNote from "@public/assets/icons/write-notes.svg";
import headerBackground from "@public/assets/images/FlowTop.png";
import HitPay from "@public/assets/images/hitpay.png";
import noShopImage from "@public/assets/images/not-shop-image.svg";
import PayNow from "@public/assets/images/pay-now.svg";
import VisaCard from "@public/assets/images/visa-card.svg";
import ProductBundle from "../cart/components/ProductBundle";

const CheckoutPage = ({ dataCheckout, paymentMethods, dataUserAddress }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [_msg, sendNotification] = useNotification();

  const [isLoadOpenMenu, setIsLoadOpenMenu] = useState(false);

  const [selectShop, setSelectShop] = useState({});

  const [physical, setPhysical] = useState([]);
  const [physicalTotalPrice, setPhysicalTotalPrice] = useState(0);

  const [deliveryData, setDeliveryData] = useState(false);

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentChooseMethod, setChoosePaymentMethod] = useState(null);

  const [isOpenMenuDelivery, setIsOpenMenuDelivery] = useState(false);
  const [isOpenModalPayment, setIsOpenModalPayment] = useState(false);
  const [isLoadDelivery, setIsLoadDelivery] = useState(true);

  const [deliveryService, setDeliveryService] = useState([]);

  const [primaryAddress, setPrimaryAddress] = useState({});
  const [idPrimaryAddress, setIdPrimaryAddress] = useState({});

  const [isWriteNotes, setIsWriteNotes] = useState(false);
  const [dataNotes, setDataNotes] = useState({});

  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [active, setActive] = useState(null);

  const [allItemsQty, setAllItemQty] = useState(0);

  // Modal
  const [openModalChangeAddress, setOpenModalChangeAddress] = useState(false);
  const [openModalSplitDelivery, setOpenModalSplitDelivery] = useState({
    isOpen: false,
    deliveryData: false,
  });

  const handlerOpenModalSplitDelivery = (delivery, service) => {
    setOpenModalSplitDelivery({
      isOpen: !openModalSplitDelivery.isOpen,
      deliveryData: delivery ?? false,
      serviceData: service ?? false,
    });
    setIsOpenMenuDelivery(false);
  };

  const handlerOpenModalAddress = () => setOpenModalChangeAddress(true);
  const handlerCloseModalAddress = () => {
    setIdPrimaryAddress(primaryAddress.id);
    setOpenModalChangeAddress(false);
  };

  useEffect(() => {
    if (!dataCheckout) backToPrevLink({ router });

    if (dataCheckout && session?.accessToken) {
      autoSelectDeliveryService();
      handleSelectHitpay();
    }

    setIsLoadDelivery(false);
  }, []);

  useEffect(() => {
    const isPrimaryAddress = dataUserAddress.find((item) => item.is_default);
    setPrimaryAddress(isPrimaryAddress);
    setIdPrimaryAddress(isPrimaryAddress.id);
  }, [active, paymentMethodId]);

  useEffect(() => {
    physical.length != 0 &&
      physical[0].shops.map((data) =>
        data.items.map((item) => (dataNotes[item.id] = item.notes))
      );

    if (physical?.length > 0 && !allItemsQty) {
      const getBundleItemsQty = physical?.[0]?.shops
        ?.map((shop) => shop?.bundles?.map((bundle) => bundle?.bundle_qty))
        .flat();
      const getProductsListQty = physical?.[0]?.shops
        .map((shop) => shop.items.map((item) => item.qty))
        .flat();

      const bundlesQty =
        getBundleItemsQty?.length > 0 &&
        getBundleItemsQty.reduce((total, num) => total + num);

      const productsQty =
        getProductsListQty?.length > 0 &&
        getProductsListQty.reduce((total, num) => total + num);

      const totalQuantity = bundlesQty + productsQty;

      setAllItemQty(totalQuantity);
    }
  }, [physical]);

  useEffect(() => {
    if (dataCheckout) {
      const physical = dataCheckout?.types?.filter(
        (data) => data.name === "physical"
      );

      const itemsPrice = physical[0].shops
        .map((shop) => shop.items.map((item) => item.total_price))
        .flat();
      const bundlesPrice = physical[0].shops
        .map((shop) =>
          shop.bundles.map(
            (bundle) => convertDataBundles(bundle).totalDiscountPriceBundle
          )
        )
        .flat();

      const totalPriceProducts =
        (itemsPrice?.length > 0 || bundlesPrice?.length > 0) &&
        [...itemsPrice, ...bundlesPrice].reduce((total, num) => total + num);

      setPhysical(physical);
      setPhysicalTotalPrice(totalPriceProducts);
    }
  }, [dataCheckout]);

  useEffect(() => {
    if (!deliveryData && !paymentChooseMethod && !isLoadDelivery) {
      sendNotification({
        variant: "warning",
        msg: [
          "You need to choose the Delivery Service to deliver your product.",
          "You need to choose the Payment Method to proceed.",
        ],
      });
    }
  }, [paymentChooseMethod, deliveryData]);

  useEffect(() => {
    let totalDeliveryFee = 0;

    for (const key in deliveryData) {
      const { deliveryFee } = deliveryData[key];
      totalDeliveryFee += deliveryFee;
    }

    setDeliveryFee(totalDeliveryFee);
  }, [deliveryData]);

  const autoSelectDeliveryService = async () => {
    setIsLoadDelivery(true);

    const { delivery } = await updateDeliveryAutoApply(
      session?.accessToken,
      dataCheckout.id
    );

    delivery.senders.map((delivery) => {
      if (delivery.delivery_service) {
        setDeliveryData((prev) => ({
          ...prev,
          [delivery.checkout_shop_id]: {
            companyName: delivery.delivery_service.company_name,
            serviceName: delivery.delivery_service.name,
            deliveryFee: delivery.total_delivery_fee,
            totalPackagesSplit: delivery.delivery_service.package_split_count,
          },
        }));
      }
    });

    setTimeout(() => {
      setIsLoadDelivery(false);
    }, 250);
  };

  const handleSelectHitpay = async () => {
    const hitpayIndex = paymentMethods.findIndex(
      (item) => item.code === "hitpay"
    );
    const idPayment = paymentMethods[hitpayIndex].id;

    handleChoosePaymentMethod(hitpayIndex, idPayment);
    updatePayment(idPayment);
  };

  const handlerOpenMenuDelivery = async (event, shop) => {
    setIsLoadOpenMenu(true);
    const checkoutId = dataCheckout.id;
    const checkoutShopId = shop.id;

    setSelectShop(shop);
    setIsOpenMenuDelivery(event.currentTarget);
    const { dataAddress } = await getDeliveryByShopIdAndUserAddress({
      auth: `Bearer ${session?.accessToken}`,
      checkoutShopId: checkoutShopId,
      checkoutId: checkoutId,
    });

    const {
      shop_fleet: shopFleet,
      third_party_deliveries: thirdPartyDeliveries,
    } = await dataAddress;

    const newThirdPartyDeliveries = thirdPartyDeliveries.map((delivery) => {
      return {
        name: delivery.name,
        services: delivery.services.filter(
          (service) => service.plans.length !== 0
        ),
      };
    });

    const newShopFleet = shopFleet.is_enabled && shopFleet;

    setDeliveryService([...newThirdPartyDeliveries, newShopFleet]);
    setIsLoadOpenMenu(false);
  };

  const updateDeliveryHandler = async (delivery, service) => {
    const checkoutId = dataCheckout.id;
    const shopId = selectShop.id;

    const serviceId = service.id;
    const shopFleetId = service.shop_fleet_id;

    const companyName = delivery.name;
    const serviceName = service.name;

    const deliveryFee = service?.total_delivery_fee ?? service.price;

    const totalPackagesSplit = service?.is_split
      ? service?.plans
          ?.map((plan) => plan.packages.length)
          .reduce((a, b) => a + b)
      : false;

    const deliveryServiceId = shopFleetId
      ? { is_using_shop_fleet: true, service_id: shopFleetId }
      : { is_using_shop_fleet: false, service_id: serviceId };

    await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        `v1/checkouts/${checkoutId}/shop/${shopId}/delivery-service`,
      {
        method: "PATCH",
        body: JSON.stringify(deliveryServiceId),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.code) {
          setDeliveryData((prev) => ({
            ...prev,
            [shopId]: {
              companyName: companyName,
              serviceName: serviceName,
              deliveryFee: deliveryFee,
              totalPackagesSplit: totalPackagesSplit,
            },
          }));

          sendNotification({
            variant: "success",
            msg: ["Success update Delivery"],
          });
        } else {
          sendNotification({
            variant: "error",
            msg: [data.message],
          });
        }
      })
      .catch(function (err) {
        return err.massage;
      })
      .finally(() => {
        setIsOpenMenuDelivery(null);
      });
  };

  const updatePayment = async (paymentId) => {
    const checkout_id = dataCheckout.id;
    const payload = { payment_method_id: paymentId };

    await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "v1/checkouts/" +
        checkout_id +
        "/payment-method",
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.code) {
          setChoosePaymentMethod(data.user_payment.payment_method.code);
          setIsOpenModalPayment(false);
        }
      })
      .catch(function (err) {
        return err.massage;
      });
  };

  const handlerWriteNotes = async (e) => {
    const { name, value } = e.target;
    if (value.length <= 100) {
      setDataNotes((prev) => ({ ...prev, [name]: value }));
    }

    if (e._reactName == "onBlur" || e.key == "Enter") {
      updateDetailCheckout({
        accessToken: session?.accessToken,
        checkoutId: dataCheckout.id,
        checkoutItemId: name,
        notes: value,
      });
      setIsWriteNotes(false);
    }
  };

  const handlerUpdateAddress = async (idAddress) => {
    UpdateAddressCheckout(
      session?.accessToken,
      dataCheckout.id,
      idAddress
    ).then(({ data: { code, message } }) =>
      sendNotification({
        msg: [code >= 400 ? message : "Success Update Address"],
        variant: code >= 400 ? "error" : "success",
      })
    );

    const dataAddress = dataUserAddress.find((item) => item.id == idAddress);

    setDeliveryData({});
    setDeliveryFee(0);
    setPrimaryAddress(dataAddress);
    setOpenModalChangeAddress(false);
  };

  const checkoutHandler = async (data) => {
    const checkout_id = { checkout_id: data.id };

    if (!deliveryFee) {
      return sendNotification({
        variant: "error",
        msg: ["Delivery service is required"],
      });
    }

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "v1/checkouts/confirm", {
      method: "POST",
      body: JSON.stringify(checkout_id),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.code) {
          if (data.user_payment.payment_method.code === "paypal") {
            window.open(`${data.user_payment.paypal.payment_url}`, "_blank");
            router.push(
              {
                pathname: "payment/pending",
                query: { id: data.id },
              },
              `../../payment/pending/${data.id}`
            );
          }
          if (data.user_payment.payment_method.code === "hitpay") {
            window.open(
              `${data.user_payment.hitpay.hitpay_payment_url}`,
              "_blank"
            );
            router.push(
              {
                pathname: "payment/pending",
                query: { id: data.id },
              },
              `../../payment/pending/${data.id}`
            );
          }
        }

        if (data.code === 400) {
          sendNotification({
            variant: "error",
            msg: [
              "This Product is unavailable, at the moment, will redirect back you to marketplace",
            ],
          });

          setTimeout(() => {
            router.back();
          }, 3000);
        }
      })
      .catch((err) => {
        return err.massage;
      });
  };

  const handleChoosePaymentMethod = (key, id) => {
    setActive(key);
    setPaymentMethodId(id);
  };

  const handleCloseMenuDelivery = () => {
    setIsOpenMenuDelivery(null);
  };

  const handleOpenModal = () => {
    setIsOpenModalPayment(true);
  };

  const handleCloseModal = () => {
    if (!paymentChooseMethod) {
      setPaymentMethodId(false);
      setActive(false);
    }
    setIsOpenModalPayment(false);
  };

  const isOutOfStockBundles = physical?.[0]?.shops
    ?.map((shop) =>
      shop?.bundles.map((bundle) => bundle?.items?.map((item) => item?.stock))
    )
    ?.flat(2)
    ?.includes(0);

  const isOutOfQuotaBundles = physical?.[0]?.shops
    ?.map((shop) => shop?.bundles.map((bundle) => bundle?.current_quota))
    ?.flat()
    ?.includes(0);

  const isInactiveProductBundles = physical?.[0]?.shops
    ?.map((shop) =>
      shop?.bundles.map((bundle) => bundle?.items?.map((item) => item?.status))
    )
    ?.flat(2)
    ?.includes("INACTIVE");

  const isBundlesExist = physical?.[0]?.shops
    ?.map((shop) => shop?.bundles && shop?.bundles?.length > 0)
    ?.every((bundles) => bundles);
  return (
    <>
      <Container maxWidth="lg" sx={{ paddingBottom: 5 }}>
        <div className="cartDiv">
          <div className="leftDiv">
            <Typography className="header">Checkout Transaction</Typography>
            {physical && physical.length > 0 && (
              <div className="row">
                <div
                  className="physicalHeader"
                  style={{
                    backgroundImage: `url(${headerBackground.src})`,
                    backgroundSize: "cover",
                  }}
                >
                  <Typography className="headerText">
                    Physical Goods (
                    {allItemsQty > 1 ? `${allItemsQty} items` : `1 item`})
                  </Typography>
                </div>

                {physical[0].shops.map((shop, index) => (
                  <div key={index} className="productsByShop">
                    <Grid container justifyContent="space-between">
                      <Grid item sm={12} className="shop">
                        <Image
                          src={shop.profile_pic ?? noShopImage}
                          alt={shop.name}
                          width={40}
                          height={40}
                          style={{ borderRadius: "50%" }}
                        />
                        <Grid>
                          <Typography className="shopName">
                            {shop.name}
                          </Typography>
                          <Typography className="shopCountry">
                            {shop.shop_address_country_name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item sm={8}>
                        {shop.bundles.map((bundle) => {
                          const isOutOfStock = bundle?.items
                            ?.map((item) => item?.stock || 0)
                            ?.includes(0);
                          const isOutOfQuota = bundle?.current_quota === 0;
                          const isInactiveProduct = bundle?.items
                            ?.map((item) => item?.status)
                            .includes("INACTIVE");
                          return (
                            <Stack
                              sx={{
                                mb: "32px !important",
                              }}
                              key={bundle?.id}
                              className="product"
                              direction="row"
                              mt={2.5}
                            >
                              <ProductBundle
                                paperProps={{
                                  sx: {
                                    width: "100% !important",
                                  },
                                }}
                                productData={bundle}
                                disabled={
                                  isOutOfQuota ||
                                  isOutOfStock ||
                                  isInactiveProduct
                                }
                              />
                            </Stack>
                          );
                        })}
                        {shop.items.map((item, index) => {
                          /**
                           * @type {ProductMembershipTierPrice}
                           */
                          const membershipDiscountPrice =
                            item.membership_discount;
                          return (
                            <div key={index} className="checkoutProduct">
                              <div className="checkoutProductImage">
                                <Image
                                  src={
                                    convertDataProductCheckout(item)
                                      .imageProduct
                                  }
                                  alt="product"
                                  layout="fill"
                                  objectFit="contain"
                                />
                              </div>

                              <div className="productDetails">
                                <Typography className="productTitle">
                                  {convertDataProductCheckout(item).nameProduct}
                                </Typography>
                                <div className="priceCartContainer">
                                  {convertDataProductCheckout(item)
                                    .hasDiscountProduct && (
                                    <>
                                      <Typography className="discountPercent">
                                        {
                                          convertDataProductCheckout(item)
                                            .percentDiscountProduct
                                        }
                                        %
                                      </Typography>
                                      <MembershipDiscountPercent
                                        hasDiscount={
                                          convertDataProductCheckout(item)
                                            .hasDiscountProduct
                                        }
                                        membershipDiscountPrice={
                                          membershipDiscountPrice
                                        }
                                      />
                                      <Typography className="discountAmount">
                                        {formatCurrency(
                                          convertDataProductCheckout(item)
                                            .productDiscountPrice
                                        )}
                                      </Typography>
                                    </>
                                  )}
                                  {!convertDataProductCheckout(item)
                                    .hasDiscountProduct &&
                                    membershipDiscountPrice && (
                                      <>
                                        <MembershipDiscountPercent
                                          hasDiscount={
                                            convertDataProductCheckout(item)
                                              .hasDiscountProduct
                                          }
                                          membershipDiscountPrice={
                                            membershipDiscountPrice
                                          }
                                        />
                                        <Typography className="discountAmount">
                                          {formatCurrency(
                                            convertDataProductCheckout(item)
                                              .productDiscountPrice
                                          )}
                                        </Typography>
                                      </>
                                    )}
                                  <Typography className="price">
                                    {formatCurrency(
                                      convertDataProductCheckout(item)
                                        .priceProduct
                                    )}
                                  </Typography>
                                </div>
                                <div className="quantityInputCheckOut">
                                  <TextField
                                    disabled
                                    value={
                                      convertDataProductCheckout(item)
                                        .totalQuantityProduct
                                    }
                                  />
                                </div>

                                <Grid container className="containerWriteNotes">
                                  <Grid item md={4}>
                                    {isWriteNotes !=
                                      convertDataProductCheckout(item)
                                        .idProduct && (
                                      <Button
                                        maxWidth
                                        className="buttonWriteNote"
                                        disableRipple
                                        onClick={() =>
                                          setIsWriteNotes(
                                            convertDataProductCheckout(item)
                                              .idProduct
                                          )
                                        }
                                        startIcon={
                                          <Image
                                            src={WriteNote}
                                            alt="write note images"
                                            objectFit="contain"
                                          />
                                        }
                                      >
                                        <Typography className="titleNote">
                                          {dataNotes[
                                            convertDataProductCheckout(item)
                                              .idProduct
                                          ] &&
                                          dataNotes[
                                            convertDataProductCheckout(item)
                                              .idProduct
                                          ] !== " "
                                            ? "Edit"
                                            : "Write"}
                                          &nbsp;Notes
                                        </Typography>
                                      </Button>
                                    )}
                                  </Grid>

                                  {isWriteNotes ===
                                  convertDataProductCheckout(item).idProduct ? (
                                    <TextField
                                      autoFocus={
                                        isWriteNotes ==
                                        convertDataProductCheckout(item)
                                          .idProduct
                                      }
                                      fullWidth
                                      multiline
                                      maxRows={2}
                                      name={
                                        convertDataProductCheckout(item)
                                          .idProduct
                                      }
                                      onChange={(e) => handlerWriteNotes(e)}
                                      onKeyDown={(e) => handlerWriteNotes(e)}
                                      onBlur={(e) => handlerWriteNotes(e)}
                                      placeholder="Write here"
                                      value={
                                        dataNotes[
                                          convertDataProductCheckout(item)
                                            .idProduct
                                        ]
                                      }
                                    />
                                  ) : (
                                    <Grid item md={8}>
                                      <Typography className="titleInput">
                                        {
                                          dataNotes[
                                            convertDataProductCheckout(item)
                                              .idProduct
                                          ]
                                        }
                                      </Typography>
                                    </Grid>
                                  )}
                                </Grid>
                              </div>
                            </div>
                          );
                        })}
                      </Grid>

                      <MenuDeliveryService
                        open={isOpenMenuDelivery}
                        shop={shop}
                        closeModal={handleCloseMenuDelivery}
                        dataDeliveryServices={deliveryService}
                        updateDelivery={updateDeliveryHandler}
                        handlerOpenModalSplitDelivery={
                          handlerOpenModalSplitDelivery
                        }
                        isLoadOpenMenu={isLoadOpenMenu}
                        deliveryData={deliveryData}
                        handlerOpenMenuDelivery={handlerOpenMenuDelivery}
                        isBundlesExist={isBundlesExist}
                        isLoadDelivery={isLoadDelivery}
                        isOutOfStockBundles={isOutOfStockBundles}
                        isInactiveProductBundles={isInactiveProductBundles}
                        isOutOfQuotaBundles={isOutOfQuotaBundles}
                      />
                    </Grid>
                  </div>
                ))}
              </div>
            )}

            <div className="paymentDeliveryDetails">
              <Divider />
              <Typography className="header">Payment and Delivery</Typography>
              <div className="paymentSelection" onClick={handleOpenModal}>
                <div className="rowPayment">
                  {!paymentChooseMethod && (
                    <div className="rowPayment">
                      <Image
                        src={HitPay}
                        width={80}
                        height={30}
                        alt="logo"
                        objectFit="contain"
                      />
                      <Image src={VisaCard} width={80} height={30} alt="logo" />
                      <Image src={PayNow} width={70} height={20} alt="logo" />
                      <Typography>Choose your payment method</Typography>
                    </div>
                  )}

                  {paymentChooseMethod === "hitpay" && (
                    <Grid container alignItems="center">
                      <Grid item md={4} container>
                        <Grid>
                          <Image
                            src={HitPay}
                            width={170}
                            height={42}
                            alt="logo"
                          />
                        </Grid>
                        <Grid>
                          <Image
                            src={VisaCard}
                            width={80}
                            height={30}
                            alt="logo"
                          />
                          <Image
                            src={PayNow}
                            width={70}
                            height={30}
                            alt="logo"
                          />
                        </Grid>
                      </Grid>
                      <Grid item md={6}>
                        <Typography>HitPay payment method</Typography>
                      </Grid>
                    </Grid>
                  )}
                </div>
                <ArrowForwardIos />
              </div>

              {/* Modal */}
              <ModalPaymentMethod
                paymentMethods={paymentMethods}
                dataCheckout={dataCheckout}
                updatePayment={updatePayment}
                active={active}
                handleChoosePaymentMethod={handleChoosePaymentMethod}
                isOpenModal={isOpenModalPayment}
                handleCloseModal={handleCloseModal}
              />

              <div className="address">
                <div className="addressHeader">
                  <Typography className="addressName">
                    {primaryAddress.name}
                  </Typography>
                  <div
                    className="addressChange"
                    onClick={handlerOpenModalAddress}
                  >
                    <Typography>Change Address</Typography>
                  </div>
                </div>
                <div className="detailsDiv">
                  <Typography>
                    {primaryAddress.address_detail},&nbsp;
                    {primaryAddress.country_id}. <br />
                    {primaryAddress.country_name}.&nbsp;
                    {primaryAddress.postal_code}&nbsp;
                    <br />
                    {parsePhoneNumber(primaryAddress.receiver_phone)?.valid
                      ? parsePhoneNumber(primaryAddress.receiver_phone)?.number
                          ?.international
                      : primaryAddress.receiver_phone}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="rightDiv">
            <div className="overviewCheckout">
              <Typography className="title">Purchase Summary</Typography>
              <div className="subOverview">
                <Typography className="subTitleCheckout">
                  Total Price{" "}
                  {physicalTotalPrice.toString().length >= 4 && <br />} (&nbsp;
                  {allItemsQty}
                  &nbsp;item{allItemsQty > 1 && "s"})
                </Typography>
                <Typography className="subOverviewQuantity">
                  {formatCurrency(physicalTotalPrice)}
                </Typography>
              </div>
              <div className="subOverview">
                <Typography className="subTitleCheckout">
                  Delivery Fee
                </Typography>
                <Typography className="subOverviewQuantity">
                  {checkValue(formatCurrency(deliveryFee))}
                </Typography>
              </div>
              <div className="subOverview">
                <Typography className="subTitleCheckout">
                  Payment Method
                </Typography>
                <Typography className="subOverviewQuantity">
                  {paymentChooseMethod === "hitpay" && (
                    <Image src={HitPay} width={72} height={18} alt="logo" />
                  )}
                </Typography>
              </div>
              <Divider />
              <Typography className="title">Total</Typography>
              <div className="subOverview">
                <Typography className="subTitleCheckout">
                  Grand Total
                </Typography>
                <Typography className="subOverviewQuantity">
                  {formatCurrency(physicalTotalPrice + deliveryFee)}
                </Typography>
              </div>
              <Button
                className="purchaseButton"
                onClick={() => checkoutHandler(dataCheckout)}
                disabled={
                  isBundlesExist &&
                  (isOutOfStockBundles ||
                    isOutOfQuotaBundles ||
                    isInactiveProductBundles)
                }
              >
                <Typography>Purchase Now</Typography>
              </Button>
              <Button className="couponButton" disabled>
                <Typography>Apply Coupon Code</Typography>
              </Button>
            </div>
          </div>
        </div>

        <ModalSplitPackages
          dataDeliveryServices={deliveryService}
          updateDelivery={updateDeliveryHandler}
          handlerOpenModalSplitDelivery={handlerOpenModalSplitDelivery}
          isOpenModal={openModalSplitDelivery}
        />

        <ModalChangeAddress
          chooseAddress={(value) => setIdPrimaryAddress(value)}
          closeModal={handlerCloseModalAddress}
          dataAddress={dataUserAddress}
          isBorder={idPrimaryAddress}
          open={openModalChangeAddress}
          submitHandler={handlerUpdateAddress}
        />
      </Container>
    </>
  );
};

export default memo(CheckoutPage);
