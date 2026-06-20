// Next
import Image from "next/image";
import Link from "next/link";

// Components
import QuantityButton from "@components/buttons/QuantityButton/QuantityButton";
import PurpleCheckBox from "@components/checkbox/PurpleCheckBox/PurpleCheckBox";

// Helper
import { formatCurrency } from "@helper/checkValue";
import { convertDataProductCart } from "@helper/convertProductData";

// Styles
import { getProductVariantByName } from "@helper/getProductVariantByName";
import classes from "./PhysicalProductCartItem.module.scss";

const PhysicalProductCartItem = ({
  product,
  productIdx,
  quantityProduct,
  quantityChangeHandler,
  incrementDecrementHandler,
  handleSelect,
  checkIsSelected,
}) => {
  const physicalProductData = convertDataProductCart(product?.product);
  const productVariantName = getProductVariantByName(
    physicalProductData.nameProductFull
  );

  return (
    <div className={classes.containerPhysicalProduct} key={productIdx}>
      <div className={classes.productContainer}>
        <div className={classes.productSelectImage}>
          <div onClick={() => handleSelect(product?.id)}>
            <PurpleCheckBox
              disabled={physicalProductData?.isOutOfStock}
              checked={checkIsSelected(product?.id)}
            />
          </div>

          <div className={classes.productImage}>
            <Link
              href={{
                pathname: `/${product.shop_slug}/${physicalProductData.slugProduct}`,
                query: {
                  id: physicalProductData.idProduct,
                  shop_id: physicalProductData.shopId,
                },
              }}
            >
              <a>
                <Image
                  src={physicalProductData.imageProduct}
                  alt={physicalProductData.nameProduct}
                  objectFit="contain"
                  width={80}
                  height={80}
                />
              </a>
            </Link>
          </div>
        </div>

        <div className={classes.productDetails}>
          {physicalProductData.isOutOfStock ? (
            <>
              <p className={classes.productTitle__disabled}>
                {physicalProductData.nameProduct}
              </p>
              <div className={classes.prices__disabled}>
                <p className={classes.finalPrice}>
                  {formatCurrency(physicalProductData.priceProduct)}
                </p>
              </div>
              {productVariantName && (
                <div className={classes.variantContainer}>
                  <p>{productVariantName}</p>
                </div>
              )}
              <p className={classes.outOfStock}>Out-of-stock!</p>
            </>
          ) : (
            <>
              <Link
                href={{
                  pathname: `/${product.shop_slug}/${physicalProductData.slugProduct}`,
                  query: {
                    id: physicalProductData.idProduct,
                    shop_id: physicalProductData.shopId,
                  },
                }}
              >
                <a>
                  <p className={classes.productTitle}>
                    {physicalProductData.nameProduct}
                  </p>
                </a>
              </Link>

              {physicalProductData?.membershipDiscount ? (
                <>
                  <div className={classes.prices}>
                    {physicalProductData.showDiscountProductPercentage && (
                      <>
                        {renderDiscountPercentage(
                          physicalProductData.percentDiscountProduct
                        )}
                        <p className={classes.plusDiscountPercentage}>+</p>
                      </>
                    )}
                    {physicalProductData?.membershipDiscount && (
                      <>
                        <p className={classes.memberDiscountPercentage}>
                          {
                            physicalProductData.membershipDiscount
                              ?.discount_percent
                          }
                          %
                        </p>
                      </>
                    )}
                  </div>
                  <div className={classes.prices}>
                    {renderDiscountAmount(
                      physicalProductData.productDiscountPrice
                    )}
                    {renderFinalPrice(physicalProductData.priceProduct)}
                  </div>
                </>
              ) : (
                <div className={classes.prices}>
                  {physicalProductData.showDiscountProductPercentage &&
                    renderDiscountPercentage(
                      physicalProductData.percentDiscountProduct
                    )}
                  {physicalProductData.hasDiscountProduct &&
                    renderDiscountAmount(
                      physicalProductData.productDiscountPrice
                    )}
                  {renderFinalPrice(physicalProductData.priceProduct)}
                </div>
              )}
              {productVariantName && (
                <div className={classes.variantContainer}>
                  <p>{productVariantName}</p>
                </div>
              )}
              <QuantityButton
                stock={physicalProductData.stockProduct}
                incrementHandler={() =>
                  incrementDecrementHandler({
                    action: "INCREMENT",
                    cartId: product.id,
                  })
                }
                decrementHandler={() =>
                  incrementDecrementHandler({
                    action: "DECREMENT",
                    cartId: product.id,
                  })
                }
                value={quantityProduct[product.id]}
                onChange={(event) =>
                  quantityChangeHandler({
                    event: event,
                    cartId: product.id,
                    stockProduct: convertDataProductCart(product.product)
                      .stockProduct,
                  })
                }
              />

              {quantityProduct[product.id] >
                physicalProductData.stockProduct && (
                <p className={classes.maxPurchase}>
                  Max. Purchase&nbsp;
                  {physicalProductData.stockProduct}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 *
 * @param {number} value
 * @returns
 */
const renderDiscountAmount = (value) => {
  return <p className={classes.discountAmount}>{formatCurrency(value)}</p>;
};

/**
 *
 * @param {number} value
 * @returns
 */
const renderFinalPrice = (value) => {
  return <p className={classes.finalPrice}>{formatCurrency(value)}</p>;
};

/**
 *
 * @param {number} value
 * @returns
 */
const renderDiscountPercentage = (value) => {
  return <p className={classes.discountPercentage}>{value}%</p>;
};

export default PhysicalProductCartItem;
