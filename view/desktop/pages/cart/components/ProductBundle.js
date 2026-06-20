// React
import React from "react";

// Next
import Image from "next/image";
import { useRouter } from "next/router";

// MUI Components
import { Paper, Stack, Typography } from "@mui/material";

// Icons
import BundleCart from "@public/assets/icons/bundle-cart.svg";
import discount from "@public/assets/icons/discount.svg";

// Images
import NoImageProduct from "@public/assets/images/illustration-no-product-image.svg";

// Helper
import { convertDataBundles } from "@helper/convertProductData";

function ProductBundle({ productData, paperProps = {}, disabled }) {
  const productsBundleData = convertDataBundles({
    ...(productData?.bundle || productData),
    bundle_qty: productData.bundle_qty,
  });

  const { pathname } = useRouter();
  const isCheckoutPage = pathname.includes("checkout");

  return (
    <Paper
      variant="outlined"
      className={`bundleProducts ${disabled && "disabled-content"}`}
      {...paperProps}
    >
      <Stack
        direction="column"
        p={3.5}
        flexWrap="wrap"
        alignContent="flex-start"
        gap={2.5}
      >
        <div className="productDetails bundleHeader">
          <Stack
            direction="row"
            gap={1}
            mb={1.1}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <Image
                src={BundleCart}
                alt="icon bundle cart"
                objectFit="contain"
              />
              <Typography className="productCartTitle productTitleBundle">
                {productsBundleData.titleBundle}
                {` (${productData.bundle_qty} set)`}
              </Typography>
            </Stack>
            <Stack spacing={0.8} direction="row" className="savePriceLabel">
              <Image
                width={20}
                height={20}
                src={discount}
                alt="discount"
                objectFit="contain"
              />
              <Typography
                className="textLabel"
                variant="subtitle2"
                fontWeight="700"
              >
                You Save {productsBundleData?.savingCostResult} (
                {productsBundleData?.discountPercent}%)
              </Typography>
            </Stack>
          </Stack>
          <div className="priceCartContainer">
            <Typography className="discountPercent">
              {productsBundleData.discountPercent}%
            </Typography>
            <Typography className="discountAmount">
              {productsBundleData.formattedTotalBasePriceBundle}
            </Typography>
            <Typography className="price">
              {productsBundleData.formattedTotalDiscountPriceBundle}
            </Typography>
          </div>
        </div>
        {productsBundleData.itemsBundles.map((item) => (
          <Stack direction="row" width="100%" gap={2.5} key={item.nameProduct}>
            <div
              className={
                item.stock === 0 ? "disabledProductImage" : "productImage"
              }
            >
              <Image
                src={item.imageProduct || NoImageProduct}
                alt="product"
                layout="fill"
                objectFit={item.imageProduct ? "contain" : "none"}
              />
            </div>
            <div className="productDetails">
              <Typography className="productCartTitle productTitleBundle">
                {Math.round(item?.qty / productData.bundle_qty)} x{" "}
                {item?.fullNameProduct?.length >= 80
                  ? `${item?.fullNameProduct?.substring(0, 80)} ...`
                  : item?.fullNameProduct}
              </Typography>
              <div className="priceCartContainer">
                {(item.stock || isCheckoutPage) && item.status === "ACTIVE" ? (
                  <>
                    {item.discountPercentItem && (
                      <>
                        <Typography className="discountPercent">
                          {item.discountPercentItem}%
                        </Typography>
                        <Typography className="discountAmount">
                          {item.basePriceItemBundle}
                        </Typography>
                      </>
                    )}
                    <Typography className="price">
                      {item.finalPriceItemBundle}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="h6">
                    {!item?.stock &&
                      item?.status === "ACTIVE" &&
                      "Out-of-stock!"}
                    {item?.status === "INACTIVE" &&
                      "Product is currently unavailable"}
                  </Typography>
                )}
              </div>
            </div>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

export default ProductBundle;
