import { roundUpDiscountLessThanOne } from "@helper/checkValue";
import Image from "next/image";
import classes from "./BundleProduct.module.scss";

/**
 * @typedef {{
 * imageProduct: string
 * nameProduct: string
 * discountPercentItem: number
 * basePrice: string
 * finalPrice: string
 * }} ProductItemBundleProps
 */

/**
 * @param {{
 * productItem: ProductItemBundleProps
 * productName: string
 * discountPercentage: number
 * index?: number
 * }} props
 * @returns {JSX.Element}
 */
const BundleProduct = ({
  productItem,
  productName,
  discountPercentage,
  index,
}) => {
  return (
    <div className={classes.productItem} key={index}>
      <div className={classes.imageContainer}>
        <Image
          src={productItem.imageProduct}
          objectFit="contain"
          alt={productItem.nameProduct}
          width={80}
          height={80}
        />
      </div>

      <div>
        <p className={classes.productTitle}>{productName}</p>
        <div className={classes.prices}>
          {productItem.discountPercentItem > 0 && (
            <>
              <p className={classes.dicountPercentage}>
                {roundUpDiscountLessThanOne(discountPercentage)}%
              </p>
              <p className={classes.basePrice}>{productItem.basePrice}</p>
            </>
          )}
          <p className={classes.finalPrice}>{productItem.finalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default BundleProduct;
