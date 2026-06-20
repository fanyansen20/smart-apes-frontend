// Next
import useNotification from "@hooks/useNotification";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI
import { Stack } from "@mui/material";

// Helper
import { getProductsFromCart } from "store/reducer/getProductsFromCart/getProductsFromCartSlice";
import useManageCarts from "./helper/useManageCarts";
import usePurchaseNow from "./helper/usePurchaseNow";
import useSelectProduct from "./helper/useSelectProduct";

// Components
import PurpleCheckBox from "@components/checkbox/PurpleCheckBox/PurpleCheckBox";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import EmptyCart from "@layout/CartPage/EmptyCart/EmptyCart";
import FooterPurchaseNavigation from "view/mobile/components/FooterPurchaseNavigation";
import HeaderNavigation from "view/mobile/components/HeaderNavigation";
import BundleCartItem from "./components/BundleCartItem/BundleCartItem";
import PhysicalProductCartItem from "./components/PhysicalProductCartItem/PhysicalProductCartItem";
import ProductTypeHeader from "./components/ProductTypeHeader/ProductTypeHeader";

// Styles
import classes from "./CartMobile.module.scss";

// Assets
import noShopImage from "@public/assets/images/not-shop-image.svg";

function Cart({ dataUserAddress }) {
  const [_, sendNotification] = useNotification();
  const dispatch = useDispatch();
  const productsFromCartState = useSelector(
    (store) => store.getProductsFromCart
  );
  const { data: session } = useSession();
  const [productsCart, setProductsCart] = useState([]);
  const [productShops, setProductShops] = useState([]);
  const [quantityProduct, setQuantityProduct] = useState({});
  const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);
  const [totalItems, setTotalItems] = useState();
  const { handlePurchaseNow, isLoadingPurchase } = usePurchaseNow();
  const {
    selectedProducts,
    handleSelect,
    handleSelectAll,
    checkIsSelected,
    isCheckedAll,
  } = useSelectProduct(productsCart);
  const { updateCart, deleteCarts } = useManageCarts();

  const getCarts = () => {
    dispatch(
      getProductsFromCart({
        axiosConfig: {
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        },
      })
    );
  };

  const countTotalItems = (allProducts) => {
    const countItems =
      allProducts?.length > 0 &&
      allProducts
        .map((item) => (item.type === "bundle" ? item.bundle_qty : item.qty))
        .reduce((total, num) => total + num);
    setTotalItems(countItems);
  };

  const incrementDecrementHandler = ({ action, cartId }) => {
    const newQuantity = () => {
      if (action === "INCREMENT") {
        return quantityProduct[cartId] + 1;
      } else if (action === "DECREMENT" && quantityProduct[cartId] !== 1) {
        return quantityProduct[cartId] - 1;
      }

      return 1;
    };

    updateCart({ cartId, qty: newQuantity(), callback: getCarts });
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
          updateCart({ cartId, qty: 1, callback: getCarts });
        }, 250);
      }

      if (target.value >= stockProduct) {
        setQuantityProduct((prev) => ({
          ...prev,
          [cartId]: stockProduct,
        }));
        return updateCart({ cartId, qty: stockProduct, callback: getCarts });
      }

      if (newQuantity !== 0) {
        updateCart({ cartId, qty: newQuantity, callback: getCarts });
      }
    }
  };

  const renderProduct = (product, productIdx) => {
    const bundleActions = {
      handleSelect,
      checkIsSelected,
      incrementDecrementHandler,
      quantityChangeHandler,
    };

    switch (product?.type) {
      case "physical":
        return (
          <PhysicalProductCartItem
            product={product}
            productIdx={productIdx}
            quantityProduct={quantityProduct}
            {...bundleActions}
          />
        );
      case "bundle":
        return (
          <BundleCartItem
            product={product}
            productIdx={productIdx}
            {...bundleActions}
          />
        );

      default:
        break;
    }
  };

  useEffect(() => {
    getCarts();
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

      const mappedProducts = productsDataResult?.map((item) => ({
        ...item,
        product: {
          ...item.product,
          fullName: item?.product?.name,
        },
      }));

      countTotalItems(productsDataResult);
      setProductsCart(mappedProducts);
    }
  }, [productsFromCartState]);

  useEffect(() => {
    countTotalItems(productsCart);
  }, [productsCart, productShops]);

  useEffect(() => {
    const dataPhysicalShops = [
      ...new Map(
        productsCart
          ?.map((item) => [item.shop_id, item.bundle || item])
          .values()
      ),
    ];

    setProductShops(dataPhysicalShops);
  }, [productsCart]);

  useEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;
    selectedProducts.map((product) => {
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

    setTotalSelectedPrice(totalPrice);
  }, [selectedProducts, productsCart, quantityProduct]);

  return (
    <div className={classes.containerCartMobile}>
      <HeaderNavigation pageTitle="Shopping Cart" showButtons={false} />
      {productsCart?.length > 0 ? (
        <Stack>
          <section className={classes.massAction}>
            <div onClick={() => handleSelectAll()}>
              <PurpleCheckBox checked={isCheckedAll} id="selectAllCart" />
              <label htmlFor="selectAllCart">Select All</label>
            </div>
            <SecondaryButton
              onClick={() =>
                deleteCarts({ selectedProducts, callback: getCarts })
              }
              disabled={selectedProducts.length < 1}
            >
              <p>
                Delete
                {selectedProducts?.length
                  ? ` (${selectedProducts.length})`
                  : ""}
              </p>
            </SecondaryButton>
          </section>
          <ProductTypeHeader
            type="physical"
            itemsCount={productsCart.length > 0 ? totalItems : 1}
          />
          {productShops?.map((shop) => (
            <Stack key={shop[0]}>
              <div className={classes.shopInfo}>
                <Link href={`/${shop[1].shop_slug}`}>
                  <a>
                    <Image
                      src={
                        shop[1]?.shop_logo_url ||
                        shop[1]?.profile_pic ||
                        noShopImage
                      }
                      alt={shop[1].name}
                      objectFit="contain"
                      width={40}
                      height={40}
                    />
                  </a>
                </Link>
                <div>
                  <Link href={`/${shop[1].shop_slug}`}>
                    <a>
                      <p className={classes.shopName}>{shop[1].shop_name}</p>
                    </a>
                  </Link>
                  <p className={classes.shopCountry}>
                    {shop[1].shop_country_name}
                  </p>
                </div>
              </div>
              {productsCart.map(
                (physicalProduct, key) =>
                  physicalProduct?.shop_id === shop[0] &&
                  renderProduct(physicalProduct, key)
              )}
            </Stack>
          ))}
        </Stack>
      ) : (
        <EmptyCart />
      )}
      <FooterPurchaseNavigation
        totalPrice={totalSelectedPrice}
        handlePurchaseNow={() =>
          handlePurchaseNow({ dataUserAddress, selectedProducts })
        }
        disablePurchaseBtn={selectedProducts?.length < 1 || isLoadingPurchase}
      />
    </div>
  );
}

export default Cart;
