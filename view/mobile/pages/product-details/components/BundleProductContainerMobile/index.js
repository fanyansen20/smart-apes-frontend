// Next
import Image from "next/image";
import Link from "next/link";

// Styles
import classes from "./BundleProductContainerMobile.module.scss";

// Helper
import { roundUpDiscountLessThanOne } from "@helper/checkValue";
import { convertDataBundles } from "@helper/convertProductData";

// Assets
import DiscountIcon from "@public/assets/icons/discount.svg";

const BundleProductContainerMobile = ({ data, idProduct }) => {
  const bundleData = data && convertDataBundles(data);

  return (
    <Link href={`/bundles/${idProduct}`}>
      <div className={classes.containerBundleProductMobile}>
        <div className={classes.header}>
          <h1>{bundleData?.titleBundle}</h1>
          <div className={classes.labelSaveCost}>
            <Image
              width={20}
              height={20}
              src={DiscountIcon}
              alt="discount"
              objectFit="contain"
            />
            <p>You save {bundleData.defaultSavingPrice}</p>
          </div>
        </div>
        <div className={classes.content}>
          {bundleData?.itemsBundles.map((product, index) => (
            <div key={index} className={classes.productContainer}>
              <div className={classes.productImage}>
                <Image
                  src={product.imageProduct}
                  height={80}
                  width={80}
                  objectFit="contain"
                  alt="image product"
                />
              </div>
              <p>{product.nameProduct}</p>
            </div>
          ))}
        </div>
        <div className={classes.summary}>
          <p>
            {roundUpDiscountLessThanOne(bundleData.defaultDiscountTotalPercent)}
            %
          </p>
          <p>{bundleData.defaultTotalBasePrice}</p>
          <p>{bundleData.defaultTotalFinalPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default BundleProductContainerMobile;
