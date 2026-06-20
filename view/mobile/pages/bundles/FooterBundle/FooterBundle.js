// Next
import useLoginCallback from "@hooks/useLoginCallback";
import useNotification from "@hooks/useNotification";
import useToggle from "@hooks/useToggle";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Helper
import { calculateDiscountPercentage } from "@helper/calculateDiscount";
import errorHandler from "@helper/errorHandler/errorHandler";
import { filterNumberOnly } from "@helper/filterNumberOnly";
import { cartBundle } from "store/reducer/cartBundle/cartBundleSlice";
import { checkoutBundle } from "store/reducer/checkoutBundle/checkoutBundleSlice";

// MUI
import { Paper } from "@mui/material";

// Styles
import classes from "./FooterBundle.module.scss";

// Assets
import BundleCart from "@public/assets/icons/bundle-cart.svg";
import DiscountIcon from "@public/assets/icons/discount.svg";

// Comp
import QuantityButton from "@components/buttons/QuantityButton/QuantityButton";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import DrawerPanel from "view/mobile/components/DrawerPanel";
import FooterProduct from "view/mobile/components/FooterNavigation/FooterProduct";
import FooterProductButtons from "view/mobile/components/FooterNavigation/components/FooterProductButtons";

// Constant
import { productDrawerModes } from "view/mobile/components/FooterNavigation/FooterProduct/constant";

/**
 @param {{
  activeVariant: number
  bundleData: Object
  bundleItems: Array.<Object>
  prices: Object
  quotaPerCheckout: number
  openDrawerVariant: boolean
  toggleDrawerVariant: () => void
  isAnyNotChosenVariant: boolean
}} props
 */
const FooterBundle = ({
  activeVariant,
  bundleData,
  bundleItems,
  setBundleItems,
  prices,
  quotaPerCheckout,
  openDrawerVariant,
  toggleDrawerVariant,
  isAnyNotChosenVariant,
}) => {
  const dispatch = useDispatch();
  const session = useSession();
  const router = useRouter();
  const handleLoginCallback = useLoginCallback();
  const [_, sendNotification] = useNotification();
  const [variantData, setVariantData] = useState(bundleItems?.[activeVariant]);
  const [bundleQty, setBundleQty] = useState(1);
  const [mode, setMode] = useState(productDrawerModes.PURCHASE.param);
  const [openDrawerProduct, toggleDrawerProduct] = useToggle();

  const handleClickCart = () => {
    setMode(productDrawerModes.CART.param);
    toggleDrawerProduct();
  };

  const handleClickPurchase = () => {
    setMode(productDrawerModes.PURCHASE.param);
    toggleDrawerProduct();
  };

  const handleApplyVariant = (products) => {
    if (!products?.length) return;

    const variants = products.map((item) => item?.childVariant).flat();

    const _bundleItems = [...bundleItems];
    const newVariants = _bundleItems[activeVariant];
    const _newVariants = {
      ...newVariants,
      variant_details: newVariants.variant_details.map(
        (product, idxProduct) => ({
          ...product,
          purchaseQty: variants?.[idxProduct]?.purchaseQty,
        })
      ),
    };

    _bundleItems[activeVariant] = _newVariants;

    setBundleItems(_bundleItems);
    toggleDrawerVariant();
  };

  const handleProceed = () => {
    if (!session?.data) return handleLoginCallback();

    const payload = {
      bundle_id: bundleData?.bundleId,
      bundle_qty: bundleQty,
      items: bundleItems
        ?.map((product) => {
          return product.variant_details.map((variant) => {
            if (variant?.purchaseQty > 0) {
              return {
                product_id: product?.product_id,
                variant_id: variant?.variant_id,
                qty: variant?.purchaseQty,
              };
            }
          });
        })
        .flat()
        .filter((item) => item !== undefined),
    };

    if (mode === "PURCHASE") {
      dispatch(checkoutBundle(payload))
        .unwrap()
        .then((resCheckout) => {
          window.scrollTo(0, 0);
          router.push(`/cart/checkout/${resCheckout.id}`);
        })
        .catch((err) => {
          const errMessage = err?.response?.data?.message;

          if (errMessage === "Product is outside of checkout limit") {
            return sendNotification({
              msg: ["Not meet minimum order requirement"],
              variant: "error",
            });
          }

          if (errMessage == "User address is missing") {
            return sendNotification({
              msg: ["Please add address in user profile"],
              variant: "error",
            });
          }

          return sendNotification({
            msg: [errMessage],
            variant: "error",
          });
        });
    } else {
      dispatch(cartBundle(payload))
        .unwrap()
        .then(() => {
          sendNotification({
            msg: ["Success add product to cart"],
          });
          toggleDrawerProduct();
        })
        .catch((e) => {
          sendNotification({
            msg: [errorHandler(e)],
            variant: "error",
          });
        });
    }
  };

  useEffect(() => {
    setVariantData(openDrawerVariant ? bundleItems?.[activeVariant] : {});
  }, [openDrawerVariant, activeVariant]);

  const getQtyValue = (value, type, qty) => {
    if (type !== "INCREMENT" && type !== "DECREMENT")
      return filterNumberOnly(value);

    if (type === "DECREMENT") return qty - 1;

    return qty + 1;
  };

  const handleChangeBundleQty = (e, type = "") => {
    let _bundleQty = bundleQty;

    _bundleQty = getQtyValue(e.target.value, type, _bundleQty);

    setBundleQty(_bundleQty);
  };

  return (
    <Paper className={classes.footerNavbar} elevation={3}>
      <FooterProductButtons
        onClickCart={handleClickCart}
        onClickPurchase={handleClickPurchase}
        disabled={isAnyNotChosenVariant()}
      />
      <FooterProduct
        product={variantData}
        bundleQuota={variantData?.qty}
        showDrawer={openDrawerVariant}
        setShowDrawer={toggleDrawerVariant}
        mode={productDrawerModes.BUNDLE.param}
        handleApplyVariant={handleApplyVariant}
      />
      <DrawerPanel
        open={openDrawerProduct}
        onClose={toggleDrawerProduct}
        title={mode === "PURCHASE" ? "Proceed to Payment" : "Add to Cart"}
      >
        <div className={classes.containerDrawerProduct}>
          <section className={classes.content}>
            <div className={classes.imageContainer}>
              <Image
                src={bundleData?.itemsBundles?.[0]?.imageProduct}
                height={100}
                width={100}
                objectFit="contain"
                alt="product"
              />
            </div>
            <div>
              <div className={classes.bundleName}>
                <Image
                  src={BundleCart}
                  alt="icon bundle cart"
                  objectFit="contain"
                />
                <p>{bundleData?.titleBundle} Bundle</p>
              </div>
              <div className={classes.summary}>
                <p>
                  {calculateDiscountPercentage(
                    prices.basePrice,
                    prices.finalPrice
                  )}
                  %
                </p>
                <p>S${prices.basePrice}</p>
                <p>S${prices.finalPrice}</p>
              </div>
              <div className={classes.discount}>
                <Image src={DiscountIcon} alt="discount" objectFit="contain" />
                <p>
                  You Save S${(prices.basePrice - prices.finalPrice).toFixed(2)}
                </p>
              </div>
            </div>
          </section>
          <section className={classes.btnQty}>
            <p>Quantity</p>
            <QuantityButton
              incrementHandler={(e) => handleChangeBundleQty(e, "INCREMENT")}
              decrementHandler={(e) => handleChangeBundleQty(e, "DECREMENT")}
              onChange={(e) => handleChangeBundleQty(e)}
              value={bundleQty}
              stock={quotaPerCheckout || bundleData?.currentStock}
            />
          </section>
          <section className={classes.btnProceed}>
            <PrimaryButton onClick={handleProceed} fullWidth>
              {mode === "PURCHASE" ? "Proceed to Payment" : "Add to Cart"}
            </PrimaryButton>
          </section>
        </div>
      </DrawerPanel>
    </Paper>
  );
};

export default FooterBundle;
