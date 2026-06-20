//React
import { memo, useCallback, useEffect, useState } from "react";

// redux
import { useDispatch } from "react-redux";
import { getQuantityCartData } from "store/reducer/quantityCart/quantityCartSlice";
import { getWishlistByIdProduct } from "store/reducer/wishlist/getWishlistByIdProduct";

//Material UI
import { DeleteOutline } from "@mui/icons-material";
import { Container, Divider, Grid, Stack, Typography } from "@mui/material";

//Next JS
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Hooks
import useNotification from "@hooks/useNotification";
import useHandlerProductWishlist from "@hooks/whislist/useHandlerProductWishlist";

// service
import { createCheckoutsFromCart } from "services/checkout/product/createCheckoutsFromCart";

//Components
import PurpleCheckBox from "@components/checkbox/PurpleCheckBox/PurpleCheckBox";
import ModalAddAddress from "@components/modal/ModalAddAddress/ModalAddAddress";
import ModalAlertAddress from "@components/modal/ModalAlertAddress/ModalAlertAddress";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import TextButton from "@components/shared/Button/TextButton/TextButton";
import ModalConfirmationAlerts from "@components/shared/Modal/ModalConfirmationAlerts/ModalConfirmationAlerts";
import EmptyCart from "@layout/CartPage/EmptyCart/EmptyCart";

//Helper
import { formatCurrency } from "helper/checkValue";
import { get } from "helper/network";

//Images
import headerBackground from "@public/assets/images/FlowTop.png";
import noShopImage from "@public/assets/images/not-shop-image.svg";
import PhysicalProduct from "./components/PhysicalProduct";
import ProductBundle from "./components/ProductBundle";

const CartPage = ({ productsFromCartState, user }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const [_msg, sendNotification] = useNotification();
  const { handlerAddProductWishlistFromCart } = useHandlerProductWishlist();

  const [isLoadCheckout, setIsLoadCheckout] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [quantityProduct, setQuantityProduct] = useState({});

  const [totalSelected, setTotalSelected] = useState(0);
  const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);
  const [totalAllItems, setTotalItems] = useState(0);

  const [productsCart, setProductsCart] = useState([]);
  const [productShops, setProductShops] = useState([]);

  const [isModalConfirmDelete, setIsModalConfirmDelete] = useState({
    isOpen: false,
    dataProduct: "",
    // delete or wishlist
    type: "",
  });

  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalAddAddress, setIsModalAddress] = useState(false);
  const [locations, setLocations] = useState([]);

  const handlerModalALert = () => setIsModalAlert(!isModalAlert);
  const handlerModalAddAddress = () => {
    setIsModalAddress(!isModalAddAddress);
    setIsModalAlert(false);
  };

  const countTotalItems = (allProducts) => {
    const countItems =
      allProducts?.length > 0 &&
      allProducts
        .map((item) => (item.type === "bundle" ? item.bundle_qty : item.qty))
        .reduce((total, num) => total + num);
    setTotalItems(countItems);
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const { data, error } = productsFromCartState;
    const productsDataResult = data?.results;

    if (error) {
      sendNotification({ msg: [error], variant: "error" });
    } else {
      productsDataResult?.map(
        (item) =>
          (quantityProduct[item.id] =
            item.type === "bundle" ? item.bundle_qty : item.qty)
      );

      countTotalItems(productsDataResult);
      setProductsCart(productsDataResult);
    }
  }, [productsFromCartState]);

  useEffect(() => {
    const dataPhysicalShops = [
      ...new Map(
        productsCart.map((item) => [item.shop_id, item.bundle || item]).values()
      ),
    ];

    setProductShops(dataPhysicalShops);
  }, [productsCart]);

  useEffect(() => {
    countTotalItems(productsCart);
  }, [productsCart, productShops, isModalConfirmDelete]);

  useEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;
    selectedProduct.map((product) => {
      const findProduct = productsCart.find((physical) => {
        return physical.id === product;
      });
      if (findProduct) {
        const currentQuantity = quantityProduct?.[findProduct.id];
        totalQuantity = totalQuantity + currentQuantity;

        if (findProduct?.type === "physical") {
          totalPrice = totalPrice + findProduct.product.price * currentQuantity;
        }

        if (findProduct?.type === "bundle") {
          totalPrice = totalPrice + findProduct.bundle.total_price;
        }
      }
    });

    setSelectAll(selectedProduct.length === productsCart.length);
    setTotalSelected(totalQuantity);
    setTotalSelectedPrice(totalPrice);
  }, [selectedProduct, productsCart, quantityProduct]);

  const selectAllHandler = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedProduct([]);
    } else {
      setSelectAll(true);

      const newSelectedProduct = [];
      productsCart.forEach((productCart) => {
        const isProductStockAvailable = productCart?.product?.stock;
        const isBundleStockAvailable =
          productCart?.bundle?.current_quota &&
          productCart?.bundle?.items?.every((item) => item?.stock > 0);

        if (isProductStockAvailable || isBundleStockAvailable)
          newSelectedProduct.push(productCart.id);
      });

      setSelectedProduct(newSelectedProduct);
    }
  };

  const checkHandler = useCallback(
    (cartId) => {
      if (selectedProduct.includes(cartId)) {
        const newSelectedProduct = selectedProduct.filter((product) => {
          return product !== cartId;
        });
        setSelectedProduct(newSelectedProduct);
      } else {
        setSelectedProduct([...selectedProduct, cartId]);
      }
    },
    [selectedProduct]
  );

  const getLocation = async () => {
    const response = await get(`
      ${process.env.NEXT_PUBLIC_BACKEND_URL}v1/locations/countries`);
    const data = response.data;
    if (data) {
      setLocations(data.results);
    }
  };

  const updateCart = useCallback(
    async (token, cartId, quantity) => {
      dispatch(getQuantityCartData());

      const newQuantity = {
        qty: quantity,
      };
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}v1/carts/${cartId}`, {
        method: "PATCH",
        body: JSON.stringify(newQuantity),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.message) {
            const arrayCart = [...productsCart];
            const newCart = arrayCart.find((cart) => cart.id === cartId);

            newCart.qty = quantity;
            setProductsCart(arrayCart);
          }
        })
        .catch(function (error) {
          return error;
        });
    },
    [quantityProduct]
  );

  const deleteCart = useCallback(async (token, cartId) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}v1/carts/${cartId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        dispatch(getQuantityCartData());
        sendNotification({
          msg: ["Successful remove from cart"],
        });
      })
      .catch(function (error) {
        return error;
      })
      .finally(() => {
        setIsModalConfirmDelete(!isModalAddAddress);
      });
  }, []);

  const deleteSelected = useCallback(async () => {
    if (selectedProduct.length > 0) {
      const selected = {
        ids: selectedProduct,
      };

      let newPhysicalArray = [...productsCart];

      selectedProduct.map((id) => {
        newPhysicalArray = newPhysicalArray.filter((p) => {
          return p.id !== id;
        });
      });

      setProductsCart(newPhysicalArray);

      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}v1/carts`, {
        method: "DELETE",
        body: JSON.stringify(selected),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
        .then(() => {
          dispatch(getQuantityCartData());
          setSelectedProduct([]);
          setSelectAll(false);
        })
        .catch((error) => {
          return error;
        });
    }
  }, [productsCart, productShops, selectedProduct]);

  const incrementDecrementHandler = ({ action, cartId }) => {
    const newQuantity = () => {
      if (action === "INCREMENT") {
        return quantityProduct[cartId] + 1;
      } else if (action === "DECREMENT" && quantityProduct[cartId] !== 1) {
        return quantityProduct[cartId] - 1;
      }

      return 1;
    };

    setQuantityProduct((prev) => ({ ...prev, [cartId]: newQuantity() }));

    updateCart(session?.accessToken, cartId, newQuantity());
  };

  const quantityChangeHandler = ({ event, cartId, stockProduct }) => {
    const { target, _reactName } = event;
    const isNumber = /^[0-9]*$/;

    const newQuantity = isNumber.test(target.value)
      ? Number(target.value)
      : quantityProduct[cartId];

    if (newQuantity <= stockProduct * 100) {
      setQuantityProduct((prev) => ({ ...prev, [cartId]: newQuantity }));
    }

    if (_reactName === "onBlur") {
      if (newQuantity === 0) {
        setQuantityProduct((prev) => ({ ...prev, [cartId]: 1 }));
        setTimeout(() => {
          updateCart(session?.accessToken, cartId, 1);
        }, 250);
        return;
      }

      if (target.value >= stockProduct) {
        setQuantityProduct((prev) => ({
          ...prev,
          [cartId]: stockProduct,
        }));
        updateCart(session?.accessToken, cartId, stockProduct);
      }

      if (newQuantity !== 0) {
        updateCart(session?.accessToken, cartId, newQuantity);
      }
    }
  };

  const deleteHandler = async (physicalProduct, type) => {
    const cartId = physicalProduct.id;
    const shopId = physicalProduct.shop_id;

    const newSelectProduct = [...selectedProduct];
    const isDeleteShops = productShops.reduce((result, item) => {
      result[item[0]] =
        productsCart.filter((physical) => item[0] === physical.shop_id)
          .length === 1;

      return result;
    }, {});

    if (isDeleteShops[shopId]) {
      const indexToRemove = productShops.findIndex(
        (item) => item[0] === shopId
      );

      if (indexToRemove !== -1) {
        productShops.splice(indexToRemove, 1);
      }
    }

    const indexToRemove = productsCart.findIndex((item) => item.id === cartId);

    if (indexToRemove !== -1) {
      productsCart.splice(indexToRemove, 1);
    }

    newSelectProduct = newSelectProduct.filter((id) => {
      return id != cartId;
    });

    setSelectedProduct(newSelectProduct);

    if (type === "delete") {
      deleteCart(session?.accessToken, cartId);
    }

    if (type === "wishlist") {
      await handlerAddProductWishlistFromCart(session?.accessToken, cartId);
      dispatch(getQuantityCartData());
      dispatch(getWishlistByIdProduct({ idProduct: cartId }));
    }
  };

  const checkoutHandler = async () => {
    setIsLoadCheckout(true);

    const cartCheckout = {
      cart_ids: selectedProduct,
    };

    const res = await createCheckoutsFromCart(cartCheckout);

    if (res?.code === 400) {
      if (res?.message === "Product is outside of checkout limit") {
        setIsLoadCheckout(false);

        return sendNotification({
          msg: ["Not meet minimum order requirement"],
          variant: "error",
        });
      }

      if (res?.message === "User address is missing") {
        setIsLoadCheckout(false);
        return setIsModalAlert(true);
      }
    }

    router.push(`cart/checkout/${res.id}`);
    setIsLoadCheckout(false);
  };

  const renderProduct = (productData, key) => {
    const productActionProps = {
      checkHandler,
      deleteHandler,
      quantityProduct,
      selectedProduct,
      quantityChangeHandler,
      incrementDecrementHandler,
      setIsModalConfirmDelete,
    };

    if (productData?.type === "bundle") {
      const isOutOfStock = productData?.bundle?.items
        ?.map((item) => item?.stock || 0)
        ?.includes(0);
      const isOutOfQuota = productData?.bundle?.current_quota === 0;
      const isInactiveProduct = productData?.bundle?.items
        ?.map((item) => item?.status)
        .includes("INACTIVE");

      return (
        <Stack className="product" direction="row" mt={2.5}>
          <div
            onClick={() => checkHandler(productData.id)}
            className="checkBoxDiv"
          >
            <PurpleCheckBox
              disabled={isOutOfQuota || isOutOfStock || isInactiveProduct}
              checked={selectedProduct.includes(productData.id)}
            />
          </div>
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <ProductBundle
              key={key}
              productData={productData}
              disabled={isOutOfQuota || isOutOfStock || isInactiveProduct}
            />
            <TextButton
              onClick={() =>
                setIsModalConfirmDelete({
                  isOpen: true,
                  dataProduct: productData,
                  type: "delete",
                })
              }
              color="secondary"
              text={<DeleteOutline />}
            />
          </Stack>
        </Stack>
      );
    }

    if (productData?.type === "physical") {
      return (
        <PhysicalProduct
          {...productActionProps}
          key={key}
          physicalProduct={productData}
        />
      );
    }
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ paddingTop: "50px", paddingBottom: "50px" }}
      >
        {productsCart.length > 0 ? (
          <div className="cartDiv">
            <div className="leftDiv">
              <Typography className="headerCart">Shopping Cart</Typography>
              <div className="headerButtons">
                <div className="selectAll">
                  <div
                    onClick={() => selectAllHandler()}
                    className="checkBoxDiv"
                  >
                    <PurpleCheckBox checked={selectAll} />
                  </div>

                  <Typography className="selectAllText">Select All</Typography>
                </div>

                <TextButton
                  disabled={selectedProduct.length == 0}
                  color="secondary"
                  text="Delete"
                  onClick={deleteSelected}
                />
              </div>
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
                    {productsCart.length > 0
                      ? `${totalAllItems} items`
                      : "1 item"}
                    )
                  </Typography>
                </div>
                {productShops.map((shop, key) => (
                  <div key={key}>
                    <div className="productsByShop">
                      <div className="shop">
                        <div>
                          <Link href={`/${shop[1].shop_slug}`}>
                            <a>
                              <div className="logoCartShop">
                                <Image
                                  src={
                                    shop[1]?.shop_logo_url ||
                                    shop[1]?.profile_pic ||
                                    noShopImage
                                  }
                                  alt={shop[1].name}
                                  layout="fill"
                                  objectFit="contain"
                                />
                              </div>
                            </a>
                          </Link>
                        </div>
                        <Grid>
                          <Link href={`/${shop[1].shop_slug}`}>
                            <a>
                              <Typography className="shopName">
                                {shop[1].shop_name}
                              </Typography>
                            </a>
                          </Link>
                          <Typography className="shopCountry">
                            {shop[1].shop_country_name}
                          </Typography>
                        </Grid>
                      </div>

                      {productsCart.map(
                        (physicalProduct, key) =>
                          physicalProduct?.shop_id === shop[0] &&
                          renderProduct(physicalProduct, key)
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rightDiv">
              <div className="overviewCart">
                <Typography className="title">Purchase Summary</Typography>
                <div className="subOverview">
                  <Typography className="subTitleCart">
                    Total Price (&nbsp;
                    {totalSelected} item
                    {totalSelected > 1 && "s"})
                  </Typography>
                  <Typography className="subOverviewGrandTotal">
                    {formatCurrency(totalSelectedPrice)}
                  </Typography>
                </div>

                <Divider />

                <div className="subOverview">
                  <Typography className="title">Grand Total</Typography>
                  <Typography className="subOverviewGrandTotal">
                    {formatCurrency(totalSelectedPrice)}
                  </Typography>
                </div>

                <PrimaryButton
                  onClick={checkoutHandler}
                  isLoading={isLoadCheckout}
                  disabled={isLoadCheckout || selectedProduct.length == 0}
                  fullWidth={true}
                  text="Purchase Now"
                />

                <SecondaryButton
                  fullWidth={true}
                  text="Apply Coupon Code"
                  disabled={true}
                />
              </div>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}

        <ModalConfirmationAlerts
          titleModal="Delete Product"
          dialogBox="Are you sure want to remove from cart?"
          isOpen={isModalConfirmDelete.isOpen}
          onClick={() =>
            deleteHandler(
              isModalConfirmDelete.dataProduct,
              isModalConfirmDelete.type
            )
          }
          closeModal={() => setIsModalConfirmDelete(!isModalConfirmDelete)}
        />

        <ModalAlertAddress
          isOpen={isModalAlert}
          closeModal={handlerModalALert}
          openModalAddress={handlerModalAddAddress}
        />

        <ModalAddAddress
          accessToken={session?.accessToken}
          userId={user?.id}
          isOpen={isModalAddAddress}
          closeModal={handlerModalAddAddress}
          locations={locations}
          handlerCheckout={checkoutHandler}
        />
      </Container>
    </>
  );
};

export default memo(CartPage);
