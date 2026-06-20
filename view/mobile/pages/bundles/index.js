// Next
import useToggle from "@hooks/useToggle";
import Image from "next/image";
import { useEffect, useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { getQuantityCartData } from "store/reducer/quantityCart/quantityCartSlice";

// Helper
import { calculateDiscountPercentage } from "@helper/calculateDiscount";
import { formatCurrency } from "@helper/checkValue";

// Components
import { Button } from "@mui/material";
import HeaderNavigation from "view/mobile/components/HeaderNavigation";
import FooterBundle from "./FooterBundle/FooterBundle";

// Styles
import classes from "./BundleDetails.module.scss";

// Assets
import BundleCart from "@public/assets/icons/bundle-cart.svg";

const BundleDetails = ({ getBundleListState }) => {
  const { finalData, rawData } = getBundleListState;
  const dispatch = useDispatch();
  const [bundleItems, setBundleItems] = useState([]);
  const [activeVariant, setActiveVariant] = useState(0);
  const [openDrawerVariant, toggleDrawerVariant] = useToggle();
  const [prices, setPrices] = useState({
    basePrice: 0,
    finalPrice: 0,
    itemPrice: [],
  });
  const quotaPerCheckout = rawData?.quota_per_checkout;
  const shareData = {
    cover_image_url: rawData?.items?.[0]?.cover_image_url,
    title: rawData?.name,
  };

  const handleChooseVariant = (productIndex) => {
    setActiveVariant(productIndex);
    toggleDrawerVariant();
  };

  const setDefaultBundleItems = () => {
    const bundleData = rawData?.items?.map((item) => {
      const hasVariants = item?.has_variants;
      const cheapestVariantId = item?.max_discount?.variant_id;
      const itemQty = item?.qty;

      return {
        ...item,
        variant_details: item.variant_details?.map((variant) => {
          const defaultQty =
            cheapestVariantId === variant?.variant_id ? itemQty : 0;

          return {
            ...variant,
            purchaseQty: !hasVariants ? itemQty : defaultQty,
            discount: {
              status: variant?.discount_percent === 0 ? "INACTIVE" : "ACTIVE",
            },
            price: variant?.discount_final_price,
          };
        }),
      };
    });

    setBundleItems(bundleData);
  };

  const isAnyNotChosenVariant = () => {
    const unselectedBundle = bundleItems.find((product) => {
      const qty = product?.qty;
      const totalChosedVariant = product?.variant_details
        ?.map((variant) => variant?.purchaseQty)
        ?.reduce((acc, qty) => acc + qty, 0);

      return qty !== totalChosedVariant;
    });

    return unselectedBundle ? true : false;
  };

  useEffect(() => {
    setDefaultBundleItems();
  }, []);

  const getSelectedVariants = (variants) => {
    const selectedVariants = variants?.filter(
      (variant) => variant.purchaseQty > 0
    );

    if (!selectedVariants || selectedVariants?.length === 0) return "";
    const variantsTitle = selectedVariants?.map(
      (variant) =>
        `${variant?.purchaseQty}× ${variant?.variant_title} (${formatCurrency(
          variant?.price * variant?.purchaseQty
        )})`
    );

    return variantsTitle?.join(", ");
  };

  const getPrices = () => {
    let basePrice = 0;
    let finalPrice = 0;
    const itemPrice = [];

    bundleItems.map((product, productIdx) => {
      if (!product?.has_variants) {
        const qty = product?.variant_details[0]?.purchaseQty;
        basePrice +=
          qty * rawData?.items?.[productIdx]?.max_discount?.base_price;
        finalPrice +=
          qty *
          rawData?.items?.[productIdx]?.max_discount?.discount_final_price;
      } else {
        product?.variant_details?.map((variant) => {
          if (variant?.purchaseQty > 0) {
            basePrice += variant?.purchaseQty * variant?.base_price;
            finalPrice += variant?.purchaseQty * variant?.price;
          }
        });
      }

      itemPrice[productIdx] = {
        basePrice: product?.variant_details
          ?.map((variant) =>
            variant?.purchaseQty > 0
              ? variant?.base_price * variant?.purchaseQty
              : 0
          )
          ?.reduce((acc, num) => acc + num, 0),
        finalPrice: product?.variant_details
          ?.map((variant) =>
            variant?.purchaseQty > 0 ? variant?.price * variant?.purchaseQty : 0
          )
          ?.reduce((acc, num) => acc + num, 0),
      };
    });

    setPrices({
      basePrice: basePrice.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      itemPrice,
    });
  };

  const getStockLeft = (variants) => {
    return variants?.[0]?.stock || 0;
  };

  useEffect(() => {
    getPrices();
  }, [bundleItems, openDrawerVariant]);

  useEffect(() => {
    dispatch(getQuantityCartData());
  }, []);

  return (
    <div className={classes.bundleDetailsContainer}>
      <HeaderNavigation pageTitle="Bundle Deals" product={shareData} />
      <section className={classes.bundleOverview}>
        <div className={classes.bundleName}>
          <Image src={BundleCart} alt="icon bundle cart" objectFit="contain" />
          <h1>{finalData.titleBundle}</h1>
        </div>
        <div className={classes.summary}>
          <p>
            {calculateDiscountPercentage(prices?.basePrice, prices?.finalPrice)}
            %
          </p>
          <p>S${prices.basePrice}</p>
          <p>S${prices.finalPrice}</p>
        </div>
      </section>
      <section className={classes.bundleContent}>
        {rawData?.items?.map((product, index) => (
          <div key={index} className={classes.productContainer}>
            <div className={classes.productImage}>
              <Image
                src={product?.cover_image_url}
                height={80}
                width={80}
                objectFit="contain"
                alt={product?.name}
              />
            </div>
            <div className={classes.productDetails}>
              <p>
                {product?.qty} × {product?.name}
              </p>
              <div className={classes.summary}>
                <p>
                  {calculateDiscountPercentage(
                    prices?.itemPrice?.[index]?.basePrice,
                    prices?.itemPrice?.[index]?.finalPrice
                  )}
                  %
                </p>
                <p>{formatCurrency(prices?.itemPrice?.[index]?.basePrice)}</p>
                <p>{formatCurrency(prices?.itemPrice?.[index]?.finalPrice)}</p>
              </div>
              {!product?.has_variants &&
                getStockLeft(product?.variant_details) <= 10 && (
                  <p className={classes.stockLeft}>
                    Stock left: {getStockLeft(product?.variant_details)}
                  </p>
                )}
              {product?.variant_details?.length > 1 && (
                <div className={classes.variantBtn}>
                  <Button onClick={() => handleChooseVariant(index)} fullWidth>
                    <p>
                      {getSelectedVariants(
                        bundleItems?.[index]?.variant_details
                      ) || "No Variant Selected"}
                    </p>
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
      <FooterBundle
        activeVariant={activeVariant}
        bundleData={finalData}
        bundleItems={bundleItems}
        setBundleItems={setBundleItems}
        prices={prices}
        quotaPerCheckout={quotaPerCheckout}
        openDrawerVariant={openDrawerVariant}
        toggleDrawerVariant={toggleDrawerVariant}
        isAnyNotChosenVariant={isAnyNotChosenVariant}
      />
    </div>
  );
};

export default BundleDetails;
