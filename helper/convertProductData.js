// helper
import { formatCurrency, roundUpDiscountLessThanOne } from "./checkValue";

export function convertDataProductCart(product) {
  const nameProduct =
    product.name.length > 58
      ? product.name.substring(0, 60) + "..."
      : product.name;
  const nameProductFull = product?.fullName;

  const priceProduct = product?.price;
  const productDiscountPrice = product?.base_price;
  const percentDiscountProduct = parseInt(product?.discount_percent);

  const imageProduct = product?.image_url;
  const stockProduct = product.stock;
  const slugProduct = product.slug;
  const idProduct = product.id;

  const hasDiscountProduct = product?.discount_status === "ACTIVE";
  const showDiscountProductPercentage =
    product?.discount_percent > 0 && product?.discount_status === "ACTIVE";
  const isOutOfStock = product.stock === 0;

  const shopId = product.shop_id;

  const membershipDiscount = product?.membership_discount;
  const membershipBasePrice = product?.membership_discount?.price;

  return {
    nameProduct,
    nameProductFull,
    priceProduct,
    productDiscountPrice,
    percentDiscountProduct,
    imageProduct,
    hasDiscountProduct,
    isOutOfStock,
    stockProduct,
    shopId,
    slugProduct,
    idProduct,
    membershipDiscount,
    membershipBasePrice,
    showDiscountProductPercentage,
  };
}

export function convertDataProductCheckout(product) {
  const nameProduct =
    product.title.length > 60
      ? product?.title.substring(0, 60) + "..."
      : product?.title;

  const priceProduct = product?.total_price;
  const productDiscountPrice = product?.total_base_price;
  const percentDiscountProduct = roundUpDiscountLessThanOne(
    product?.active_discount?.percent
  );
  const hasDiscountProduct = product?.active_discount?.status;

  const imageProduct = product?.image_url;
  const totalQuantityProduct = product?.qty;
  const idProduct = product?.id;

  return {
    nameProduct,
    priceProduct,
    productDiscountPrice,
    totalQuantityProduct,
    percentDiscountProduct,
    imageProduct,
    hasDiscountProduct,
    idProduct,
  };
}

export function convertDataCardProduct(product) {
  const imageProduct = product?.cover_image_url_500 ?? "";
  const productName =
    product?.title.substring(0, 40) + "..." ?? "no title product";
  const priceProduct = product?.main_variant?.price_string;
  const discountPriceProduct = product?.main_variant?.base_price_string;
  const discountPercent = `${parseInt(
    product?.main_variant?.discount?.percent
  )}%`;
  const ratingProduct = product?.rating?.value ?? 0;
  const totalSalesProduct = product?.stats?.total_sales;
  const isDiscount = product?.main_variant?.discount?.status === "ACTIVE";

  return {
    imageProduct,
    productName,
    priceProduct,
    discountPriceProduct,
    discountPercent,
    ratingProduct,
    totalSalesProduct,
    isDiscount,
  };
}

export function formatProductItem(item) {
  const variantTitle = item?.variant_title ? `- ${item?.variant_title}` : "";
  const fullNameProduct =
    (item?.name && `${item?.name} ${variantTitle}`) || item?.title;
  const nameProduct =
    fullNameProduct?.length >= 25
      ? fullNameProduct?.substring(0, 25) + " ..."
      : fullNameProduct;
  const qty = item?.qty;
  const stock =
    item?.stock ||
    item?.variant_details
      ?.map((variant) => Number(variant?.stock))
      ?.reduce((total, currentStock) => total + currentStock) ||
    null;
  const basePrice = formatCurrency(
    item?.max_discount?.base_price || item?.base_price
  );
  const finalPrice = formatCurrency(
    item?.max_discount?.discount_final_price ||
      item?.discount_final_price ||
      item?.price
  );
  const percentNumber =
    item?.variant_details?.length === 1
      ? item?.variant_details?.[0]?.discount_percent
      : item?.active_discount?.percent ||
        item.discount_percent ||
        item?.bundle_discount?.percent;

  const totalBasePrice = formatCurrency(
    item?.variant_details?.length === 1
      ? item?.variant_details?.[0]?.total_base_price
      : item.total_base_price
  );
  const totalFinalPrice = formatCurrency(
    item?.variant_details?.length === 1
      ? item?.variant_details?.[0]?.total_price
      : item.total_price
  );
  const discountPercentItem = percentNumber ? parseInt(percentNumber) : null;

  const imageProduct =
    item?.cover_image_url_500 ||
    item?.images?.image_url_500 ||
    item?.image_url ||
    null;
  const productId = item?.product_id;

  return {
    imageProduct,
    qty,
    stock,
    basePrice,
    finalPrice,
    totalBasePrice,
    totalFinalPrice,
    nameProduct,
    fullNameProduct,
    discountPercentItem,
    productId,
  };
}

export function formatItemBundles(item, bundle) {
  const baseQty = item?.base_qty;
  const status = item?.status;
  const hasVariants = item?.has_variants;
  const currentItemQty = item.qty / (bundle?.bundle_qty || 1);
  const basePriceItem = item?.base_price;
  const finalPriceItem = item?.discount_final_price || item?.price;
  const variantDetails = item?.variant_details?.map((variant) => {
    const variantId = variant?.variant_id;
    const variantTitle = variant?.variant_title;
    const variantCombo = variant?.variant_combo;

    return {
      ...formatProductItem(variant),
      variantId,
      variantTitle,
      variantCombo,
    };
  });
  const lowestPriceVariantId = item?.max_discount?.variant_id;
  const basePriceItemBundle = formatCurrency(basePriceItem * currentItemQty);
  const finalPriceItemBundle = formatCurrency(finalPriceItem * currentItemQty);

  return {
    ...formatProductItem(item),
    status,
    baseQty,
    hasVariants,
    variantDetails,
    lowestPriceVariantId,
    basePriceItemBundle,
    finalPriceItemBundle,
  };
}

export function convertDataBundles(bundle) {
  const price = bundle?.max_discount;

  const totalBasePriceBundle = bundle?.items
    ?.map(
      (item) =>
        item?.qty *
        (item?.max_discount?.base_price ||
          item?.base_price ||
          item.active_discount.base_price)
    )
    ?.reduce((total, num) => total + num);

  const totalDiscountPriceBundle = bundle?.items
    ?.map(
      (item) =>
        item?.qty *
        (item?.max_discount?.discount_final_price ||
          item?.discount_final_price ||
          item?.price)
    )
    ?.reduce((total, num) => total + num);

  const discountPercent = parseInt(
    ((totalBasePriceBundle - totalDiscountPriceBundle) / totalBasePriceBundle) *
      100
  );

  const getDefaultTotalBasePriceNumber = bundle?.items
    ?.map((item) =>
      Math?.min(
        ...(item?.variant_details?.map((detail) => detail?.total_base_price) ||
          [])
      )
    )
    ?.reduce((total, num) => total + num);

  const getDefaultTotalFinalPrice = bundle?.items
    ?.map((item) =>
      Math.min(
        ...(item?.variant_details?.map((detail) => detail?.total_price) || [])
      )
    )
    ?.reduce((total, num) => total + num);

  const defaultTotalBasePrice = formatCurrency(getDefaultTotalBasePriceNumber);
  const defaultTotalFinalPrice = formatCurrency(getDefaultTotalFinalPrice);

  const defaultDiscountTotalPercent =
    ((getDefaultTotalBasePriceNumber - getDefaultTotalFinalPrice) /
      getDefaultTotalBasePriceNumber) *
    100;

  const defaultSavingPrice = formatCurrency(
    getDefaultTotalBasePriceNumber - getDefaultTotalFinalPrice
  );

  const formattedTotalBasePriceBundle = formatCurrency(totalBasePriceBundle);

  const formattedTotalDiscountPriceBundle = formatCurrency(
    totalDiscountPriceBundle
  );

  const savingCostResult = formatCurrency(
    totalBasePriceBundle - totalDiscountPriceBundle
  );
  const priceBundle = formatCurrency(price?.total_price || bundle?.total_price);
  const basePriceBundle = formatCurrency(
    price?.base_price || bundle?.total_base_price
  );
  const saveCostPrice = formatCurrency(price?.discount_price);
  const totalItems = bundle?.items?.length ?? 0;
  const randomIndexIdProduct = Math.floor(Math.random() * totalItems);
  const productId = bundle?.items?.[randomIndexIdProduct]?.product_id;

  const bundleId = bundle?.id;
  const titleBundle = bundle?.name;
  const currentStock = bundle?.current_quota;

  const itemsBundles = bundle?.items
    ?.map((item) => formatItemBundles(item, bundle))
    .filter((item) => item);

  const itemsPayload = bundle?.items
    ?.map((item) =>
      item?.variant_details?.map((detail) => ({
        product_id: item?.product_id,
        qty: item?.variant_details?.length === 1 ? detail.qty : null,
        variant_id: detail?.variant_id,
      }))
    )
    ?.flat();

  const bundleObjectDataString = JSON.stringify({
    bundleId,
    itemsPayload,
    itemsBundles,
    titleBundle,
    discountPercent,
    priceBundle,
    basePriceBundle,
    saveCostPrice,
    currentStock,
    productId,
    totalItems,
    savingCostResult,
    totalBasePriceBundle,
    totalDiscountPriceBundle,
    defaultTotalBasePrice,
    defaultTotalFinalPrice,
    defaultDiscountTotalPercent,
    defaultSavingPrice,
    formattedTotalBasePriceBundle,
    formattedTotalDiscountPriceBundle,
  }).replace(/undefined/g, null);

  return JSON.parse(bundleObjectDataString);
}
