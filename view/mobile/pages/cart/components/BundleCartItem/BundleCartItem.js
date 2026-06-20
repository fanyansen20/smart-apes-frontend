// Next
import Image from "next/image";

// Helper
import { convertDataBundles } from "@helper/convertProductData";
import useToggle from "@hooks/useToggle";

// Components
import PurpleCheckBox from "@components/checkbox/PurpleCheckBox/PurpleCheckBox";
import BundleProduct from "./BundleProduct/BundleProduct";

// Assets
import bundleCartIcon from "@public/assets/icons/bundle-cart.svg";
import discount from "@public/assets/icons/discount.svg";

// Styles
import classes from "./BundleCartItem.module.scss";

const BundleCartItem = ({
  product,
  productIdx,
  handleSelect,
  checkIsSelected,
}) => {
  const [isExpanded, toggleExpand] = useToggle();
  const isOutOfStock = product?.bundle?.items
    ?.map((item) => item?.stock || 0)
    ?.includes(0);
  const isOutOfQuota = product?.bundle?.current_quota === 0;
  const isInactiveProduct = product?.bundle?.items
    ?.map((item) => item?.status)
    .includes("INACTIVE");
  const bundleSet =
    product?.bundle_qty > 0 ? ` (${product?.bundle_qty} set)` : "";

  const productsBundleData = convertDataBundles({
    ...(product?.bundle || product),
    bundle_qty: product.bundle_qty,
  });

  return (
    <div className={classes.containerBundleCart} key={productIdx}>
      <div className={classes.productSection}>
        <div onClick={() => handleSelect(product?.id)}>
          <PurpleCheckBox
            checked={checkIsSelected(product?.id)}
            disabled={isOutOfQuota || isOutOfStock || isInactiveProduct}
          />
        </div>
        <div className={classes.containerProducts}>
          <div className={classes.titleBundle}>
            <Image
              src={bundleCartIcon}
              alt="bundle"
              objectFit="contain"
              width={20}
              height={20}
            />
            <h3>
              {productsBundleData?.titleBundle + bundleSet}
              {isOutOfQuota ||
                isOutOfStock ||
                (isInactiveProduct && " (bundle out of stock)")}
            </h3>
          </div>
          <div className={classes.priceContainer}>
            <p className={classes.discountPercent}>
              {productsBundleData.discountPercent}%
            </p>
            <p className={classes.discountAmount}>
              {productsBundleData.formattedTotalBasePriceBundle}
            </p>
            <p className={classes.price}>
              {productsBundleData.formattedTotalDiscountPriceBundle}
            </p>
          </div>
          <div className={classes.discountLabel}>
            <Image
              width={20}
              height={20}
              src={discount}
              alt="discount"
              objectFit="contain"
            />
            <p>
              You Save {productsBundleData?.savingCostResult} (
              {productsBundleData?.discountPercent}%)
            </p>
          </div>
          {isExpanded ? (
            <div>
              {productsBundleData?.itemsBundles?.map((productItem, index) => (
                <BundleProduct
                  index={index}
                  productName={product?.bundle?.items?.[index]?.name}
                  discountPercentage={
                    product?.bundle?.items?.[index]?.discount_percent
                  }
                  productItem={productItem}
                  key={index}
                />
              ))}
              <p onClick={toggleExpand} className={classes.expansionText}>
                See Less
              </p>
            </div>
          ) : (
            <div>
              <BundleProduct
                productName={product?.bundle?.items?.[0]?.name}
                discountPercentage={
                  product?.bundle?.items?.[0]?.discount_percent
                }
                productItem={productsBundleData?.itemsBundles?.[0]}
              />
              <p onClick={toggleExpand} className={classes.expansionText}>
                +{productsBundleData?.itemsBundles?.length - 1} more Products
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BundleCartItem;
